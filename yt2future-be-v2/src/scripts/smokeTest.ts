type SmokeCheck = {
  name: string;
  run: () => Promise<void>;
};

const baseApiUrl =
  process.env.SMOKE_API_URL || process.env.LOCAL_API_URL || 'http://localhost:5000/api';

async function request(path: string, init?: RequestInit) {
  const response = await fetch(`${baseApiUrl}${path}`, init);
  const text = await response.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      body = text;
    }
  }
  return { response, body };
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const checks: SmokeCheck[] = [
  {
    name: 'GET /categories',
    run: async () => {
      const { response, body } = await request('/categories');
      assert(response.status === 200, `Expected 200, got ${response.status}`);
      assert(!!body && typeof body === 'object', 'Response body is empty');
      const parsed = body as { success?: boolean; categories?: unknown[] };
      assert(parsed.success === true, 'Expected success=true');
      assert(Array.isArray(parsed.categories), 'Expected categories array');
    },
  },
  {
    name: 'GET /reports/public?page=1',
    run: async () => {
      const { response, body } = await request('/reports/public?page=1');
      assert(response.status === 200, `Expected 200, got ${response.status}`);
      assert(!!body && typeof body === 'object', 'Response body is empty');
      const parsed = body as { success?: boolean; reports?: unknown[]; totalPages?: number };
      assert(parsed.success === true, 'Expected success=true');
      assert(Array.isArray(parsed.reports), 'Expected reports array');
      assert(typeof parsed.totalPages === 'number', 'Expected numeric totalPages');
    },
  },
  {
    name: 'GET /auth/me (unauthenticated allowed)',
    run: async () => {
      const { response, body } = await request('/auth/me');
      assert(
        [200, 401, 403].includes(response.status),
        `Expected 200/401/403, got ${response.status}`
      );
      assert(!!body && typeof body === 'object', 'Response body is empty');
    },
  },
];

async function run() {
  console.log(`[smoke] Base URL: ${baseApiUrl}`);
  for (const check of checks) {
    const start = Date.now();
    try {
      await check.run();
      console.log(`[smoke] PASS ${check.name} (${Date.now() - start}ms)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`[smoke] FAIL ${check.name}: ${message}`);
      process.exit(1);
    }
  }
  console.log('[smoke] All checks passed.');
}

run();
