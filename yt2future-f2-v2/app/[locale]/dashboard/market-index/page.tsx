'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from '@/components/layout/PageHeader';
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Expand, Shrink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getApiBaseURL } from '@/services/apiClient';

const MarketIndexChartBlock = dynamic(() => import('./MarketIndexChartBlock'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center rounded-lg bg-slate-50">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
    </div>
  ),
});

interface MarketIndex {
  id: number;
  symbol: string;
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  change: number | null;
  changePct: number | null;
  ref: number | null;
}

const SYMBOLS = ['VNINDEX', 'VN30', 'VN30F1M'];
const SYMBOL_COLORS: Record<string, string> = {
  VNINDEX: '#2563eb',
  VN30: '#16a34a',
  VN30F1M: '#f97316',
};
const TIME_RANGES = [
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '6M', value: '6m' },
  { label: 'YTD', value: 'ytd' },
  { label: '1Y', value: '1y' },
  { label: '3Y', value: '3y' },
  { label: 'All', value: 'all' },
] as const;

type TimeRangeValue = (typeof TIME_RANGES)[number]['value'];

function formatNumber(value: number | null | undefined, locale: string) {
  if (value == null) return '-';
  return value.toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US', { maximumFractionDigits: 2 });
}

function formatPercent(value: number | null | undefined) {
  if (value == null) return '-';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function formatMillion(value: number | null | undefined) {
  if (value == null) return '-';
  return `${(value / 1_000_000).toFixed(2)}M`;
}

/** API mới: object theo mã. API cũ / fallback: mảng phẳng (gom theo `symbol`). */
function normalizeMarketIndexPayload(
  payload: unknown,
  symbols: string[]
): Record<string, MarketIndex[]> | null {
  const empty = (): Record<string, MarketIndex[]> => {
    const o: Record<string, MarketIndex[]> = {};
    for (const s of symbols) o[s] = [];
    return o;
  };

  if (payload == null || typeof payload !== 'object') return null;

  if (Array.isArray(payload)) {
    const out = empty();
    for (const row of payload) {
      if (!row || typeof row !== 'object' || !('symbol' in row)) continue;
      const sym = String((row as MarketIndex).symbol);
      if (out[sym]) {
        out[sym].push(row as MarketIndex);
      }
    }
    return out;
  }

  const out = empty();
  for (const sym of symbols) {
    const rows = (payload as Record<string, unknown>)[sym];
    out[sym] = Array.isArray(rows) ? (rows as MarketIndex[]) : [];
  }
  return out;
}

export default function MarketIndexDashboard() {
  const locale = useLocale();
  const t = useTranslations('dashboard');
  const m = useTranslations('dashboard.marketIndex');
  const [data, setData] = useState<Record<string, MarketIndex[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0]);
  const [selectedRange, setSelectedRange] = useState<TimeRangeValue>('6m');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const chartScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    setLoading(true);
    const base = getApiBaseURL();
    const symbolsParam = SYMBOLS.join(',');
    fetch(`${base}/market-index?symbols=${encodeURIComponent(symbolsParam)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<Record<string, MarketIndex[]> | MarketIndex[]>;
      })
      .then((payload) => {
        const apiError =
          payload && typeof payload === 'object' && !Array.isArray(payload)
            ? (payload as { error?: unknown }).error
            : undefined;

        if (typeof apiError === 'string') {
          setError(apiError || m('errors.api'));
          setLoading(false);
          return;
        }

        const obj = normalizeMarketIndexPayload(payload, SYMBOLS);
        if (!obj) {
          setError(m('errors.invalidFormat'));
          setLoading(false);
          return;
        }
        setData(obj);
        setLoading(false);
      })
      .catch((err: { name?: string }) => {
        if (err?.name === 'AbortError') return;
        setError(m('errors.loadFailed'));
        setLoading(false);
      });
    return () => controller.abort();
  }, [m]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setIsMobileView(isMobile);
    if (isMobile) {
      setSelectedRange('1m');
    }
  }, []);

  const selectedRows = useMemo(() => {
    const rows = data[selectedSymbol];
    if (!Array.isArray(rows)) return [];
    return [...rows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data, selectedSymbol]);
  const latestRow = selectedRows.length > 0 ? selectedRows[selectedRows.length - 1] : undefined;
  const previousRow = selectedRows.length > 1 ? selectedRows[selectedRows.length - 2] : undefined;
  const filteredRows = useMemo(() => {
    if (selectedRange === 'all') return selectedRows;

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const mapOffset: Record<
      Exclude<TimeRangeValue, 'all' | 'ytd'>,
      { unit: 'day' | 'month' | 'year'; value: number }
    > = {
      '1w': { unit: 'day', value: 7 },
      '1m': { unit: 'month', value: 1 },
      '3m': { unit: 'month', value: 3 },
      '6m': { unit: 'month', value: 6 },
      '1y': { unit: 'year', value: 1 },
      '3y': { unit: 'year', value: 3 },
    };

    if (selectedRange === 'ytd') {
      start.setMonth(0, 1);
    } else {
      const offset = mapOffset[selectedRange];
      if (offset.unit === 'day') start.setDate(start.getDate() - offset.value);
      if (offset.unit === 'month') start.setMonth(start.getMonth() - offset.value);
      if (offset.unit === 'year') start.setFullYear(start.getFullYear() - offset.value);
    }

    const rowsInRange = selectedRows.filter((row) => {
      const d = new Date(row.date);
      return d >= start && d <= today;
    });

    return rowsInRange;
  }, [selectedRows, selectedRange]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    if (filteredRows.length === 0) return;
    const el = chartScrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Mobile: scroll to the far right so the latest candles + right Y-axis show first.
        el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      });
    });
  }, [filteredRows.length, selectedRange, selectedSymbol]);

  const referencePrice = latestRow?.ref ?? previousRow?.close ?? latestRow?.open ?? null;
  const dailyChangeValue =
    latestRow?.close != null && referencePrice != null
      ? latestRow.close - referencePrice
      : (latestRow?.change ?? null);
  const dailyChangePct =
    latestRow?.close != null && referencePrice
      ? ((latestRow.close - referencePrice) / referencePrice) * 100
      : (latestRow?.changePct ?? null);

  const chartData = useMemo(() => {
    const labels = filteredRows.map((row) => row.date.slice(0, 10));
    const color = SYMBOL_COLORS[selectedSymbol] ?? '#2563eb';
    const activeIndex = hoveredIndex;
    const volumeColors = filteredRows.map((row, index) => {
      const prevClose = index > 0 ? filteredRows[index - 1]?.close : null;
      if (row.close == null) return 'rgba(100,116,139,0.4)';
      const isUp =
        prevClose != null
          ? row.close >= prevClose
          : row.open != null
            ? row.close >= row.open
            : true;
      const base = isUp ? '22,163,74' : '220,38,38';
      return activeIndex == null
        ? `rgba(${base},0.38)`
        : `rgba(${base},${index === activeIndex ? 0.95 : 0.12})`;
    });
    const volumeBorderColors = filteredRows.map((row, index) => {
      const prevClose = index > 0 ? filteredRows[index - 1]?.close : null;
      if (row.close == null) return 'rgba(100,116,139,0.45)';
      const isUp =
        prevClose != null
          ? row.close >= prevClose
          : row.open != null
            ? row.close >= row.open
            : true;
      const base = isUp ? '22,163,74' : '220,38,38';
      return activeIndex != null && index === activeIndex
        ? `rgba(${base},1)`
        : `rgba(${base},0.25)`;
    });
    const closePointRadius = filteredRows.map((_, index) => (activeIndex === index ? 4 : 1.5));
    const closePointHoverRadius = filteredRows.map((_, index) => (activeIndex === index ? 5 : 2.5));

    return {
      labels,
      datasets: [
        {
          type: 'bar' as const,
          label: m('legend.liquidity'),
          data: filteredRows.map((row) => row.volume ?? 0),
          yAxisID: 'yVolume',
          backgroundColor: volumeColors,
          borderColor: volumeBorderColors,
          borderWidth: filteredRows.map((_, index) =>
            activeIndex != null && index === activeIndex ? 1.5 : 0
          ),
          barPercentage: 0.85,
          categoryPercentage: 0.95,
          order: 10,
        },
        {
          label: m('legend.high'),
          data: filteredRows.map((row) => row.high ?? null),
          yAxisID: 'yPrice',
          borderColor: 'rgba(15,23,42,0.25)',
          backgroundColor: 'rgba(15,23,42,0.06)',
          pointRadius: 0,
          borderWidth: 1.2,
          tension: 0.2,
          fill: false,
        },
        {
          label: m('legend.low'),
          data: filteredRows.map((row) => row.low ?? null),
          yAxisID: 'yPrice',
          borderColor: 'rgba(15,23,42,0.25)',
          backgroundColor: 'rgba(15,23,42,0.1)',
          pointRadius: 0,
          borderWidth: 1.2,
          tension: 0.2,
          fill: '-1',
        },
        {
          label: `${selectedSymbol} Close`,
          data: filteredRows.map((row) => row.close ?? null),
          yAxisID: 'yPrice',
          borderColor: color,
          backgroundColor: `${color}33`,
          tension: 0.25,
          pointRadius: closePointRadius,
          pointHoverRadius: closePointHoverRadius,
          borderWidth: 2,
          fill: false,
        },
        {
          type: 'line' as const,
          label: 'focus-line',
          data: filteredRows.map((row, index) =>
            activeIndex != null && index === activeIndex ? (row.close ?? null) : null
          ),
          yAxisID: 'yPrice',
          borderColor: 'rgba(148,163,184,0.6)',
          borderWidth: 0,
          pointRadius: 0,
          showLine: false,
        },
      ],
    };
  }, [filteredRows, hoveredIndex, m, selectedSymbol]);

  const maxVolume = useMemo(
    () => Math.max(...filteredRows.map((row) => row.volume ?? 0), 0),
    [filteredRows]
  );

  const chartPointCount = filteredRows.length;

  const chartOptions: ChartOptions<'line' | 'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: chartPointCount > 180 ? 0 : 360,
        easing: 'easeOutQuart' as const,
      },
      normalized: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      onHover: (_event: unknown, elements: Array<{ index: number }>) => {
        if (elements && elements.length > 0) {
          setHoveredIndex(elements[0].index);
        }
      },
      onClick: (_event: unknown, elements: Array<{ index: number }>) => {
        if (elements && elements.length > 0) {
          setHoveredIndex(elements[0].index);
        }
      },
      plugins: {
        decimation: {
          enabled: chartPointCount > 80,
          algorithm: 'lttb' as const,
          samples: Math.min(200, Math.max(80, Math.floor(chartPointCount / 2))),
        },
        legend: {
          display: !isMobileView,
          labels: {
            filter: (item: { text?: string }) =>
              item.text !== m('legend.high') &&
              item.text !== m('legend.low') &&
              item.text !== 'focus-line',
          },
        },
        title: {
          display: !isMobileView,
          text: m('chartTitle', { symbol: selectedSymbol }),
          font: {
            size: 18,
            weight: 'bold' as const,
          },
        },
        tooltip: {
          filter: (context) => context.dataset.label !== 'focus-line',
          callbacks: {
            label: (context: TooltipItem<'line' | 'bar'>) => {
              const label = context.dataset.label ?? '';
              const y = context.parsed.y;
              if (y == null) return `${label}: -`;
              if (label === m('legend.liquidity')) {
                return `${label}: ${formatMillion(y)}`;
              }
              return `${label}: ${formatNumber(y, locale)}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: m('axis.date') },
          ticks: { maxTicksLimit: 6 },
        },
        yPrice: {
          display: true,
          position: 'right' as const,
          title: { display: false, text: 'Close' },
        },
        yVolume: {
          display: false,
          position: 'right' as const,
          min: 0,
          max: maxVolume > 0 ? maxVolume * 4 : 1,
          grid: { display: false },
        },
      },
    }),
    [chartPointCount, isMobileView, locale, m, maxVolume, selectedSymbol]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <PageHeader title={t('title')} />
        <div className="max-w-360 mx-auto px-6 md:px-12 py-20 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 rounded-xl border border-[#001a41]/10 bg-white px-5 py-3 shadow-sm">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#001a41]/20 border-t-[#001a41]" />
            <span className="text-sm font-semibold text-[#001a41]">{m('loading')}</span>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <PageHeader title={t('title')} />
      <div className="max-w-360 mx-auto px-6 md:px-12 py-6 md:py-8 space-y-6">
        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2">
            {SYMBOLS.map((symbol) => (
              <button
                key={symbol}
                type="button"
                onClick={() => setSelectedSymbol(symbol)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  selectedSymbol === symbol
                    ? 'border-[#001a41] bg-[#001a41] text-yellow-400 shadow-[0_3px_10px_rgba(0,26,65,0.25)]'
                    : 'border-[#001a41]/15 bg-white text-[#001a41] hover:border-yellow-400/70 hover:bg-yellow-50'
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-slate-200">{selectedSymbol}</p>
            <p className="text-xs font-medium text-slate-400">
              {latestRow?.date
                ? new Date(latestRow.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 items-end gap-4 md:flex md:flex-wrap md:items-end md:gap-6">
            <div className="min-w-0">
              <p className="text-xs text-slate-400">{m('cards.currentPrice')}</p>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {formatNumber(latestRow?.close, locale)}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400">{m('cards.change')}</p>
              <p
                className={`text-xl md:text-3xl font-bold whitespace-nowrap md:whitespace-normal ${
                  (dailyChangePct ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {dailyChangeValue != null
                  ? `${dailyChangeValue > 0 ? '+' : ''}${formatNumber(dailyChangeValue, locale)}`
                  : '-'}
                {' / '}
                {formatPercent(dailyChangePct)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-[11px] text-slate-600">{m('cards.open')}</p>
            <p className="mt-0.5 text-base font-semibold text-slate-900">
              {formatNumber(latestRow?.open, locale)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-[11px] text-slate-600">{m('cards.close')}</p>
            <p className="mt-0.5 text-base font-semibold text-slate-900">
              {formatNumber(latestRow?.close, locale)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-[11px] text-slate-600">{m('cards.highest')}</p>
            <p className="mt-0.5 text-base font-semibold text-slate-900">
              {formatNumber(latestRow?.high, locale)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-[11px] text-slate-600">{m('cards.lowest')}</p>
            <p className="mt-0.5 text-base font-semibold text-slate-900">
              {formatNumber(latestRow?.low, locale)}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center gap-2">
            <div className="min-w-0 flex-1 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-2">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range.value}
                    type="button"
                    onClick={() => setSelectedRange(range.value)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      selectedRange === range.value
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              title={isExpanded ? m('actions.shrinkChart') : m('actions.expandChart')}
              aria-label={isExpanded ? m('actions.shrinkChart') : m('actions.expandChart')}
            >
              {isExpanded ? <Shrink size={16} /> : <Expand size={16} />}
            </button>
          </div>

          <p className="mb-2 ml-3 text-lg font-bold text-slate-700 md:hidden">
            {m('chartLabel', { symbol: selectedSymbol })}
          </p>
          <div ref={chartScrollRef} className="overflow-x-auto">
            <div
              className={`min-w-[560px] md:min-w-0 ${
                isExpanded ? 'h-[70vh]' : 'h-[320px] md:h-[420px]'
              }`}
            >
              <MarketIndexChartBlock
                data={chartData as ChartData<'line'>}
                options={chartOptions as ChartOptions<'line' | 'bar'>}
              />
            </div>
          </div>

          {/* Mobile: legend cố định dưới biểu đồ, ngoài vùng scroll — kéo ngang không bị trôi */}
          {isMobileView && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-3 md:hidden">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span
                  className="inline-block h-0.5 w-7 rounded-full"
                  style={{
                    backgroundColor: SYMBOL_COLORS[selectedSymbol] ?? '#2563eb',
                  }}
                />
                <span>{selectedSymbol} Close</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="flex gap-0.5">
                  <span className="inline-block h-2.5 w-2 rounded-sm bg-emerald-500/80" />
                  <span className="inline-block h-2.5 w-2 rounded-sm bg-rose-500/80" />
                </span>
                <span>{m('legend.liquidity')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
