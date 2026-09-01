'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';
import MemberCard from '@/components/partials/MemberCard';
import Image from 'next/image';
import { BookOpen, Users, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

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
      icon: <BookOpen className="text-[#0a192f]" size={28} />,
      title: t('values.knowledge.title'),
      desc: t('values.knowledge.desc'),
    },
    {
      icon: <Lightbulb className="text-[#0a192f]" size={28} />,
      title: t('values.thinking.title'),
      desc: t('values.thinking.desc'),
    },
    {
      icon: <Users className="text-[#0a192f]" size={28} />,
      title: t('values.community.title'),
      desc: t('values.community.desc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title={t('pageTitle')} />

      <main className="grow">
        {/* SECTION 1: GIỚI THIỆU */}
        <section className="py-20 md:py-32">
          <ScrollReveal className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <article className="space-y-10 order-1 lg:order-1">
                <div className="space-y-4">
                  <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                    {t('tagline')}
                  </p>
                  <div className="text-3xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tight leading-snug">
                    <h1>"{t('headline')}"</h1>
                  </div>
                </div>

                <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed border-l border-slate-200 pl-8">
                  <p>{t('description')}</p>
                </div>

                <div className="pt-6">
                  <blockquote className="text-[#0a192f] text-xl md:text-2xl font-bold italic border-l-4 border-[#0a192f] pl-8 py-2 leading-relaxed">
                    "{t('quote')}"
                  </blockquote>
                </div>
              </article>

              <div className="relative group overflow-hidden border border-slate-200 shadow-xl order-2 lg:order-2 aspect-video lg:aspect-square bg-slate-100">
                <Image
                  src="/group.png"
                  alt="Tầm nhìn và Sứ mệnh YT2Future"
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover grayscale-[20%] transition-all duration-1000 ease-in-out scale-100 lg:scale-105 lg:group-hover:scale-100"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 2: GIÁ TRỊ CỐT LÕI */}
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="mb-16 max-w-2xl flex items-baseline gap-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a192f] tracking-tight uppercase">
                {t('values.title')} <span className="text-blue-600">{t('values.subtitle')}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningPillars.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 p-10 hover:border-[#0a192f]/30 shadow-sm hover:shadow-lg group transition-all duration-300 cursor-default"
                >
                  <div className="mb-8 p-4 inline-flex bg-slate-50 rounded-xl group-hover:scale-110 transition-transform origin-left">
                    {p.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#0a192f] tracking-tight mb-4 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
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
              className="max-w-[1440px] mx-auto flex overflow-x-auto pb-10 px-6 gap-6 md:grid md:grid-cols-3 md:px-12 md:gap-8 no-scrollbar snap-x snap-mandatory md:snap-none"
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
