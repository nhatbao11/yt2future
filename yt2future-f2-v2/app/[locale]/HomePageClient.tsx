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
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#020817] -mt-20 md:-mt-24">
          {/* Dynamic Background with Glowing Orbs */}
          <div className="absolute inset-0 z-0">
            {/* Deep gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#12243f]/70 via-[#020817] to-[#020817]" />

            {/* Animated glowing orbs */}
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[var(--brand-navy)]/35 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-[var(--brand-yellow)]/15 rounded-full blur-[150px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-16 md:mt-0">
            {/* LEFT COLUMN: Text Content */}
            <div className="lg:col-span-6 flex flex-col pt-10 md:pt-0">
              <ScrollReveal direction="up" distance={40}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-[var(--brand-yellow)]"></div>
                  <span className="text-[var(--brand-yellow)] text-xs md:text-sm font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(255,204,35,0.4)]">
                    {t('hero.tagline')}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
                  {t('hero.title')}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-yellow)] via-[#ffd24d] to-amber-100 animate-gradient-x">
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
                <p className="text-base md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed mb-10 border-l-2 border-[var(--brand-yellow)]/70 pl-5">
                  {t('hero.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link
                    href="/services"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--brand-yellow)] text-[#12243f] font-extrabold text-sm tracking-widest uppercase rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(255,204,35,0.35)] transition-all hover:bg-amber-300 hover:scale-105"
                  >
                    <span className="relative z-10">{t('hero.cta1')}</span>
                    <ArrowRight
                      size={18}
                      className="relative z-10 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    {t('hero.cta2')}
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT COLUMN: Visual Composition (Corporate Consulting Collage) */}
            <div className="lg:col-span-6 hidden lg:flex relative h-[600px] w-full items-center justify-center">
              <ScrollReveal
                direction="left"
                distance={60}
                delay={0.2}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Decorative glowing rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 shadow-[0_0_80px_rgba(255,204,35,0.1)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />

                {/* Main Image: Arch Shape */}
                <div className="relative w-80 h-[480px] rounded-t-full rounded-b-3xl overflow-hidden border border-white/10 shadow-2xl z-10 animate-[float_8s_ease-in-out_infinite] bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt="Strategic Consulting"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-80" />
                </div>

                {/* Secondary Image: Circle Shape (Floating Right) */}
                <div className="absolute right-4 top-[15%] w-56 h-56 rounded-full overflow-hidden border border-white/10 shadow-2xl z-20 animate-[float_6s_ease-in-out_infinite_reverse] bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                    alt="Data Analytics"
                    fill
                    className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[var(--brand-yellow)]/10 mix-blend-overlay" />
                </div>

                {/* Glass Badge 1: Innovation */}
                <div className="absolute bottom-[20%] -left-4 z-30 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--brand-yellow)] to-amber-500 rounded-xl flex items-center justify-center text-[#12243f] shadow-lg shadow-[var(--brand-yellow)]/30">
                    <Lightbulb size={28} />
                  </div>
                  <div>
                    <div className="text-white font-black text-xl leading-tight">Agile</div>
                    <div className="text-[var(--brand-yellow)] text-xs font-bold uppercase tracking-widest">
                      {t('hero.dashboard.growthStrategy')}
                    </div>
                  </div>
                </div>

                {/* Glass Badge 2: Global Impact */}
                <div className="absolute bottom-[10%] right-8 z-30 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3">
                  <Globe size={20} className="text-[var(--brand-yellow)]" />
                  <span className="text-white text-sm font-bold tracking-widest uppercase">
                    {t('hero.dashboard.globalImpact')}
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 2. IMPACT METRICS BAR */}
        <section className="bg-[var(--brand-navy-deep)] border-y border-[var(--brand-yellow)]/30 relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/15">
              <ScrollReveal delay={0.1} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-[var(--brand-yellow)] mb-2 tracking-tight">
                  {t('metrics.capital')}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
                  {t('metrics.capitalLabel')}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-[var(--brand-yellow)] mb-2 tracking-tight">
                  {t('metrics.clients')}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
                  {t('metrics.clientsLabel')}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-[var(--brand-yellow)] mb-2 tracking-tight">
                  {t('metrics.growth')}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
                  {t('metrics.growthLabel')}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-[var(--brand-yellow)] mb-2 tracking-tight">
                  {t('metrics.countries')}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest">
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
                <div className="relative h-[500px] xl:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt="Team Strategy"
                    fill
                    className="object-cover"
                  />
                  {/* Accent box */}
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[var(--brand-yellow)] rounded-2xl -z-10 hidden md:block opacity-90 shadow-lg" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="flex flex-col justify-center">
                  <h2 className="text-sm font-bold tracking-[0.2em] text-[var(--brand-navy)] uppercase mb-4">
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
                        <div className="w-14 h-14 rounded-xl bg-[var(--brand-navy-deep)]/10 flex items-center justify-center text-[var(--brand-navy)] shadow-sm">
                          <BarChart size={26} />
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
                        <div className="w-14 h-14 rounded-xl bg-[var(--brand-navy-deep)]/10 flex items-center justify-center text-[var(--brand-navy)] shadow-sm">
                          <Target size={26} />
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
                        <div className="w-14 h-14 rounded-xl bg-[var(--brand-navy-deep)]/10 flex items-center justify-center text-[var(--brand-navy)] shadow-sm">
                          <Lightbulb size={26} />
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
                  <h2 className="text-sm font-bold tracking-[0.2em] text-[var(--brand-navy)] uppercase mb-4">
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
                  className="group inline-flex items-center gap-3 text-sm font-bold text-[#0a192f] uppercase tracking-widest hover:text-[var(--brand-navy)] transition-all bg-white px-6 py-4 rounded-xl border border-slate-200 hover:border-[var(--brand-navy)] shadow-sm hover:shadow-md"
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
                    className="group flex flex-col bg-white p-8 md:p-10 h-full rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[var(--brand-navy)] transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="mb-8 text-[#0a192f] group-hover:text-[var(--brand-navy)] transition-colors">
                      {service.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-[#0a192f] mb-4 group-hover:text-[var(--brand-navy)] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm grow mb-8">
                      {service.desc}
                    </p>
                    {/* Animated Line */}
                    <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-[var(--brand-navy)] transition-colors">
                      Explore{' '}
                      <ArrowRight
                        size={16}
                        className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-navy)] to-[var(--brand-yellow)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <div className="relative h-[400px] lg:h-auto w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
                    alt="Case Study Spotlight"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="bg-[#112240] p-12 md:p-16 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-yellow)]/15 rounded-bl-full" />
                  <h2 className="text-sm font-bold tracking-[0.2em] text-[var(--brand-yellow)] uppercase mb-6">
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
                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-[var(--brand-yellow)] transition-colors group w-fit"
                  >
                    {t('spotlight.cta')}
                    <div className="w-12 h-[2px] bg-white group-hover:bg-[var(--brand-yellow)] group-hover:w-16 transition-all duration-300" />
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
                  <h2 className="text-sm font-bold tracking-[0.2em] text-[var(--brand-navy)] uppercase mb-4">
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
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#0a192f] uppercase tracking-widest hover:text-[var(--brand-navy)] transition-all bg-white px-6 py-3.5 rounded-xl border border-slate-200 hover:border-[var(--brand-navy)] shadow-sm hover:shadow-md"
                >
                  {t('insights.explore')}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockInsights.map((insight, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.15}>
                  <Link
                    href={`/sector/${insight.id}`}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[var(--brand-navy)] transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-60 mb-6 overflow-hidden bg-slate-100 rounded-xl">
                      <Image
                        src={insight.image}
                        alt="Insight Cover"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#0a192f] border border-[var(--brand-navy)]/15 rounded-full shadow-sm">
                        {insight.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {insight.date}
                      </span>
                    </div>
                    {/* Placeholder titles for insights to show design intent */}
                    <h4 className="text-xl font-bold text-[#0a192f] group-hover:text-[var(--brand-navy)] transition-colors leading-snug">
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
              <Users size={48} className="text-[var(--brand-yellow)] mb-8 mx-auto" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
                {t('career.title')}
              </h2>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                {t('career.desc')}
              </p>
              <Link
                href="/career"
                className="inline-flex items-center justify-center gap-4 px-12 py-5 rounded-xl bg-[var(--brand-yellow)] text-[#12243f] font-extrabold text-sm tracking-widest uppercase hover:bg-amber-300 transition-all duration-300 shadow-2xl shadow-[var(--brand-yellow)]/25 hover:scale-105"
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
