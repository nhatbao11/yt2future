import { getRequestConfig } from 'next-intl/server';

// Các ngôn ngữ được hỗ trợ
export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locale || !locales.includes(locale as Locale)) {
    return {
      locale: 'vi',
      messages: (await import(`../messages/vi.json`)).default,
    };
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
