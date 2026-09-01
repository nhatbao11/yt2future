'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/common/Link';
import ScrollReveal from '@/components/common/ScrollReveal';
import {
  ArrowRight,
  Globe,
  PieChart,
  Users,
  TrendingUp,
  BarChart,
  Lightbulb,
  Target,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// Mock data for Insights
const mockInsights = [
  {
    id: 'insight-1',
    category: 'Strategy',
    date: 'June 12, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
  },
  {
    id: 'insight-2',
    category: 'Technology',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
  },
  {
    id: 'insight-3',
    category: 'Operations',
    date: 'May 15, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  },
];

export default function HomePage() {
  const t = useTranslations('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 scroll-smooth">
      <main className="grow">
        {/* 1. HERO SECTION */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a192f]">
          {/* Hero Background Image with Parallax effect */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="Corporate Office"
              fill
              className="object-cover opacity-20 scale-105"
              priority
            />
            {/* Deep blue gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0a192f]/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col -mt-12 md:-mt-24">
            <ScrollReveal direction="up" distance={40}>
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-[2px] bg-blue-500"></div>
                  <span className="text-blue-400 text-sm md:text-base font-bold tracking-[0.3em] uppercase">
                    {t('hero.tagline')}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-8">
                  {t('hero.title')}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-3xl leading-relaxed mb-12 border-l-2 border-blue-500/30 pl-6">
                  {t('hero.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link
                    href="/services"
                    className="group inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-[#0a192f] font-bold text-sm tracking-widest uppercase hover:bg-blue-50 transition-all duration-300 shadow-xl shadow-black/20"
                  >
                    {t('hero.cta1')}
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    {t('hero.cta2')}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 2. IMPACT METRICS BAR */}
        <section className="bg-blue-600 relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/20">
              <ScrollReveal delay={0.1} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {t('metrics.capital')}
                </div>
                <div className="text-xs md:text-sm font-bold text-blue-100 uppercase tracking-widest">
                  {t('metrics.capitalLabel')}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {t('metrics.clients')}
                </div>
                <div className="text-xs md:text-sm font-bold text-blue-100 uppercase tracking-widest">
                  {t('metrics.clientsLabel')}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {t('metrics.growth')}
                </div>
                <div className="text-xs md:text-sm font-bold text-blue-100 uppercase tracking-widest">
                  {t('metrics.growthLabel')}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {t('metrics.countries')}
                </div>
                <div className="text-xs md:text-sm font-bold text-blue-100 uppercase tracking-widest">
                  {t('metrics.countriesLabel')}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. OUR PHILOSOPHY / APPROACH */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
              <ScrollReveal direction="left">
                <div className="relative h-[500px] xl:h-[700px] rounded-sm overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt="Team Strategy"
                    fill
                    className="object-cover"
                  />
                  {/* Accent box */}
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-600 rounded-sm -z-10 hidden md:block" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="flex flex-col justify-center">
                  <h2 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">
                    {t('philosophy.tagline')}
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-[#0a192f] tracking-tight leading-tight mb-8">
                    {t('philosophy.title')}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-12">
                    {t('philosophy.desc')}
                  </p>

                  <div className="space-y-10">
                    <div className="flex gap-6">
                      <div className="mt-1 shrink-0">
                        <div className="w-12 h-12 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                          <BarChart size={24} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#0a192f] mb-2">
                          {t('philosophy.p1Title')}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{t('philosophy.p1Desc')}</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="mt-1 shrink-0">
                        <div className="w-12 h-12 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                          <Target size={24} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#0a192f] mb-2">
                          {t('philosophy.p2Title')}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{t('philosophy.p2Desc')}</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="mt-1 shrink-0">
                        <div className="w-12 h-12 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                          <Lightbulb size={24} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#0a192f] mb-2">
                          {t('philosophy.p3Title')}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">{t('philosophy.p3Desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 4. OUR SERVICES SECTION */}
        <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-200 relative">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 xl:mb-20">
              <ScrollReveal>
                <div className="max-w-2xl">
                  <h2 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">
                    {t('expertise.tagline')}
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-[#0a192f] tracking-tight leading-[1.1]">
                    {t('expertise.title')}
                  </h3>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-3 text-sm font-bold text-[#0a192f] uppercase tracking-widest hover:text-blue-600 transition-colors bg-white px-6 py-4 border border-slate-200 hover:border-blue-600 shadow-sm"
                >
                  {t('expertise.viewAll')}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t('expertise.finance'),
                  desc: t('expertise.financeDesc'),
                  icon: <PieChart size={36} />,
                  href: '/services/finance',
                },
                {
                  title: t('expertise.digital'),
                  desc: t('expertise.digitalDesc'),
                  icon: <Globe size={36} />,
                  href: '/services/digital',
                },
                {
                  title: t('expertise.operations'),
                  desc: t('expertise.operationsDesc'),
                  icon: <TrendingUp size={36} />,
                  href: '/services/operations',
                },
                {
                  title: t('expertise.people'),
                  desc: t('expertise.peopleDesc'),
                  icon: <Users size={36} />,
                  href: '/services/organization',
                },
              ].map((service, idx) => (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.1}
                  direction="up"
                  distance={30}
                  className="h-full"
                >
                  <Link
                    href={service.href}
                    className="group flex flex-col bg-white p-10 h-full border border-slate-200 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="mb-8 text-[#0a192f] group-hover:text-blue-600 transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-[#0a192f] mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm grow mb-8">
                      {service.desc}
                    </p>
                    {/* Animated Line */}
                    <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                      Explore{' '}
                      <ArrowRight
                        size={16}
                        className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SPOTLIGHT CASE STUDY */}
        <section className="py-24 md:py-32 bg-[#0a192f] text-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <div className="relative h-[400px] lg:h-auto w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
                    alt="Case Study Spotlight"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="bg-[#112240] p-12 md:p-16 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-full" />
                  <h2 className="text-sm font-bold tracking-[0.2em] text-blue-400 uppercase mb-6">
                    {t('spotlight.tagline')}
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.2] mb-6">
                    {t('spotlight.title')}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-10">
                    {t('spotlight.desc')}
                  </p>
                  <Link
                    href="/client-impact"
                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-blue-400 transition-colors group w-fit"
                  >
                    {t('spotlight.cta')}
                    <div className="w-12 h-[2px] bg-white group-hover:bg-blue-400 group-hover:w-16 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. FEATURED INSIGHTS SECTION */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <ScrollReveal>
                <div>
                  <h2 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">
                    {t('insights.tagline')}
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-[#0a192f] tracking-tight leading-tight">
                    {t('insights.title')}
                  </h3>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link
                  href="/sector"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#0a192f] uppercase tracking-widest hover:text-blue-600 transition-colors"
                >
                  {t('insights.explore')}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mockInsights.map((insight, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.15}>
                  <Link href={`/sector/${insight.id}`} className="group block h-full flex flex-col">
                    <div className="relative h-72 mb-6 overflow-hidden bg-slate-100 rounded-sm">
                      <Image
                        src={insight.image}
                        alt="Insight Cover"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#0a192f]">
                        {insight.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {insight.date}
                      </span>
                    </div>
                    {/* Placeholder titles for insights to show design intent */}
                    <h4 className="text-2xl font-bold text-[#0a192f] group-hover:text-blue-600 transition-colors leading-snug">
                      {idx === 0 && 'The Future of Corporate Strategy in Volatile Markets'}
                      {idx === 1 && 'Accelerating Digital Transformation Across Enterprises'}
                      {idx === 2 && 'Navigating Global Supply Chain Disruptions'}
                    </h4>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CAREERS CTA SECTION */}
        <section className="relative py-32 bg-[#0a192f] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Team Collaboration"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
            <ScrollReveal direction="up" distance={30}>
              <Users size={48} className="text-blue-400 mb-8 mx-auto" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
                {t('career.title')}
              </h2>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                {t('career.desc')}
              </p>
              <Link
                href="/career"
                className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-blue-600 text-white font-bold text-sm tracking-widest uppercase hover:bg-blue-700 transition-colors shadow-2xl shadow-blue-900/50"
              >
                {t('career.cta')}
                <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
