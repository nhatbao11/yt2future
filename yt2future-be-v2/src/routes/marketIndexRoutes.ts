import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { runSyncMarketIndex } from '../services/marketIndexService.js';

const router = Router();

// GET /api/market-index?symbol=VNINDEX&from=2026-01-01&to=2026-04-01
router.get('/', async (req, res) => {
  try {
    const { symbol, from, to } = req.query;
    const where: any = {};
    if (symbol) where.symbol = symbol;
    if (from || to) where.date = {};
    if (from) where.date.gte = new Date(from as string);
    if (to) where.date.lte = new Date(to as string);
    const data = await prisma.marketIndexDaily.findMany({
      where,
      orderBy: { date: 'asc' },
    });
    // Convert BigInt fields to Number for JSON serialization
    const safeData = data.map((item) => ({
      ...item,
      volume: item.volume !== null && item.volume !== undefined ? Number(item.volume) : null,
    }));
    res.json(safeData);
  } catch (err) {
    console.error('MarketIndex API error:', err);
    res.status(500).json({ error: 'Server error', detail: String(err) });
  }
});

// POST /api/market-index/sync - Gọi bởi Vercel Cron Job
router.post('/sync', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const cronSecret = process.env.CRON_SECRET;

    // Chỉ chặn nếu CRON_SECRET được cấu hình (ví dụ trên Vercel)
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      res.status(401).json({ error: 'Unauthorized: Invalid cron secret' });
      return;
    }

    const result = await runSyncMarketIndex();
    res.json(result);
  } catch (err) {
    console.error('MarketIndex Sync API error:', err);
    res.status(500).json({ error: 'Server error during sync', detail: String(err) });
  }
});

export default router;
