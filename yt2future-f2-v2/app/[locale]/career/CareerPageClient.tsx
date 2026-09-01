'use client';
import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations, useLocale } from 'next-intl';
import {
  Briefcase,
  Globe,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';
import Link from '@/components/common/Link';

export default function CareerPageClient() {
  const t = useTranslations('career_page');
  const locale = useLocale();
  const isVi = locale === 'vi';

  const values = [
    {
      title: t('value_1_title'),
      desc: t('value_1_desc'),
      icon: <TrendingUp size={32} className="text-[#0a192f]" />,
    },
    {
      title: t('value_2_title'),
      desc: t('value_2_desc'),
      icon: <Globe size={32} className="text-[#0a192f]" />,
    },
    {
      title: t('value_3_title'),
      desc: t('value_3_desc'),
      icon: <Briefcase size={32} className="text-[#0a192f]" />,
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
        <section className="relative bg-[#0a192f] text-white py-24 md:py-32 overflow-hidden border-b border-[#1a365d]">
          {/* Subtle background pattern/image can go here */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-white"></div>
                <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">
                  {isVi ? 'Tuyển dụng YT2Future' : 'YT2Future Careers'}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                {t('hero_title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-xl">
                {t('hero_subtitle')}
              </p>
            </div>

            {/* Optional decorative element on the right */}
            <div className="hidden lg:block relative w-[500px] h-[300px]">
              <div className="absolute inset-0 border-2 border-white/20 -translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/30 flex flex-col justify-center p-10">
                <h3 className="text-2xl font-bold mb-4">
                  {isVi ? '"Linh hoạt trong từng bước tiến."' : '"Agility in every step."'}
                </h3>
                <p className="text-slate-300 italic">
                  {isVi
                    ? 'Gia nhập hãng tư vấn chiến lược phát triển nhanh nhất khu vực.'
                    : 'Join the fastest growing strategy firm in the region.'}
                </p>
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
                  className="bg-white border border-slate-200 p-10 hover:border-[#0a192f]/30 transition-colors shadow-sm hover:shadow-lg group"
                >
                  <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mb-8 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {val.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{val.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{val.desc}</p>
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

            <div className="flex flex-col gap-4">
              {openRoles.length > 0 ? (
                openRoles.map((role, idx) => (
                  <Link
                    href={`/career/${role.slug}`}
                    key={idx}
                    className="group bg-white border border-slate-200 hover:border-[#0a192f] transition-colors p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                        {role.department}
                      </span>
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
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
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0a192f] group-hover:text-blue-600 transition-colors">
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
                <div className="text-center py-20 bg-slate-50 border border-slate-200 border-dashed">
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
