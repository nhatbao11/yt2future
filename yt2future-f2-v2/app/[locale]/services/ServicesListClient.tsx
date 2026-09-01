'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from '@/components/common/Link';
import { useLocale } from 'next-intl';
import { Coins, Shield, FileCheck, Globe, ArrowRight, Check, Laptop, Landmark } from 'lucide-react';

export default function ServicesListClient() {
  const locale = useLocale();

  const isVi = locale === 'vi';

  // Customized high-fidelity details matching the screenshot structure
  const financeServices = [
    {
      title: isVi ? 'Vay vốn doanh nghiệp' : 'Corporate Loans',
      slug: 'vay-von',
      pill: isVi ? 'Lãi suất ưu đãi' : 'Best Rates',
      icon: <Coins size={32} className="text-[#0a192f]" />,
      leftStatLabel: isVi ? 'HẠN MỨC VAY' : 'CREDIT LIMIT',
      leftStatValue: isVi ? 'Đến 100 Tỷ đ' : 'Up to 100B VND',
      rightStatLabel: isVi ? 'LÃI SUẤT CHỈ TỪ' : 'RATES FROM',
      rightStatValue: '5.5% / năm',
      details: [
        {
          label: isVi ? 'Thời hạn vay' : 'Loan Tenure',
          value: isVi ? 'Lên đến 12 tháng' : 'Up to 12 months',
        },
        {
          label: isVi ? 'Hình thức cấp' : 'Loan Type',
          value: isVi ? 'Vay thấu chi / Hạn mức' : 'Overdraft / Credit Line',
        },
        {
          label: isVi ? 'Tài sản bảo đảm' : 'Collateral',
          value: isVi ? 'Linh hoạt / Tín chấp' : 'Flexible / Unsecured',
          highlight: true,
        },
      ],
      bullets: [
        {
          text: isVi
            ? 'Hồ sơ thủ tục tinh gọn, thời gian phê duyệt và giải ngân siêu tốc trong 72h.'
            : 'Streamlined process with fast approval and disbursement within 72 hours.',
        },
        {
          text: isVi
            ? 'Áp dụng cho các doanh nghiệp vừa và nhỏ (SMEs) có doanh thu từ 10 tỷ/năm.'
            : 'Applicable for SMEs with annual revenues starting from 10 billion VND.',
        },
      ],
    },
    {
      title: isVi ? 'Bảo lãnh ngân hàng' : 'Bank Guarantees',
      slug: 'bao-lanh',
      pill: isVi ? 'Ký quỹ cực thấp' : 'Low Margin',
      icon: <Shield size={32} className="text-[#0a192f]" />,
      leftStatLabel: isVi ? 'TỐC ĐỘ PHÁT HÀNH' : 'ISSUANCE SPEED',
      leftStatValue: isVi ? 'Trong 24 Giờ' : 'Within 24 Hours',
      rightStatLabel: isVi ? 'KÝ QUỸ TỐI THIỂU' : 'MIN COLLATERAL',
      rightStatValue: 'Từ 0%',
      details: [
        {
          label: isVi ? 'Nghiệp vụ hỗ trợ' : 'Guarantee Types',
          value: isVi ? 'Dự thầu, Thực hiện HĐ, Tạm ứng' : 'Bid, Performance, Advance',
        },
        {
          label: isVi ? 'Ngân hàng phát hành' : 'Issuing Banks',
          value: isVi ? 'BIDV, VietinBank, MB Bank...' : 'BIDV, VietinBank, MB Bank...',
        },
        {
          label: isVi ? 'Hạn mức bảo lãnh' : 'Total Limit',
          value: isVi ? 'Không giới hạn' : 'Unlimited',
          highlight: true,
        },
      ],
      bullets: [
        {
          text: isVi
            ? 'Giải phóng hoàn toàn dòng tiền ký quỹ thầu để tái đầu tư vào dự án thực tế.'
            : 'Fully unlock bid security margins to reinvest into actual operations.',
        },
        {
          text: isVi
            ? 'Hỗ trợ cấp hạn mức bảo lãnh không cần tài sản bảo đảm cho nhà thầu uy tín.'
            : 'Unsecured guarantee lines available for reputable general contractors.',
        },
      ],
    },
    {
      title: isVi ? 'LC & Thanh toán quốc tế' : 'LC & Trade Payments',
      slug: 'lc-thanh-toan',
      pill: isVi ? 'An toàn tuyệt đối' : 'Secure Trade',
      icon: <FileCheck size={32} className="text-[#0a192f]" />,
      leftStatLabel: isVi ? 'PHÍ PHÁT HÀNH' : 'ISSUANCE FEES',
      leftStatValue: isVi ? 'Từ 0.1%' : 'From 0.1%',
      rightStatLabel: isVi ? 'KÝ QUỸ MỞ L/C' : 'LC MARGIN',
      rightStatValue: isVi ? 'Chỉ từ 0%' : 'From 0%',
      details: [
        { label: isVi ? 'Phương thức áp dụng' : 'LC Methods', value: 'At sight, Usance, UPAS L/C' },
        {
          label: isVi ? 'Đối tác liên kết' : 'Partner Network',
          value: isVi ? 'Hơn 500 ngân hàng đại lý' : 'Over 500 correspondent banks',
        },
        {
          label: isVi ? 'Kiểm soát chứng từ' : 'Audit Check',
          value: isVi ? 'Soát xét lỗi 100% trước phát' : '100% error validation before issue',
          highlight: true,
        },
      ],
      bullets: [
        {
          text: isVi
            ? 'Giảm thiểu rủi ro pháp lý giao thương và bảo vệ dòng vốn nhập khẩu tối đa.'
            : 'Mitigate international trade legal risks and safeguard import capital.',
        },
        {
          text: isVi
            ? 'Phù hợp cho các doanh nghiệp nhập khẩu linh kiện, nguyên vật liệu nước ngoài.'
            : 'Ideal for businesses importing overseas machinery or raw materials.',
        },
      ],
    },
    {
      title: isVi ? 'Bảo hiểm doanh nghiệp' : 'Corporate Insurance',
      slug: 'bao-hiem',
      pill: isVi ? 'Bảo vệ 360°' : '360° Protection',
      icon: <Shield size={32} className="text-[#0a192f]" />,
      leftStatLabel: isVi ? 'PHẠM VI BẢO VỆ' : 'COVERAGE TYPE',
      leftStatValue: isVi ? 'Tài sản & Con người' : 'Asset & Personnel',
      rightStatLabel: isVi ? 'CHI PHÍ ĐƠN' : 'PREMIUM COSTS',
      rightStatValue: isVi ? 'Tối ưu nhất' : 'Highly Optimized',
      details: [
        {
          label: isVi ? 'Sản phẩm chủ lực' : 'Core Offerings',
          value: isVi ? 'Cháy nổ, Hàng hóa, Sức khỏe' : 'Fire, Cargo, Employee Health',
        },
        { label: isVi ? 'Đối tác bảo hiểm' : 'Underwriters', value: 'Bảo Việt, PVI, PJICO...' },
        {
          label: isVi ? 'Xử lý bồi thường' : 'Claim Settlement',
          value: isVi ? 'Nhanh chóng trong 15-30 ngày' : 'Settled within 15-30 days',
          highlight: true,
        },
      ],
      bullets: [
        {
          text: isVi
            ? 'Lá chắn tài chính vững chắc bảo vệ doanh nghiệp trước mọi rủi ro hoạt động.'
            : 'A robust financial shield protecting operations from unexpected disruptions.',
        },
        {
          text: isVi
            ? 'Đồng hành khảo sát hiện trường nhà xưởng và tư vấn gói tối ưu miễn phí.'
            : 'Complimentary on-site risk inspections and policy cost optimizations.',
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] text-left">
      <PageHeader title={isVi ? 'Doanh nghiệp' : 'Enterprise'} />

      <section className="relative py-16 md:py-24 grow z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header & Tabs */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.2em] text-[#0a192f] uppercase mb-4">
                {isVi ? 'Giải pháp chiến lược' : 'Strategic Solutions'}
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {isVi ? 'Tối ưu hóa nguồn lực cho doanh nghiệp' : 'Optimizing Enterprise Resources'}
              </h3>
            </div>
          </div>

          {/* Clean Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {financeServices.map((svc) => (
              <div
                key={svc.slug}
                className="bg-white border border-slate-200 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 md:p-10 flex flex-col h-full group relative overflow-hidden"
              >
                {/* Header Area */}
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-slate-50 p-4 shrink-0">{svc.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1">
                    {svc.pill}
                  </span>
                </div>

                <h4 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight group-hover:text-[#0a192f] transition-colors">
                  {svc.title}
                </h4>

                {/* Data Grid Stats */}
                <div className="grid grid-cols-2 border-t border-l border-slate-100 mb-8">
                  <div className="p-4 border-b border-r border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
                      {svc.leftStatLabel}
                    </span>
                    <span className="text-sm font-bold text-[#0a192f]">{svc.leftStatValue}</span>
                  </div>
                  <div className="p-4 border-b border-r border-slate-100 bg-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
                      {svc.rightStatLabel}
                    </span>
                    <span className="text-sm font-bold text-[#0a192f]">{svc.rightStatValue}</span>
                  </div>
                </div>

                {/* Table Details */}
                <div className="space-y-4 mb-8">
                  {svc.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex justify-between items-center text-sm border-b border-slate-100 pb-2"
                    >
                      <span className="text-slate-500 font-medium">{detail.label}</span>
                      <span
                        className={`font-bold ${detail.highlight ? 'text-[#0a192f]' : 'text-slate-900'}`}
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <div className="space-y-3 mb-10">
                  {svc.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#0a192f]" />
                      <p className="flex-1 text-slate-600 text-sm leading-relaxed">{bullet.text}</p>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <Link
                  href={`/services/${svc.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#0a192f] hover:text-blue-600 transition-colors"
                >
                  {isVi ? 'Chi tiết dịch vụ' : 'Service Details'}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                {/* Top decorative bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
