'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';
import MemberCard from '@/components/partials/MemberCard';
import Image from 'next/image';
import { Lightbulb, Target, Handshake, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('about');
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const center = slider.scrollLeft + slider.clientWidth / 2;
      let currentIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < slider.children.length; i++) {
        const child = slider.children[i] as HTMLElement;
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < minDistance) {
          minDistance = dist;
          currentIndex = i;
        }
      }

      const nextIndex = (currentIndex + 1) % slider.children.length;
      const nextCard = slider.children[nextIndex] as HTMLElement;

      if (nextCard) {
        const scrollTarget = nextCard.offsetLeft - (slider.clientWidth - nextCard.offsetWidth) / 2;
        slider.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const learningPillars = [
    {
      step: '01',
      icon: <Lightbulb className="text-[var(--brand-yellow)]" size={26} />,
      title: t('values.agile.title'),
      desc: t('values.agile.desc'),
    },
    {
      step: '02',
      icon: <Target className="text-[var(--brand-yellow)]" size={26} />,
      title: t('values.practical.title'),
      desc: t('values.practical.desc'),
    },
    {
      step: '03',
      icon: <Handshake className="text-[var(--brand-yellow)]" size={26} />,
      title: t('values.longTerm.title'),
      desc: t('values.longTerm.desc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title={t('pageTitle')} />

      <main className="grow">
        {/* SECTION 1: GIỚI THIỆU */}
        <section className="py-16 md:py-28">
          <ScrollReveal className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <article className="space-y-8 order-1 lg:order-1">
                <div className="space-y-4">
                  <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px]">
                    {t('tagline')}
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold text-[#12243f] uppercase tracking-tight leading-[1.25] select-none">
                    <span className="block">&ldquo;{t('headline_line1')}</span>
                    <span className="block">{t('headline_line2')}</span>
                    <span className="block">{t('headline_line3')}&rdquo;</span>
                  </h1>
                </div>

                <div className="space-y-5 text-slate-600 font-normal text-base md:text-lg leading-relaxed border-l-2 border-[var(--brand-yellow)] pl-6">
                  <p>{t('desc_p1')}</p>
                  <p>{t('desc_p2')}</p>
                </div>
              </article>

              <div className="relative order-2 lg:order-2 flex justify-center items-center">
                {/* Ambient glowing aura behind the image - pulsing with brand yellow and navy */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.25, 0.5, 0.25],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -inset-4 bg-gradient-to-tr from-[var(--brand-navy)]/20 via-[var(--brand-yellow)]/30 to-amber-200/20 rounded-3xl blur-2xl -z-10"
                />

                {/* Main floating image card */}
                <motion.div
                  animate={{
                    y: [-7, 7, -7],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full max-w-[560px] aspect-4/3 lg:aspect-square overflow-hidden rounded-2xl border border-slate-200/90 shadow-2xl bg-white p-2.5 group cursor-pointer transition-shadow hover:shadow-[0_20px_50px_rgba(26,49,90,0.15)]"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl bg-slate-50">
                    <Image
                      src="/group.png"
                      alt="Tầm nhìn và Sứ mệnh YT Insights"
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12243f]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Floating interactive badge */}
                  <motion.div
                    animate={{
                      y: [3, -3, 3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.3,
                    }}
                    className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2.5 z-10"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-yellow)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--brand-yellow)]"></span>
                    </span>
                    <span className="text-[11px] font-extrabold text-[var(--brand-navy-deep)] uppercase tracking-wider">
                      Đổi mới &amp; Linh hoạt
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 2: GIÁ TRỊ CHÚNG TÔI MANG LẠI */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border-y border-slate-200/80">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            {/* Header with decorative line & accent indicator */}
            <div className="mb-14 pb-4 border-b border-slate-200 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--brand-navy-soft)] mb-2">
                    {t('values.tagline')}
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--brand-navy-deep)] tracking-tight uppercase">
                    {t('values.title')}{' '}
                    <span className="text-[var(--brand-navy)]">{t('values.subtitle')}</span>
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[var(--brand-navy)]/50 font-mono text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                  <span>YT INSIGHTS VALUES</span>
                </div>
              </div>
              <div className="absolute -bottom-[2px] left-0 w-28 h-[3px] bg-gradient-to-r from-[var(--brand-navy)] to-[var(--brand-yellow)] rounded-full" />
            </div>

            {/* 3 Value Cards with Signature Logo Colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningPillars.map((p, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-2xl p-8 md:p-10 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[var(--brand-navy)] transition-all duration-300 group flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 cursor-default"
                >
                  {/* Top highlight gradient border using logo signature colors */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy-soft)] to-[var(--brand-yellow)]" />

                  <div>
                    {/* Top Row: Icon + Step Badge */}
                    <div className="mb-8 flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-[var(--brand-navy-deep)] text-[var(--brand-yellow)] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-[var(--brand-navy)] group-hover:shadow-lg group-hover:shadow-[var(--brand-navy)]/25 transition-all duration-300">
                        {p.icon}
                      </div>
                      <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-[var(--brand-navy)]/5 text-[var(--brand-navy)] border border-[var(--brand-navy)]/10 group-hover:bg-[var(--brand-yellow)]/20 group-hover:text-[var(--brand-navy-deep)] group-hover:border-[var(--brand-yellow)]/40 transition-colors">
                        {p.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[var(--brand-navy-deep)] group-hover:text-[var(--brand-navy)] tracking-tight uppercase mb-3.5 transition-colors">
                      {p.title}
                    </h3>

                    <p className="text-slate-600 font-normal text-sm md:text-base leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-[var(--brand-navy)] transition-colors">
                      YT Insights Core Value
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-300 group-hover:text-[var(--brand-yellow)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ĐỘI NGŨ FOUNDERS */}
        <section className="py-24 bg-white">
          <ScrollReveal>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="mb-16 text-center max-w-2xl mx-auto">
                <h2 className="text-sm font-bold tracking-[0.2em] text-[#0a192f] uppercase mb-4">
                  {t('founders.tagline')}
                </h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {t('founders.title')}
                </h3>
              </div>
            </div>

            <div
              ref={sliderRef}
              className="max-w-[1440px] mx-auto flex overflow-x-auto md:overflow-visible pt-4 pb-10 px-6 gap-6 md:grid md:grid-cols-3 md:px-12 md:gap-8 no-scrollbar snap-x snap-mandatory md:snap-none"
            >
              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name={t('founders.nhat.name')}
                  role={t('founders.nhat.role')}
                  image="/Nhat.jpg"
                  field={t('founders.nhat.field')}
                />
              </div>

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name={t('founders.nga.name')}
                  role={t('founders.nga.role')}
                  image="/Nga.jpg"
                  field={t('founders.nga.field')}
                />
              </div>

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name={t('founders.bao.name')}
                  role={t('founders.bao.role')}
                  image="/Bao.jpg"
                  field={t('founders.bao.field')}
                />
              </div>
            </div>

            <div className="md:hidden text-center mt-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest italic animate-pulse">
                {t('founders.swipeHint')}
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
