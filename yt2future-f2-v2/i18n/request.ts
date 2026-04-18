import { getRequestConfig } from 'next-intl/server';
import enMessages from '../messages/en.json';
import viMessages from '../messages/vi.json';

// Các ngôn ngữ được hỗ trợ
export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];

const messagesByLocale: Record<Locale, typeof viMessages> = {
  vi: viMessages,
  en: enMessages,
};

export default getRequestConfig(async ({ locale }) => {
  const resolved: Locale = locale && locales.includes(locale as Locale) ? (locale as Locale) : 'vi';

  return {
    locale: resolved,
    messages: messagesByLocale[resolved],
  };
});
