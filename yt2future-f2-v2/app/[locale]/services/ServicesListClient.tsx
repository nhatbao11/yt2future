'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from '@/components/common/Link';
import { useLocale, useTranslations } from 'next-intl';
import { Landmark, LineChart, Settings2 } from 'lucide-react';

type ServiceCard = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  solutionsLabel: string;
  solutions: string[];
  cta: string;
  href: string;
  accent: 'navy' | 'yellow' | 'blue';
  icon: React.ReactNode;
};

export default function ServicesListClient() {
  const locale = useLocale();
  const t = useTranslations('services_page');
  const isVi = locale === 'vi';

  const services: ServiceCard[] = [
    {
      id: 'corporate-finance',
      eyebrow: 'CORPORATE FINANCE',
      title: isVi ? 'Tối ưu tài chính' : 'Financial Optimization',
      summary: isVi
        ? 'Xây dựng cấu trúc vốn phù hợp và tối ưu dòng tiền cho doanh nghiệp.'
        : 'Build the right capital structure and optimize cash flow for the business.',
      solutionsLabel: isVi ? 'Các giải pháp' : 'Solutions',
      solutions: isVi
        ? ['Huy động vốn', 'Vay ngân hàng', 'Tái cấu trúc nợ', 'Quản trị dòng tiền']
        : ['Capital raising', 'Bank loans', 'Debt restructuring', 'Cash-flow management'],
      cta: isVi ? 'Khám phá giải pháp' : 'Explore solutions',
      href: '/contact',
      accent: 'navy',
      icon: <Landmark size={28} />,
    },
    {
      id: 'business-strategy',
      eyebrow: 'BUSINESS STRATEGY',
      title: isVi ? 'Chiến lược tăng trưởng' : 'Growth Strategy',
      summary: isVi
        ? 'Biến dữ liệu thị trường và năng lực nội tại thành chiến lược tăng trưởng rõ ràng.'
        : 'Turn market data and internal capabilities into a clear growth strategy.',
      solutionsLabel: isVi ? 'Các giải pháp' : 'Solutions',
      solutions: ['Business Strategy', 'Market Analysis', 'Business Plan', 'Growth Strategy'],
      cta: isVi ? 'Khám phá giải pháp' : 'Explore solutions',
      href: '/contact',
      accent: 'yellow',
      icon: <LineChart size={28} />,
    },
    {
      id: 'business-performance',
      eyebrow: 'BUSINESS PERFORMANCE',
      title: isVi ? 'Tối ưu quy trình vận hành' : 'Operating Performance',
      summary: isVi
        ? 'Giúp doanh nghiệp kiểm soát hiệu quả hoạt động bằng dữ liệu và hệ thống quản trị.'
        : 'Help enterprises control operating effectiveness with data and management systems.',
      solutionsLabel: isVi ? 'Các giải pháp' : 'Solutions',
      solutions: ['KPI', 'BI Dashboard', 'Cost Optimization', 'Process Optimization'],
      cta: isVi ? 'Khám phá giải pháp' : 'Explore solutions',
      href: '/contact',
      accent: 'blue',
      icon: <Settings2 size={28} />,
    },
  ];

  const accentStyles = {
    navy: {
      border:
        'border-2 border-[#12243f] hover:border-[#1a315a] shadow-[0_8px_30px_rgba(18,36,63,0.08)] hover:shadow-[0_20px_40px_rgba(18,36,63,0.18)]',
      topBar: 'bg-[#12243f]',
      iconWrap:
        'bg-[#12243f] text-white shadow-md group-hover:scale-110 transition-transform duration-300',
      eyebrow: 'text-[#12243f]',
      cta: 'text-[#12243f] hover:text-[#243f6d]',
      chip: 'bg-[#12243f]/10 text-[#12243f] border border-[#12243f]/25 font-bold',
      dot: 'bg-[#12243f]',
    },
    yellow: {
      border:
        'border-2 border-[#ffcc23] hover:border-amber-400 shadow-[0_8px_30px_rgba(255,204,35,0.12)] hover:shadow-[0_20px_40px_rgba(255,204,35,0.25)]',
      topBar: 'bg-[#ffcc23]',
      iconWrap:
        'bg-[#ffcc23] text-[#12243f] shadow-md group-hover:scale-110 transition-transform duration-300',
      eyebrow: 'text-[#8a6800]',
      cta: 'text-[#8a6800] hover:text-[#5c4600]',
      chip: 'bg-[#ffcc23]/25 text-[#7a5c00] border border-[#ffcc23]/60 font-black',
      dot: 'bg-[#eab308]',
    },
    blue: {
      border:
        'border-2 border-[#243f6d] hover:border-blue-700 shadow-[0_8px_30px_rgba(36,63,109,0.08)] hover:shadow-[0_20px_40px_rgba(36,63,109,0.18)]',
      topBar: 'bg-[#243f6d]',
      iconWrap:
        'bg-[#243f6d] text-white shadow-md group-hover:scale-110 transition-transform duration-300',
      eyebrow: 'text-[#243f6d]',
      cta: 'text-[#243f6d] hover:text-blue-900',
      chip: 'bg-[#243f6d]/10 text-[#243f6d] border border-[#243f6d]/25 font-bold',
      dot: 'bg-[#243f6d]',
    },
  } as const;

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fc] text-left">
      <PageHeader title={t('pageTitle')} />

      <section className="relative grow py-12 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          {/* Header Section according to requested presentation order */}
          <div className="mb-12 max-w-4xl border-b border-slate-200 pb-8 md:mb-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-navy)]">
              {t('heroEyebrow')}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {t('heroTitle')}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              {t('heroDescription')}
            </p>
          </div>

          {/* 3 cards placed in 1 horizontal row on desktop (lg:grid-cols-3) */}
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 items-stretch">
            {services.map((svc) => {
              const style = accentStyles[svc.accent];
              return (
                <article
                  key={svc.id}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 md:p-8 ${style.border}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-2 ${style.topBar}`} />

                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className={`rounded-xl p-3 ${style.iconWrap}`}>{svc.icon}</div>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${style.chip}`}
                    >
                      {svc.eyebrow}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {svc.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{svc.summary}</p>

                  <div className="mt-7 pt-6 border-t border-slate-100">
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.16em] mb-3.5 ${style.eyebrow}`}
                    >
                      {svc.solutionsLabel}
                    </p>
                    <ul className="space-y-2.5">
                      {svc.solutions.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm font-medium text-slate-700"
                        >
                          <span className={`h-2 w-2 rounded-full shrink-0 ${style.dot}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={svc.href}
                    className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold tracking-wide transition-all group-hover:translate-x-1 ${style.cta}`}
                  >
                    <span className="text-base leading-none">→</span>
                    <span>{svc.cta}</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
