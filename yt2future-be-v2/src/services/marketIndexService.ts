import { prisma } from '../lib/prisma.js';
import axios, { isAxiosError } from 'axios';

const INDICES = [
  { symbol: 'VNINDEX', vndirectCode: 'VNINDEX' },
  { symbol: 'VN30', vndirectCode: 'VN30' },
  { symbol: 'VN30F1M', vndirectCode: 'VN30F1M' },
] as const;

const VN_TIMEZONE = 'Asia/Ho_Chi_Minh';
const FINFO_API_BASE = (
  process.env.FINFO_API_BASE_URL || 'https://finfo-api.vndirect.com.vn'
).replace(/\/$/, '');
const BOOTSTRAP_YEARS = Number(process.env.SYNC_BOOTSTRAP_YEARS || '5');
const HOLIDAYS = (process.env.VN_MARKET_HOLIDAYS || '')
  .split(',')
  .map((x) => x.trim())
  .filter(Boolean);

type VndirectIndexPoint = {
  date: string;
  open?: number;
  close?: number;
  high?: number;
  low?: number;
  change?: number;
  changePercent?: number;
  ref?: number;
  volume?: number;
};

function getVNDateString(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: VN_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;

  if (!year || !month || !day) {
    throw new Error('Cannot resolve VN date.');
  }
  return `${year}-${month}-${day}`;
}

function getVNWeekday(date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: VN_TIMEZONE,
    weekday: 'short',
  }).format(date);
}

function getWeekdayFromDateString(dateStr: string): string {
  return getVNWeekday(new Date(`${dateStr}T00:00:00+07:00`));
}

function isTradingDay(vnDate: string): boolean {
  const weekday = getWeekdayFromDateString(vnDate);
  if (weekday === 'Sat' || weekday === 'Sun') return false;
  if (HOLIDAYS.includes(vnDate)) return false;
  return true;
}

function addDays(dateStr: string, amount: number): string {
  const d = new Date(dateStr);
  d.setUTCDate(d.getUTCDate() + amount);
  return d.toISOString().slice(0, 10);
}

function subtractYears(dateStr: string, years: number): string {
  const d = new Date(dateStr);
  d.setUTCFullYear(d.getUTCFullYear() - years);
  return d.toISOString().slice(0, 10);
}

function toNumber(value: unknown): number | null {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function toBigInt(value: unknown): bigint | null {
  const n = toNumber(value);
  if (n == null) return null;
  return BigInt(Math.round(n));
}

function formatAxiosError(err: unknown, url: string): string {
  if (!isAxiosError(err)) {
    return err instanceof Error ? err.message : String(err);
  }
  const status = err.response?.status;
  const code = err.code;
  const data = err.response?.data;
  const snippet =
    typeof data === 'string'
      ? data.slice(0, 240)
      : data != null
        ? JSON.stringify(data).slice(0, 240)
        : '';
  return `${err.message} (code=${code ?? 'n/a'} status=${status ?? 'n/a'}) ${snippet ? `body=${snippet}` : ''} url=${url}`;
}

async function fetchIndexHistory(
  symbol: string,
  from: string,
  to: string
): Promise<VndirectIndexPoint[]> {
  const url = `${FINFO_API_BASE}/v4/index_series?sort=date&series_code=${symbol}&from=${from}&to=${to}&fields=date,open,close,high,low,average,change,changePercent,ref,volume`;
  try {
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'yt2future-market-sync/1.0',
      },
      validateStatus: () => true,
    });
    if (response.status >= 400) {
      throw new Error(`HTTP ${response.status} ${JSON.stringify(response.data).slice(0, 200)}`);
    }
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (err) {
    throw new Error(formatAxiosError(err, url));
  }
}

async function syncSymbol(symbol: string, vndirectCode: string, todayVN: string): Promise<string> {
  const latest = await prisma.marketIndexDaily.findFirst({
    where: { symbol },
    orderBy: { date: 'desc' },
    select: { date: true },
  });

  const from = latest
    ? addDays(latest.date.toISOString().slice(0, 10), 1)
    : subtractYears(todayVN, BOOTSTRAP_YEARS);
  const to = todayVN;

  if (from > to) {
    return `[${symbol}] up-to-date (latest=${latest?.date.toISOString().slice(0, 10) ?? 'none'})`;
  }

  console.log(`[${symbol}] fetching ${from} -> ${to}`);
  let rows: VndirectIndexPoint[];
  try {
    rows = await fetchIndexHistory(vndirectCode, from, to);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[${symbol}] API error:`, msg);
    return `[${symbol}] API error: ${msg}`;
  }
  const freshRows = rows.filter((row) => row?.date && row.date >= from && row.date <= to);
  if (freshRows.length === 0) {
    return `[${symbol}] no new rows from source.`;
  }

  let upserted = 0;
  for (const row of freshRows) {
    if (!row?.date) continue;
    const date = new Date(row.date);

    await prisma.marketIndexDaily.upsert({
      where: { symbol_date: { symbol, date } },
      update: {
        open: toNumber(row.open),
        high: toNumber(row.high),
        low: toNumber(row.low),
        close: toNumber(row.close),
        volume: toBigInt(row.volume),
        change: toNumber(row.change),
        changePct: toNumber(row.changePercent),
        ref: toNumber(row.ref),
      },
      create: {
        symbol,
        date,
        open: toNumber(row.open),
        high: toNumber(row.high),
        low: toNumber(row.low),
        close: toNumber(row.close),
        volume: toBigInt(row.volume),
        change: toNumber(row.change),
        changePct: toNumber(row.changePercent),
        ref: toNumber(row.ref),
      },
    });
    upserted += 1;
  }

  return `[${symbol}] upserted ${upserted} row(s).`;
}

export async function runSyncMarketIndex(): Promise<{
  success: boolean;
  message: string;
  results: string[];
}> {
  const todayVN = getVNDateString();
  const results: string[] = [];

  console.log(`[sync] start for VN date ${todayVN} (FINFO_API_BASE=${FINFO_API_BASE})`);

  if (!isTradingDay(todayVN)) {
    const msg = '[sync] skip: weekend/holiday.';
    console.log(msg);
    return { success: true, message: msg, results: [msg] };
  }

  for (const idx of INDICES) {
    const res = await syncSymbol(idx.symbol, idx.vndirectCode, todayVN);
    console.log(res);
    results.push(res);
  }

  return {
    success: true,
    message: '[sync] completed.',
    results,
  };
}
