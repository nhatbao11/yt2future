'use client';
import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations, useLocale } from 'next-intl';
import { Briefcase, Globe, TrendingUp, ArrowRight, MapPin, Clock } from 'lucide-react';
import Link from '@/components/common/Link';

export default function CareerPageClient() {
  const t = useTranslations('career_page');
  const locale = useLocale();
  const isVi = locale === 'vi';

  const values = [
    {
      title: t('value_1_title'),
      desc: t('value_1_desc'),
      icon: <TrendingUp size={32} className="text-[var(--brand-yellow)]" />,
    },
    {
      title: t('value_2_title'),
      desc: t('value_2_desc'),
      icon: <Globe size={32} className="text-[var(--brand-yellow)]" />,
    },
    {
      title: t('value_3_title'),
      desc: t('value_3_desc'),
      icon: <Briefcase size={32} className="text-[var(--brand-yellow)]" />,
    },
  ];

  const openRoles = [
    {
      title: isVi ? 'Chuyên gia Tư vấn Chiến lược Cao cấp' : 'Senior Strategy Consultant',
      department: isVi ? 'Tư vấn' : 'Consulting',
      location: isVi ? 'TP. Hồ Chí Minh' : 'Ho Chi Minh City',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      slug: 'senior-strategy-consultant',
    },
    {
      title: isVi ? 'Chuyên viên Phân tích Tài chính' : 'Financial Analyst',
      department: isVi ? 'Tài chính' : 'Finance',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      slug: 'financial-analyst',
    },
    {
      title: isVi ? 'Chuyên viên Phân tích Nghiệp vụ' : 'Business Analyst',
      department: isVi ? 'Tư vấn' : 'Consulting',
      location: isVi ? 'Từ xa' : 'Remote',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      slug: 'business-analyst',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title={t('title')} />

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-[#0a192f] text-white py-20 md:py-28 overflow-hidden border-b border-[#1a365d]">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-1 bg-[var(--brand-yellow)]"></div>
                <span className="text-[var(--brand-yellow)] text-xs font-bold tracking-[0.25em] uppercase">
                  {t('hero_tagline')}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.18] mb-6">
                <span className="block">{t('hero_title_line1')}</span>
                <span className="block text-[var(--brand-yellow)]">{t('hero_title_line2')}</span>
              </h1>
              <div className="mb-6 p-4 rounded-xl bg-white/5 border-l-4 border-[var(--brand-yellow)] backdrop-blur-sm">
                <p className="text-base md:text-lg italic font-semibold text-slate-100 leading-snug">
                  “{t('hero_quote')}”
                </p>
              </div>
              <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                {t('hero_subtitle')}
              </p>
            </div>

            {/* Career Hero Image */}
            <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl border border-white/20 shadow-2xl group">
              <Image
                src="/career_hero.jpg"
                alt={isVi ? 'Đội ngũ YT Insights' : 'YT Insights Team'}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a192f]/85 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {isVi
                    ? 'Môi trường chuyên nghiệp & Bứt phá'
                    : 'Professional & Empowering Environment'}
                </span>
                <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)] animate-ping" />
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES SECTION */}
        <section className="py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#0a192f] uppercase mb-4">
                {t('values_subtitle')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t('values_title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-7 md:p-8 hover:border-[var(--brand-navy)] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 bg-[var(--brand-navy-deep)] text-[var(--brand-yellow)] flex items-center justify-center mb-6 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                      {val.icon}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-[var(--brand-navy)] transition-colors mb-3">
                      {val.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-[#0a192f] uppercase mb-4">
                  {t('open_roles_subtitle')}
                </h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {t('open_roles_title')}
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {openRoles.length > 0 ? (
                openRoles.map((role, idx) => (
                  <Link
                    href={`/career/${role.slug}`}
                    key={idx}
                    className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[var(--brand-navy)] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                        {role.department}
                      </span>
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[var(--brand-navy)] transition-colors">
                        {role.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 md:w-1/3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#0a192f]" />
                        <span className="font-medium">{role.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#0a192f]" />
                        <span className="font-medium">{role.type}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-end">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0a192f] group-hover:text-[var(--brand-navy)] transition-colors">
                        {t('apply_now')}{' '}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
                  <p className="text-slate-500 font-medium">{t('no_openings')}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
