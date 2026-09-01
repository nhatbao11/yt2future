'use client';
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { useTranslations, useLocale } from 'next-intl';
import { TrendingUp, ArrowRight, ShieldCheck, Target } from 'lucide-react';
import Link from '@/components/common/Link';

export default function ClientImpactPageClient() {
  const t = useTranslations('client_impact_page');
  const locale = useLocale();
  const isVi = locale === 'vi';

  const metrics = [
    { value: t('metric_1_value'), label: t('metric_1_label') },
    { value: t('metric_2_value'), label: t('metric_2_label') },
    { value: t('metric_3_value'), label: t('metric_3_label') },
  ];

  const caseStudies = [
    {
      industry: isVi ? 'Tài chính - Ngân hàng' : 'Financial Services',
      title: isVi
        ? 'Tái Cấu Trúc Vốn & Mở Rộng Hạn Mức Tín Dụng'
        : 'Capital Restructuring & Credit Expansion',
      challenge: isVi
        ? 'Khách hàng đối mặt với khủng hoảng thanh khoản cục bộ và không thể mở rộng hạn mức vay vốn để tái đầu tư dự án.'
        : 'The client faced localized liquidity crises and was unable to expand credit lines for reinvestment.',
      solution: isVi
        ? 'Xây dựng lại hồ sơ tín dụng, tái cấu trúc tài sản bảo đảm và tư vấn chiến lược tiếp cận nguồn vốn giá rẻ từ ngân hàng quốc tế.'
        : 'Rebuilt credit profiles, restructured collateral, and formulated a strategy to access low-cost capital from international banks.',
      impact: isVi
        ? 'Tăng 200% hạn mức tín dụng không cần tài sản đảm bảo bổ sung, giảm 1.5% chi phí vốn bình quân.'
        : 'Increased unsecured credit limits by 200%, reducing average cost of capital by 1.5%.',
      icon: <ShieldCheck size={28} className="text-[#0a192f]" />,
    },
    {
      industry: isVi ? 'Bất Động Sản' : 'Real Estate',
      title: isVi
        ? 'Chiến Lược Huy Động Vốn Trái Phiếu Doanh Nghiệp'
        : 'Corporate Bond Mobilization Strategy',
      challenge: isVi
        ? 'Dự án trọng điểm bị đình trệ do dòng vốn thắt chặt từ các kênh tín dụng truyền thống.'
        : 'A key project stalled due to tightened capital flows from traditional credit channels.',
      solution: isVi
        ? 'Phát hành thành công gói trái phiếu doanh nghiệp kèm quyền chọn mua, thiết kế cấu trúc tài chính hấp dẫn nhà đầu tư tổ chức.'
        : 'Successfully issued corporate bonds with call options, designing a financial structure attractive to institutional investors.',
      impact: isVi
        ? 'Huy động thành công 500 tỷ VNĐ trong 45 ngày, đảm bảo tiến độ thi công dự án đúng cam kết.'
        : 'Successfully raised 500B VND in 45 days, ensuring the project construction stayed on schedule.',
      icon: <Target size={28} className="text-[#0a192f]" />,
    },
    {
      industry: isVi ? 'Sản Xuất' : 'Manufacturing',
      title: isVi ? 'Tối Ưu Hóa Chuỗi Cung Ứng Qua L/C' : 'Supply Chain Optimization via L/C',
      challenge: isVi
        ? 'Chi phí nhập khẩu linh kiện cao và rủi ro tỷ giá làm giảm biên lợi nhuận của doanh nghiệp sản xuất.'
        : 'High import costs and exchange rate risks squeezed the profit margins of the manufacturer.',
      solution: isVi
        ? 'Sử dụng UPAS L/C kết hợp hợp đồng kỳ hạn tỷ giá, tối ưu dòng tiền thanh toán quốc tế.'
        : 'Utilized UPAS L/C combined with forward exchange contracts to optimize international payment cash flows.',
      impact: isVi
        ? 'Cải thiện biên lợi nhuận ròng 3%, kéo dài thời gian chiếm dụng vốn hợp pháp thêm 180 ngày.'
        : 'Improved net profit margin by 3%, extending legal capital appropriation by 180 days.',
      icon: <TrendingUp size={28} className="text-[#0a192f]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHeader title={t('title')} />

      <main>
        {/* HERO SECTION */}
        <section className="relative bg-[#0a192f] text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-white"></div>
                <span className="text-white text-sm font-bold tracking-[0.2em] uppercase">
                  YT2Future Impact
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                {t('hero_title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                {t('hero_subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center pt-8 md:pt-0 text-center first:pt-0"
                >
                  <h4 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-2 tracking-tighter">
                    {metric.value}
                  </h4>
                  <p className="text-sm md:text-base font-bold text-slate-500 uppercase tracking-widest">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="mb-16">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#0a192f] uppercase mb-4">
                {t('cases_subtitle')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t('cases_title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, idx) => (
                <article
                  key={idx}
                  className="bg-white border border-slate-200 p-8 md:p-10 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 border border-slate-100">
                      {caseStudy.industry}
                    </span>
                    <div className="bg-slate-50 p-3 shrink-0 rounded-sm">{caseStudy.icon}</div>
                  </div>

                  <h4 className="text-2xl font-extrabold text-[#0a192f] mb-8 leading-tight tracking-tight">
                    {caseStudy.title}
                  </h4>

                  <div className="space-y-6 mb-8 flex-grow">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 inline-block">
                        {t('challenge')}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 inline-block">
                        {t('solution')}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{caseStudy.solution}</p>
                    </div>
                    <div className="bg-slate-50 p-4 border-l-4 border-blue-600 mt-4">
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
                        {t('impact')}
                      </p>
                      <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                        {caseStudy.impact}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-auto">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#0a192f] group-hover:text-blue-600 transition-colors cursor-pointer">
                      {t('read_more')}{' '}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>

                  {/* Top decorative bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
