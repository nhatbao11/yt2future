'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from '@/components/common/Link';
import { useLocale } from 'next-intl';
import {
  Coins,
  Shield,
  FileCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  Laptop,
  FileText,
  Landmark,
} from 'lucide-react';

export default function ServicesListClient() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'finance' | 'website'>('finance');

  const isVi = locale === 'vi';

  // Customized high-fidelity details matching the screenshot structure
  const financeServices = [
    {
      title: isVi ? 'Vay vốn doanh nghiệp' : 'Corporate Loans',
      slug: 'vay-von',
      pill: isVi ? 'Lãi suất ưu đãi' : 'Best Rates',
      icon: <Coins size={28} className="text-white/95" />,
      leftStatLabel: isVi ? '⚡ HẠN MỨC VAY' : '⚡ CREDIT LIMIT',
      leftStatValue: isVi ? 'Đến 100 Tỷ đ' : 'Up to 100B VND',
      rightStatLabel: isVi ? '📈 LÃI SUẤT CHỈ TỪ' : '📈 RATES FROM',
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
          type: 'check',
          text: isVi
            ? 'Hồ sơ thủ tục tinh gọn, thời gian phê duyệt và giải ngân siêu tốc trong 72h.'
            : 'Streamlined process with fast approval and disbursement within 72 hours.',
        },
        {
          type: 'dot',
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
      icon: <Shield size={28} className="text-white/95" />,
      leftStatLabel: isVi ? '⚡ TỐC ĐỘ PHÁT HÀNH' : '⚡ ISSUANCE SPEED',
      leftStatValue: isVi ? 'Trong 24 Giờ' : 'Within 24 Hours',
      rightStatLabel: isVi ? '📉 KÝ QUỸ TỐI THIỂU' : '📉 MIN COLLATERAL',
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
          type: 'check',
          text: isVi
            ? 'Giải phóng hoàn toàn dòng tiền ký quỹ thầu để tái đầu tư vào dự án thực tế.'
            : 'Fully unlock bid security margins to reinvest into actual operations.',
        },
        {
          type: 'dot',
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
      icon: <FileCheck size={28} className="text-white/95" />,
      leftStatLabel: isVi ? '⚡ PHÍ PHÁT HÀNH' : '⚡ ISSUANCE FEES',
      leftStatValue: isVi ? 'Từ 0.1%' : 'From 0.1%',
      rightStatLabel: isVi ? '📉 KÝ QUỸ MỞ L/C' : '📉 LC MARGIN',
      rightStatValue: isVi ? 'Chỉ từ 0%' : 'From 0%',
      details: [
        { label: isVi ? 'Phương thức áp dụng' : 'LC Methods', value: 'At sight, Usance, UPAS L/C' },
        {
          label: isVi ? 'Đối tác liên kết' : 'Partner Network',
          value: isVi ? 'Hơn 500 ngân hàng đại lý' : 'Over 500 correspondent banks',
        },
        {
          label: isVi ? 'Kiểm soát bộ chứng từ' : 'Audit Check',
          value: isVi ? 'Soát xét lỗi 100% trước phát' : '100% error validation before issue',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Giảm thiểu rủi ro pháp lý giao thương và bảo vệ dòng vốn nhập khẩu tối đa.'
            : 'Mitigate international trade legal risks and safeguard import capital.',
        },
        {
          type: 'dot',
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
      icon: <Shield size={28} className="text-white/95" />,
      leftStatLabel: isVi ? '⚡ PHẠM VI BẢO VỆ' : '⚡ COVERAGE TYPE',
      leftStatValue: isVi ? 'Tài sản & Con người' : 'Asset & Personnel',
      rightStatLabel: isVi ? '📈 CHI PHÍ ĐƠN' : '📈 PREMIUM COSTS',
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
          type: 'check',
          text: isVi
            ? 'Lá chắn tài chính vững chắc bảo vệ doanh nghiệp trước mọi rủi ro hoạt động.'
            : 'A robust financial shield protecting operations from unexpected disruptions.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Đồng hành khảo sát hiện trường nhà xưởng và tư vấn gói tối ưu miễn phí.'
            : 'Complimentary on-site risk inspections and policy cost optimizations.',
        },
      ],
    },
  ];

  const websiteServices = [
    {
      title: isVi ? 'Thiết kế website doanh nghiệp' : 'Corporate Web Design',
      slug: 'thiet-ke-web',
      pill: isVi ? 'Next.js tối ưu' : 'Next.js Native',
      icon: <Globe size={28} className="text-white/95" />,
      leftStatLabel: isVi ? '⚡ TỐC ĐỘ TẢI TRANG' : '⚡ PAGE LOAD',
      leftStatValue: '< 1.5 Giây',
      rightStatLabel: isVi ? '📈 ĐẠT CHUẨN SEO' : '📈 SEO SCORE',
      rightStatValue: '100 / 100',
      details: [
        { label: isVi ? 'Công nghệ cốt lõi' : 'Tech Stack', value: 'React / Next.js / Tailwind' },
        {
          label: isVi ? 'Giao diện thiết kế' : 'UI/UX Design',
          value: isVi ? 'Độc quyền, Responsive 100%' : 'Custom, 100% Responsive',
        },
        {
          label: isVi ? 'Thời gian bảo hành' : 'Warranty term',
          value: isVi ? '12 tháng vận hành miễn phí' : '12 months free technical support',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Kiến tạo hiện diện số đẳng cấp, khẳng định uy tín thương hiệu trên môi trường internet.'
            : 'Build a high-end digital presence to establish credibility and trust online.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Hệ thống quản trị nội dung dễ sử dụng, bảo mật tuyệt đối, tránh lỗi hack.'
            : 'Intuitive custom CMS dashboard, highly secure and protected from attacks.',
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-left relative overflow-hidden">
      <PageHeader title={isVi ? 'Doanh nghiệp' : 'Enterprise'} />

      {/* Main Content Area with elegant light grid background and glowing ambient spots (matching Home page Section 2) */}
      <section className="relative py-16 md:py-24 grow bg-gradient-to-tr from-sky-100/35 via-blue-50/15 to-white z-0 overflow-hidden">
        {/* Background accents matching Home page style */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
          {/* Elegant grid overlay matching Section 1 in scale and opacity */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(circle_at_center,white,40%,transparent_75%)] opacity-35" />

          {/* Glowing background highlights */}
          <div className="absolute top-[10%] left-[-10%] w-[60%] h-[50%] bg-amber-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[40%] bg-sky-200/25 rounded-full blur-[100px]" />

          {/* Floating decorative pulsing orbs */}
          <div className="absolute top-[25%] left-[5%] w-60 h-60 bg-amber-200/20 rounded-full blur-[80px] animate-pulse duration-[6000ms]" />
          <div className="absolute bottom-[25%] right-[10%] w-72 h-72 bg-sky-100/25 rounded-full blur-[90px] animate-pulse duration-[8000ms]" />
        </div>

        <div className="max-w-360 mx-auto px-4 sm:px-6 md:px-10 relative z-10">
          {/* Navigation Tab bar */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 bg-slate-100/80 backdrop-blur rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('finance')}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'finance'
                    ? 'bg-gradient-to-r from-[#001a41] to-[#13356f] text-white shadow-lg shadow-blue-900/10'
                    : 'text-slate-600 hover:text-[#001a41] hover:bg-slate-300/30'
                }`}
              >
                <Landmark size={18} />
                {isVi ? 'Tư vấn tài chính' : 'Financial Consulting'}
              </button>
              <button
                onClick={() => setActiveTab('website')}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'website'
                    ? 'bg-gradient-to-r from-[#001a41] to-[#13356f] text-white shadow-lg shadow-blue-900/10'
                    : 'text-slate-600 hover:text-[#001a41] hover:bg-slate-300/30'
                }`}
              >
                <Laptop size={18} />
                {isVi ? 'Thiết kế website' : 'Website Design'}
              </button>
            </div>
          </div>

          {/* Dynamic Service Cards Section - Left to Right Aligned Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
            {(activeTab === 'finance' ? financeServices : websiteServices).map((svc) => (
              <div
                key={svc.slug}
                className="bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-[#001a41]/20 transition-all duration-300 flex flex-col h-auto w-full max-w-[24.5rem] group"
              >
                {/* Premium Top Banner with Navy Gradient matching website brand colors */}
                <div className="relative bg-gradient-to-br from-[#001a41] via-[#08224d] to-[#123062] text-white p-7 pb-9 rounded-b-[2.5rem] overflow-hidden shadow-md">
                  {/* Background decorative mesh layout */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />

                  {/* Top Right Pill (Gold theme) */}
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-yellow-300/20">
                    {svc.pill}
                  </span>

                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-5 border border-white/10 text-amber-400 shadow-inner backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    {svc.icon}
                  </div>

                  <p className="text-[9px] sm:text-[10px] font-black text-amber-400/90 uppercase tracking-widest leading-none mb-2">
                    {isVi ? 'YT2FUTURE DOANH NGHIỆP' : 'YT2FUTURE ENTERPRISE'}
                  </p>
                  <h3 className="font-extrabold text-base sm:text-lg uppercase tracking-tight leading-snug text-white group-hover:text-yellow-400 transition-colors duration-300">
                    {svc.title}
                  </h3>
                </div>

                {/* Card Contents Area */}
                <div className="p-6 pt-8 flex-1 flex flex-col justify-between gap-6">
                  {/* Left/Right Stats Grid in brand colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/80 border border-slate-100 hover:border-slate-200/80 transition-colors duration-200 rounded-2xl p-3.5 text-left shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        {svc.leftStatLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#001a41] mt-1 block">
                        {svc.leftStatValue}
                      </span>
                    </div>
                    <div className="bg-slate-50/80 border border-slate-100 hover:border-slate-200/80 transition-colors duration-200 rounded-2xl p-3.5 text-left shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        {svc.rightStatLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#001a41] mt-1 block">
                        {svc.rightStatValue}
                      </span>
                    </div>
                  </div>

                  {/* Details list matching Table rows in brand colors */}
                  <div className="space-y-4 py-5 border-t border-b border-slate-100">
                    {svc.details.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex justify-between items-center text-xs sm:text-[13px] font-bold"
                      >
                        <span className="text-slate-400 font-medium">{detail.label}</span>
                        <span
                          className={`${detail.highlight ? 'text-amber-700 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold' : 'text-slate-800'}`}
                        >
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bullet point description notes with brand colors */}
                  <div className="space-y-3.5 text-xs sm:text-[13px] font-semibold text-slate-600 leading-relaxed text-left">
                    {svc.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        {bullet.type === 'check' ? (
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0" />
                        )}
                        <p className="flex-1 text-slate-500 font-medium text-justify">
                          {bullet.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action button in brand solid styling */}
                  <Link
                    href={`/services/${svc.slug}`}
                    className="w-full bg-[#001a41] hover:bg-[#0b264e] text-white rounded-xl py-3.5 px-4 text-xs font-extrabold uppercase flex items-center justify-center gap-2 transition-all duration-300 mt-auto shadow-md hover:shadow-lg active:scale-[0.98] group/btn"
                  >
                    <span>{isVi ? 'CHI TIẾT DỊCH VỤ' : 'SERVICE DETAILS'}</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform duration-200 text-white"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
