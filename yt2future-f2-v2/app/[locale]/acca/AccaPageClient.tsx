'use client';

import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Link from '@/components/common/Link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export default function AccaPageClient() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  const accaCourses = [
    {
      title: isVi ? 'Lộ trình ACCA trọn gói' : 'ACCA Full Roadmap',
      slug: 'lo-trinh-acca',
      pill: isVi ? 'Tiết kiệm 25%' : 'Save 25%',
      icon: <Award size={28} className="text-amber-400" />,
      leftStatLabel: isVi ? '⚡ THỜI LƯỢNG' : '⚡ DURATION',
      leftStatValue: isVi ? 'Hơn 150 Giờ' : 'Over 150 Hours',
      rightStatLabel: isVi ? '👥 SĨ SỐ LỚP' : '👥 CLASS SIZE',
      rightStatValue: isVi ? 'Tối đa 15 HV' : 'Max 15 Stud.',
      details: [
        { label: isVi ? 'Khóa học bao gồm' : 'Modules Included', value: 'Combo F2, F3, F7, F8' },
        {
          label: isVi ? 'Đội ngũ giảng viên' : 'Syllabus Instructors',
          value: 'Big 4 Managers & FCCA',
        },
        {
          label: isVi ? 'Cam kết đầu ra' : 'Pass Guarantee',
          value: isVi ? 'Hỗ trợ học lại miễn phí' : 'Free Retake Option',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Lộ trình học tối ưu hóa từ nền tảng đến báo cáo và kiểm toán thực tế.'
            : 'Optimized roadmap integrating basic bookkeeping with real-world auditing.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Phù hợp cho sinh viên năm 1, 2 và người đi làm trái ngành muốn chuyển hướng.'
            : 'Perfect for 1st/2nd-year students and career switchers starting from scratch.',
        },
      ],
    },
    {
      title: isVi ? 'F2 - Kế toán quản trị' : 'F2 - Management Accounting',
      slug: 'f2',
      pill: isVi ? 'Mở lớp: 15/06' : 'Starts: Jun 15',
      icon: <TrendingUp size={28} className="text-amber-400" />,
      leftStatLabel: isVi ? '⚡ THỜI LƯỢNG' : '⚡ DURATION',
      leftStatValue: isVi ? '36 Giờ học' : '36 Class Hours',
      rightStatLabel: isVi ? '📅 KHAI GIẢNG' : '📅 START DATE',
      rightStatValue: isVi ? '15/06/2026' : 'Jun 15, 2026',
      details: [
        { label: isVi ? 'Môn học ACCA' : 'ACCA Module', value: 'Management Accounting (MA)' },
        { label: isVi ? 'Hình thức đào tạo' : 'Learning Mode', value: 'Zoom Live + Record' },
        {
          label: isVi ? 'Tài liệu đi kèm' : 'Course Material',
          value: 'BPP Text & Kit',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Làm chủ kỹ năng lập ngân sách dự toán, tính giá thành và hỗ trợ ra quyết định.'
            : 'Master cost estimations, corporate budgeting, and performance measurement.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Giảng dạy dễ hiểu, giúp học viên tự tin vượt qua kỳ thi trắc nghiệm trên máy.'
            : 'Simplifies quantitative concepts to prepare students for computer-based tests.',
        },
      ],
    },
    {
      title: isVi ? 'F3 - Kế toán tài chính' : 'F3 - Financial Accounting',
      slug: 'f3',
      pill: isVi ? 'Học nhiều nhất' : 'Most Popular',
      icon: <BookOpen size={28} className="text-amber-400" />,
      leftStatLabel: isVi ? '⚡ THỜI LƯỢNG' : '⚡ DURATION',
      leftStatValue: isVi ? '40 Giờ học' : '40 Class Hours',
      rightStatLabel: isVi ? '📅 KHAI GIẢNG' : '📅 START DATE',
      rightStatValue: isVi ? 'Thường xuyên' : 'Regularly',
      details: [
        { label: isVi ? 'Môn học ACCA' : 'ACCA Module', value: 'Financial Accounting (FA)' },
        { label: isVi ? 'Hình thức đào tạo' : 'Learning Mode', value: 'Zoom Live + Record' },
        {
          label: isVi ? 'Bộ từ vựng Anh-Việt' : 'English Glossary',
          value: isVi ? 'Tặng kèm miễn phí' : 'Included Free',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Nắm vững nguyên lý ghi sổ kép, các bút toán điều chỉnh và lập báo cáo tài chính.'
            : 'Understand double-entry bookkeeping, adjusting entries, and core reporting.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Môn học cốt lõi quan trọng nhất cho mọi lộ trình Kế toán - Kiểm toán quốc tế.'
            : 'The most critical foundation module for all global finance and audit careers.',
        },
      ],
    },
    {
      title: isVi ? 'F7 - Báo cáo tài chính' : 'F7 - Financial Reporting',
      slug: 'f7',
      pill: isVi ? 'Chuẩn IFRS' : 'IFRS Native',
      icon: <BookOpenCheck size={28} className="text-amber-400" />,
      leftStatLabel: isVi ? '⚡ THỜI LƯỢNG' : '⚡ DURATION',
      leftStatValue: isVi ? '48 Giờ học' : '48 Class Hours',
      rightStatLabel: isVi ? '📅 KHAI GIẢNG' : '📅 START DATE',
      rightStatValue: isVi ? 'Liên hệ nhận lịch' : 'Contact for schedule',
      details: [
        { label: isVi ? 'Môn học ACCA' : 'ACCA Module', value: 'Financial Reporting (FR)' },
        {
          label: isVi ? 'Kỹ thuật viết luận' : 'Written Focus',
          value: isVi ? 'Chấm bài Section C' : 'Section C Review',
        },
        {
          label: isVi ? 'Chuẩn mực quốc tế' : 'IFRS Standard',
          value: isVi ? 'Hơn 15 IAS/IFRS chính' : '15+ Core Standards',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Học cách lập báo cáo tài chính hợp nhất tập đoàn nhiều chi nhánh theo IFRS.'
            : 'Learn consolidated statement preparation for multi-subsidiary groups under IFRS.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Trực tiếp phân tích chỉ số tài chính doanh nghiệp để làm báo cáo thực tế.'
            : 'Perform practical ratio analysis to evaluate actual corporate statements.',
        },
      ],
    },
    {
      title: isVi ? 'F8 - Kiểm toán & Dịch vụ đảm bảo' : 'F8 - Audit and Assurance',
      slug: 'f8',
      pill: isVi ? 'Luyện thi Big 4' : 'Big 4 Prep',
      icon: <Users size={28} className="text-amber-400" />,
      leftStatLabel: isVi ? '⚡ THỜI LƯỢNG' : '⚡ DURATION',
      leftStatValue: isVi ? '42 Giờ học' : '42 Class Hours',
      rightStatLabel: isVi ? '📅 KHAI GIẢNG' : '📅 START DATE',
      rightStatValue: isVi ? 'Liên hệ nhận lịch' : 'Contact for schedule',
      details: [
        { label: isVi ? 'Môn học ACCA' : 'ACCA Module', value: 'Audit and Assurance (AA)' },
        { label: isVi ? 'Giảng viên' : 'Instructor', value: 'Big 4 Audit Managers' },
        {
          label: isVi ? 'Kỹ năng thực hành' : 'Practical Skill',
          value: isVi ? 'Thiết kế thủ tục kiểm toán' : 'Audit Procedure Writing',
          highlight: true,
        },
      ],
      bullets: [
        {
          type: 'check',
          text: isVi
            ? 'Thấu hiểu quy trình kiểm soát nội bộ và kỹ năng nhận diện rủi ro kiểm toán.'
            : 'Identify internal control weaknesses and audit risks in case scenarios.',
        },
        {
          type: 'dot',
          text: isVi
            ? 'Trang bị tư duy độc lập và kỹ năng viết bài chuẩn xác ăn điểm phòng thi.'
            : 'Build professional skepticism and formulaic writing to hit exam marking guides.',
        },
      ],
    },
  ];

  const highlights = [
    {
      icon: <GraduationCap size={24} className="text-yellow-500" />,
      title: isVi ? '100% Giảng viên Big 4' : '100% Big 4 Instructors',
      description: isVi
        ? 'Đội ngũ giảng viên giàu kinh nghiệm thực chiến từ các tập đoàn kiểm toán hàng đầu.'
        : 'Experienced professionals from top global audit and advisory firms.',
    },
    {
      icon: <Users size={24} className="text-yellow-500" />,
      title: isVi ? 'Tương tác cao (Max 15 HV)' : 'Interactive (Max 15 Stud.)',
      description: isVi
        ? 'Lớp học sĩ số nhỏ giúp giảng viên sát sao và hỗ trợ từng học viên hiệu quả nhất.'
        : 'Small class size ensures personalized feedback and active support.',
    },
    {
      icon: <ShieldCheck size={24} className="text-yellow-500" />,
      title: isVi ? 'Cam kết hỗ trợ đầu ra' : 'Pass Guarantee',
      description: isVi
        ? 'Hỗ trợ học lại miễn phí nếu thi chưa đạt điểm mong muốn.'
        : 'Free course retake support until you successfully pass the exam.',
    },
    {
      icon: <HelpCircle size={24} className="text-yellow-500" />,
      title: isVi ? 'Tư vấn lộ trình 1-1' : '1-on-1 Roadmap Planning',
      description: isVi
        ? 'Định hướng học tập và ôn tập phù hợp với năng lực và mục tiêu nghề nghiệp.'
        : 'Personalized study and career path planning tailored to your goals.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-left relative overflow-hidden">
      <PageHeader title={isVi ? 'Đào tạo ACCA' : 'ACCA Training'} />

      {/* Premium Hero Section with Gradient Background and Image */}
      <section className="relative w-full bg-gradient-to-br from-[#001a41] via-[#08224d] to-[#123062] text-white py-16 md:py-24 overflow-hidden border-b border-gray-800 animate-fadeIn">
        {/* Geometric Background Decorative Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />

        <div className="max-w-360 mx-auto px-6 sm:px-8 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-500 text-xs font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                {isVi ? 'Đào tạo ACCA thực chiến' : 'ACCA Practical Training'}
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase">
                {isVi
                  ? 'Kiến tạo sự nghiệp tài chính toàn cầu'
                  : 'Shape Your Global Finance Career'}
              </h2>

              <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed max-w-2xl">
                {isVi
                  ? 'Chương trình đào tạo ACCA thực chiến tại YT Insights kết hợp tư duy phân tích sâu sắc. Giảng dạy trực tiếp bởi đội ngũ chuyên gia Big 4 giàu kinh nghiệm, lớp học giới hạn sĩ số để tối ưu tương tác, tập trung hiểu sâu bản chất nghiệp vụ để thi đậu và áp dụng trực tiếp vào công việc.'
                  : 'Our practical ACCA courses at YT Insights combine analytical thinking with practical application. Led by Big 4 professionals in small group classes, we focus on deep conceptual understanding to guarantee passing scores and actual workplace success.'}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full">
                <a
                  href="#course-list"
                  className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
                >
                  {isVi ? 'Xem các khoá học' : 'Explore Courses'}
                  <ArrowRight size={14} />
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:bg-white/5 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isVi ? 'Tư vấn lộ trình' : 'Get Roadmap Advice'}
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Image with Premium Frame */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#031530] flex items-center justify-center">
              <Image
                src="/acca_academy.png"
                alt="ACCA Academy"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Gold gradient border overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-white py-12 border-b border-slate-100 relative z-20 -mt-6 max-w-340 mx-auto w-[calc(100%-2rem)] rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {highlights.map((hl, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-600 shrink-0 border border-yellow-500/20">
              {hl.icon}
            </div>
            <div className="space-y-1">
              <h4 className="text-slate-950 font-extrabold text-sm uppercase tracking-tight">
                {hl.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{hl.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Area with elegant light grid background and glowing ambient spots (inspired by Home page Section 2) */}
      <section
        id="course-list"
        className="relative py-20 border-t border-slate-100 overflow-hidden bg-gradient-to-tr from-sky-100/35 via-blue-50/15 to-white"
      >
        {/* Background accents matching Home page style */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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
          {/* Section Title */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] sm:text-xs font-bold text-yellow-600 uppercase tracking-widest">
              {isVi ? 'DANH MỤC ĐÀO TẠO' : 'TRAINING PORTFOLIO'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#001a41] uppercase tracking-tight">
              {isVi ? 'Các chương trình học nổi bật' : 'Featured Study Programs'}
            </h3>
            <div className="w-16 h-1 bg-yellow-500 mx-auto rounded-full" />
          </div>

          {/* Dynamic Course Cards Grid - Left to Right Aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
            {accaCourses.map((course) => (
              <div
                key={course.slug}
                id={course.slug}
                className="bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-[#001a41]/20 transition-all duration-300 flex flex-col h-auto w-full max-w-[24.5rem] group target:ring-2 target:ring-yellow-500 target:border-transparent scroll-mt-24"
              >
                {/* Premium Top Banner with Navy Gradient */}
                <div className="relative bg-gradient-to-br from-[#001a41] via-[#08224d] to-[#123062] text-white p-7 pb-9 rounded-b-[2.5rem] overflow-hidden shadow-md">
                  {/* Background decorative mesh layout */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />

                  {/* Top Right Pill (Gold theme) */}
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] sm:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-yellow-300/20">
                    {course.pill}
                  </span>

                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-5 border border-white/10 text-amber-400 shadow-inner backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    {course.icon}
                  </div>

                  <p className="text-[9px] sm:text-[10px] font-black text-amber-400/90 uppercase tracking-widest leading-none mb-2">
                    {isVi ? 'ĐÀO TẠO ACCA THỰC CHIẾN' : 'ACCA PRACTICAL EDUCATION'}
                  </p>
                  <h3 className="font-extrabold text-base sm:text-lg uppercase tracking-tight leading-snug text-white group-hover:text-yellow-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                </div>

                {/* Card Contents Area */}
                <div className="p-6 pt-8 flex-1 flex flex-col justify-between gap-6">
                  {/* Left/Right Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/80 border border-slate-100 hover:border-slate-200/80 transition-colors duration-200 rounded-2xl p-3.5 text-left shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        {course.leftStatLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#001a41] mt-1 block">
                        {course.leftStatValue}
                      </span>
                    </div>
                    <div className="bg-slate-50/80 border border-slate-100 hover:border-slate-200/80 transition-colors duration-200 rounded-2xl p-3.5 text-left shadow-sm">
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        {course.rightStatLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#001a41] mt-1 block">
                        {course.rightStatValue}
                      </span>
                    </div>
                  </div>

                  {/* Details list matching Table rows in brand colors */}
                  <div className="space-y-4 py-5 border-t border-b border-slate-100">
                    {course.details.map((detail, dIdx) => (
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
                    {course.bullets.map((bullet, bIdx) => (
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

                  {/* Action button: Directs to Contact to request counseling instead of subpages */}
                  <Link
                    href={`/contact?subject=ACCA%20-%20${encodeURIComponent(course.title)}`}
                    className="w-full bg-[#001a41] hover:bg-[#0b264e] text-white rounded-xl py-3.5 px-4 text-xs font-extrabold uppercase flex items-center justify-center gap-2 transition-all duration-300 mt-auto shadow-md hover:shadow-lg active:scale-[0.98] group/btn"
                  >
                    <span>{isVi ? 'ĐĂNG KÝ NHẬN TƯ VẤN' : 'REGISTER FOR ADVICE'}</span>
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

      {/* Trust banner */}
      <section className="w-full bg-[#001a41] py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-blue-900/40 via-transparent to-transparent opacity-50" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-yellow-500">
            {isVi ? 'Bạn chưa biết bắt đầu từ đâu?' : 'Unsure Where to Start?'}
          </h4>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            {isVi
              ? 'Hãy để lại thông tin để nhận buổi tư vấn năng lực và thiết lập lộ trình học ACCA cá nhân hoá hoàn toàn miễn phí từ các chuyên gia.'
              : 'Leave your contact info for a free 1-on-1 assessment and customized ACCA learning roadmap with our Big 4 advisors.'}
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg"
            >
              {isVi ? 'Tư vấn lộ trình miễn phí' : 'Request Free Roadmap Consultation'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
