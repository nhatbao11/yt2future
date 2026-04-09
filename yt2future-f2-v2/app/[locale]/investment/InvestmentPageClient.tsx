'use client';
import React, { useMemo, useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import {
  BadgeCheck,
  Building2,
  CircleCheck,
  Clock3,
  HandCoins,
  Landmark,
  Play,
  TrendingUp,
  X,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type SectionContent = {
  heroTag: string;
  heroTitle: string;
  heroDescription: string;
  heroStats: string[];
  contextTitle: string;
  contextNarrative: string[];
  contextImpacts: string[];
  contextCoreLine: string;
  fitTitle: string;
  fitSellerLabel: string;
  fitBuyerLabel: string;
  fitSeller: string[];
  fitBuyer: string[];
  fitSellerHighlight: string;
  fitBuyerHighlight: string;
  benefitsTitle: string;
  benefitGroups: Array<{ title: string; items: string[] }>;
  processTitle: string;
  processIntro: string;
  processSteps: string[];
  partnersTitle: string;
  partnersSubtitle: string;
  partnersPlaceholder: string;
  videoPreviewLabel: string;
  videoPreviewHint: string;
};

export default function InvestmentSolutions() {
  const t = useTranslations('investment_page');
  const locale = useLocale();
  const isVi = locale !== 'en';
  const [videoOpen, setVideoOpen] = useState(false);

  const content = useMemo<SectionContent>(
    () =>
      isVi
        ? {
            heroTag: 'Giải pháp tài trợ thương mại',
            heroTitle: 'Mua hẳn Bộ chứng từ: mở khóa dòng tiền, tăng tốc tăng trưởng',
            heroDescription:
              'Giải pháp dành cho doanh nghiệp bán hàng trả chậm. Giúp chuyển đổi doanh thu thành tiền mặt nhanh hơn, cải thiện dòng tiền và duy trì hoạt động kinh doanh ổn định.',
            heroStats: [
              'Thu tiền sớm sau giao hàng',
              'Giảm giam vốn 30-90 ngày',
              'Không cần tài sản đảm bảo',
            ],
            contextTitle: 'Bối cảnh giao dịch',
            contextNarrative: [
              'Ngày 0: Công ty A giao hàng cho Công ty B, giá trị 20 tỷ đồng. Hàng đã giao, doanh thu đã ghi nhận nhưng tiền chưa về.',
              'Từ ngày 0 đến ngày 60: 20 tỷ bị nằm trong khoản phải thu, doanh nghiệp không thể dùng số tiền này cho vận hành hoặc đơn hàng mới.',
              'Ngày 60: Công ty A mới nhận được 20 tỷ theo LC, nghĩa là doanh thu chỉ chuyển thành tiền mặt sau khi chờ đủ kỳ hạn.',
            ],
            contextImpacts: [
              'Áp lực dòng tiền: thiếu tiền nhập hàng mới, trả nhà cung cấp, chi phí vận hành.',
              'Mất cơ hội kinh doanh: có đơn hàng/cơ hội giá tốt nhưng không đủ vốn để thực hiện.',
              'Tăng trưởng chậm: mỗi đơn hàng mất 60 ngày mới thu tiền, nên một năm chỉ quay được khoảng 6 vòng vốn; nếu thu tiền sớm có thể quay 10-12 vòng.',
              'Phụ thuộc vay ngân hàng: cần tài sản đảm bảo, mất thời gian phê duyệt và chịu áp lực lãi vay.',
            ],
            contextCoreLine:
              'Bạn đang bán hàng tốt, nhưng dòng tiền của bạn lại bị khách hàng giữ hộ trong 60 ngày. Thời gian = chi phí cơ hội = tốc độ tăng trưởng.',
            fitTitle: 'Tính phù hợp',
            fitSellerLabel: 'Bên bán hàng',
            fitBuyerLabel: 'Bên mua hàng',
            fitSeller: [
              'Doanh nghiệp có đơn hàng lớn nhưng thiếu vốn lưu động.',
              'Doanh nghiệp bán trả chậm 30-90 ngày và khoản phải thu cao.',
              'Doanh nghiệp muốn tăng trưởng nhanh nhưng nghẽn dòng tiền.',
              'Doanh nghiệp cần xoay vòng vốn nhanh theo chu kỳ giao dịch.',
              'Doanh nghiệp không muốn hoặc khó vay ngân hàng truyền thống.',
              'Doanh nghiệp giao dịch với đối tác uy tín/có LC.',
            ],
            fitBuyer: [
              'Doanh nghiệp cần kéo dài thời gian thanh toán 30-60 ngày.',
              'Doanh nghiệp muốn tối ưu tiền mặt cho vận hành và đầu tư.',
              'Doanh nghiệp mua để kinh doanh lại (trading/distribution).',
              'Doanh nghiệp muốn tăng uy tín với nhà cung cấp qua LC.',
              'Doanh nghiệp muốn mở rộng quy mô mua hàng mà không cần thanh toán ngay toàn bộ.',
            ],
            fitSellerHighlight:
              'Phù hợp với doanh nghiệp có nhu cầu vốn lưu động cao để tài trợ đơn hàng, rút ngắn chu kỳ thu tiền, tăng tốc tăng trưởng và linh hoạt tiếp cận nguồn tài chính ngoài nguồn vốn vay từ ngân hàng.',
            fitBuyerHighlight:
              'Phù hợp với doanh nghiệp mua hàng cần tối ưu dòng tiền và mở rộng quy mô, thông qua việc kéo dài thời gian thanh toán, tăng uy tín với nhà cung cấp và linh hoạt trong quản lý vốn lưu động.',
            benefitsTitle: 'Lợi ích của các bên',
            benefitGroups: [
              {
                title: 'Công ty A (Bên bán)',
                items: [
                  'Nhận tiền gần như ngay sau giao hàng, không bị giam vốn.',
                  'Tăng tốc độ quay vòng vốn và hiệu quả sử dụng vốn lưu động.',
                  'Chủ động nhận thêm đơn hàng, mở rộng quy mô nhanh hơn.',
                  'Giảm lo ngại rủi ro chậm trả từ bên mua.',
                  'Không cần vay vốn hay dùng tài sản đảm bảo nhưng vẫn duy trì dòng tiền.',
                ],
              },
              {
                title: 'Công ty B (Bên mua)',
                items: [
                  'Có thêm 30-60 ngày thanh toán, giảm áp lực chi tiền ngay.',
                  'Nâng uy tín với nhà cung cấp nhờ cam kết LC của ngân hàng.',
                  'Chủ động bán hàng, thu tiền trước khi đến hạn hoàn trả ngân hàng.',
                  'Mở rộng quy mô mua hàng mà không cần sẵn toàn bộ tiền mặt.',
                ],
              },
              {
                title: 'Ngân hàng',
                items: [
                  'Tăng doanh thu từ lãi chiết khấu và phí dịch vụ LC.',
                  'Mở rộng quan hệ với cả bên mua và bên bán.',
                  'Kiểm soát rủi ro tốt hơn nhờ LC và bộ chứng từ hợp lệ.',
                  'Đóng vai trò trung gian tài trợ thương mại trong chuỗi cung ứng.',
                ],
              },
            ],
            processTitle: 'Quy trình triển khai',
            processIntro:
              'Áp dụng cho trường hợp bên mua và bên bán mới giao dịch theo hợp đồng kinh tế, chưa có cam kết thanh toán LC từ trước.',
            processSteps: [
              'Bên mua đề nghị Ngân hàng A phát hành LC. Lưu ý: chỉ phát hành LC sau khi được cấp hạn mức tín dụng; nội dung LC phải có điều khoản cho phép VIB mua hẳn Bộ chứng từ; Ngân hàng A thu phí phát hành LC theo thỏa thuận.',
              'Bên bán gửi đề nghị mua hẳn Bộ chứng từ kèm hóa đơn và chứng từ vận tải phù hợp LC.',
              'Ngân hàng A kiểm tra bộ chứng từ, gửi thông báo chấp nhận mua lại cho bên bán và thu phí theo thỏa thuận. Mức phí phụ thuộc giá trị đơn hàng, thời gian thanh toán LC và tỷ lệ phí sau thỏa thuận.',
              'Đến hạn thanh toán LC, bên mua hoàn trả tiền cho ngân hàng theo quy định.',
            ],
            partnersTitle: 'Đối tác',
            partnersSubtitle: 'Các ngân hàng tại Việt Nam',
            partnersPlaceholder:
              'Khu vực hiển thị logo và tên các đối tác ngân hàng (cập nhật sau).',
            videoPreviewLabel: 'Video giới thiệu',
            videoPreviewHint: 'Bấm để mở toàn màn và xem rõ hơn',
          }
        : {
            heroTag: 'Trade finance solution',
            heroTitle: 'Outright document purchase: unlock cash, accelerate growth',
            heroDescription:
              'For businesses selling on deferred terms. Converts revenue to cash faster, improves cash flow, and helps keep operations stable.',
            heroStats: [
              'Early cash after delivery',
              'Lower 30-90 day cash lock',
              'No collateral required',
            ],
            contextTitle: 'Transaction context',
            contextNarrative: [
              'Day 0: Company A delivers goods to Company B, valued at VND 20 billion. Revenue is recorded but cash is not received yet.',
              'Day 0 to Day 60: VND 20 billion stays in receivables, limiting operating cash and new order execution.',
              'Day 60: Company A receives payment under LC, meaning revenue turns into cash only after full maturity.',
            ],
            contextImpacts: [
              'Cash-flow pressure: less funding for inventory, suppliers, and operating costs.',
              'Missed opportunities: new orders or better buying opportunities cannot be executed in time.',
              'Slower growth: if each deal takes 60 days to collect, annual turnover may be only around 6 cycles; earlier cash can increase this to 10-12 cycles.',
              'Bank-loan dependence: collateral, approval delays, and interest pressure.',
            ],
            contextCoreLine:
              'You are selling well, but your cash is effectively held by customers for 60 days. Time equals opportunity cost and growth speed.',
            fitTitle: 'Suitability',
            fitSellerLabel: 'Seller side',
            fitBuyerLabel: 'Buyer side',
            fitSeller: [
              'Large-order businesses with working-capital constraints.',
              'Businesses selling on 30-90 day deferred terms.',
              'Growth-oriented businesses blocked by slow cash conversion.',
              'Businesses needing faster capital turnover.',
              'Businesses that cannot or do not want traditional bank loans.',
              'Businesses trading with reputable counterparties / LC-backed deals.',
            ],
            fitBuyer: [
              'Businesses needing longer payment terms (30-60 days).',
              'Businesses optimizing cash for operations and investments.',
              'Trading/distribution businesses that buy for resale.',
              'Businesses strengthening supplier trust via LC.',
              'Businesses scaling procurement without full upfront cash.',
            ],
            fitSellerHighlight:
              'Ideal for businesses with high working-capital needs to fund orders, shorten collection cycles, accelerate growth, and access financing beyond traditional bank loans.',
            fitBuyerHighlight:
              'Ideal for buyers optimizing cash flow and scale via extended payment terms, stronger supplier credibility, and flexible working-capital management.',
            benefitsTitle: 'Benefits for all parties',
            benefitGroups: [
              {
                title: 'Company A (Seller)',
                items: [
                  'Receives cash soon after delivery instead of waiting full tenor.',
                  'Improves working-capital efficiency and turnover speed.',
                  'Can accept more orders and scale faster.',
                  'Reduces concern over delayed or failed buyer payment.',
                  'Can maintain cash flow without collateral-heavy borrowing.',
                ],
              },
              {
                title: 'Company B (Buyer)',
                items: [
                  'Gets 30-60 day payment window and lower immediate cash pressure.',
                  'Strengthens supplier trust through LC-backed payment commitment.',
                  'Can sell and collect cash before repaying the bank at maturity.',
                  'Can increase purchase volume without full upfront funding.',
                ],
              },
              {
                title: 'Bank',
                items: [
                  'Generates income from discount interest and LC service fees.',
                  'Expands relationships with both buyer and seller.',
                  'Controls risk based on valid LC and compliant documents.',
                  'Acts as funding intermediary improving supply-chain efficiency.',
                ],
              },
            ],
            processTitle: 'Implementation process',
            processIntro:
              'For cases where buyer and seller only have commercial contract terms and have not yet put LC commitments in place.',
            processSteps: [
              'Buyer asks Bank A to issue LC. Notes: LC issuance requires approved credit limit; LC terms must allow VIB to purchase documents outright; Bank A charges LC issuance fees per agreement.',
              'Seller submits an outright purchase request with invoice and transport documents compliant with LC terms.',
              'Bank A reviews document set, sends acceptance notice to seller, and charges agreed fees. Fee level depends on transaction value, LC tenor, and negotiated fee ratio.',
              'At LC maturity, buyer repays the bank under agreed conditions.',
            ],
            partnersTitle: 'Partners',
            partnersSubtitle: 'Banks in Vietnam',
            partnersPlaceholder: 'Area for partner bank logos and names (to be updated).',
            videoPreviewLabel: 'Intro video',
            videoPreviewHint: 'Tap to open larger player',
          },
    [isVi]
  );

  return (
    <div className="min-h-screen bg-[#f4f7ff]">
      <PageHeader title={t('title')} />

      <main className="max-w-360 mx-auto px-4 md:px-10 xl:px-12 py-8 md:py-12 space-y-6 md:space-y-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001a41] via-[#13356f] to-[#1f4fa0] p-5 md:p-9 text-white shadow-2xl shadow-blue-900/20">
          <div className="absolute -top-12 -right-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/15 to-transparent" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-sm md:text-base uppercase tracking-[0.22em] font-bold text-yellow-300">
                {content.heroTag}
              </p>
              <h1 className="mt-3 text-2xl md:text-4xl font-black tracking-tight leading-tight text-balance">
                {content.heroTitle}
              </h1>
              <p className="mt-4 text-sm md:text-base text-blue-100 leading-relaxed max-w-4xl">
                {content.heroDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {content.heroStats.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="lg:col-span-5 group rounded-2xl border border-white/20 bg-black/25 p-2 hover:bg-black/35 transition text-left focus:outline-none focus:ring-2 focus:ring-yellow-300/80"
            >
              <div className="relative overflow-hidden rounded-xl aspect-video">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                >
                  <source src="/Videohome.webm" type="video/webm" />
                  <source src="/Videohome.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
                      {content.videoPreviewLabel}
                    </p>
                    <p className="text-xs text-slate-200">{content.videoPreviewHint}</p>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur text-white group-hover:scale-105 transition">
                    <Play size={16} />
                  </span>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionTitle icon={<BadgeCheck size={20} />} title={content.fitTitle} />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[#001a41] border-l-4 border-[#1f4fa0] pl-3">
                {content.fitBuyerLabel}
              </h3>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                <ul className="space-y-3">
                  {content.fitBuyer.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CircleCheck size={14} className="mt-1 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#001a41] via-[#1b3d77] to-[#2856a3] p-4 md:p-5 text-white mt-auto">
                <p className="text-xs uppercase tracking-wider text-yellow-300 font-bold">
                  {isVi ? 'Điểm nhấn nhanh' : 'Quick highlight'}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-blue-100">
                  {content.fitBuyerHighlight}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-[#001a41] border-l-4 border-[#1f4fa0] pl-3">
                {content.fitSellerLabel}
              </h3>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                <ul className="space-y-3">
                  {content.fitSeller.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CircleCheck size={14} className="mt-1 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#001a41] via-[#1b3d77] to-[#2856a3] p-4 md:p-5 text-white mt-auto">
                <p className="text-xs uppercase tracking-wider text-yellow-300 font-bold">
                  {isVi ? 'Điểm nhấn nhanh' : 'Quick highlight'}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-blue-100">
                  {content.fitSellerHighlight}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionTitle icon={<HandCoins size={20} />} title={content.benefitsTitle} />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {content.benefitGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5 hover:border-[#1f4fa0]/30 hover:shadow-md transition"
              >
                <h3 className="text-sm font-bold text-[#001a41]">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CircleCheck size={14} className="mt-1 shrink-0 text-sky-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionTitle icon={<Clock3 size={20} />} title={content.contextTitle} />
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-3">
              {content.contextNarrative.map((item, index) => (
                <div key={item} className="relative pl-6">
                  <span className="absolute left-0 top-1 inline-flex h-4 w-4 rounded-full bg-[#1f4fa0]" />
                  {index < content.contextNarrative.length - 1 ? (
                    <span className="absolute left-[7px] top-6 h-[calc(100%-12px)] w-[2px] bg-slate-200" />
                  ) : null}
                  <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5 rounded-xl border border-rose-200 bg-rose-50 p-4 md:p-5">
              <h3 className="text-sm font-bold text-rose-700 mb-3">
                {isVi ? 'Tác động thực tế' : 'Real impacts'}
              </h3>
              <ul className="space-y-2">
                {content.contextImpacts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-rose-900">
                    <CircleCheck size={14} className="mt-1 shrink-0 text-rose-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
            <p className="text-sm font-semibold text-indigo-800">{content.contextCoreLine}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionTitle icon={<TrendingUp size={20} />} title={content.processTitle} />
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{content.processIntro}</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.processSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative overflow-hidden"
              >
                <span className="absolute -right-4 -top-4 h-14 w-14 rounded-full bg-yellow-200/40" />
                <p className="text-sm md:text-base font-black uppercase tracking-[0.12em] text-yellow-600">
                  {isVi ? `Bước ${index + 1}` : `Step ${index + 1}`}
                </p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
          <SectionTitle icon={<Building2 size={20} />} title={content.partnersTitle} />
          <p className="mt-2 text-sm font-semibold text-slate-600">{content.partnersSubtitle}</p>
          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 md:py-14 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#001a41]/10 text-[#001a41] mb-4">
              <Landmark size={24} />
            </div>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {content.partnersPlaceholder}
            </p>
          </div>
        </section>
      </main>

      {videoOpen ? (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setVideoOpen(false)}
          role="button"
          tabIndex={-1}
        >
          <div className="mx-auto w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
                aria-label={isVi ? 'Đóng video' : 'Close video'}
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 bg-black">
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full aspect-video object-contain"
              >
                <source src="/Videohome.webm" type="video/webm" />
                <source src="/Videohome.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mt-2 text-center text-xs text-slate-300">
              {isVi ? 'Nhấn ra ngoài vùng video để thu nhỏ' : 'Click outside the video to close'}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-xl md:text-2xl lg:text-[1.65rem] font-black uppercase tracking-[0.06em] text-[#001a41]">
      <span className="text-[#1f4fa0] shrink-0">{icon}</span>
      <span className="leading-snug">{title}</span>
    </h2>
  );
}
