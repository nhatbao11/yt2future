import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { locales } from '@/i18n/request';

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale: 'vi',
  localeDetection: true,
});

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
