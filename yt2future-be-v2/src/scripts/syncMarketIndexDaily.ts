import 'dotenv/config';
import { runSyncMarketIndex } from '../services/marketIndexService.js';
import { prisma } from '../lib/prisma.js';

async function main() {
  const res = await runSyncMarketIndex();
  console.log(res.message, JSON.stringify(res.results));
  if (!res.success) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[sync CLI] failed:', msg);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
