import type { ServiceDetailRecord } from '../services/types';

export const STATIC_ACCA_COURSES: ServiceDetailRecord[] = [
  {
    id: 'static-lo-trinh-acca',
    slug: 'lo-trinh-acca',
    sortOrder: 1,
    listTitleVi: 'Lộ trình ACCA trọn gói',
    listExcerptVi:
      'Lộ trình từ cơ bản đến chuyên sâu, tích hợp đầy đủ kiến thức kế toán, tài chính và kiểm toán thực tiễn.',
    listTitleEn: 'ACCA Full Roadmap',
    listExcerptEn:
      'End-to-end learning path integrating essential accounting, finance, and practical auditing skills.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['Tiết kiệm 25% học phí', 'Cam kết pass môn', 'Giảng viên Big 4'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'Đào tạo & Sự nghiệp',
      heroTitle: 'Lộ trình ACCA trọn gói bứt phá sự nghiệp',
      heroDescription:
        'Chương trình thiết kế tinh gọn gồm 4 môn nền tảng quan trọng nhất (F2, F3, F7, F8), giúp bạn nắm vững tư duy tài chính toàn cầu và tự tin ứng tuyển các tập đoàn lớn.',
      heroStats: ['Tiết kiệm 25% học phí', 'Hơn 150 giờ đào tạo', 'Học lại miễn phí'],
      contextTitle: 'Tại sao nên chọn Lộ trình ACCA trọn gói?',
      contextNarrative: [
        'Học rời rạc các môn thường khiến học viên mất định hướng và không liên kết được kiến thức kế toán quản trị với kiểm toán thực tế.',
        'Lộ trình trọn gói tại YT2Future giúp bạn tối ưu hóa thời gian học tập, củng cố kiến thức liên tục và tiết kiệm chi phí tối đa.',
      ],
      contextImpacts: [
        'Trang bị 100% kiến thức nền tảng chuẩn quốc tế IFRS.',
        'Mở rộng cơ hội kết nối việc làm trực tiếp với mạng lưới đối tác Big 4 và tập đoàn đa quốc gia.',
      ],
      contextCoreLine:
        'Đầu tư thông minh cho hành trình chinh phục chứng chỉ nghề nghiệp danh giá nhất ngành tài chính.',
      fitTitle: 'Đối tượng đào tạo',
      fitBuyerLabel: 'Học viên phù hợp',
      fitBuyer: [
        'Sinh viên năm 1, năm 2 ngành Kinh tế muốn định hướng sự nghiệp sớm.',
        'Người đi làm trong các lĩnh vực khác muốn chuyển hướng sang Kế toán, Kiểm toán, Tài chính.',
        'Nhân sự kế toán mong muốn cập nhật chuẩn mực báo cáo tài chính quốc tế.',
      ],
      fitBuyerHighlight:
        'Chương trình giảng dạy từ con số 0, cam kết đồng hành đến khi thi đậu môn.',
      fitSellerLabel: 'Quyền lợi đi kèm',
      fitSeller: [
        'Tặng bộ giáo trình & sách bài tập BPP chuẩn hãng.',
        'Hệ thống bài kiểm tra thử (Mock Test) sát đề thi thật 100%.',
        'Tư vấn viết CV và chuẩn bị phỏng vấn tuyển dụng Big 4.',
      ],
      fitSellerHighlight:
        'Hỗ trợ giải đáp 24/7 trực tuyến cùng giảng viên và trợ giảng chuyên môn.',
      benefitsTitle: 'Lợi thế vượt trội từ YT2Future',
      benefitGroups: [
        {
          title: 'Giảng viên đẳng cấp',
          items: [
            '100% giảng viên là Managers/Directors tại các công ty Big 4 hoặc sở hữu bằng FCCA.',
            'Truyền tải kiến thức qua các tình huống kiểm toán và tư vấn thực tiễn.',
          ],
        },
        {
          title: 'Phương pháp thực chiến',
          items: [
            'Không học vẹt, tập trung hiểu sâu bản chất cốt lõi của từng nghiệp vụ.',
            'Luyện đề thi thực tế và sửa bài chi tiết.',
          ],
        },
        {
          title: 'Cam kết chất lượng',
          items: [
            'Học viên được học lại hoàn toàn miễn phí nếu không vượt qua kỳ thi chính thức.',
            'Hỗ trợ lệ phí thi và phí mở tài khoản ACCA.',
          ],
        },
      ],
      processTitle: 'Lộ trình học tập chi tiết',
      processIntro: 'Quy trình học tập 4 giai đoạn chuẩn hóa quốc tế.',
      processSteps: [
        'Xây dựng nền tảng: Nhập môn Kế toán tài chính & Kế toán quản trị (F2 & F3).',
        'Nâng cao chuyên môn: Học sâu về Báo cáo tài chính chuẩn IFRS (F7).',
        'Hoàn thiện tư duy: Luyện nghiệp vụ Kiểm toán & Dịch vụ đảm bảo (F8).',
        'Luyện đề tổng lực & Thi thử Mock Test cuối kỳ.',
      ],
      partnersTitle: 'Tài liệu & Chứng nhận',
      partnersSubtitle: 'Sử dụng tài liệu chuẩn quốc tế',
      partnersPlaceholder:
        'YT2Future liên kết cùng nhà xuất bản BPP và cung cấp bộ ngân hàng câu hỏi luyện thi ACCA độc quyền.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Lộ trình ACCA',
      videoPreviewHint:
        'Xem chia sẻ của chuyên gia Big 4 về lộ trình thăng tiến sự nghiệp nhờ ACCA.',
    },
    contentEn: {
      heroTag: 'Education & Career',
      heroTitle: 'ACCA Full Roadmap for Career Breakthrough',
      heroDescription:
        'A structured, cost-effective program covering 4 critical foundations (F2, F3, F7, F8) to equip you with global financial expertise and Big 4 readiness.',
      heroStats: ['Save 25% Tuition', '150+ Hours of Live Classes', 'Free Retake Guarantee'],
      contextTitle: 'Why Choose the Full ACCA Roadmap?',
      contextNarrative: [
        'Studying individual modules in isolation often disconnects accounting theory from auditing applications.',
        'Our end-to-end roadmap structures your knowledge logically, saving time and keeping you focused.',
      ],
      contextImpacts: [
        'Equip yourself with 100% compliance knowledge of IFRS international reporting standards.',
        'Access job placement support with our network of Big 4 and MNC partners.',
      ],
      contextCoreLine:
        'A smart investment to secure your global credential in finance and auditing.',
      fitTitle: 'Target Student Profiles',
      fitBuyerLabel: 'Who Is This For',
      fitBuyer: [
        '1st or 2nd-year business students aiming to build a strong resume early.',
        'Non-finance professionals planning a career transition to accounting or audit.',
        'Accounting staff looking to upgrade their skills to global standards.',
      ],
      fitBuyerHighlight: 'Class taught from absolute scratch. Suitable for beginners.',
      fitSellerLabel: 'Student Benefits',
      fitSeller: [
        'Complimentary BPP textbooks & exam kits.',
        'Real exam simulator tests (Mock Exam) with tutor grading.',
        'Mentorship for CV preparation and Big 4 interview training.',
      ],
      fitSellerHighlight: '24/7 dedicated online support from class instructors and assistants.',
      benefitsTitle: 'The YT2Future Edge',
      benefitGroups: [
        {
          title: 'Distinguished Tutors',
          items: [
            'Coded with Big 4 Managers, Directors, and FCCA qualified experts.',
            'Lectures packed with real-world corporate case studies.',
          ],
        },
        {
          title: 'Practical Learning',
          items: [
            'Zero rote learning. Focus on understanding deep financial principles.',
            'Intensive exam question breakdowns and practice drills.',
          ],
        },
        {
          title: 'Quality Assured',
          items: [
            'Free course retake if you do not pass the official exam.',
            'Support with ACCA registration and discount codes.',
          ],
        },
      ],
      processTitle: 'Roadmap Breakdown',
      processIntro: 'A clear 4-step path to master global accounting.',
      processSteps: [
        'Foundations: Master financial and management accounting principles (F2 & F3).',
        'Advanced Reporting: Study detailed IFRS consolidated statements (F7).',
        'Auditing Framework: Learn risk assessments and controls (F8).',
        'Intensive mock testing and final exam revisions.',
      ],
      partnersTitle: 'Course Textbooks',
      partnersSubtitle: 'Approved learning materials',
      partnersPlaceholder:
        'YT2Future provides official BPP study texts and our custom question banks.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'ACCA Intro',
      videoPreviewHint: 'Watch how Big 4 experts plan their career paths around ACCA credentials.',
    },
  },
  {
    id: 'static-f2',
    slug: 'f2',
    sortOrder: 2,
    listTitleVi: 'F2 - Kế toán quản trị',
    listExcerptVi:
      'Lập ngân sách, tính giá thành và cung cấp thông tin tài chính hỗ trợ ra quyết định kinh doanh tối ưu.',
    listTitleEn: 'F2 - Management Accounting',
    listExcerptEn:
      'Master cost estimation, budgeting, and performance measurement to support business planning.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['36 giờ học thực chiến', 'Luyện đề thi thử BPP', 'Lớp học tương tác cao'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'ACCA F2 / MA',
      heroTitle: 'F2 - Kế toán quản trị doanh nghiệp thực tế',
      heroDescription:
        'Thấu hiểu cách thức lập dự báo tài chính, quản trị chi phí sản xuất và phân tích biến động hiệu quả hoạt động kinh doanh để tối ưu lợi nhuận cho doanh nghiệp.',
      heroStats: ['36 giờ giảng dạy', 'Tài liệu BPP chuẩn', 'Cam kết đầu ra'],
      contextTitle: 'Tầm quan trọng của Kế toán quản trị',
      contextNarrative: [
        'Kế toán tài chính hướng về quá khứ, trong khi Kế toán quản trị (F2) tập trung vào tương lai - giúp ban lãnh đạo lập kế hoạch và ra quyết định.',
        'Khóa học này trang bị tư duy định lượng sắc bén cho người học.',
      ],
      contextImpacts: [
        'Sử dụng thành thạo các mô hình tính giá thành (Costing methods) trong thực tế.',
        'Kỹ năng lập ngân sách dự toán (Budgeting) chuẩn chỉnh cho phòng ban.',
      ],
      contextCoreLine: 'Làm chủ các công cụ hỗ trợ hoạch định chiến lược tài chính nội bộ.',
      fitTitle: 'Đặc điểm lớp học',
      fitBuyerLabel: 'Học viên lý tưởng',
      fitBuyer: [
        'Học viên bắt đầu tìm hiểu về kế toán quản trị và hoạch định ngân sách.',
        'Sinh viên năm 2 các ngành Kinh tế, Quản trị kinh doanh, Tài chính doanh nghiệp.',
        'Trưởng bộ phận doanh nghiệp muốn đọc hiểu báo cáo chi phí nội bộ.',
      ],
      fitBuyerHighlight: 'Không yêu cầu kiến thức kế toán trước đó. Phù hợp cho người mới bắt đầu.',
      fitSellerLabel: 'Nội dung khóa học',
      fitSeller: [
        'Kỹ thuật phân tích chi phí cố định, biến đổi và điểm hòa vốn.',
        'Phương pháp lập dự toán ngân sách và phân tích chênh lệch (Variance Analysis).',
        'Các chỉ số đánh giá hiệu quả hoạt động (KPIs, Balanced Scorecard).',
      ],
      fitSellerHighlight: 'Tặng kèm tài liệu hướng dẫn thực hành Excel tính giá thành thực tế.',
      benefitsTitle: 'Lợi ích nhận được từ khóa học F2',
      benefitGroups: [
        {
          title: 'Tư duy Quản trị chi phí',
          items: [
            'Hiểu rõ dòng chảy chi phí trong nhà máy và công ty dịch vụ.',
            'Cách phân bổ chi phí chung (Overheads) chính xác.',
          ],
        },
        {
          title: 'Thực chiến thi cử',
          items: [
            'Kho bài tập trắc nghiệm đa dạng giải quyết nhanh các câu hỏi tính toán phức tạp.',
            'Mẹo phân bổ thời gian làm bài thi trên máy tính.',
          ],
        },
        {
          title: 'Học chủ động',
          items: [
            'Học trực tiếp qua Zoom tương tác cao, xem lại record bài giảng trọn đời.',
            'Tự tin giải đáp bài tập khó cùng đội ngũ trợ giảng.',
          ],
        },
      ],
      processTitle: 'Cấu trúc bài giảng F2',
      processIntro: 'Học phần chia thành 4 phần logic cốt lõi.',
      processSteps: [
        'Nhập môn kế toán quản trị và phân loại chi phí (Nature of Cost).',
        'Kỹ thuật tính giá thành sản phẩm (Absorption & Marginal Costing).',
        'Lập ngân sách dự toán và phân tích biến động chi phí thực tế.',
        'Đánh giá hiệu quả hoạt động kinh doanh và ôn tập Mock Test.',
      ],
      partnersTitle: 'Tài liệu tham khảo',
      partnersSubtitle: 'Sách giáo khoa chính hãng',
      partnersPlaceholder:
        'Tài liệu BPP Study Text & Exam Kit được cập nhật mới nhất cho kỳ thi ACCA hiện tại.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Giới thiệu F2',
      videoPreviewHint:
        'Xem video hướng dẫn cách phân loại chi phí biến đổi và chi phí cố định cực dễ hiểu.',
    },
    contentEn: {
      heroTag: 'ACCA F2 / MA',
      heroTitle: 'F2 - Practical Management Accounting',
      heroDescription:
        'Understand cost classification, forecasting, budgeting, and variance analysis to assist corporate management in planning and performance tracking.',
      heroStats: ['36 Live Hours', 'BPP Exam Material', 'Retake Option Available'],
      contextTitle: 'The Value of Management Accounting',
      contextNarrative: [
        'While financial accounting reviews past data, management accounting focuses on future decisions.',
        'This course builds the analytical skills needed to plan corporate budgets and forecast performance.',
      ],
      contextImpacts: [
        'Master different product costing methods used in manufacturing and services.',
        'Formulate corporate department budgets and trace variance causes.',
      ],
      contextCoreLine: 'Master the financial models that support internal management decisions.',
      fitTitle: 'Target Student Base',
      fitBuyerLabel: 'Who Should Attend',
      fitBuyer: [
        'Beginners looking to build a career in management reporting.',
        '2nd-year business, accounting, or business administration students.',
        'Managers wanting to read and audit internal department cost reports.',
      ],
      fitBuyerHighlight: 'No prior accounting knowledge required. Suitable for beginners.',
      fitSellerLabel: 'Key Course Units',
      fitSeller: [
        'Cost behavior analysis and break-even point estimation.',
        'Budgeting methodologies and variance audits.',
        'Performance measurement indicators (KPIs and Balanced Scorecards).',
      ],
      fitSellerHighlight:
        'Includes a practical Excel template workbook for actual product costing.',
      benefitsTitle: 'Why Study F2 with Us',
      benefitGroups: [
        {
          title: 'Cost Management Focus',
          items: [
            'Trace cost flows in factories and service businesses.',
            'Apply precise overhead allocation rules.',
          ],
        },
        {
          title: 'Exam Preparedness',
          items: [
            'Tackle complex multiple-choice quantitative questions efficiently.',
            'Time management strategies for the computer-based exam.',
          ],
        },
        {
          title: 'Flexible Learning',
          items: [
            'Interactive Zoom sessions with lifetime access to recordings.',
            '1-on-1 support from teaching assistants for homework.',
          ],
        },
      ],
      processTitle: 'F2 Syllabus Breakdown',
      processIntro: 'A structured approach split into 4 core sections.',
      processSteps: [
        'Introduction to cost accounting and cost behavior.',
        'Product costing methods: Absorption vs. Marginal Costing.',
        'Budgeting layouts and variance calculation audits.',
        'Performance evaluations and final Mock Exams.',
      ],
      partnersTitle: 'Study Resources',
      partnersSubtitle: 'Official syllabus materials',
      partnersPlaceholder:
        'Latest BPP Study Texts and Exam Practice Kits provided for the active ACCA exam cycle.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'F2 Intro',
      videoPreviewHint: 'Watch our video on Cost Classification and Break-Even Point Analysis.',
    },
  },
  {
    id: 'static-f3',
    slug: 'f3',
    sortOrder: 3,
    listTitleVi: 'F3 - Kế toán tài chính',
    listExcerptVi:
      'Học nguyên lý kế toán kép, ghi nhận giao dịch và lập báo cáo tài chính đơn lẻ chuẩn mực quốc tế.',
    listTitleEn: 'F3 - Financial Accounting',
    listExcerptEn:
      'Learn double-entry bookkeeping, transaction records, and basic financial statement preparation.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['40 giờ đào tạo', 'Chuẩn IFRS quốc tế', 'Môn học quan trọng nhất'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'ACCA F3 / FA',
      heroTitle: 'F3 - Kế toán tài chính chuẩn IFRS toàn cầu',
      heroDescription:
        'Đặt nền móng vững chắc cho sự nghiệp kế kiểm. Học viên nắm trọn nguyên lý ghi sổ kép, đối chiếu số liệu ngân hàng và tự lập bảng cân đối kế toán từ con số 0.',
      heroStats: ['40 giờ đào tạo', 'Sát đề thi thật 100%', 'Đậu môn cam kết'],
      contextTitle: 'Nền tảng của Mọi Lộ trình Kế toán',
      contextNarrative: [
        'Kế toán tài chính là ngôn ngữ của kinh doanh. Thiếu F3, học viên không thể tiếp thu được các môn nâng cao như F7 hay F8.',
        'Khóa học tại YT2Future dạy cặn kẽ bản chất ghi sổ kép, giúp học viên ghi nhớ lâu thay vì chỉ học vẹt sơ đồ tài khoản.',
      ],
      contextImpacts: [
        'Sở hữu tư duy xử lý nghiệp vụ theo chuẩn mực kế toán quốc tế IFRS/IAS.',
        'Tự tay hoàn thiện Báo cáo kết quả kinh doanh và Bảng cân đối kế toán đơn lẻ.',
      ],
      contextCoreLine: 'Ngôn ngữ nền tảng cốt lõi của thế giới tài chính chuyên nghiệp.',
      fitTitle: 'Đặc thù môn học',
      fitBuyerLabel: 'Học viên cần học',
      fitBuyer: [
        'Sinh viên tài chính kế toán cần lấy chứng chỉ quốc tế để gia tăng lợi thế tuyển dụng.',
        'Nhân viên kế toán VAS muốn nâng cấp chuyên môn lên chuẩn quốc tế IFRS.',
        'Chủ doanh nghiệp muốn đọc hiểu báo cáo tài chính của công ty mình.',
      ],
      fitBuyerHighlight:
        'Bắt đầu từ số 0. Từng bước làm quen thuật ngữ kế toán tiếng Anh chuyên ngành.',
      fitSellerLabel: 'Nội dung cốt lõi',
      fitSeller: [
        'Nguyên tắc ghi sổ kép (Debit/Credit) và các bút toán điều chỉnh cuối kỳ.',
        'Kế toán tài sản cố định, hàng tồn kho, công nợ phải thu/phải trả.',
        'Lập Báo cáo lưu chuyển tiền tệ (Cash Flow Statement).',
      ],
      fitSellerHighlight: 'Cung cấp từ điển thuật ngữ Kế toán Anh - Việt độc quyền.',
      benefitsTitle: 'Lợi thế khi học F3 tại YT2Future',
      benefitGroups: [
        {
          title: 'Hiểu bản chất tối đa',
          items: [
            'Giải thích rõ ràng tại sao tài sản tăng ghi Nợ, nguồn vốn tăng ghi Có.',
            'Ứng dụng các tình huống sai sót kế toán thực tế để thực hành đối chiếu.',
          ],
        },
        {
          title: 'Luyện thi bài bản',
          items: [
            'Giải chi tiết ngân hàng câu hỏi ôn thi (Exam Kit) của BPP và Kaplan.',
            'Thi thử trên phần mềm giả lập giống phòng thi thật.',
          ],
        },
        {
          title: 'Hỗ trợ sát sao',
          items: [
            'Lớp học giới hạn sĩ số để giảng viên tương tác sâu với từng học viên.',
            'Group học tập giải đáp thắc mắc bài tập trong vòng 10 phút.',
          ],
        },
      ],
      processTitle: 'Các bước làm chủ F3',
      processIntro: 'Tiến trình 4 bước học tập khoa học.',
      processSteps: [
        'Nguyên lý ghi sổ kép và các khái niệm cơ bản (Framework).',
        'Ghi nhận giao dịch hàng ngày và bút toán điều chỉnh (Accruals, Prepayments).',
        'Lập bảng cân đối thử (Trial Balance) và sửa lỗi kế toán.',
        'Lập báo cáo tài chính hoàn chỉnh và ôn luyện đề thi thử.',
      ],
      partnersTitle: 'Học liệu đi kèm',
      partnersSubtitle: 'Giáo trình chuẩn quốc tế',
      partnersPlaceholder:
        'Tài liệu học tập chính thức từ BPP Learning Media, cập nhật theo khung chương trình thi mới nhất.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Giới thiệu F3',
      videoPreviewHint:
        'Xem cách lập Bảng cân đối kế toán từ bảng cân đối thử cực nhanh và chính xác.',
    },
    contentEn: {
      heroTag: 'ACCA F3 / FA',
      heroTitle: 'F3 - Global Financial Accounting (IFRS)',
      heroDescription:
        'Build a solid foundation for your audit career. Learn double-entry bookkeeping, reconcile bank accounts, and prepare comprehensive financial statements from scratch.',
      heroStats: ['40 Hours Training', '100% Real Exam Prep', 'Passing Rate Assured'],
      contextTitle: 'The Language of Business',
      contextNarrative: [
        'Financial accounting is essential. Without F3, mastering advanced papers like F7 (FR) or F8 (AA) is impossible.',
        'We focus on the underlying concepts of accounting so you understand why entries are made, rather than just memorizing rules.',
      ],
      contextImpacts: [
        'Process accounting records in strict compliance with IFRS/IAS guidelines.',
        'Prepare Profit or Loss statements and Statement of Financial Position independently.',
      ],
      contextCoreLine: 'Learn the core language that drives global financial communication.',
      fitTitle: 'Target Student Base',
      fitBuyerLabel: 'Who Is This For',
      fitBuyer: [
        'Finance and accounting majors seeking international internship competitive edges.',
        'Local GAAP accountants upgrading their skills to IFRS.',
        "Entrepreneurs wanting to read and analyze their company's balance sheets.",
      ],
      fitBuyerHighlight: 'Starts from basic definitions. No prior accounting background needed.',
      fitSellerLabel: 'Key Syllabus Modules',
      fitSeller: [
        'Double-entry rules, ledger postings, and year-end adjustments.',
        'Non-current assets, inventory valuation, receivables, and payables accounting.',
        'Preparing Statement of Cash Flows using direct and indirect methods.',
      ],
      fitSellerHighlight: 'Includes our custom English-Vietnamese accounting glossary booklet.',
      benefitsTitle: 'Benefits of F3 with YT2Future',
      benefitGroups: [
        {
          title: 'Deep Concept Focus',
          items: [
            'Clear explanations of the accounting equation and debit/credit logic.',
            'Real-world accounting errors used to practice suspense accounts adjustments.',
          ],
        },
        {
          title: 'Intensive Practice',
          items: [
            'Detailed walkthroughs of BPP & Kaplan Exam Kit questions.',
            'Mock exams hosted on our computer-based testing platform.',
          ],
        },
        {
          title: 'Direct Access Support',
          items: [
            'Small class size allowing personalized feedback from the tutor.',
            'Dedicated community chat for homework help with swift tutor response.',
          ],
        },
      ],
      processTitle: 'F3 Course Steps',
      processIntro: 'A 4-phase program to master bookkeeping and reporting.',
      processSteps: [
        'Basic accounting principles and double-entry framework.',
        'Recording daily transactions and accounting adjustments.',
        'Drafting Trial Balance and resolving suspense accounts.',
        'Preparing full statements and sitting for mock tests.',
      ],
      partnersTitle: 'Textbook Partners',
      partnersSubtitle: 'Official learning kits',
      partnersPlaceholder:
        'Latest BPP Learning Media textbook material, tailored to current ACCA exams.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'F3 Intro',
      videoPreviewHint: 'Watch our guide on preparing a Balance Sheet from a Trial Balance.',
    },
  },
  {
    id: 'static-f7',
    slug: 'f7',
    sortOrder: 4,
    listTitleVi: 'F7 - Báo cáo tài chính',
    listExcerptVi:
      'Lập báo cáo tài chính hợp nhất cho tập đoàn nhiều chi nhánh theo chuẩn mực IFRS quốc tế.',
    listTitleEn: 'F7 - Financial Reporting',
    listExcerptEn:
      'Prepare consolidated financial statements for multi-subsidiary groups under IFRS standards.',
    listImageUrl: '/business_solutions.png',
    catalogPills: ['48 giờ học chuyên sâu', 'Luyện viết báo cáo hợp nhất', 'IFRS chuyên sâu'],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'ACCA F7 / FR',
      heroTitle: 'F7 - Lập Báo cáo tài chính tập đoàn (FR)',
      heroDescription:
        'Nâng tầm kỹ năng kế toán lên cấp độ chuyên nghiệp. Học viên làm chủ các chuẩn mực IFRS phức tạp nhất và kỹ thuật lập báo cáo tài chính hợp nhất tập đoàn đa công ty.',
      heroStats: ['48 giờ học chuyên sâu', 'Thực hành viết luận', 'Giảng viên cấp cao'],
      contextTitle: 'Thách thức lớn về chuẩn mực IFRS',
      contextNarrative: [
        'Việt Nam đang chuyển dịch mạnh mẽ sang IFRS. Doanh nghiệp lớn rất khát nhân sự hiểu sâu chuẩn mực báo cáo tài chính quốc tế.',
        'F7 là cầu nối quan trọng giúp bạn trở thành chuyên gia tư vấn IFRS hoặc kế toán tổng hợp cấp cao.',
      ],
      contextImpacts: [
        'Làm chủ hơn 15 chuẩn mực IAS/IFRS trọng yếu (IAS 16, IFRS 15, IFRS 16, IAS 36...).',
        'Thành thạo kỹ thuật loại trừ giao dịch nội bộ khi hợp nhất báo cáo.',
      ],
      contextCoreLine: 'Khẳng định năng lực chuyên môn kế toán chuẩn quốc tế vượt trội.',
      fitTitle: 'Đặc trưng khóa học',
      fitBuyerLabel: 'Học viên phù hợp',
      fitBuyer: [
        'Học viên đã học qua F3 hoặc có kiến thức kế toán tài chính vững chắc.',
        'Nhân viên kế toán tại các doanh nghiệp FDI, doanh nghiệp niêm yết chuẩn bị áp dụng IFRS.',
        'Sinh viên năm 3, năm 4 muốn chuẩn bị hồ sơ thi Big 4.',
      ],
      fitBuyerHighlight: 'Đòi hỏi sự tập trung cao và khả năng tư duy logic số liệu tốt.',
      fitSellerLabel: 'Nội dung cốt lõi',
      fitSeller: [
        'Chi tiết các chuẩn mực kế toán tài sản, doanh thu, thuê tài sản, công cụ tài chính.',
        'Lập Báo cáo tài chính hợp nhất (Consolidated Financial Statements).',
        'Phân tích và thuyết minh báo cáo tài chính thông qua hệ số tỷ suất.',
      ],
      fitSellerHighlight:
        'Hướng dẫn giải các case study tự luận lớn (Section C) chiếm 40% số điểm.',
      benefitsTitle: 'Lợi thế khi lựa chọn YT2Future học F7',
      benefitGroups: [
        {
          title: 'IFRS Thực tế',
          items: [
            'Học chuẩn mực đi kèm ví dụ báo cáo tài chính thực tế của các tập đoàn niêm yết tại Việt Nam.',
            'Làm rõ sự khác biệt cốt lõi giữa VAS và IFRS.',
          ],
        },
        {
          title: 'Luyện tự luận chuyên sâu',
          items: [
            'Chấm bài tự luận (Section C) và feedback chi tiết từng lỗi nhỏ của học viên.',
            'Tối ưu cách trình bày thuyết minh báo cáo trên phần mềm thi.',
          ],
        },
        {
          title: 'Tài liệu cao cấp',
          items: [
            'Cung cấp tóm tắt mindmap từng chuẩn mực IFRS giúp ghi nhớ siêu tốc.',
            'Hệ thống câu hỏi ôn tập phân loại theo từng chuẩn mực.',
          ],
        },
      ],
      processTitle: 'Quy trình chinh phục F7',
      processIntro: 'Hành trình 4 bước huấn luyện kỹ năng lập báo cáo.',
      processSteps: [
        'Nghiên cứu sâu các chuẩn mực báo cáo tài chính riêng lẻ (IAS/IFRS).',
        'Học lý thuyết và kỹ thuật hợp nhất báo cáo tài chính tập đoàn.',
        'Luyện viết phân tích hiệu quả tài chính doanh nghiệp (Financial Analysis).',
        'Luyện đề thi tổng hợp tự luận và trắc nghiệm hệ thống.',
      ],
      partnersTitle: 'Học liệu cung cấp',
      partnersSubtitle: 'Tài liệu cập nhật chuẩn hãng',
      partnersPlaceholder:
        'Tài liệu học tập chính thức từ BPP và ngân hàng đề thi tự luận độc quyền từ giảng viên YT2Future.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Giới thiệu F7',
      videoPreviewHint:
        'Xem video hướng dẫn phương pháp xử lý giao dịch nội bộ và lợi thế thương mại (Goodwill) khi hợp nhất.',
    },
    contentEn: {
      heroTag: 'ACCA F7 / FR',
      heroTitle: 'F7 - Financial Reporting & IFRS Consolidation',
      heroDescription:
        'Upgrade your accounting skills. Master detailed IFRS standards and the techniques required to prepare consolidated financial statements for complex corporate groups.',
      heroStats: ['48 Deep Study Hours', 'Section C Essay Focus', 'Senior Tutor Led'],
      contextTitle: 'The Global Transition to IFRS',
      contextNarrative: [
        'As corporations transition to IFRS worldwide, professionals skilled in international reporting are in extreme demand.',
        'F7 is the catalyst to position you as an IFRS advisory expert or a senior financial controller.',
      ],
      contextImpacts: [
        'Master 15+ key IAS/IFRS standards (IAS 16, IFRS 15, IFRS 16, IAS 36, etc.).',
        'Perform multi-subsidiary consolidation and eliminate intra-group balances.',
      ],
      contextCoreLine: 'Validate your advanced competence in global financial reporting.',
      fitTitle: 'Target Student Base',
      fitBuyerLabel: 'Prerequisites & Audience',
      fitBuyer: [
        'Students who completed ACCA F3 or possess solid financial accounting experience.',
        'Accountants at MNCs, FDI firms, or listed companies implementing IFRS.',
        '3rd or 4th-year university students preparing for Big 4 job hunts.',
      ],
      fitBuyerHighlight: 'Requires focused effort and structured quantitative logic.',
      fitSellerLabel: 'Key Learning Areas',
      fitSeller: [
        'Syllabus-specific IAS/IFRS assets, revenue, leases, and financial instrument standards.',
        'Consolidated Statement of Financial Position and Statement of Profit or Loss.',
        'Ratio analysis and qualitative financial performance interpretation.',
      ],
      fitSellerHighlight:
        'Dedicated review of Section C constructed response questions (40% of exam mark).',
      benefitsTitle: 'The F7 Experience with Us',
      benefitGroups: [
        {
          title: 'IFRS Case Studies',
          items: [
            'Learn standards using real financial publications of prominent listed groups.',
            'Clear contrast analysis between local GAAP and IFRS.',
          ],
        },
        {
          title: 'Essay Evaluation',
          items: [
            'Individual grading and feedback on your Section C practice files.',
            'Learn to format calculations on the official computer exam interface.',
          ],
        },
        {
          title: 'Premium Handouts',
          items: [
            'Quick-review mindmaps summarizing each accounting standard.',
            'Categorized practice database sorted by accounting topics.',
          ],
        },
      ],
      processTitle: 'F7 Training Steps',
      processIntro: 'A 4-phase syllabus coverage to secure an exam pass.',
      processSteps: [
        'Study individual asset and liability accounting standards.',
        'Master group consolidation mechanics and goodwill audits.',
        'Practice ratio-based performance analysis and essay writing.',
        'Intensive exam paper rehearsals and computer-based simulations.',
      ],
      partnersTitle: 'Courseware Partners',
      partnersSubtitle: 'Authorized study kits',
      partnersPlaceholder:
        'Latest BPP study resources and exclusive essay writing manuals compiled by our tutors.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'F7 Intro',
      videoPreviewHint:
        'Watch our tutorial on goodwill calculations and intra-group inventory unrealized profits adjustments.',
    },
  },
  {
    id: 'static-f8',
    slug: 'f8',
    sortOrder: 5,
    listTitleVi: 'F8 - Kiểm toán & Dịch vụ đảm bảo',
    listExcerptVi:
      'Thấu hiểu quy trình kiểm toán độc lập, đánh giá hệ thống kiểm soát nội bộ và quản trị rủi ro.',
    listTitleEn: 'F8 - Audit and Assurance',
    listExcerptEn:
      'Understand independent audit processes, internal control assessments, and risk management.',
    listImageUrl: '/business_solutions.png',
    catalogPills: [
      '42 giờ học thực tế',
      'Giảng viên Big 4 Manager',
      'Luyện kỹ năng viết Audit Procedure',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contentVi: {
      heroTag: 'ACCA F8 / AA',
      heroTitle: 'F8 - Kiểm toán & Dịch vụ đảm bảo thực hành',
      heroDescription:
        'Thấu hiểu công việc thực tế của một kiểm toán viên độc lập. Học viên làm chủ phương pháp đánh giá hệ thống kiểm soát nội bộ và cách thiết kế thủ tục kiểm toán chuẩn mực.',
      heroStats: ['42 giờ học lý thú', 'Chuyên gia Big 4 trực tiếp', 'Cam kết đầu ra'],
      contextTitle: 'Nghề kiểm toán và Thử thách F8',
      contextNarrative: [
        'F8 nổi tiếng là môn thi khó viết tự luận nhất vì đòi hỏi tư duy thực tế cao thay vì chỉ ghi nhớ lý thuyết sách vở.',
        'Tại YT2Future, chúng tôi giải quyết khó khăn này bằng cách đưa học viên tiếp cận hồ sơ kiểm toán thực tế.',
      ],
      contextImpacts: [
        'Tư duy nhận diện điểm yếu kiểm soát nội bộ và đề xuất giải pháp khắc phục.',
        'Kỹ năng viết thủ tục kiểm toán (Audit Procedures) chuẩn chỉnh tiếng Anh chuyên ngành.',
      ],
      contextCoreLine:
        'Trang bị tư duy độc lập và kỹ năng cốt lõi của kiểm toán viên chuyên nghiệp.',
      fitTitle: 'Phù hợp với ai',
      fitBuyerLabel: 'Đối tượng học viên',
      fitBuyer: [
        'Học viên đã học qua môn F3 để hiểu dòng chảy thông tin kế toán trên sổ sách.',
        'Sinh viên năm 3, năm 4 chuyên ngành Kế toán - Kiểm toán định hướng thi Big 4.',
        'Trợ lý kiểm toán viên muốn củng cố phương pháp luận kiểm toán chuẩn mực.',
      ],
      fitBuyerHighlight:
        'Hỗ trợ cực lớn cho việc vượt qua kỳ thi tuyển dụng Internship & Fresh của các hãng kiểm toán lớn.',
      fitSellerLabel: 'Nội dung cốt lõi',
      fitSeller: [
        'Chuẩn mực đạo đức nghề nghiệp kiểm toán và các nguy cơ đe dọa tính độc lập.',
        'Đánh giá rủi ro kiểm toán (Audit Risk) và lập kế hoạch kiểm toán.',
        'Thiết kế thủ tục kiểm toán cho các chu kỳ: Bán hàng, Mua hàng, Lương, Hàng tồn kho.',
      ],
      fitSellerHighlight:
        'Hướng dẫn cụ thể cách viết câu ăn điểm phần rủi ro kiểm soát và thủ tục kiểm toán.',
      benefitsTitle: 'Giá trị khác biệt từ khóa học F8',
      benefitGroups: [
        {
          title: 'Kinh nghiệm Big 4',
          items: [
            'Học trực tiếp cùng cựu Kiểm toán trưởng Big 4 giàu kinh nghiệm thực tế.',
            'Chia sẻ văn hóa làm việc và kinh nghiệm vượt qua kỳ thử thách tại Big 4.',
          ],
        },
        {
          title: 'Phương pháp viết khoa học',
          items: [
            'Công thức viết thủ tục kiểm toán: Động từ + Đối tượng + Mục đích.',
            'Luyện viết luận ngắn mạch lạc, súc tích chuẩn đáp án ACCA.',
          ],
        },
        {
          title: 'Mô phỏng thực tế',
          items: [
            'Làm quen với giấy tờ làm việc (Working Papers) của kiểm toán viên.',
            'Kiểm tra và sửa bài tập cá nhân sát sao.',
          ],
        },
      ],
      processTitle: 'Các bước chinh phục F8',
      processIntro: 'Lộ trình huấn luyện nghiệp vụ kiểm toán 4 giai đoạn.',
      processSteps: [
        'Tìm hiểu khung pháp lý và đạo đức nghề nghiệp kiểm toán.',
        'Học kỹ thuật đánh giá kiểm soát nội bộ và nhận diện rủi ro kiểm toán.',
        'Thiết kế thủ tục kiểm toán cho các khoản mục trên báo cáo tài chính.',
        'Học về báo cáo kiểm toán (Audit Report) và ôn tập thi thử Mock Test.',
      ],
      partnersTitle: 'Tài liệu đồng hành',
      partnersSubtitle: 'Giáo trình chuẩn quốc tế',
      partnersPlaceholder:
        'Tài liệu học tập chính thức từ BPP và ngân hàng case study kiểm toán thực tế từ YT2Future.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'Giới thiệu F8',
      videoPreviewHint:
        'Xem cách phân biệt Rủi ro kiểm toán (Audit Risk) và Rủi ro kinh doanh (Business Risk) cực kỳ nhanh chóng.',
    },
    contentEn: {
      heroTag: 'ACCA F8 / AA',
      heroTitle: 'F8 - Practical Audit and Assurance',
      heroDescription:
        'Understand the actual day-to-day operations of an independent auditor. Learn to assess internal control systems and design compliant audit procedures.',
      heroStats: ['42 Training Hours', 'Big 4 Manager Led', 'Free Retake Guarantee'],
      contextTitle: 'The Audit Profession & The F8 Challenge',
      contextNarrative: [
        'F8 is known for its challenging essay questions because it requires practical scenario reasoning rather than book memorization.',
        'At YT2Future, we overcome this by guiding you through simulated audit working papers.',
      ],
      contextImpacts: [
        'Identify internal control deficiencies in a case study and suggest management solutions.',
        'Draft robust audit procedures in professional English.',
      ],
      contextCoreLine:
        'Equip yourself with the independent mindset and skills of a professional auditor.',
      fitTitle: 'Target Student Base',
      fitBuyerLabel: 'Who Should Register',
      fitBuyer: [
        'Students who completed ACCA F3 to understand ledger data structures.',
        '3rd or 4th-year students targetting Big 4 internship programs.',
        'Junior audit assistants looking to master standard audit methodologies.',
      ],
      fitBuyerHighlight:
        'Provides a significant advantage in the competitive Big 4 recruitment rounds.',
      fitSellerLabel: 'Key Modules',
      fitSeller: [
        'Audit ethics, independence threats, and safeguards.',
        'Planning and audit risk assessment procedures.',
        'Substantive testing and test of controls for Sales, Purchases, Payroll, and Inventory cycles.',
      ],
      fitSellerHighlight:
        'Formulaic training on drafting high-scoring control weakness and audit procedure responses.',
      benefitsTitle: 'The F8 Edge at YT2Future',
      benefitGroups: [
        {
          title: 'Big 4 Experience',
          items: [
            'Learn from former Big 4 audit managers with substantial practice records.',
            'Mentorship on Big 4 workplace culture and career pathways.',
          ],
        },
        {
          title: 'Structured Writing',
          items: [
            'Master the formula: Verb + Audit Subject + Purpose.',
            'Learn to write clear, concise audit points matching ACCA marking guides.',
          ],
        },
        {
          title: 'Simulation Exercises',
          items: [
            'Get familiar with actual audit working papers (audit files).',
            'Weekly feedback and corrections on essay assignments.',
          ],
        },
      ],
      processTitle: 'Syllabus Journey',
      processIntro: 'A 4-phase audit methodology walkthrough.',
      processSteps: [
        'Explore audit regulations and professional ethics.',
        'Audit planning, materiality, and internal control assessments.',
        'Substantive audit procedures and evidence collection.',
        'Audit reports, opinions, and computer-based mock tests.',
      ],
      partnersTitle: 'Reference Materials',
      partnersSubtitle: 'Official revision kits',
      partnersPlaceholder:
        'Latest BPP revision kits combined with simulated audit file case studies.',
      partnerLogos: [],
      introVideoUrl: '',
      videoPreviewLabel: 'F8 Intro',
      videoPreviewHint:
        'Watch our video on the core differences between Audit Risk and Business Risk.',
    },
  },
];
