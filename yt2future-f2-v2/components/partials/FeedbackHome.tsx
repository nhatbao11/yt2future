'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { MessageSquarePlus, Send, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/pagination';

import { useTranslations } from 'next-intl';
import { getApiBaseURL } from '@/services/apiClient';

function FeedbackAuthorAvatar({ url, name }: { url?: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  const src = failed || !url?.trim() ? '/Logo.jpg' : url;
  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes="40px"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function FeedbackHome() {
  const t = useTranslations('feedback');
  const tCommon = useTranslations('common');
  const [feedbacks, setFeedbacks] = useState<
    Array<{
      id: string;
      content: string;
      rating: number;
      user?: { fullName?: string; avatarUrl?: string | null };
    }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const MAX_LENGTH = 250;

  const getLocale = () => {
    if (typeof window === 'undefined') return 'vi';
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    return 'vi';
  };

  const loadFeedbacks = useCallback(async () => {
    try {
      const res = await fetch(`${getApiBaseURL()}/feedback/home`, {
        headers: { 'Accept-Language': getLocale() },
      });
      const data = await res.json();
      if (data.success) setFeedbacks(data.feedbacks || []);
    } catch (err) {
      console.error('Feedback API error:', err);
    }
  }, []);

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${getApiBaseURL()}/feedback/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': getLocale(),
        },
        body: JSON.stringify({ content, rating }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        toast.error(t('loginRequired'), {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
        return;
      }

      if (data.success) {
        toast.success(t('success'));
        setContent('');
        setRating(5);
        setIsModalOpen(false);
      } else {
        toast.error(data.message || t('failure'));
      }
    } catch {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-360 mx-auto px-4 md:px-12">
        {/* TIÊU ĐỀ */}
        <div className="mb-10 md:mb-16 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6 text-left">
          <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
            {t('title')} <span className="text-yellow-500">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
            {t('tagline')}
          </p>
        </div>

        {feedbacks.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-14 [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto"
          >
            {feedbacks.map((fb) => {
              const isExpanded = expandedId === fb.id;
              const needsExpand = fb.content.length > 150;

              return (
                <SwiperSlide key={fb.id} className="h-auto">
                  <div className="flex h-full min-h-[300px] w-full flex-col bg-white p-6 md:min-h-[320px] md:p-8 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Rating Stars */}
                    <div className="shrink-0">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < fb.rating ? '#eab308' : 'none'}
                            className={i < fb.rating ? 'text-yellow-500' : 'text-slate-200'}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Nội dung: khối cố định — ngắn dài vẫn cùng kích thước */}
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div
                        className={`min-h-[6.25rem] max-h-[6.25rem] md:min-h-[7rem] md:max-h-[7rem] rounded-sm ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'}`}
                      >
                        <p
                          className={`text-slate-700 text-sm leading-relaxed ${!isExpanded && needsExpand ? 'line-clamp-4' : ''}`}
                        >
                          &ldquo;{fb.content}&rdquo;
                        </p>
                      </div>

                      <div className="mt-2 min-h-[1.75rem] shrink-0">
                        {needsExpand ? (
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                            className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors inline-flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                {t('showLess')} <ChevronUp size={14} />
                              </>
                            ) : (
                              <>
                                {t('readMore')} <ChevronDown size={14} />
                              </>
                            )}
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {/* Author Info — luôn đáy thẻ */}
                    <div className="mt-auto flex shrink-0 items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="relative w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                        <FeedbackAuthorAvatar
                          url={fb.user?.avatarUrl}
                          name={fb.user?.fullName || t('userFallback')}
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {fb.user?.fullName || t('anonymous')}
                        </h4>
                        <p className="text-xs text-slate-500">{t('role')}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-200 text-sm text-slate-400">
            {tCommon('loading')}
          </div>
        )}

        {/* SEND FEEDBACK BUTTON */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#001a41] text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-yellow-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <MessageSquarePlus size={18} /> {t('send')}
          </button>
        </div>
      </div>

      {/* MODAL - MINIMALIST DESIGN */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t('modalTitle')}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {t('ratingLabel')}
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        size={32}
                        fill={num <= rating ? '#eab308' : 'none'}
                        className={num <= rating ? 'text-yellow-500' : 'text-slate-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t('feedbackLabel')}
                </label>
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={MAX_LENGTH}
                    placeholder={t('placeholder')}
                    className="w-full h-32 p-4 border border-slate-300 text-slate-900 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none leading-relaxed transition-all"
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                    {content.length}/{MAX_LENGTH}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="w-full bg-[#001a41] text-white py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-yellow-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t('submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
