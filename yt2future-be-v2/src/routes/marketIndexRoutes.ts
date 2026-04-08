import { Router } from 'express';
import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { getErrorMessage } from '../utils/errors.js';

const router = Router();

function serializeRows(
  data: Array<{
    id: number;
    symbol: string;
    date: Date;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
    volume: bigint | null;
    change: number | null;
    changePct: number | null;
    ref: number | null;
  }>
) {
  return data.map((item) => ({
    ...item,
    volume: item.volume !== null && item.volume !== undefined ? Number(item.volume) : null,
  }));
}

/** Default lower bound for dashboard (years) — keeps payload & chart size bounded */
const DEFAULT_FROM_YEARS = 15;

router.get('/', async (req, res) => {
  try {
    const { symbol, symbols, from, to } = req.query;

    const symbolsList =
      typeof symbols === 'string' && symbols.trim().length > 0
        ? symbols
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : null;

    if (symbolsList && symbolsList.length > 0) {
      const where: Prisma.MarketIndexDailyWhereInput = {
        symbol: { in: symbolsList },
      };
      const dateFilter: Prisma.DateTimeFilter = {};
      if (from) {
        dateFilter.gte = new Date(String(from));
      } else {
        const d = new Date();
        d.setFullYear(d.getFullYear() - DEFAULT_FROM_YEARS);
        dateFilter.gte = d;
      }
      if (to) {
        dateFilter.lte = new Date(String(to));
      }
      where.date = dateFilter;

      const data = await prisma.marketIndexDaily.findMany({
        where,
        orderBy: [{ symbol: 'asc' }, { date: 'asc' }],
      });

      const safe = serializeRows(data);
      const grouped: Record<string, typeof safe> = {};
      for (const row of safe) {
        const sym = row.symbol;
        if (!grouped[sym]) grouped[sym] = [];
        grouped[sym]!.push(row);
      }
      for (const sym of symbolsList) {
        if (!grouped[sym]) grouped[sym] = [];
      }
      res.json(grouped);
      return;
    }

    const where: Prisma.MarketIndexDailyWhereInput = {};
    if (symbol) {
      where.symbol = String(symbol);
    }
    if (from || to) {
      where.date = {};
      if (from) {
        where.date.gte = new Date(String(from));
      }
      if (to) {
        where.date.lte = new Date(String(to));
      }
    }

    const data = await prisma.marketIndexDaily.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    res.json(serializeRows(data));
  } catch (err: unknown) {
    console.error('[MarketIndex]', getErrorMessage(err));
    res.status(500).json({ error: 'Server error', detail: getErrorMessage(err) });
  }
});

export default router;
