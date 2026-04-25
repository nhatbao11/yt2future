import type { Prisma } from '@prisma/client';

/** Nội dung mặc định (service đầu tiên) — đồng bộ với bản hardcode cũ trên FE. */
export const DEFAULT_SERVICE_SLUG = 'mua-han-bo-chung-tu';

export const DEFAULT_LIST = {
  listTitleVi: 'Mua hẳn Bộ chứng từ',
  listExcerptVi:
    'Giải pháp dành cho doanh nghiệp bán hàng trả chậm: chuyển doanh thu thành tiền mặt nhanh hơn, cải thiện dòng tiền và duy trì vận hành ổn định.',
  listTitleEn: 'Outright document purchase',
  listExcerptEn:
    'For businesses selling on deferred terms: convert revenue to cash faster, improve cash flow, and keep operations stable.',
  listImageUrl:
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
} as const;

/** Ba dòng pill trên thẻ /services (độc lập nội dung chi tiết). */
export const DEFAULT_CATALOG_PILLS: readonly string[] = [
  'Thu tiền sớm sau giao hàng',
  'Giảm giam vốn 30-90 ngày',
  'Không cần tài sản đảm bảo',
];

export const DEFAULT_CONTENT_VI: Prisma.InputJsonValue = {
  heroTag: 'Tư vấn giải pháp tài trợ thương mại',
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
  partnersPlaceholder: 'Khu vực hiển thị logo và tên các đối tác ngân hàng (cập nhật sau).',
  partnerLogos: [],
  introVideoUrl: '',
  videoPreviewLabel: 'Video giới thiệu',
  videoPreviewHint: 'Bấm để mở toàn màn và xem rõ hơn',
};

export const DEFAULT_CONTENT_EN: Prisma.InputJsonValue = {
  heroTag: 'Trade finance solution',
  heroTitle: 'Outright document purchase: unlock cash, accelerate growth',
  heroDescription:
    'For businesses selling on deferred terms. Converts revenue to cash faster, improves cash flow, and helps keep operations stable.',
  heroStats: ['Early cash after delivery', 'Lower 30-90 day cash lock', 'No collateral required'],
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
  partnerLogos: [],
  introVideoUrl: '',
  videoPreviewLabel: 'Intro video',
  videoPreviewHint: 'Tap to open larger player',
};
