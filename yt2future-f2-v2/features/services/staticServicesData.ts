import type { ServiceDetailRecord, SectionContent } from './types';

export const STATIC_SERVICES: ServiceDetailRecord[] = [
  {
    id: 'static-vay-von',
    slug: 'vay-von',
    sortOrder: 1,
    listTitleVi: 'Vay vốn Doanh nghiệp',
    listExcerptVi:
      'Giải pháp tài trợ vốn đa dạng hình thức, hạn mức cao, lãi suất ưu đãi tối ưu cho SMEs.',
    listTitleEn: 'Corporate Loans',
    listExcerptEn:
      'Diverse financing solutions, high credit limits, and optimized interest rates for SMEs.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['Hạn mức đến 100 tỷ', 'Lãi suất từ 5.5%/năm', 'Phản hồi trong 3 ngày'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'Giải pháp tài chính doanh nghiệp',
      heroTitle: 'Tài trợ Vốn & Vay vốn Doanh nghiệp tối ưu',
      heroDescription:
        'Hỗ trợ doanh nghiệp SMEs tiếp cận nguồn vốn lớn từ hệ thống ngân hàng thông qua đa dạng hình thức tài trợ linh hoạt. Chúng tôi tư vấn cấu trúc nguồn vốn tối ưu, chuẩn bị hồ sơ vay chuẩn mực giúp tăng tỷ lệ phê duyệt và rút ngắn thời gian xử lý.',
      heroStats: ['Hạn mức đến 100 tỷ', 'Lãi suất từ 5.5%/năm', 'Phản hồi trong 3 ngày'],
      contextTitle: 'Bối cảnh thị trường & Nhu cầu vốn',
      contextNarrative: [
        'Tiếp cận nguồn vốn ngân hàng luôn là thách thức lớn đối với các doanh nghiệp vừa và nhỏ (SMEs) do thiếu tài sản bảo đảm hoặc hồ sơ tài chính chưa hoàn thiện.',
        'YT Insight đồng hành cùng quý doanh nghiệp để tháo gỡ nút thắt này, tối ưu hóa hồ sơ năng lực và kết nối các định chế tài chính uy tín.',
      ],
      contextImpacts: [
        'Hơn 60% SMEs gặp khó khăn khi tiếp cận vốn tự thân.',
        'Quy trình chuẩn hóa rút ngắn thời gian duyệt hồ sơ xuống dưới 72 giờ.',
      ],
      contextCoreLine: 'Dẫn nguồn vốn hiệu quả đến sự phát triển bền vững của doanh nghiệp.',
      fitTitle: 'Đối tượng phù hợp & Điều kiện áp dụng',
      fitBuyerLabel: 'Doanh nghiệp phù hợp',
      fitBuyer: [
        'SMEs cần vốn lưu động bổ sung chu kỳ sản xuất kinh doanh.',
        'Doanh nghiệp có nhu cầu đầu tư tài sản cố định, nhà xưởng, máy móc.',
        'Các doanh nghiệp xuất nhập khẩu cần tài trợ thương mại ngắn hạn.',
      ],
      fitBuyerHighlight:
        'Phù hợp nhất với doanh nghiệp có doanh thu từ 10 tỷ đồng/năm trở lên và có phương án kinh doanh rõ ràng.',
      fitSellerLabel: 'Điều kiện cơ bản',
      fitSeller: [
        'Thời gian hoạt động từ 12 tháng trở lên.',
        'Không có nợ xấu nhóm 2 trở lên tại CIC trong 12 tháng gần nhất.',
        'Có báo cáo tài chính nội bộ hoặc thuế rõ ràng.',
      ],
      fitSellerHighlight:
        'Chúng tôi hỗ trợ tư vấn hoàn thiện hồ sơ phương án kinh doanh khả thi miễn phí.',
      benefitsTitle: 'Lợi ích vượt trội từ YT Insight',
      benefitGroups: [
        {
          title: 'Tối ưu chi phí',
          items: [
            'Lãi suất ưu đãi từ các ngân hàng đối tác liên kết.',
            'Cắt giảm các chi phí dịch vụ phát sinh không cần thiết.',
          ],
        },
        {
          title: 'Hỗ trợ toàn diện',
          items: [
            'Tư vấn cấu trúc khoản vay phù hợp (Thấu chi, Trả góp, Bảo lãnh).',
            'Đồng hành chuẩn bị hồ sơ và làm việc trực tiếp với ngân hàng.',
          ],
        },
        {
          title: 'Mạng lưới rộng lớn',
          items: [
            'Liên kết hơn 15 ngân hàng thương mại hàng đầu tại Việt Nam.',
            'Tiếp cận các quỹ tài chính và giải pháp vốn ngoài ngân hàng.',
          ],
        },
      ],
      processTitle: 'Quy trình tư vấn vay vốn',
      processIntro:
        'Quy trình 4 bước tinh gọn giúp doanh nghiệp tiếp cận nguồn vốn nhanh chóng và hiệu quả.',
      processSteps: [
        'Tiếp nhận nhu cầu và khảo sát sơ bộ hồ sơ doanh nghiệp.',
        'Tư vấn giải pháp cấu trúc hạn mức và chọn ngân hàng phù hợp.',
        'Hỗ trợ hoàn thiện hồ sơ pháp lý và phương án vay vốn.',
        'Trình duyệt hạn mức và giải ngân theo tiến độ doanh nghiệp.',
      ],
      partnersTitle: 'Đối tác liên kết tài chính',
      partnersSubtitle: 'Các đối tác ngân hàng hàng đầu',
      partnersPlaceholder:
        'YT Insight hợp tác chiến lược cùng BIDV, VietinBank, MB Bank, Techcombank, VIB...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Giới thiệu giải pháp vốn',
      videoPreviewHint:
        'Xem video để hiểu rõ quy trình hỗ trợ tài chính doanh nghiệp từ chuyên gia.',
    },
    contentEn: {
      heroTag: 'Corporate Finance Solutions',
      heroTitle: 'Optimized Corporate Loans & Debt Financing',
      heroDescription:
        'Support SMEs in accessing substantial bank credit lines through flexible financing structures. We advise on optimal capital structure and prepare standard loan dossiers to maximize approval rates and minimize processing time.',
      heroStats: ['Limits up to 100B VND', 'Rates from 5.5%/year', 'Response within 3 days'],
      contextTitle: 'Market Context & Capital Demands',
      contextNarrative: [
        'Accessing bank capital remains a major challenge for SMEs due to lack of collateral or incomplete financial records.',
        'YT Insight partners with you to resolve these bottlenecks, optimizing your profile and connecting you to reputable financial institutions.',
      ],
      contextImpacts: [
        'Over 60% of SMEs struggle to access traditional loans on their own.',
        'Standardized processes cut approval time down to under 72 hours.',
      ],
      contextCoreLine: 'Directing capital efficiently to build sustainable business growth.',
      fitTitle: 'Target Clients & Basic Conditions',
      fitBuyerLabel: 'Target Businesses',
      fitBuyer: [
        'SMEs needing working capital for production/operation cycles.',
        'Businesses planning to invest in fixed assets, plants, or machinery.',
        'Import-export firms requiring short-term trade financing.',
      ],
      fitBuyerHighlight:
        'Best suited for businesses with annual revenues starting from 10B VND and clear business plans.',
      fitSellerLabel: 'Basic Conditions',
      fitSeller: [
        'Operating duration of at least 12 months.',
        'No CIC debt group 2 or above in the last 12 months.',
        'Readable internal or tax financial statements.',
      ],
      fitSellerHighlight:
        'We provide complimentary consultancy to polish your feasibility reports.',
      benefitsTitle: 'Key Benefits of Choosing YT Insight',
      benefitGroups: [
        {
          title: 'Cost Optimization',
          items: [
            'Preferential interest rates from partner banks.',
            'Elimination of unnecessary hidden service fees.',
          ],
        },
        {
          title: 'End-to-End Support',
          items: [
            'Advising on appropriate loan structures (Overdraft, Installment, Guarantee).',
            'Direct handling and preparation of application packages with banks.',
          ],
        },
        {
          title: 'Extensive Network',
          items: [
            'Partnership with over 15 major commercial banks in Vietnam.',
            'Access to financial funds and alternative debt solutions.',
          ],
        },
      ],
      processTitle: 'Loan Consulting Process',
      processIntro: 'A streamlined 4-step process to secure capital quickly and efficiently.',
      processSteps: [
        'Initial inquiry assessment and document review.',
        'Structuring the credit line and selecting appropriate banks.',
        'Preparing legal documents and business loan proposals.',
        'Submitting for approval and monitoring the disbursement.',
      ],
      partnersTitle: 'Financial Partners',
      partnersSubtitle: 'Leading banking institutions',
      partnersPlaceholder:
        'YT Insight strategically collaborates with BIDV, VietinBank, MB Bank, Techcombank, VIB...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Capital Solution Overview',
      videoPreviewHint:
        'Watch the video to understand our financial consulting process from experts.',
    },
  },
  {
    id: 'static-lc-thanh-toan',
    slug: 'lc-thanh-toan',
    sortOrder: 2,
    listTitleVi: 'LC & Thanh toán quốc tế',
    listExcerptVi:
      'Kết nối giao thương toàn cầu an toàn, nhanh chóng và bảo mật tuyệt đối với chi phí tối ưu.',
    listTitleEn: 'LC & International Payments',
    listExcerptEn:
      'Connecting global trade securely, quickly, and privately with optimized fee structures.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['Phí mở LC từ 0.1%', 'Hỗ trợ ký quỹ từ 0%', 'Hơn 500 ngân hàng đại lý'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'Thanh toán & Xuất nhập khẩu',
      heroTitle: 'Thư tín dụng LC & Thanh toán quốc tế toàn diện',
      heroDescription:
        'Giải pháp bảo lãnh thanh toán xuất nhập khẩu qua thư tín dụng (L/C) giúp giảm thiểu rủi ro cho cả người mua và người bán. Tận dụng mạng lưới đối tác ngân hàng toàn cầu để tối ưu hạn mức và phí dịch vụ.',
      heroStats: ['Phí mở LC từ 0.1%', 'Ký quỹ từ 0%', '500+ ngân hàng đại lý'],
      contextTitle: 'Rủi ro trong Thương mại quốc tế',
      contextNarrative: [
        'Giao thương quốc tế luôn tiềm ẩn rủi ro lừa đảo thanh toán hoặc chậm trễ giao hàng do bất đồng về địa lý và luật pháp quốc gia.',
        'Thư tín dụng (L/C) là công cụ thanh toán an toàn nhất, đóng vai trò bảo đảm của ngân hàng cho cam kết tài chính của bạn.',
      ],
      contextImpacts: [
        'Giảm 95% rủi ro tranh chấp hợp đồng thương mại.',
        'Tối ưu hóa dòng tiền khi không cần giam giữ vốn ký quỹ lớn.',
      ],
      contextCoreLine: 'Bảo vệ mọi giao dịch xuất nhập khẩu của bạn an toàn tuyệt đối.',
      fitTitle: 'Đối tượng phù hợp',
      fitBuyerLabel: 'Doanh nghiệp áp dụng',
      fitBuyer: [
        'Doanh nghiệp nhập khẩu nguyên vật liệu, máy móc thiết bị nước ngoài.',
        'Doanh nghiệp xuất khẩu nông sản, thủ công mỹ nghệ, may mặc.',
        'Các đơn vị thương mại quốc tế trung gian cần mở LC giáp lưng.',
      ],
      fitBuyerHighlight:
        'Đặc biệt phù hợp cho các đơn vị cần mở L/C nhập khẩu với tỷ lệ ký quỹ thấp hoặc bằng 0%.',
      fitSellerLabel: 'Các phương thức hỗ trợ',
      fitSeller: [
        'Thư tín dụng nhập khẩu (Import L/C) và xuất khẩu (Export L/C).',
        'Thư tín dụng dự phòng (Standby L/C).',
        'Nhờ thu tài liệu (D/P, D/A) và Chuyển tiền bằng điện (T/T).',
      ],
      fitSellerHighlight:
        'Hỗ trợ tư vấn soạn thảo điều khoản thanh toán trên hợp đồng ngoại thương tránh bẫy pháp lý.',
      benefitsTitle: 'Lợi thế khi sử dụng dịch vụ của YT Insight',
      benefitGroups: [
        {
          title: 'Hỗ trợ ký quỹ cực thấp',
          items: [
            'Hỗ trợ doanh nghiệp xin hạn mức mở L/C với tỷ lệ ký quỹ từ 0% đến 10%.',
            'Giải phóng dòng tiền đang bị phong tỏa làm vốn lưu động.',
          ],
        },
        {
          title: 'Chi phí cạnh tranh',
          items: [
            'Phí mở và sửa đổi L/C cực kỳ ưu đãi thông qua đối tác liên kết.',
            'Không chi phí ẩn.',
          ],
        },
        {
          title: 'Chuyên môn sâu rộng',
          items: [
            'Đội ngũ chuyên gia tài trợ thương mại kiểm tra và chuẩn hóa bộ chứng từ.',
            'Hạn chế tối đa rủi ro chứng từ bất hợp lệ (discrepancy).',
          ],
        },
      ],
      processTitle: 'Quy trình nghiệp vụ L/C',
      processIntro: 'Quy trình hỗ trợ nghiệp vụ thanh toán quốc tế chuyên nghiệp.',
      processSteps: [
        'Tư vấn hợp đồng ngoại thương và điều khoản thanh toán L/C.',
        'Hỗ trợ làm hồ sơ đề nghị mở L/C gửi ngân hàng liên kết.',
        'Kiểm tra tính hợp lệ của L/C phát hành hoặc L/C nhận được.',
        'Tư vấn lập và kiểm tra bộ chứng từ xuất nhập khẩu trước khi thanh toán.',
      ],
      partnersTitle: 'Đối tác ngân hàng quốc tế',
      partnersSubtitle: 'Hệ thống ngân hàng đại lý toàn cầu',
      partnersPlaceholder:
        'Kết nối trực tiếp qua các ngân hàng lớn trong nước và mạng lưới Swift quốc tế.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Nghiệp vụ thanh toán quốc tế',
      videoPreviewHint: 'Tìm hiểu cách bảo vệ dòng tiền xuất nhập khẩu bằng thư tín dụng L/C.',
    },
    contentEn: {
      heroTag: 'Trade Finance & Payments',
      heroTitle: 'Comprehensive LC & International Trade Payments',
      heroDescription:
        'Secure import-export payments via Letter of Credit (L/C), mitigating risks for both buyers and sellers. Leverage our global banking relationships to optimize credit limits and fee schedules.',
      heroStats: ['LC Fees from 0.1%', 'Collateral from 0%', '500+ Correspondent Banks'],
      contextTitle: 'Risks in International Trade',
      contextNarrative: [
        'Global trade always involves risks of payment fraud or delivery delays due to geographical and legal differences.',
        'Letters of Credit (L/C) stand as the most secure payment instrument, acting as a bank guarantee for your financial commitments.',
      ],
      contextImpacts: [
        'Reduces contract dispute risks by up to 95%.',
        'Optimizes cash flow by eliminating heavy cash collateral requirements.',
      ],
      contextCoreLine: 'Securing your international trade transactions with absolute confidence.',
      fitTitle: 'Target Audience',
      fitBuyerLabel: 'Target Enterprises',
      fitBuyer: [
        'Importers of raw materials, machinery, and equipment from overseas.',
        'Exporters of agricultural goods, handicrafts, and textiles.',
        'Intermediary trade entities needing back-to-back L/C structures.',
      ],
      fitBuyerHighlight:
        'Highly recommended for entities requiring import L/C issuance with low or zero cash margin.',
      fitSellerLabel: 'Supported Payment Modes',
      fitSeller: [
        'Import L/C, Export L/C, and Standby L/C.',
        'Documentary Collections (D/P, D/A).',
        'Telegraphic Transfer (T/T) and international bank wires.',
      ],
      fitSellerHighlight:
        'We provide legal clause checks on international sales contracts to prevent document trap risks.',
      benefitsTitle: 'Advantages with YT Insight',
      benefitGroups: [
        {
          title: 'Ultra-low Margin',
          items: [
            'Securing L/C limits with margin requirements as low as 0% to 10%.',
            'Unlocking otherwise frozen capital to deploy back into operations.',
          ],
        },
        {
          title: 'Competitive Fees',
          items: [
            'Discounted L/C issuance and amendment fees from partner banks.',
            'Transparent pricing structures without hidden costs.',
          ],
        },
        {
          title: 'Expert Assessment',
          items: [
            'Our trade finance experts examine and verify shipping documents.',
            'Minimizing discrepancy rates and payment delays.',
          ],
        },
      ],
      processTitle: 'L/C Operational Workflow',
      processIntro: 'A professional guidance process for your international payment needs.',
      processSteps: [
        'Consulting on foreign trade contract terms and payment conditions.',
        'Assisting with L/C application preparation for partner banks.',
        'Reviewing issued L/C drafts or received L/C terms.',
        'Validating shipping documents prior to bank presentation.',
      ],
      partnersTitle: 'International Banking Partners',
      partnersSubtitle: 'Global correspondent banking networks',
      partnersPlaceholder: 'Direct connection via domestic banks and international SWIFT network.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'International Trade Payments',
      videoPreviewHint:
        'Learn how to protect your import-export cash flows utilizing L/C structures.',
    },
  },
  {
    id: 'static-bao-lanh',
    slug: 'bao-lanh',
    sortOrder: 3,
    listTitleVi: 'Bảo lãnh ngân hàng',
    listExcerptVi:
      'Nâng cao uy tín đấu thầu, thực hiện hợp đồng với tỷ lệ ký quỹ từ 0% và phát hành trong 24h.',
    listTitleEn: 'Bank Guarantees',
    listExcerptEn:
      'Enhancing bidding and performance credibility with margin rates starting from 0% and 24h issuance.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['Ký quỹ từ 0%', 'Phát hành trong 24h', 'Đầy đủ nghiệp vụ bảo lãnh'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'Uy tín & Cam kết tài chính',
      heroTitle: 'Bảo lãnh Ngân hàng chuyên nghiệp',
      heroDescription:
        'Giải pháp phát hành cam kết thanh toán bảo lãnh từ các ngân hàng uy tín hàng đầu, giúp doanh nghiệp chứng minh năng lực tài chính, tự tin tham gia đấu thầu các dự án lớn.',
      heroStats: ['Ký quỹ từ 0%', 'Phát hành trong 24h', '100% bảo mật thông tin'],
      contextTitle: 'Tại sao cần Bảo lãnh Ngân hàng?',
      contextNarrative: [
        'Chủ đầu tư hoặc đối tác lớn luôn yêu cầu bảo lãnh ngân hàng để đảm bảo nhà thầu thực hiện đúng nghĩa vụ hợp đồng.',
        'Tuy nhiên, việc phong tỏa tiền mặt làm ký quỹ bảo lãnh gây khó khăn lớn cho dòng tiền hoạt động của doanh nghiệp.',
      ],
      contextImpacts: [
        'Tiếp cận các gói thầu quy mô lớn hơn gấp 3-5 lần vốn tự có.',
        'Giải phóng 100% dòng tiền ký quỹ nhờ nghiệp vụ bảo lãnh không tài sản bảo đảm.',
      ],
      contextCoreLine: 'Chắp cánh cho uy tín doanh nghiệp thắng thầu vượt trội.',
      fitTitle: 'Các nghiệp vụ bảo lãnh hỗ trợ',
      fitBuyerLabel: 'Nghiệp vụ bảo lãnh',
      fitBuyer: [
        'Bảo lãnh dự thầu (Bid Bond) cho các dự án xây dựng, mua sắm công.',
        'Bảo lãnh thực hiện hợp đồng (Performance Bond) sau khi trúng thầu.',
        'Bảo lãnh tạm ứng (Advance Payment) để nhận tiền ứng trước từ chủ đầu tư.',
      ],
      fitBuyerHighlight:
        'Hỗ trợ trọn gói từ khâu mua hồ sơ thầu đến bàn giao, thanh quyết toán công trình.',
      fitSellerLabel: 'Điều kiện cấp hạn mức',
      fitSeller: [
        'Có quyết định phê duyệt trúng thầu hoặc hồ sơ mời thầu hợp lệ.',
        'Có báo cáo tài chính nội bộ hoặc thuế thể hiện kết quả kinh doanh ổn định.',
        'Phương án thi công/cung cấp dịch vụ khả thi.',
      ],
      fitSellerHighlight:
        'Hỗ trợ phê duyệt hạn mức bảo lãnh không cần tài sản bảo đảm cho nhà thầu uy tín.',
      benefitsTitle: 'Lợi thế vượt trội từ bảo lãnh YT Insight',
      benefitGroups: [
        {
          title: 'Phát hành siêu tốc',
          items: [
            'Thời gian phát hành thư bảo lãnh trong vòng 24 giờ kể từ khi nhận đủ hồ sơ.',
            'Đáp ứng tiến độ nộp hồ sơ thầu khẩn cấp.',
          ],
        },
        {
          title: 'Ký quỹ linh hoạt',
          items: [
            'Ký quỹ từ 0% đối với các doanh nghiệp xây lắp có lịch sử hoạt động tốt.',
            'Tối ưu hóa chi phí phát hành bảo lãnh.',
          ],
        },
        {
          title: 'Ngân hàng phát hành uy tín',
          items: [
            'Thư bảo lãnh phát hành từ các ngân hàng thương mại quốc doanh và cổ phần hàng đầu.',
            'Được chấp nhận bởi 100% các chủ đầu tư lớn tại Việt Nam.',
          ],
        },
      ],
      processTitle: 'Quy trình cấp bảo lãnh',
      processIntro: 'Quy trình chuyên nghiệp và nhanh chóng hỗ trợ doanh nghiệp đấu thầu.',
      processSteps: [
        'Khảo sát hồ sơ mời thầu và yêu cầu bảo lãnh của chủ đầu tư.',
        'Lựa chọn ngân hàng phát hành có mức phí và điều kiện phù hợp.',
        'Soạn thảo hồ sơ đề nghị cấp bảo lãnh và làm việc với ngân hàng.',
        'Bàn giao thư bảo lãnh bản gốc cho doanh nghiệp nộp thầu.',
      ],
      partnersTitle: 'Ngân hàng phát hành bảo lãnh',
      partnersSubtitle: 'Đối tác ngân hàng uy tín',
      partnersPlaceholder:
        'Phát hành bảo lãnh qua Vietcombank, BIDV, Agribank, VietinBank, Techcombank...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Nghiệp vụ bảo lãnh thầu',
      videoPreviewHint: 'Xem cách nhà thầu tối ưu dòng tiền ký quỹ thầu bằng bảo lãnh ngân hàng.',
    },
    contentEn: {
      heroTag: 'Financial Credibility',
      heroTitle: 'Professional Bank Guarantees',
      heroDescription:
        'Secure bank guarantee issuance from top commercial banks, helping your business prove financial strength and confidently secure large contracts.',
      heroStats: ['0% Margin Options', '24h Fast Issuance', '100% Confidential'],
      contextTitle: 'Why do you need Bank Guarantees?',
      contextNarrative: [
        'Project owners and major clients always demand bank guarantees to ensure contractors fulfill their contractual obligations.',
        'However, locking up cash reserves as collateral can severly disrupt your working capital flows.',
      ],
      contextImpacts: [
        'Enables bidding on projects 3-5 times larger than your equity capital.',
        'Unlocks 100% of escrow funds using unsecured bank guarantee facilities.',
      ],
      contextCoreLine: 'Boosting your corporate credibility to win outstanding bids.',
      fitTitle: 'Supported Guarantee Types',
      fitBuyerLabel: 'Guarantees Offered',
      fitBuyer: [
        'Bid Bonds for construction projects and public procurement.',
        'Performance Bonds following successful project awards.',
        'Advance Payment Guarantees to receive initial funds from developers.',
      ],
      fitBuyerHighlight:
        'Comprehensive assistance from bidding stages through project handover and settlement.',
      fitSellerLabel: 'Approval Criteria',
      fitSeller: [
        'Valid invitation to bid or official contract award letter.',
        'Tax or internal financial reports showing steady operating performance.',
        'Feasible project execution plan.',
      ],
      fitSellerHighlight:
        'Unsecured bank guarantee facilities available for reputable general contractors.',
      benefitsTitle: 'Core Advantages of Our Guarantees',
      benefitGroups: [
        {
          title: 'Express Issuance',
          items: [
            'Issuance of guarantee letter within 24 hours of complete documentation.',
            'Perfect for urgent bidding deadlines.',
          ],
        },
        {
          title: 'Flexible Margins',
          items: [
            'As low as 0% cash collateral for qualified construction firms.',
            'Optimized bank guarantee fee rates.',
          ],
        },
        {
          title: 'Top-tier Banks',
          items: [
            'Letters issued by major state-owned and joint-stock commercial banks.',
            'Accepted by 100% of large developers and public authorities in Vietnam.',
          ],
        },
      ],
      processTitle: 'Guarantee Issuance Process',
      processIntro: 'A professional and fast workflow supporting your bids.',
      processSteps: [
        'Reviewing project owner requirements and terms.',
        'Selecting the issuing bank with optimal fees and terms.',
        'Preparing application documents and securing approval.',
        'Delivering original bank guarantee letters for submission.',
      ],
      partnersTitle: 'Issuing Bank Partners',
      partnersSubtitle: 'Highly rated partner banks',
      partnersPlaceholder:
        'Issuing through Vietcombank, BIDV, Agribank, VietinBank, Techcombank...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Bidding Guarantees Overview',
      videoPreviewHint:
        'Learn how to optimize bid security margins using standard bank guarantees.',
    },
  },
  {
    id: 'static-bao-hiem',
    slug: 'bao-hiem',
    sortOrder: 4,
    listTitleVi: 'Bảo hiểm doanh nghiệp',
    listExcerptVi:
      'Giải pháp quản trị rủi ro toàn diện cho tài sản, hàng hóa vận chuyển và nhân sự với mức phí tối ưu.',
    listTitleEn: 'Corporate Insurance',
    listExcerptEn:
      'Comprehensive risk management for assets, cargo, and personnel with optimized premiums.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['Quản trị rủi ro tối ưu', 'Hỗ trợ bồi thường nhanh', 'Đối tác bảo hiểm Top đầu'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'Quản trị Rủi ro & An toàn',
      heroTitle: 'Bảo hiểm Doanh nghiệp toàn diện',
      heroDescription:
        'Bảo vệ tài sản, hàng hóa vận chuyển và đội ngũ nhân sự trước các biến cố bất ngờ. Chúng tôi thiết kế các gói bảo hiểm tối ưu chi phí, phù hợp với đặc thù vận hành của từng doanh nghiệp.',
      heroStats: ['Bảo vệ 360 độ', 'Quy trình bồi thường nhanh', 'Mức phí tối ưu'],
      contextTitle: 'Quản trị rủi ro trong Kinh doanh',
      contextNarrative: [
        'Tai nạn, hỏa hoạn, hư hỏng hàng hóa hoặc sự cố trách nhiệm công cộng có thể gây thiệt hại nặng nề đến năng lực tài chính của doanh nghiệp.',
        'Bảo hiểm doanh nghiệp là tấm lá chắn vững chắc giúp duy trì hoạt động kinh doanh liên tục trước mọi biến động rủi ro.',
      ],
      contextImpacts: [
        'Khắc phục tổn thất tài chính nhanh chóng trong vòng 15-30 ngày.',
        'Tuân thủ đầy đủ các quy định pháp luật về phòng chống cháy nổ và bảo hộ lao động.',
      ],
      contextCoreLine: 'An tâm tập trung phát triển kinh doanh bền vững.',
      fitTitle: 'Các loại hình bảo hiểm thiết yếu',
      fitBuyerLabel: 'Bảo hiểm Tài sản & Hàng hóa',
      fitBuyer: [
        'Bảo hiểm cháy nổ bắt buộc cho nhà xưởng, văn phòng, kho hàng.',
        'Bảo hiểm hàng hóa vận chuyển nội địa và quốc tế (đường biển, đường hàng không).',
        'Bảo hiểm gián đoạn kinh doanh do các sự cố bất khả kháng.',
      ],
      fitBuyerHighlight:
        'Hỗ trợ đánh giá rủi ro hiện trường nhà xưởng miễn phí trước khi phát hành đơn.',
      fitSellerLabel: 'Bảo hiểm Con người & Trách nhiệm',
      fitSeller: [
        'Bảo hiểm sức khỏe toàn diện cho nhân viên (Group Health Care).',
        'Bảo hiểm tai nạn lao động cho kỹ sư công trình và công nhân nhà máy.',
        'Bảo hiểm trách nhiệm công cộng, trách nhiệm sản phẩm.',
      ],
      fitSellerHighlight:
        'Tăng sự gắn kết của nhân sự cốt cán bằng các chính sách phúc lợi bảo hiểm cao cấp.',
      benefitsTitle: 'Lợi thế khi lựa chọn bảo hiểm qua YT Insight',
      benefitGroups: [
        {
          title: 'Thiết kế gói tối ưu',
          items: [
            'Được thiết kế riêng biệt dựa trên khảo sát thực tế ngành nghề kinh doanh.',
            'Tránh lãng phí mua các điều khoản không cần thiết.',
          ],
        },
        {
          title: 'Hỗ trợ bồi thường tận tâm',
          items: [
            'Hỗ trợ khách hàng thu thập chứng từ bồi thường nhanh chóng.',
            'Đại diện doanh nghiệp thương lượng với công ty bảo hiểm đảm bảo quyền lợi cao nhất.',
          ],
        },
        {
          title: 'Nhà bảo hiểm uy tín',
          items: [
            'Hợp tác cùng các thương hiệu bảo hiểm lớn nhất Việt Nam và quốc tế.',
            'Năng lực tài chính chi trả bồi thường vững mạnh.',
          ],
        },
      ],
      processTitle: 'Quy trình cấp đơn và bồi thường',
      processIntro:
        'Hỗ trợ quy trình khép kín từ đánh giá rủi ro đến xử lý bồi thường khi phát sinh sự cố.',
      processSteps: [
        'Khảo sát hiện trạng tài sản, hàng hóa hoặc quy mô nhân sự.',
        'Thiết kế điều khoản bảo hiểm và chào phí cạnh tranh từ nhiều đơn vị.',
        'Phát hành đơn bảo hiểm và tư vấn hướng dẫn quy trình an toàn.',
        'Tiếp nhận yêu cầu bồi thường và hỗ trợ xử lý thủ tục chi trả nhanh chóng.',
      ],
      partnersTitle: 'Đối tác bảo hiểm liên kết',
      partnersSubtitle: 'Các hãng bảo hiểm hàng đầu',
      partnersPlaceholder:
        'Liên kết chặt chẽ cùng Bảo Việt, PVI, PJICO, BIC, Prudential, Manulife...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Bảo hiểm & Quản trị rủi ro',
      videoPreviewHint:
        'Tìm hiểu cách bảo vệ tài sản doanh nghiệp trước các rủi ro thiên tai và cháy nổ.',
    },
    contentEn: {
      heroTag: 'Risk Management & Security',
      heroTitle: 'Comprehensive Corporate Insurance',
      heroDescription:
        'Protecting your assets, cargo, and human resources from unexpected events. We design cost-efficient insurance packages tailored to your specific business operations.',
      heroStats: ['360° Protection', 'Express Claim Support', 'Optimized Premiums'],
      contextTitle: 'Risk Control in Business',
      contextNarrative: [
        'Accidents, fire, cargo damage, or public liability incidents can cause catastrophic financial losses to your business.',
        'Corporate insurance acts as a sturdy shield, ensuring business continuity in times of crisis.',
      ],
      contextImpacts: [
        'Settle financial losses promptly within 15-30 days.',
        'Fully comply with fire safety regulations and occupational health laws.',
      ],
      contextCoreLine: 'Peace of mind to focus entirely on sustainable business expansion.',
      fitTitle: 'Essential Insurance Coverage',
      fitBuyerLabel: 'Asset & Cargo Protection',
      fitBuyer: [
        'Mandatory fire and explosion insurance for plants, offices, and warehouses.',
        'Inland and international transit cargo insurance (marine, air freight).',
        'Business interruption insurance covering unexpected shutdowns.',
      ],
      fitBuyerHighlight: 'Complimentary risk assessments for warehouses prior to policy issuance.',
      fitSellerLabel: 'Personnel & Liability',
      fitSeller: [
        'Group health care insurance policies for corporate employees.',
        "Worker's compensation for site engineers and plant workers.",
        'Public liability and product liability insurance.',
      ],
      fitSellerHighlight:
        'Improve employee retention and talent acquisition with premium corporate health plans.',
      benefitsTitle: 'Core Advantages of Our Insurance Consulting',
      benefitGroups: [
        {
          title: 'Custom Fit Plans',
          items: [
            'Tailor-made coverage clauses based on industry inspections.',
            'Eliminating wasteful premium expenditures on irrelevant clauses.',
          ],
        },
        {
          title: 'Dedicated Claim Support',
          items: [
            'Assisting clients in collecting claim documents efficiently.',
            'Representing your business in negotiations with insurers for maximum payouts.',
          ],
        },
        {
          title: 'Reputable Underwriters',
          items: [
            'Cooperation with the largest domestic and global insurers in Vietnam.',
            'Strong financial ratings ensuring stable claim payments.',
          ],
        },
      ],
      processTitle: 'Policy Issuance & Claims Process',
      processIntro: 'End-to-end guidance from risk inspection to claim disbursements.',
      processSteps: [
        'Inspecting assets, cargo routes, or employee headcount.',
        'Drafting policy terms and collecting competitive quotes from major insurers.',
        'Issuing policy documents and providing safety manuals.',
        'Receiving claim requests and facilitating rapid payment processing.',
      ],
      partnersTitle: 'Associated Underwriters',
      partnersSubtitle: 'Leading insurance brands',
      partnersPlaceholder:
        'Partnering closely with Bao Viet, PVI, PJICO, BIC, Prudential, Manulife...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Corporate Risk Control',
      videoPreviewHint:
        'Learn how to safeguard factory operations against natural disasters and fire.',
    },
  },
  {
    id: 'static-thiet-ke-web',
    slug: 'thiet-ke-web',
    sortOrder: 6,
    listTitleVi: 'Thiết kế website',
    listExcerptVi:
      'Xây dựng website doanh nghiệp chuẩn SEO, giao diện UX/UI hiện đại và ứng dụng công nghệ Next.js tối ưu.',
    listTitleEn: 'Website Design',
    listExcerptEn:
      'Building SEO-ready business websites with modern UI/UX design and optimized Next.js frameworks.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['Chuẩn SEO & UX/UI', 'Tốc độ load < 1.5s', 'Công nghệ Next.js/React'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'Số hóa & Công nghệ',
      heroTitle: 'Thiết kế Website & Phần mềm Doanh nghiệp',
      heroDescription:
        'Kiến tạo trải nghiệm số đẳng cấp, khẳng định uy tín thương hiệu trên môi trường internet. Chúng tôi xây dựng các website giới thiệu tập đoàn, landing page chuyển đổi cao và ứng dụng web quản lý chuyên nghiệp.',
      heroStats: ['Đạt chuẩn SEO 100 điểm', 'Tốc độ load cực nhanh', 'Bảo mật đa tầng'],
      contextTitle: 'Sự cần thiết của Hiện diện Số',
      contextNarrative: [
        'Website là bộ mặt trực tuyến và là điểm tiếp xúc đầu tiên của khách hàng với thương hiệu của doanh nghiệp.',
        'Một website tải chậm, thiết kế cũ kỹ hoặc không tối ưu hiển thị di động sẽ làm giảm nghiêm trọng uy tín và mất đi hàng ngàn cơ hội kinh doanh.',
      ],
      contextImpacts: [
        'Tăng tới 40% tỷ lệ chuyển đổi khách hàng tiềm năng.',
        'Tối ưu hóa chi phí quảng cáo nhờ giao diện chuẩn SEO và UX/UI vượt trội.',
      ],
      contextCoreLine: 'Nâng tầm thương hiệu doanh nghiệp bằng công nghệ hiện đại.',
      fitTitle: 'Dịch vụ thiết kế cung cấp',
      fitBuyerLabel: 'Loại hình phát triển',
      fitBuyer: [
        'Website giới thiệu doanh nghiệp, tập đoàn đa ngành cao cấp.',
        'Landing page giới thiệu dịch vụ và chạy quảng cáo tối ưu chuyển đổi.',
        'Nền tảng thương mại điện tử (E-commerce) tích hợp thanh toán trực tuyến.',
      ],
      fitBuyerHighlight:
        'Toàn bộ website được lập trình bằng mã nguồn Next.js/React hiện đại nhất, không dùng mã nguồn mở giá rẻ.',
      fitSellerLabel: 'Tiêu chuẩn kỹ thuật',
      fitSeller: [
        'Giao diện responsive tương thích 100% các loại màn hình điện thoại, tablet.',
        'Tối ưu hóa tốc độ tải trang Core Web Vitals đạt điểm xanh từ Google.',
        'Tích hợp công cụ phân tích Google Analytics, Search Console, Facebook Pixel.',
      ],
      fitSellerHighlight:
        'Bàn giao trọn gói kèm tài liệu hướng dẫn và mã nguồn gốc cho doanh nghiệp.',
      benefitsTitle: 'Lợi thế công nghệ từ YT Insight',
      benefitGroups: [
        {
          title: 'Thiết kế Độc quyền',
          items: [
            'Không sử dụng các giao diện có sẵn đại trà.',
            'Tư duy thiết kế hiện đại, tinh tế, bám sát bộ nhận diện thương hiệu.',
          ],
        },
        {
          title: 'Công nghệ vượt trội',
          items: [
            'Next.js, React, TailwindCSS, Node.js bảo mật tuyệt đối.',
            'Hệ thống quản trị nội dung dễ sử dụng, phân quyền rõ ràng.',
          ],
        },
        {
          title: 'Hỗ trợ lâu dài',
          items: [
            'Bảo hành kỹ thuật miễn phí trong vòng 12 tháng đầu tiên.',
            'Hỗ trợ đăng ký tên miền, máy chủ lưu trữ (hosting/VPS).',
          ],
        },
      ],
      processTitle: 'Quy trình phát triển phần mềm',
      processIntro: 'Quy trình 5 bước chuyên nghiệp từ ý tưởng đến sản phẩm hoàn thiện.',
      processSteps: [
        'Khảo sát yêu cầu, chức năng và tư vấn giải pháp tối ưu.',
        'Thiết kế bản vẽ giao diện Figma UX/UI trực quan.',
        'Lập trình mã nguồn Frontend và Hệ thống quản trị Admin.',
        'Kiểm thử hiệu năng, bảo mật và sửa lỗi kỹ thuật.',
        'Cấu hình hạ tầng tên miền, hosting và bàn giao sản phẩm.',
      ],
      partnersTitle: 'Công nghệ áp dụng',
      partnersSubtitle: 'Hệ sinh thái công nghệ hàng đầu',
      partnersPlaceholder: 'Sử dụng React, Next.js, Node.js, Vercel, AWS, Cloudflare...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Quy trình thiết kế Web',
      videoPreviewHint: 'Xem cách chuyên gia công nghệ YT Insight phát triển một website cao cấp.',
    },
    contentEn: {
      heroTag: 'Digital & Software Solutions',
      heroTitle: 'Corporate Website Design & Software Development',
      heroDescription:
        'Creating high-end digital experiences to solidify your brand credibility online. We develop premium corporate portals, high-conversion landing pages, and specialized web tools.',
      heroStats: ['100 SEO Score Perfect', 'Ultra-fast Page Load', 'Multi-layer Security'],
      contextTitle: 'The Power of Digital Presence',
      contextNarrative: [
        'A website represents your online storefront and the initial contact point for modern consumers.',
        'A slow, outdated, or non-mobile-friendly website will severely impact credibility and drive away valuable sales leads.',
      ],
      contextImpacts: [
        'Boosts user conversion rates by up to 40%.',
        'Reduces advertisement acquisition costs through superior UX/UI layouts.',
      ],
      contextCoreLine: 'Elevating corporate brands with next-generation web technologies.',
      fitTitle: 'Services Provided',
      fitBuyerLabel: 'Development Types',
      fitBuyer: [
        'Corporate sites for conglomerates and specialized agencies.',
        'High-conversion landing pages built for marketing campaigns.',
        'E-commerce platforms integrated with secure online payment gates.',
      ],
      fitBuyerHighlight:
        'All platforms coded on React/Next.js frameworks, avoiding generic template builders.',
      fitSellerLabel: 'Technical Standards',
      fitSeller: [
        'Responsive layout adapting perfectly to phones, tablets, and desktops.',
        'Optimized page loads passing Google Core Web Vitals.',
        'Integrated analytics tags: Google Analytics, Search Console, Meta Pixel.',
      ],
      fitSellerHighlight: 'Full handover including source files and operating manuals.',
      benefitsTitle: 'Technology Edge from YT Insight',
      benefitGroups: [
        {
          title: 'Custom Tailored Designs',
          items: [
            'Zero pre-made templates used; every build is custom.',
            'Modern, luxury-minimalist design style matching brand books.',
          ],
        },
        {
          title: 'Cutting-Edge Stack',
          items: [
            'React, Next.js, TailwindCSS, and Node.js for absolute security.',
            'Intuitive custom Content Management System (CMS) with access rights control.',
          ],
        },
        {
          title: 'Long-term Support',
          items: [
            '12 months of complimentary technical warranty.',
            'Support registering custom domains, hosting, and VPS environments.',
          ],
        },
      ],
      processTitle: 'Software Development Workflow',
      processIntro: 'A professional 5-step process from concept to deployment.',
      processSteps: [
        'Analyzing requirements, desired features, and suggesting solutions.',
        'Creating visual UI mockups in Figma.',
        'Coding frontend layouts and administrative backends.',
        'Testing security, responsive scaling, and performance metrics.',
        'Configuring domain mappings, host servers, and handing over.',
      ],
      partnersTitle: 'Technology Stack',
      partnersSubtitle: 'Modern technology ecosystem',
      partnersPlaceholder: 'Deploying with React, Next.js, Node.js, Vercel, AWS, Cloudflare...',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Web Design Workflow',
      videoPreviewHint:
        'Watch how YT Insight engineering teams build a high-end corporate website.',
    },
  },
];
