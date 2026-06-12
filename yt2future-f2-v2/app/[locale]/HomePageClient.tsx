'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from '@/components/common/Link';
import ScrollReveal from '@/components/common/ScrollReveal';
import {
  ArrowRight,
  Coins,
  FileCheck,
  ShieldAlert,
  Globe,
  Users,
  TrendingUp,
  MessageSquare,
  Laptop,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Shield,
  Award,
  Sparkles,
  Calendar,
  BookOpenCheck,
  User,
  Check,
  Phone,
  Mail,
  Clock,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FileText,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// Mock blogs data to match the design screenshot
const mockBlogs = [
  {
    id: 'blog-1',
    title:
      'Nên Ưu Tiên Học CMA Hoa Kỳ Hay Thạc Sĩ: Đâu Là Lựa Chọn Phù Hợp Cho Hành Trình Quản Trị Doanh Nghiệp?',
    description:
      'Trong quá trình phát triển sự nghiệp, nhiều người băn khoăn nên ưu tiên học CMA Hoa Kỳ hay Thạc sĩ...',
    thumbnail:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    date: '02/06/2026',
    category: 'acca',
  },
  {
    id: 'blog-2',
    title: '4 Lý Do Bạn Nên Học Thử CMA Online Trước Khi Đăng Ký Chính Thức',
    description:
      'CMA Online là lựa chọn phù hợp với nhiều người học bận rộn, giúp tối ưu hóa thời gian và chi phí...',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    date: '30/05/2026',
    category: 'acca',
  },
  {
    id: 'blog-3',
    title: 'Khi Doanh Nghiệp Lãi Nhưng Hết Tiền: Giải Mã Bẫy Lợi Nhuận Kế Toán',
    description:
      'Một trong những nghịch lý nghiêm trọng nhất trong quản trị tài chính là doanh nghiệp có lãi nhưng lại cạn kiệt dòng tiền...',
    thumbnail:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    date: '30/05/2026',
    category: 'doanh-nghiep',
  },
  {
    id: 'blog-4',
    title: 'Cẩm nang CGMA P1 từ A-Z: Nền tảng kiến thức & kinh nghiệm thi',
    description:
      'CGMA P1 – Management Accounting là môn học đầu tiên trong trụ cột kỹ thuật của chương trình CGMA...',
    thumbnail:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    date: '29/05/2026',
    category: 'acca',
  },
];

// Course curriculum details for modal
const courseDetails = {
  F2: {
    code: 'F2',
    name: 'Management Accounting (Kế toán quản trị)',
    objective:
      'Cung cấp kiến thức cơ bản về lập kế hoạch, kiểm soát chi phí và hỗ trợ ra quyết định quản trị trong doanh nghiệp.',
    curriculum: [
      'Bản chất, nguồn gốc và mục đích của thông tin kế toán quản trị.',
      'Phân loại chi phí và kỹ thuật xác định chi phí.',
      'Lập dự toán ngân sách và kiểm soát ngân sách.',
      'Đánh giá hiệu quả hoạt động kinh doanh (KPIs, BSC).',
      'Phân tích chênh lệch chi phí và doanh thu.',
    ],
  },
  F3: {
    code: 'F3',
    name: 'Financial Accounting (Kế toán tài chính)',
    objective:
      'Trang bị nguyên lý kế toán tài chính cơ bản và kỹ năng lập báo cáo tài chính đơn lẻ theo chuẩn mực quốc tế.',
    curriculum: [
      'Bối cảnh và mục đích của lập báo cáo tài chính.',
      'Các đặc tính định tính của thông tin tài chính.',
      'Ghi chép kép và hệ thống sổ sách kế toán.',
      'Xử lý các nghiệp vụ kinh tế cơ bản (tài sản cố định, hàng tồn kho, công nợ).',
      'Lập báo cáo tài chính đơn lẻ (Bảng cân đối, Báo cáo kết quả KD, Lưu chuyển tiền tệ).',
    ],
  },
  F7: {
    code: 'F7',
    name: 'Financial Reporting (Lập báo cáo tài chính)',
    objective:
      'Phát triển năng lực lập, trình bày và phân tích báo cáo tài chính chuyên sâu cho doanh nghiệp đơn lẻ cũng như tập đoàn.',
    curriculum: [
      'Khung khái niệm và pháp lý về lập báo cáo tài chính (IAS/IFRS).',
      'Ghi nhận các chuẩn mực kế toán tài sản và công nợ nâng cao.',
      'Lập báo cáo tài chính hợp nhất cho tập đoàn.',
      'Phân tích và giải thích báo cáo tài chính thông qua hệ số tài chính.',
      'Bản chất và mục đích của báo cáo tài chính tích hợp.',
    ],
  },
  F8: {
    code: 'F8',
    name: 'Audit & Assurance (Kiểm toán & Dịch vụ đảm bảo)',
    objective:
      'Hiểu quy trình kiểm toán, kiểm soát nội bộ và các nguyên tắc đảm bảo độ tin cậy của báo cáo tài chính.',
    curriculum: [
      'Khung kiểm toán quốc tế và các dịch vụ đảm bảo.',
      'Quy định pháp lý và quy tắc đạo đức nghề nghiệp kiểm toán viên.',
      'Đánh giá rủi ro kiểm toán và lập kế hoạch kiểm toán.',
      'Đánh giá và kiểm tra hệ thống kiểm soát nội bộ.',
      'Thu thập bằng chứng kiểm toán và lập báo cáo kiểm toán.',
    ],
  },
};

export default function HomePage() {
  const t = useTranslations('home');

  // States for consultation forms
  const [businessForm, setBusinessForm] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    need: 'Vay vốn doanh nghiệp',
    note: '',
  });
  const [businessSubmitStatus, setBusinessSubmitStatus] = useState<string | null>(null);

  const [accaForm, setAccaForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    courses: [] as string[],
    note: '',
  });
  const [accaSubmitStatus, setAccaSubmitStatus] = useState<string | null>(null);

  // Articles state
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<'all' | 'doanh-nghiep' | 'acca'>(
    'all'
  );

  useEffect(() => {
    const handleHashAndParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const cat = searchParams.get('category');
      if (cat === 'doanh-nghiep') {
        setSelectedBlogCategory('doanh-nghiep');
      } else if (cat === 'acca') {
        setSelectedBlogCategory('acca');
      } else {
        setSelectedBlogCategory('all');
      }
    };

    handleHashAndParams();
    window.addEventListener('popstate', handleHashAndParams);
    return () => window.removeEventListener('popstate', handleHashAndParams);
  }, []);

  // Selected course for modal details
  const [selectedCourse, setSelectedCourse] = useState<typeof courseDetails.F2 | null>(null);

  // Scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75; // Account for sticky navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle business form submit
  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessForm.fullName || !businessForm.companyName || !businessForm.phone) {
      setBusinessSubmitStatus('error');
      return;
    }
    setBusinessSubmitStatus('success');
    // Clear form after success
    setTimeout(() => {
      setBusinessForm({
        fullName: '',
        companyName: '',
        phone: '',
        need: 'Vay vốn doanh nghiệp',
        note: '',
      });
      setBusinessSubmitStatus(null);
    }, 5000);
  };

  // Handle ACCA form submit
  const handleAccaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accaForm.fullName || !accaForm.phone || !accaForm.email) {
      setAccaSubmitStatus('error');
      return;
    }
    setAccaSubmitStatus('success');
    // Clear form after success
    setTimeout(() => {
      setAccaForm({
        fullName: '',
        phone: '',
        email: '',
        courses: [],
        note: '',
      });
      setAccaSubmitStatus(null);
    }, 5000);
  };

  // Doanh nghiệp product lists
  const businessProducts = [
    {
      title: 'Vay vốn doanh nghiệp',
      slug: 'vay-von',
      icon: <Coins size={24} className="text-yellow-500" />,
      desc: 'Hỗ trợ doanh nghiệp SMEs tiếp cận nguồn vốn lớn đa dạng hình thức vay thế chấp và tín chấp.',
      items: ['Vay thế chấp', 'Vay tín chấp', 'Thấu chi doanh nghiệp'],
    },
    {
      title: 'LC & Thanh toán quốc tế',
      slug: 'lc-thanh-toan',
      icon: <FileCheck size={24} className="text-yellow-500" />,
      desc: 'Giảm thiểu rủi ro, đẩy nhanh quy trình thanh toán và phát hành thư tín dụng xuất nhập khẩu.',
      items: ['Thư tín dụng L/C', 'Chuyển tiền T/T', 'Nhờ thu bộ chứng từ'],
    },
    {
      title: 'Bảo lãnh ngân hàng',
      slug: 'bao-lanh',
      icon: <Shield size={24} className="text-yellow-500" />,
      desc: 'Nâng cao uy tín thầu, thực hiện hợp đồng với tỷ lệ ký quỹ cực thấp đến 0%.',
      items: ['Bảo lãnh dự thầu', 'Bảo lãnh thực hiện hợp đồng', 'Bảo lãnh tạm ứng'],
    },
    {
      title: 'Bảo hiểm doanh nghiệp',
      slug: 'bao-hiem',
      icon: <ShieldAlert size={24} className="text-yellow-500" />,
      desc: 'Quản trị rủi ro toàn diện cho tài sản, hàng hóa vận chuyển và bảo vệ con người.',
      items: ['Bảo hiểm cháy nổ', 'Bảo hiểm hàng hóa', 'Bảo hiểm sức khỏe nhân sự'],
    },
    {
      title: 'Thiết kế website',
      slug: 'thiet-ke-web',
      icon: <Globe size={24} className="text-yellow-500" />,
      desc: 'Số hóa doanh nghiệp bằng các hệ thống website và giải pháp phần mềm tối ưu.',
      items: ['Website giới thiệu', 'Landing page bán hàng', 'Hệ thống web app'],
    },
  ];

  // Why choose us (Doanh nghiệp)
  const businessWhy = [
    {
      title: '🤝 Am hiểu nhu cầu doanh nghiệp',
      desc: 'Đồng hành cùng doanh nghiệp trong các nhu cầu về vốn, bảo lãnh, thanh toán quốc tế và quản lý rủi ro tài chính.',
      icon: <HandshakeIcon />,
    },
    {
      title: '⚡ Tư vấn nhanh chóng, thực tiễn',
      desc: 'Đề xuất giải pháp phù hợp với từng giai đoạn phát triển, giúp doanh nghiệp tiết kiệm thời gian và tối ưu nguồn lực.',
      icon: <Sparkles className="text-yellow-500" size={24} />,
    },
    {
      title: '🏦 Kết nối hệ sinh thái tài chính',
      desc: 'Hỗ trợ doanh nghiệp tiếp cận các giải pháp tài trợ vốn, bảo lãnh, LC, bảo hiểm và các dịch vụ tài chính liên quan.',
      icon: <Globe className="text-yellow-500" size={24} />,
    },
    {
      title: '📈 Đồng hành tăng trưởng bền vững',
      desc: 'Không chỉ hỗ trợ xử lý hồ sơ, chúng tôi hướng tới việc xây dựng nền tảng tài chính vững chắc cho doanh nghiệp trong dài hạn.',
      icon: <TrendingUp className="text-yellow-500" size={24} />,
    },
  ];

  // Process Steps (Doanh nghiệp)
  const processSteps = [
    {
      title: 'Tiếp nhận nhu cầu',
      desc: 'Lắng nghe và tìm hiểu tình hình thực tế của doanh nghiệp để xác định nhu cầu về vốn, bảo lãnh, thanh toán quốc tế hoặc các giải pháp tài chính phù hợp.',
      icon: <MessageSquare size={26} />,
    },
    {
      title: 'Tư vấn giải pháp',
      desc: 'Đánh giá nhu cầu và đề xuất phương án tối ưu dựa trên đặc thù hoạt động, quy mô và mục tiêu của doanh nghiệp.',
      icon: <LightbulbIcon />,
    },
    {
      title: 'Hỗ trợ hồ sơ',
      desc: 'Đồng hành cùng doanh nghiệp trong quá trình chuẩn bị hồ sơ, rà soát chứng từ và hoàn thiện các thủ tục cần thiết.',
      icon: <FileCheck size={26} />,
    },
    {
      title: 'Triển khai & Kết nối',
      desc: 'Hỗ trợ làm việc với các đối tác liên quan, theo dõi tiến độ và đảm bảo quá trình triển khai diễn ra thuận lợi.',
      icon: <Globe size={26} />,
    },
    {
      title: 'Đồng hành lâu dài',
      desc: 'Tiếp tục hỗ trợ doanh nghiệp trong quá trình vận hành, mở rộng nhu cầu tài chính và phát triển bền vững.',
      icon: <Award size={26} />,
    },
  ];

  // Why ACCA at YT2Future
  const accaWhy = [
    {
      title: '👨‍🏫 Lớp học quy mô nhỏ, tương tác cao',
      desc: 'Mô hình đào tạo 1:1, 1:2 hoặc nhóm nhỏ giúp giảng viên theo sát tiến độ học tập, giải đáp thắc mắc kịp thời và điều chỉnh phương pháp phù hợp với từng học viên.',
    },
    {
      title: '🎯 Lộ trình học tập cá nhân hóa',
      desc: 'Mỗi học viên có xuất phát điểm và mục tiêu khác nhau. Chúng tôi tư vấn lộ trình học phù hợp dựa trên nền tảng kiến thức, quỹ thời gian và mục tiêu nghề nghiệp.',
    },
    {
      title: '💬 Đồng hành xuyên suốt quá trình học',
      desc: 'Học viên được hỗ trợ giải đáp thắc mắc trong quá trình học, luyện tập và ôn thi. Đội ngũ giảng viên luôn sẵn sàng đồng hành khi gặp khó khăn về kiến thức hoặc phương pháp học.',
    },
    {
      title: '🌐 Học trực tuyến linh hoạt',
      desc: 'Chủ động thời gian và địa điểm học tập, phù hợp với sinh viên và người đi làm bận rộn nhưng vẫn đảm bảo chất lượng tương tác giữa giảng viên và học viên.',
    },
    {
      title: '📚 Tập trung vào hiểu bản chất',
      desc: 'Không học thuộc lòng máy móc. Chương trình hướng tới việc giúp học viên hiểu bản chất kiến thức, xây dựng tư duy tài chính – kế toán và vận dụng hiệu quả trong công việc thực tế.',
    },
    {
      title: '🚀 Hướng tới mục tiêu dài hạn',
      desc: 'Không chỉ hỗ trợ vượt qua kỳ thi ACCA, YT2Future mong muốn đồng hành cùng học viên trên hành trình phát triển nghề nghiệp trong lĩnh vực Kế toán, Kiểm toán và Tài chính.',
    },
  ];

  // Courses list
  const coursesList = [
    {
      code: 'F2',
      title: 'F2 - Management Accounting',
      desc: 'Hiểu cách doanh nghiệp lập kế hoạch, kiểm soát chi phí và hỗ trợ ra quyết định quản trị.',
    },
    {
      code: 'F3',
      title: 'F3 - Financial Accounting',
      desc: 'Nắm vững nguyên lý kế toán tài chính và lập báo cáo tài chính theo chuẩn ACCA.',
    },
    {
      code: 'F7',
      title: 'F7 - Financial Reporting',
      desc: 'Phát triển kỹ năng lập và phân tích báo cáo tài chính theo chuẩn mực quốc tế.',
    },
    {
      code: 'F8',
      title: 'F8 - Audit & Assurance',
      desc: 'Hiểu quy trình kiểm toán, kiểm soát nội bộ và các nguyên tắc đảm bảo chất lượng thông tin tài chính.',
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 scroll-smooth">
      <main className="grow">
        {/* 1. HERO SECTION (Banner + 2 Cards) */}
        <section id="home" className="relative pt-12 md:pt-16 pb-16 md:pb-24 overflow-hidden">
          {/* Wave curves and Grid overlay background decoration (inspired by Image 3) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient background gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/40 via-blue-50/15 to-white" />

            {/* Elegant grid overlay for professional modern consulting feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_top,white_40%,transparent_75%)] opacity-35" />

            {/* Glowing radial background lights */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]" />
            <div className="absolute top-10 right-[-10%] w-[50%] h-[40%] bg-sky-200/30 rounded-full blur-[100px]" />

            {/* Floating decorative pulsing orbs for accent/focus */}
            <div className="absolute top-[15%] left-[5%] w-60 h-60 bg-sky-200/25 rounded-full blur-[80px] animate-pulse duration-[6000ms]" />
            <div className="absolute top-[25%] right-[10%] w-72 h-72 bg-blue-100/30 rounded-full blur-[90px] animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[20%] left-[25%] w-56 h-56 bg-indigo-50/35 rounded-full blur-[70px] animate-pulse duration-[7000ms]" />

            {/* Wave curves at the bottom */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[400px] min-h-[300px]"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Back wave */}
              <path
                d="M0 260C360 140 720 340 1080 220C1260 160 1380 200 1440 220V400H0V260Z"
                fill="url(#hero-wave-back)"
                opacity="0.75"
              />
              {/* Front wave */}
              <path
                d="M0 200C360 320 720 120 1080 240C1260 300 1380 260 1440 240V400H0V200Z"
                fill="url(#hero-wave-front)"
                opacity="0.95"
              />
              {/* Accent dashed lines */}
              <path
                d="M0 230C360 250 720 190 1080 280C1260 325 1380 290 1440 270"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                opacity="0.75"
              />
              <path
                d="M0 205C320 280 640 140 960 245C1180 320 1320 280 1440 260"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <defs>
                <linearGradient
                  id="hero-wave-back"
                  x1="720"
                  y1="120"
                  x2="720"
                  y2="400"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.15" />
                  <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <linearGradient
                  id="hero-wave-front"
                  x1="720"
                  y1="70"
                  x2="720"
                  y2="400"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="max-w-360 mx-auto px-6 md:px-12 text-center relative z-10">
            <ScrollReveal direction="up" distance={30}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] xl:text-[44px] font-extrabold mb-5 tracking-tight leading-tight text-[#1a365d] max-w-5xl mx-auto uppercase text-center px-4">
                Giải pháp tài chính cho doanh nghiệp và đào tạo{' '}
                <span className="text-yellow-500">ACCA thực chiến</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-medium text-slate-500 mb-8 tracking-wide max-w-2xl mx-auto leading-relaxed">
                Hỗ trợ doanh nghiệp về vốn, bảo lãnh, thanh toán quốc tế và đào tạo ACCA
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => scrollToSection('doanh-nghiep')}
                  className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold uppercase text-xs tracking-wider shadow-lg shadow-orange-500/20 hover:-translate-y-1 hover:scale-[1.03] hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 active:scale-98 transition-all duration-300 ease-out cursor-pointer"
                >
                  Khám phá giải pháp doanh nghiệp
                </button>
                <button
                  onClick={() => scrollToSection('dao-tao-acca')}
                  className="px-8 py-4 bg-[#1a365d] text-white rounded-xl font-bold uppercase text-xs tracking-wider shadow-lg shadow-slate-900/20 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#254b7c] hover:shadow-xl hover:shadow-[#1a365d]/40 active:scale-98 transition-all duration-300 ease-out cursor-pointer"
                >
                  Xem khóa học ACCA
                </button>
              </div>
            </ScrollReveal>

            {/* 2 Big Cards Side-by-Side with identical sizes and layout alignment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto text-left mt-10 items-stretch">
              {/* Left Card: Doanh nghiệp */}
              <ScrollReveal
                delay={0.2}
                direction="left"
                distance={30}
                className="h-full flex flex-col"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100 hover:border-orange-500/80 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch overflow-hidden relative group h-full w-full">
                  <div className="w-full md:w-3/5 flex flex-col justify-between z-10">
                    <div>
                      <h3 className="text-lg md:text-xl font-extrabold text-[#1a365d] group-hover:text-orange-500 transition-colors mb-4 uppercase tracking-tight">
                        Giải pháp doanh nghiệp
                      </h3>
                      <ul className="space-y-2.5 mb-8 min-h-[180px] flex flex-col justify-center">
                        {[
                          'Vay vốn doanh nghiệp',
                          'LC & Thanh toán quốc tế',
                          'Bảo lãnh ngân hàng',
                          'Bảo hiểm doanh nghiệp',
                          'Thiết kế website',
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => scrollToSection('doanh-nghiep')}
                      className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-orange-500 hover:gap-3 transition-all tracking-wider self-start mt-auto cursor-pointer"
                    >
                      Xem giải pháp <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Image container right side */}
                  <div className="w-full md:w-2/5 min-h-[220px] md:min-h-full relative rounded-2xl overflow-hidden shadow-inner border border-slate-100/80 shrink-0">
                    <Image
                      src="/business_solutions.png"
                      alt="Corporate illustration"
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Right Card: Đào tạo ACCA */}
              <ScrollReveal
                delay={0.4}
                direction="right"
                distance={30}
                className="h-full flex flex-col"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-100/85 hover:border-[#1a365d] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(26,54,93,0.12)] transition-all duration-300 flex flex-col md:flex-row gap-6 items-stretch overflow-hidden relative group h-full w-full">
                  <div className="w-full md:w-3/5 flex flex-col justify-between z-10">
                    <div>
                      <h3 className="text-lg md:text-xl font-extrabold text-[#1a365d] group-hover:text-yellow-500 transition-colors mb-4 uppercase tracking-tight">
                        Đào tạo ACCA
                      </h3>
                      <ul className="space-y-2.5 mb-8 min-h-[180px] flex flex-col justify-center">
                        {[
                          'F2 (Management accounting)',
                          'F3 (Financial accounting)',
                          'F7 (Financial reporting)',
                          'F8 (Audit & Assurance)',
                          'Luyện thi ngắn hạn',
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a365d] shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => scrollToSection('dao-tao-acca')}
                      className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-[#1a365d] hover:gap-3 transition-all tracking-wider self-start mt-auto cursor-pointer"
                    >
                      Xem khóa học <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Image container right side */}
                  <div className="w-full md:w-2/5 min-h-[220px] md:min-h-full relative rounded-2xl overflow-hidden shadow-inner border border-slate-100/80 shrink-0">
                    <Image
                      src="/acca_academy.png"
                      alt="ACCA academy illustration"
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 2. SECTION 2: DOANH NGHIỆP */}
        <section
          id="doanh-nghiep"
          className="relative py-16 md:py-24 bg-gradient-to-tr from-sky-100/35 via-blue-50/15 to-white overflow-hidden text-left border-t border-slate-100 z-0"
        >
          {/* Section 2 Background accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
            {/* Elegant grid overlay matching Section 1 in scale and opacity */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(circle_at_center,white_40%,transparent_75%)] opacity-35" />

            {/* Glowing background highlights */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-amber-200/20 rounded-full blur-[100px]" />
            <div className="absolute top-10 right-[-10%] w-[50%] h-[40%] bg-sky-200/25 rounded-full blur-[100px]" />

            {/* Floating decorative pulsing orbs */}
            <div className="absolute top-[15%] left-[5%] w-60 h-60 bg-amber-200/20 rounded-full blur-[80px] animate-pulse duration-[6000ms]" />
            <div className="absolute top-[25%] right-[10%] w-72 h-72 bg-sky-100/25 rounded-full blur-[90px] animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[20%] left-[25%] w-56 h-56 bg-orange-50/30 rounded-full blur-[70px] animate-pulse duration-[7000ms]" />

            {/* Elegant wavy lines pattern representing financial/growth graphs */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[400px] min-h-[300px]"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 230C360 150 720 290 1080 200C1260 160 1380 190 1440 200"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                opacity="0.75"
              />
              <path
                d="M0 205C320 280 640 140 960 245C1180 320 1320 280 1440 260"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10">
            {/* Header Block */}
            <ScrollReveal>
              <div className="mb-16 border-l-4 md:border-l-8 border-[#1a365d] pl-4 md:pl-6">
                <span className="text-xs sm:text-sm font-extrabold text-orange-500 uppercase tracking-widest">
                  Giải pháp cho Doanh nghiệp
                </span>
                <h3 className="font-extrabold text-[#1a365d] text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-tight mt-1">
                  Danh mục sản phẩm <span className="text-yellow-500">& Dịch vụ</span>
                </h3>
              </div>
            </ScrollReveal>

            {/* 6 Product Cards with Hover Dropdown lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {businessProducts.map((prod, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.15}>
                  <Link
                    href={`/services/${prod.slug}`}
                    className="relative block group bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:border-slate-200 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden lg:h-[280px] flex flex-col justify-between cursor-pointer border-l-4 border-l-slate-100 hover:border-l-orange-500"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#1a365d] group-hover:bg-[#1a365d] group-hover:text-white transition-all duration-300">
                        {prod.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold uppercase text-[#1a365d] tracking-tight">
                        {prod.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 lg:group-hover:opacity-0 transition-opacity duration-200 leading-relaxed font-medium">
                        {prod.desc}
                      </p>
                    </div>

                    {/* Sub-items list: on mobile it shows in normal flow; on desktop it slides up on hover */}
                    <div className="mt-4 lg:mt-0 lg:absolute lg:inset-x-6 lg:bottom-6 lg:translate-y-[120%] lg:group-hover:translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ease-out bg-white flex flex-col gap-2 pt-4 border-t border-slate-100">
                      {prod.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Tại sao chọn YT2Future? - Split Layout version */}
            <div className="mt-24 mb-20 relative z-10">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h4 className="font-extrabold text-[#1a365d] text-2xl sm:text-3xl uppercase tracking-tight">
                    Tại sao chọn <span className="text-yellow-500">YT2Future</span>?
                  </h4>
                  <div className="w-12 h-1.5 bg-yellow-500 mx-auto mt-2"></div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                {/* Left Side: Stats & Credibility Card */}
                <div className="lg:col-span-5 flex flex-col">
                  <ScrollReveal className="h-full" delay={0.1} direction="left" distance={30}>
                    <div className="bg-gradient-to-br from-[#1a365d] to-[#0f172a] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full relative overflow-hidden border border-slate-800">
                      {/* Background accent */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />

                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-yellow-500 block mb-2">
                          Cam kết uy tín
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-4">
                          Đồng hành cùng sự phát triển của doanh nghiệp
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium">
                          YT2Future là đối tác hỗ trợ các giải pháp tài chính toàn diện, giúp các
                          doanh nghiệp tối ưu dòng vốn, quản lý rủi ro và chuyển đổi số hiệu quả.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                          <span className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                            Chuyên nghiệp
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                          <span className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                            Tận tâm
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                          <span className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                            Thực tế
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                          <span className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                            Hiệu quả
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Side: Key Benefits list */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {businessWhy.map((why, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.15} direction="right" distance={30}>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-5">
                        <div className="w-12 h-12 bg-[#1a365d]/5 text-[#1a365d] rounded-xl flex items-center justify-center shrink-0">
                          {why.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base font-extrabold text-[#1a365d] uppercase tracking-tight">
                            {why.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                            {why.desc}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quy trình làm việc - Full Width Background */}
          <div className="mb-24 w-full relative bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] py-20 border-y border-slate-800 overflow-hidden z-10">
            {/* Background accents matching grid style */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
              <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10 text-center">
              <ScrollReveal>
                <div className="mb-12">
                  <h4 className="font-extrabold text-white text-2xl sm:text-3xl uppercase tracking-tight">
                    Quy trình làm việc
                  </h4>
                  <div className="w-12 h-1.5 bg-yellow-500 mx-auto mt-2"></div>
                </div>
              </ScrollReveal>

              <div className="relative w-full mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch relative z-10">
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="relative flex flex-col h-full">
                      {/* Step card */}
                      <div className="w-full bg-[#1f2937]/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/60 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group border-t-4 border-t-yellow-500 hover:border-t-orange-500 relative overflow-hidden">
                        {/* Huge Step Indicator */}
                        <div className="absolute top-4 right-4 text-xs font-black bg-slate-800 text-yellow-500 px-2.5 py-1 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors select-none font-mono">
                          Bước 0{idx + 1}
                        </div>

                        <div className="space-y-4 relative z-10 text-left pt-2">
                          {/* Icon wrapper */}
                          <div className="w-12 h-12 bg-slate-800 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-slate-900 rounded-xl flex items-center justify-center transition-all duration-300">
                            {step.icon}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-extrabold text-sm sm:text-base text-white uppercase tracking-tight group-hover:text-yellow-500 transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Connector arrow (Chevron) */}
                      {idx < processSteps.length - 1 && (
                        <>
                          {/* Desktop arrow */}
                          <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 bg-slate-800 border border-slate-700 rounded-full w-8 h-8 items-center justify-center shadow-md text-white hover:text-yellow-500 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                          {/* Mobile arrow */}
                          <div className="flex lg:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 bg-slate-800 border border-slate-700 rounded-full w-8 h-8 items-center justify-center shadow-md text-white rotate-90">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10 mt-24">
            {/* Yêu cầu tư vấn Form */}
            <ScrollReveal>
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col lg:flex-row items-stretch">
                {/* Left Column: Dark Banner (5/12 width) */}
                <div className="lg:w-5/12 bg-gradient-to-br from-[#1a365d] to-[#0f172a] text-white p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />

                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-yellow-500 shadow-inner">
                      <MessageSquare className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                        Yêu cầu tư vấn
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium">
                        Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc.
                      </p>
                    </div>

                    <ul className="space-y-3 pt-4 border-t border-slate-800">
                      {[
                        'Hỗ trợ tiếp cận nguồn vốn & hạn mức tín dụng ưu đãi',
                        'Giải pháp bảo lãnh, LC & thanh toán quốc tế toàn diện',
                        'Đồng hành may đo giải pháp tài chính cho từng doanh nghiệp',
                      ].map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-medium leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-12 relative z-10">
                    YT2Future
                  </div>
                </div>

                {/* Right Column: White Form Fields (7/12 width) */}
                <div className="lg:w-7/12 p-6 sm:p-8 md:p-12 bg-white flex flex-col justify-center">
                  <form onSubmit={handleBusinessSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                          Họ và Tên *
                        </label>
                        <input
                          type="text"
                          required
                          value={businessForm.fullName}
                          onChange={(e) =>
                            setBusinessForm({ ...businessForm, fullName: e.target.value })
                          }
                          placeholder="Nhập họ và tên..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400 font-semibold shadow-sm"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                          Tên Doanh nghiệp *
                        </label>
                        <input
                          type="text"
                          required
                          value={businessForm.companyName}
                          onChange={(e) =>
                            setBusinessForm({ ...businessForm, companyName: e.target.value })
                          }
                          placeholder="Nhập tên doanh nghiệp..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400 font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          value={businessForm.phone}
                          onChange={(e) =>
                            setBusinessForm({ ...businessForm, phone: e.target.value })
                          }
                          placeholder="Nhập số điện thoại..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400 font-semibold shadow-sm"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                          Nhu cầu tư vấn *
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={businessForm.need}
                            onChange={(e) =>
                              setBusinessForm({ ...businessForm, need: e.target.value })
                            }
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer appearance-none font-semibold shadow-sm"
                          >
                            <option value="Vay vốn doanh nghiệp">Vay vốn doanh nghiệp</option>
                            <option value="Bảo lãnh ngân hàng">Bảo lãnh ngân hàng</option>
                            <option value="LC & Thanh toán quốc tế">LC & Thanh toán quốc tế</option>
                            <option value="Bộ chứng từ XNK">Bộ chứng từ XNK</option>
                            <option value="Bảo hiểm doanh nghiệp">Bảo hiểm doanh nghiệp</option>
                            <option value="Thiết kế website">Thiết kế website</option>
                            <option value="Khác">Khác</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                        Nội dung chi tiết / Ghi chú
                      </label>
                      <textarea
                        value={businessForm.note}
                        onChange={(e) => setBusinessForm({ ...businessForm, note: e.target.value })}
                        placeholder="Nhập nội dung chi tiết hoặc lời nhắn của quý khách..."
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400 font-semibold shadow-sm resize-none"
                      />
                    </div>

                    {businessSubmitStatus === 'success' && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-600 text-xs font-bold text-left">
                        <CheckCircle size={18} />
                        <span>
                          Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với quý khách{' '}
                          {businessForm.fullName} trong thời gian sớm nhất.
                        </span>
                      </div>
                    )}

                    {businessSubmitStatus === 'error' && (
                      <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-600 text-xs font-bold text-left">
                        <HelpCircle size={18} />
                        <span>Vui lòng điền đầy đủ các thông tin bắt buộc.</span>
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/30 active:scale-98 transition-all duration-300 ease-out cursor-pointer"
                      >
                        Gửi yêu cầu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. SECTION 3: CÁ NHÂN (ĐÀO TẠO ACCA) */}
        <section
          id="dao-tao-acca"
          className="relative py-16 md:py-24 bg-gradient-to-tr from-sky-100/35 via-blue-50/15 to-white overflow-hidden text-left border-t border-slate-100 z-0"
        >
          {/* Section 3 Background accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
            {/* Elegant grid overlay matching Section 1 in scale and opacity */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_top_right,white_40%,transparent_75%)] opacity-35" />

            {/* Glowing radial background lights */}
            <div className="absolute top-1/3 right-[-10%] w-[55%] h-[50%] bg-indigo-200/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 left-[-10%] w-[45%] h-[45%] bg-sky-200/25 rounded-full blur-[100px]" />

            {/* Floating decorative pulsing orbs */}
            <div className="absolute top-[15%] left-[5%] w-60 h-60 bg-indigo-200/20 rounded-full blur-[80px] animate-pulse duration-[6000ms]" />
            <div className="absolute top-[25%] right-[10%] w-72 h-72 bg-sky-100/25 rounded-full blur-[90px] animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[20%] left-[25%] w-56 h-56 bg-blue-50/35 rounded-full blur-[70px] animate-pulse duration-[7000ms]" />

            {/* Elegant wavy lines pattern representing financial/growth graphs */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[400px] min-h-[300px]"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 230C360 150 720 290 1080 200C1260 160 1380 190 1440 200"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                opacity="0.75"
              />
              <path
                d="M0 205C320 280 640 140 960 245C1180 320 1320 280 1440 260"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
          </div>
          <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10">
            {/* Header Block */}
            <ScrollReveal>
              <div className="mb-12 border-l-4 md:border-l-8 border-[#1a365d] pl-4 md:pl-6">
                <span className="text-xs sm:text-sm font-extrabold text-blue-600 uppercase tracking-widest">
                  Đào tạo nghề nghiệp
                </span>
                <h3 className="font-extrabold text-[#1a365d] text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-tight mt-1">
                  Đào tạo ACCA <span className="text-yellow-500">Thực chiến</span>
                </h3>
              </div>
            </ScrollReveal>

            {/* Tại sao lựa chọn học ACCA tại YT2Future */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 mb-20">
              <ScrollReveal>
                <h4 className="font-extrabold text-lg sm:text-xl md:text-2xl text-[#1a365d] uppercase tracking-tight mb-4 text-center md:text-left">
                  Tại sao lựa chọn học ACCA tại YT2Future?
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed font-medium mb-12 max-w-4xl border-l-2 border-yellow-500 pl-4">
                  YT2Future mang đến mô hình đào tạo ACCA trực tuyến linh hoạt, tập trung vào sự
                  đồng hành và cá nhân hóa theo nhu cầu của từng học viên. Chúng tôi không chỉ giúp
                  học viên hiểu kiến thức để vượt qua kỳ thi mà còn hướng tới khả năng vận dụng vào
                  học tập và công việc thực tế.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accaWhy.map((item, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1} direction="up" distance={20}>
                    <div className="space-y-3 p-2">
                      <h5 className="font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#1a365d] flex items-center gap-2">
                        {item.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Các môn học đào tạo */}
            <div className="mb-20">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h4 className="font-extrabold text-[#1a365d] text-lg sm:text-xl md:text-2xl uppercase tracking-tight">
                    Các môn học đào tạo
                  </h4>
                  <div className="w-12 h-1.5 bg-yellow-500 mx-auto mt-2"></div>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coursesList.map((course, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.15}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md flex flex-col justify-between md:h-[260px] hover:shadow-xl transition-all duration-300 group">
                      <div className="space-y-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#1a365d] font-black rounded-lg flex items-center justify-center text-sm group-hover:bg-[#1a365d] group-hover:text-white transition-colors duration-300">
                          {course.code}
                        </div>
                        <h4 className="text-base font-extrabold text-[#1a365d] uppercase leading-tight group-hover:text-yellow-500 transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-[13px] text-slate-500 line-clamp-3 leading-relaxed font-medium">
                          {course.desc}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedCourse(
                            courseDetails[course.code as keyof typeof courseDetails]
                          )
                        }
                        className="text-xs font-bold uppercase text-[#1a365d] hover:text-orange-500 flex items-center gap-1.5 self-start mt-4 tracking-wider transition-colors cursor-pointer"
                      >
                        [ Xem chi tiết ]
                      </button>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>{' '}
          {/* Closes max-w-360 container */}
          {/* Đối tượng phù hợp - Full Width Background */}
          <div className="w-full bg-gradient-to-r from-[#1a365d] to-[#0f172a] py-16 md:py-20 border-y border-slate-800 text-white my-20 relative z-10">
            <div className="max-w-360 mx-auto px-6 md:px-12">
              <ScrollReveal>
                <h4 className="font-extrabold text-lg sm:text-xl uppercase tracking-tight mb-8 text-center md:text-left text-yellow-500">
                  Đối tượng phù hợp
                </h4>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  'Sinh viên ngành Kế toán, Kiểm toán, Tài chính',
                  'Người mới bắt đầu tìm hiểu ACCA',
                  'Người đi làm muốn nâng cao chuyên môn',
                  'Ứng viên hướng tới Big4 và các vị trí tài chính chuyên nghiệp',
                ].map((item, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.15} direction="up" distance={15}>
                    <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/40 flex items-start gap-3 h-full hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300">
                      <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 mt-0.5">
                        <Check size={14} />
                      </div>
                      <p className="text-xs md:text-sm font-bold text-gray-200 leading-normal">
                        {item}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION 4: BÀI VIẾT */}
        <section
          id="bai-viet"
          className="relative py-16 md:py-24 bg-gradient-to-tr from-sky-100/35 via-blue-50/15 to-white overflow-hidden text-left border-t border-slate-100 z-0"
        >
          {/* Section 4 Background accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
            {/* Elegant grid overlay matching Section 1 in scale and opacity */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_bottom,white_40%,transparent_75%)] opacity-35" />

            {/* Glowing radial background lights */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[45%] bg-orange-200/20 rounded-full blur-[100px]" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[45%] bg-blue-200/20 rounded-full blur-[100px]" />

            {/* Floating decorative pulsing orbs */}
            <div className="absolute top-[15%] left-[5%] w-60 h-60 bg-orange-200/20 rounded-full blur-[80px] animate-pulse duration-[6000ms]" />
            <div className="absolute top-[25%] right-[10%] w-72 h-72 bg-blue-100/25 rounded-full blur-[90px] animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[20%] left-[25%] w-56 h-56 bg-sky-50/35 rounded-full blur-[70px] animate-pulse duration-[7000ms]" />

            {/* Elegant wavy lines pattern representing financial/growth graphs */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[400px] min-h-[300px]"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 230C360 150 720 290 1080 200C1260 160 1380 190 1440 200"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                opacity="0.75"
              />
              <path
                d="M0 205C320 280 640 140 960 245C1180 320 1320 280 1440 260"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10">
            {/* Header Block */}
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-4">
                  <h3 className="font-extrabold text-[#1a365d] text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
                    Bài viết nổi bật
                  </h3>

                  {/* Category Filter Tabs */}
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'all', label: 'Tất cả bài viết' },
                      { id: 'doanh-nghiep', label: 'Tài chính doanh nghiệp' },
                      { id: 'acca', label: 'ACCA & Kế toán' },
                    ].map((tab) => {
                      const isActive = selectedBlogCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedBlogCategory(tab.id as any)}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'bg-[#1a365d] text-white shadow-md shadow-[#1a365d]/20 scale-[1.02]'
                              : 'bg-white text-[#1a365d] border border-slate-100 hover:bg-slate-50'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="/sector"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg shadow-yellow-500/20 active:scale-95 self-start md:self-end"
                >
                  Xem tất cả
                </Link>
              </div>
            </ScrollReveal>

            {/* Carousel Container */}
            <ScrollReveal delay={0.2}>
              <div className="relative px-4 md:px-0">
                {/* Left Navigation Button */}
                <button
                  onClick={scrollLeft}
                  className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-slate-50 text-slate-700 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Right Navigation Button */}
                <button
                  onClick={scrollRight}
                  className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-slate-50 text-slate-700 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Cards Wrapper */}
                <div
                  ref={sliderRef}
                  className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {(() => {
                    const filtered = mockBlogs.filter(
                      (blog) =>
                        selectedBlogCategory === 'all' || blog.category === selectedBlogCategory
                    );
                    if (filtered.length === 0) {
                      return (
                        <div className="w-full py-16 text-center text-slate-400 font-bold text-sm bg-white rounded-3xl border border-dashed border-slate-200">
                          Chưa có bài viết nào trong chuyên mục này.
                        </div>
                      );
                    }
                    return filtered.map((blog) => (
                      <div
                        key={blog.id}
                        className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] snap-start group cursor-pointer bg-white p-4 rounded-3xl border border-slate-100/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[16/10] relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                            <Image
                              src={blog.thumbnail}
                              alt={blog.title}
                              fill
                              sizes="(max-width: 768px) 280px, 340px"
                              className="object-cover group-hover:scale-103 transition-transform duration-500"
                            />
                          </div>
                          <div className="mt-4 flex flex-col text-left">
                            <h4 className="font-extrabold text-[#1a365d] text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-yellow-500 transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                              {blog.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-yellow-500" />
                            <span>{blog.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#1a365d] group-hover:text-yellow-500 transition-colors">
                            <span>Đọc tiếp</span>
                            <ArrowRight
                              size={12}
                              className="group-hover:translate-x-0.5 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. SECTION 5: ĐĂNG KÝ TƯ VẤN ACCA */}
        <section
          id="dang-ky-acca"
          className="relative py-16 md:py-24 bg-gradient-to-tr from-sky-100/35 via-blue-50/15 to-white overflow-hidden text-left border-t border-slate-100 z-0"
        >
          {/* Section Background accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-10]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_top_right,white_40%,transparent_75%)] opacity-35" />

            {/* Glowing radial background lights */}
            <div className="absolute top-1/3 right-[-10%] w-[55%] h-[50%] bg-indigo-200/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 left-[-10%] w-[45%] h-[45%] bg-sky-200/25 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal>
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col lg:flex-row items-stretch text-left">
                {/* Left Column: White Form Fields (7/12 width) - order-2 on mobile, order-1 on lg */}
                <div className="lg:w-7/12 p-6 sm:p-8 md:p-12 bg-white flex flex-col justify-center order-2 lg:order-1">
                  <form onSubmit={handleAccaSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          required
                          value={accaForm.fullName}
                          onChange={(e) => setAccaForm({ ...accaForm, fullName: e.target.value })}
                          placeholder="Nhập họ và tên..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-[#1a365d] focus:bg-white focus:ring-4 focus:ring-[#1a365d]/10 transition-all placeholder-slate-400 font-semibold shadow-sm"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          required
                          value={accaForm.phone}
                          onChange={(e) => setAccaForm({ ...accaForm, phone: e.target.value })}
                          placeholder="Nhập số điện thoại..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-[#1a365d] focus:bg-white focus:ring-4 focus:ring-[#1a365d]/10 transition-all placeholder-slate-400 font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={accaForm.email}
                        onChange={(e) => setAccaForm({ ...accaForm, email: e.target.value })}
                        placeholder="Nhập email..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-[#1a365d] focus:bg-white focus:ring-4 focus:ring-[#1a365d]/10 transition-all placeholder-slate-400 font-semibold shadow-sm"
                      />
                    </div>

                    <div className="space-y-3 text-left">
                      <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                        Môn học quan tâm *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 sm:gap-3 mt-2">
                        {[
                          'F2 - Management Accounting',
                          'F3 - Financial Accounting',
                          'F7 - Financial Reporting',
                          'F8 - Audit & Assurance',
                          'Chưa xác định',
                        ].map((courseName) => {
                          const isChecked = accaForm.courses.includes(courseName);
                          return (
                            <label
                              key={courseName}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-[#1a365d]/5 border-[#1a365d] text-[#1a365d]'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                              } font-semibold text-xs sm:text-sm`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  const updatedCourses = isChecked
                                    ? accaForm.courses.filter((c) => c !== courseName)
                                    : [...accaForm.courses, courseName];
                                  setAccaForm({ ...accaForm, courses: updatedCourses });
                                }}
                                className="rounded border-slate-300 text-[#1a365d] focus:ring-[#1a365d]"
                              />
                              <span>{courseName}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-xs font-extrabold text-[#1a365d] uppercase tracking-wider block">
                        Nội dung chi tiết / Ghi chú
                      </label>
                      <textarea
                        value={accaForm.note}
                        onChange={(e) => setAccaForm({ ...accaForm, note: e.target.value })}
                        placeholder="Nhập nội dung chi tiết hoặc lời nhắn của quý khách..."
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 outline-none focus:border-[#1a365d] focus:bg-white focus:ring-4 focus:ring-[#1a365d]/10 transition-all placeholder-slate-400 font-semibold shadow-sm resize-none"
                      />
                    </div>

                    {accaSubmitStatus === 'success' && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-600 text-xs font-bold">
                        <CheckCircle size={18} />
                        <span>
                          Đăng ký thành công! Đội ngũ tư vấn sẽ liên hệ lại với quý khách trong vòng
                          24 giờ làm việc.
                        </span>
                      </div>
                    )}

                    {accaSubmitStatus === 'error' && (
                      <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-600 text-xs font-bold">
                        <HelpCircle size={18} />
                        <span>Vui lòng nhập đầy đủ các thông tin bắt buộc.</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#1a365d] hover:bg-[#254b7c] text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-lg shadow-[#1a365d]/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1a365d]/30 active:scale-98 transition-all duration-300 ease-out cursor-pointer"
                      >
                        Đăng ký tư vấn
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Column: Dark Banner (5/12 width) - order-1 on mobile, order-2 on lg */}
                <div className="lg:w-5/12 bg-gradient-to-br from-[#1a365d] to-[#0f172a] text-white p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden order-1 lg:order-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl" />

                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-yellow-500 shadow-inner">
                      <MessageSquare className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                        Đăng ký tư vấn khóa học
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium">
                        Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc.
                      </p>
                    </div>

                    <ul className="space-y-3 pt-4 border-t border-slate-800">
                      {[
                        'Tư vấn lộ trình học cá nhân hóa phù hợp',
                        'Giải đáp thắc mắc về chương trình đào tạo',
                        'Nhận ưu đãi học phí hấp dẫn khi đăng ký sớm',
                      ].map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-medium leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-12 relative z-10">
                    YT2Future Academy
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* 5. COURSE SYLLABUS MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-[#1a365d] text-white px-6 py-4 flex justify-between items-center border-b border-slate-900">
              <span className="text-xs uppercase tracking-widest font-black flex items-center gap-2 text-yellow-500">
                <BookOpenCheck size={18} /> Chi tiết môn học {selectedCourse.code}
              </span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-white hover:rotate-90 transition-transform p-1 rounded-lg"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              <div>
                <h3 className="text-lg font-black text-[#1a365d] uppercase leading-tight">
                  {selectedCourse.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  {selectedCourse.objective}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                  Nội dung chương trình đào tạo:
                </h4>
                <ul className="space-y-2.5">
                  {selectedCourse.curriculum.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2.5 text-xs text-slate-700 leading-normal font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-[#1a365d] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  scrollToSection('dao-tao-acca');
                  // Pre-populate checkbox
                  const fullNameInput = document.querySelector(
                    'input[placeholder="Nhập họ và tên..."]'
                  ) as HTMLInputElement;
                  if (fullNameInput) {
                    fullNameInput.focus();
                  }
                }}
                className="px-6 py-2.5 bg-[#1a365d] text-white text-xs font-bold uppercase rounded-lg shadow-md tracking-wider hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#254b7c] hover:shadow-lg hover:shadow-[#1a365d]/25 active:scale-98 transition-all duration-300 ease-out cursor-pointer"
              >
                Đăng ký học ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Custom simple icons to avoid extra dependencies or missing modules
function HandshakeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}
