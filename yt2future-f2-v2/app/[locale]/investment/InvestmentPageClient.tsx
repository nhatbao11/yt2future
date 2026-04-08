'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import {
  ArrowRight,
  Building2,
  CircleCheck,
  Handshake,
  Landmark,
  Layers3,
  ShieldCheck,
  Timer,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type ServiceItem = {
  id: string;
  badge: string;
  title: string;
  summary: string;
  image: string;
  suitableFor: string[];
  flow: string[];
  outcomes: string[];
};

export default function InvestmentSolutions() {
  const t = useTranslations('investment_page');
  const locale = useLocale();
  const isVi = locale !== 'en';

  const services = useMemo<ServiceItem[]>(
    () =>
      isVi
        ? [
            {
              id: 'po-finance',
              badge: 'Order Financing',
              title: 'Tài trợ đơn hàng (PO Financing)',
              summary:
                'YT2Future làm cầu nối giữa doanh nghiệp và ngân hàng để tài trợ vốn thanh toán đơn hàng trước hạn.',
              image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200',
              suitableFor: [
                'Doanh nghiệp có đơn hàng đã ký nhưng thiếu vốn lưu động ngắn hạn',
                'Nhà phân phối cần thanh toán trước cho nhà cung cấp',
              ],
              flow: [
                'Doanh nghiệp gửi hồ sơ đơn hàng và nhu cầu vốn',
                'YT2Future chuẩn hóa hồ sơ và kết nối ngân hàng phù hợp',
                'Ngân hàng giải ngân thanh toán cho bên bán theo cấu trúc đã duyệt',
                'Đến hạn, bên mua/doanh nghiệp hoàn trả ngân hàng kèm phí tài trợ',
              ],
              outcomes: [
                'Giảm áp lực dòng tiền khi nhận đơn hàng lớn',
                'Tăng khả năng chốt hợp đồng nhờ thanh toán đúng hạn',
                'Minh bạch quy trình và điều kiện tài trợ',
              ],
            },
            {
              id: 'invoice-finance',
              badge: 'Receivable Financing',
              title: 'Tài trợ khoản phải thu (Invoice Financing)',
              summary:
                'Ứng vốn trên các hóa đơn/chứng từ đủ điều kiện, giúp doanh nghiệp quay vòng tiền nhanh hơn.',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200',
              suitableFor: [
                'Doanh nghiệp bán chịu theo hợp đồng B2B',
                'Công ty cần rút ngắn chu kỳ tiền mặt để tái đầu tư',
              ],
              flow: [
                'Doanh nghiệp cung cấp hóa đơn và chứng từ giao hàng',
                'YT2Future sàng lọc và đề xuất ngân hàng/đối tác tài trợ',
                'Ngân hàng ứng trước theo tỷ lệ đã thỏa thuận',
                'Khi người mua thanh toán, khoản ứng được tất toán',
              ],
              outcomes: [
                'Tăng thanh khoản mà không cần mở rộng nợ dài hạn',
                'Chủ động kế hoạch vốn cho vận hành',
                'Giảm đứt gãy dòng tiền theo mùa vụ',
              ],
            },
            {
              id: 'supply-chain',
              badge: 'Supply Chain Finance',
              title: 'Giải pháp tài chính chuỗi cung ứng',
              summary:
                'Thiết kế cấu trúc tài trợ cho cả hệ sinh thái nhà mua - nhà bán - ngân hàng theo từng mô hình giao dịch.',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
              suitableFor: [
                'Doanh nghiệp đầu mối có mạng lưới nhà cung cấp lớn',
                'Chuỗi cần tối ưu hạn mức và điều khoản thanh toán nhiều bên',
              ],
              flow: [
                'Phân tích mô hình giao dịch và vòng quay vốn theo chuỗi',
                'Xây phương án tài trợ đa bên với tiêu chí rủi ro rõ ràng',
                'Triển khai thử nghiệm theo nhóm đối tác ưu tiên',
                'Mở rộng theo dữ liệu hiệu quả và KPI dòng tiền',
              ],
              outcomes: [
                'Cải thiện vòng quay vốn toàn chuỗi',
                'Tối ưu quan hệ nhà cung cấp và năng lực đáp ứng đơn hàng',
                'Chuẩn hóa tiêu chuẩn tài chính vận hành',
              ],
            },
          ]
        : [
            {
              id: 'po-finance',
              badge: 'Order Financing',
              title: 'Purchase Order Financing',
              summary:
                'YT2Future bridges enterprises and banks to fund purchase orders before due payment.',
              image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200',
              suitableFor: [
                'Companies with signed orders but short-term working-capital gaps',
                'Distributors who need to prepay suppliers',
              ],
              flow: [
                'Submit purchase-order documents and funding request',
                'YT2Future standardizes dossiers and matches the right bank',
                'Bank disburses payment to the seller under approved terms',
                'At maturity, buyer/company repays bank plus financing fee',
              ],
              outcomes: [
                'Lower cash pressure for large orders',
                'Higher win rate with on-time supplier payment',
                'Clear and transparent funding process',
              ],
            },
            {
              id: 'invoice-finance',
              badge: 'Receivable Financing',
              title: 'Invoice Financing',
              summary:
                'Advance funding on eligible invoices to accelerate cash conversion and operations.',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200',
              suitableFor: [
                'B2B companies selling on credit terms',
                'Teams aiming to shorten cash-conversion cycles',
              ],
              flow: [
                'Provide invoices and delivery supporting documents',
                'YT2Future pre-screens and proposes financing partners',
                'Bank advances agreed ratio of receivables',
                'Advance is settled when buyer payment is collected',
              ],
              outcomes: [
                'Better liquidity without adding long-term debt',
                'More predictable operating cash planning',
                'Reduced seasonal cash-flow disruptions',
              ],
            },
            {
              id: 'supply-chain',
              badge: 'Supply Chain Finance',
              title: 'Supply Chain Finance Solutions',
              summary:
                'Build funding structures across buyer-seller-bank ecosystems tailored to transaction models.',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
              suitableFor: [
                'Anchor enterprises with large supplier ecosystems',
                'Chains requiring multi-party payment-term optimization',
              ],
              flow: [
                'Assess transaction model and cash-turnover dynamics',
                'Design risk-aligned multi-party financing structure',
                'Pilot with priority counterparties',
                'Scale by cash KPI and performance evidence',
              ],
              outcomes: [
                'Faster chain-wide capital turnover',
                'Stronger supplier resilience and order fulfillment',
                'Standardized financing governance',
              ],
            },
          ],
    [isVi]
  );

  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? '');
  const active = services.find((s) => s.id === activeId) ?? services[0];
  const mobileTabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mobileTabsRef.current;
    if (!container || typeof window === 'undefined' || window.innerWidth >= 1024) return;

    const activeTab = container.querySelector<HTMLButtonElement>(
      `button[data-tab-id="${activeId}"]`
    );
    if (!activeTab) return;

    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <PageHeader title={t('title')} />

      <main className="max-w-360 mx-auto px-4 md:px-10 xl:px-12 py-8 md:py-12 space-y-6 md:space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 xl:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-yellow-600 mb-3">
                {t('layoutTag')}
              </p>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-[#001a41] leading-tight">
                {t('layoutTitle')}
              </h1>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-4xl">
                {t('layoutDescription')}
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-2">
              <MiniMetric icon={<Layers3 size={14} />} label={t('metrics.catalog')} />
              <MiniMetric icon={<ShieldCheck size={14} />} label={t('metrics.details')} />
              <MiniMetric icon={<Timer size={14} />} label={t('metrics.flow')} />
            </div>
          </div>
        </section>

        <section className="lg:hidden">
          <div
            ref={mobileTabsRef}
            className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar"
          >
            {services.map((item) => {
              const activeCard = item.id === active.id;
              return (
                <button
                  key={item.id}
                  data-tab-id={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-current={activeCard ? 'true' : undefined}
                  className={`snap-start min-w-[260px] rounded-xl border p-4 text-left transition-all ${
                    activeCard
                      ? 'bg-[#001a41] text-white border-[#001a41]'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                      activeCard ? 'text-yellow-300' : 'text-yellow-600'
                    }`}
                  >
                    {item.badge}
                  </p>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug">{item.title}</h3>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-3">
              {services.map((item) => {
                const activeCard = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left rounded-xl border p-5 transition-all ${
                      activeCard
                        ? 'bg-[#001a41] text-white border-[#001a41] shadow-lg'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p
                      className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                        activeCard ? 'text-yellow-300' : 'text-yellow-600'
                      }`}
                    >
                      {item.badge}
                    </p>
                    <h3 className="mt-2 font-extrabold text-base leading-snug">{item.title}</h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        activeCard ? 'text-slate-200' : 'text-slate-600'
                      }`}
                    >
                      {item.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="relative h-52 sm:h-64 md:h-72 bg-slate-100">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute left-4 md:left-5 bottom-4 md:bottom-5 right-4 md:right-5 text-white">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-yellow-300">
                    {active.badge}
                  </p>
                  <h2 className="text-xl md:text-2xl font-black leading-tight">{active.title}</h2>
                </div>
              </div>

              <div className="p-5 md:p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Block
                  icon={<Building2 size={16} />}
                  title={t('blocks.bestFor')}
                  items={active.suitableFor}
                />
                <Block
                  icon={<Landmark size={16} />}
                  title={t('blocks.expectedOutcomes')}
                  items={active.outcomes}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-7">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#001a41] mb-4">
                <Handshake size={16} />
                {t('blocks.deliveryFlow')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.flow.map((step, idx) => (
                  <div
                    key={`${active.id}-flow-${idx}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-600 mb-2">
                      {t('flowStep', { index: idx + 1 })}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 md:p-6 flex items-start justify-between gap-4">
              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                {t('scaffoldDescription')}
              </p>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#001a41]">
                {t('scalable')}
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Block({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-bold text-[#001a41] mb-3">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={`${title}-${idx}`} className="flex items-start gap-2 text-sm text-slate-600">
            <CircleCheck size={14} className="text-emerald-600 mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniMetric({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
      {icon}
      <span>{label}</span>
    </div>
  );
}
