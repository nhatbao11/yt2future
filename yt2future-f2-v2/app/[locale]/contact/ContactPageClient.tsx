'use client';
import { useTranslations } from 'next-intl';
import PageHeader from '@/components/layout/PageHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  const contactInfo = [
    {
      icon: <MapPin className="text-[#0a192f]" size={24} />,
      title: t('info.address'),
      content: t('values.address'),
    },
    {
      icon: <Mail className="text-[#0a192f]" size={24} />,
      title: t('info.email'),
      content: t('values.email'),
    },
    {
      icon: <Phone className="text-[#0a192f]" size={24} />,
      title: t('info.hotline'),
      content: t('values.hotline'),
    },
    {
      icon: <Clock className="text-[#0a192f]" size={24} />,
      title: t('info.hours'),
      content: t('values.hours'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title={t('pageTitle')} />

      <main className="grow py-12 md:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Grid chính: Info & Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* TRÁI: THÔNG TIN LIÊN HỆ */}
            <div className="space-y-12 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a192f] uppercase tracking-tight mb-6">
                  {t('getInTouch')}{' '}
                  <span className="text-blue-600">{t('getInTouchHighlight')}</span>
                </h2>
                <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-md border-l border-slate-200 pl-6">
                  {t('desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div className="shrink-0 w-14 h-14 bg-slate-50 flex items-center justify-center rounded-sm border border-slate-100 group-hover:border-[#0a192f]/20 transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <div className="transition-transform group-hover:scale-110 duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-900 font-bold text-base md:text-lg leading-tight">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHẢI: BẢN ĐỒ - THAY THẾ CHO FORM */}
            <div className="w-full h-full min-h-[400px] bg-slate-100 rounded-sm overflow-hidden border border-slate-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8665792770263!2d106.60155617570258!3d10.744766859775364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dd6c8d7655d%3A0x677b10f845a76903!2zOTIgMTlFLCBBbiBM4bqhYywgQsOsbmggVMOibiwgSOG7kyBDaMOIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('mapTitle')}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
