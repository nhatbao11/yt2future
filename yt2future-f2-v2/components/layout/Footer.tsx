'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from '@/components/common/Link';
import InlinePdfViewer from '@/components/common/InlinePdfViewer';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { X, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const POLICY_LINKS = {
    privacy:
      'https://res.cloudinary.com/da0gdcrzn/raw/upload/v1766786574/yt_reports/pdf/uk7xgkdqggyvfrv2exyw',
    terms:
      'https://res.cloudinary.com/da0gdcrzn/raw/upload/v1766786531/yt_reports/pdf/qjq8lts28jm0uqbufmnq',
    cookies: 'https://res.cloudinary.com/your-cloud-name/raw/upload/v1/policies/cookies.pdf',
  };

  const openPdf = (url: string, title: string) => {
    setActivePdf({ url, title });
  };
  const getPdfViewerSrc = (pdfUrl: string) =>
    `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}#view=FitH&zoom=page-fit&navpanes=0`;

  const handleSubscribe = async () => {
    if (!email) {
      toast.error(t('footer.subscribeEmpty'));
      return;
    }

    setIsSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(t('footer.subscribeSuccess'));
        setEmail('');
      } else if (res.status === 409) {
        toast.error(t('footer.subscribeDuplicate'));
      } else {
        toast.error(data.error || t('footer.subscribeError'));
      }
    } catch (error) {
      toast.error(t('footer.subscribeError'));
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-white text-slate-800 pt-16 md:pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          {/* LEFT SIDE: LOGO + LINKS */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-12">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/Logo.jpg"
                  alt="YT2Future Logo"
                  fill
                  sizes="48px"
                  className="object-cover rounded-full border border-gray-200"
                />
              </div>
              <h3 className="text-2xl font-black tracking-tighter uppercase leading-none text-[#001a41]">
                YT2 <span className="text-blue-600">FUTURE</span>
              </h3>
            </div>

            {/* LINKS */}
            <div className="grid grid-cols-2 gap-8 max-w-sm">
              <ul className="space-y-4 text-[13px] font-semibold text-slate-700">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-blue-600 hover:underline transition-all"
                  >
                    {t('nav.services')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sector"
                    className="hover:text-blue-600 hover:underline transition-all"
                  >
                    {t('nav.insights')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="hover:text-blue-600 hover:underline transition-all"
                  >
                    {t('nav.career')}
                  </Link>
                </li>
              </ul>
              <ul className="space-y-4 text-[13px] font-semibold text-slate-700">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 hover:underline transition-all"
                  >
                    {t('nav.aboutYT')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client-impact"
                    className="hover:text-blue-600 hover:underline transition-all"
                  >
                    {t('nav.clientImpact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 hover:underline transition-all"
                  >
                    {t('nav.offices')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: SUBSCRIBE */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-4 pt-12 lg:pt-0">
            <h4 className="text-[15px] font-bold text-slate-900">Subscribe</h4>
            <p className="text-[13px] text-slate-500">
              Select topics and stay current with our latest insights
            </p>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                disabled={isSubscribing}
                className="flex-1 border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
              />
              <button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[100px] disabled:bg-blue-400"
              >
                {isSubscribing ? <Loader2 size={18} className="animate-spin" /> : 'Submit'}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-200 pt-8 mt-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="flex flex-col space-y-8">
            <div className="flex gap-4">
              {[
                {
                  icon: <FaFacebookF size={16} />,
                  href: 'https://www.facebook.com/profile.php?id=61582063661874',
                },
                { icon: <FaInstagram size={16} />, href: 'https://www.instagram.com/yt2future/' },
                { icon: <FaTiktok size={16} />, href: 'https://www.tiktok.com/@yt2future' },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all duration-300"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
            <div className="text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p>YT2Future Insights - Get our latest thinking on your device.</p>
            </div>
          </div>

          <div className="flex flex-col lg:items-end space-y-6 lg:space-y-12 w-full lg:w-auto">
            <div className="flex flex-wrap lg:justify-end gap-4 lg:gap-6 text-[12px] font-bold text-slate-800">
              <button
                onClick={() => openPdf(POLICY_LINKS.privacy, t('footer.privacy'))}
                className="hover:underline hover:text-blue-600"
              >
                {t('footer.privacy')}
              </button>
              <button
                onClick={() => openPdf(POLICY_LINKS.terms, t('footer.terms'))}
                className="hover:underline hover:text-blue-600"
              >
                {t('footer.terms')}
              </button>
              <button
                onClick={() => openPdf(POLICY_LINKS.cookies, t('footer.cookies'))}
                className="hover:underline hover:text-blue-600"
              >
                {t('footer.cookies')}
              </button>
              <Link href="/contact" className="hover:underline hover:text-blue-600">
                Contact us
              </Link>
            </div>

            <p className="text-[11px] text-slate-400">{t('footer.copyright')}</p>
          </div>
        </div>
      </div>

      {/* MODAL XEM PDF */}
      {activePdf && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 sm:flex sm:items-center sm:justify-center sm:p-3 lg:p-4">
          <div className="bg-white w-full h-[100dvh] sm:h-[94dvh] sm:max-w-[96vw] lg:max-w-5xl lg:h-[90vh] flex flex-col shadow-2xl overflow-hidden border-2 border-blue-500 sm:rounded-lg">
            <div className="bg-[#001a41] px-3 py-2.5 md:p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-400" size={20} />
                <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest truncate pr-2">
                  {activePdf.title}
                </span>
              </div>
              <button
                onClick={() => setActivePdf(null)}
                className="bg-blue-500 text-white p-1 hover:rotate-90 transition-all cursor-pointer shrink-0"
              >
                <X size={24} />
              </button>
            </div>
            <div className="bg-gray-100 h-[calc(100dvh-56px)] sm:h-[calc(94dvh-56px)] lg:h-auto lg:flex-1">
              <InlinePdfViewer
                src={getPdfViewerSrc(activePdf.url)}
                className="w-full h-full"
                title={t('footer.policyViewerTitle')}
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
