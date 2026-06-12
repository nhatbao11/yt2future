'use client';

import Link from '@/components/common/Link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  X,
  User,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Settings,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { getApiBaseURL } from '@/services/apiClient';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{
    fullName: string;
    avatarUrl: string | null;
    role?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const navLinks = [
    {
      name: t('business'),
      href: '/services',
      dropdown: [
        { name: 'Vay vốn doanh nghiệp', href: '/services/vay-von' },
        { name: 'LC & Thanh toán quốc tế', href: '/services/lc-thanh-toan' },
        { name: 'Bảo lãnh ngân hàng', href: '/services/bao-lanh' },
        { name: 'Bảo hiểm doanh nghiệp', href: '/services/bao-hiem' },
        { name: 'Thiết kế website', href: '/services/thiet-ke-web' },
      ],
      tagline:
        'Giải pháp tối ưu về vốn, bảo lãnh, LC & thanh toán quốc tế, thiết kế website cho doanh nghiệp.',
      bannerTitle: 'Doanh nghiệp',
    },
    {
      name: t('acca'),
      href: '/acca',
      dropdown: [
        { name: 'Lộ trình ACCA', href: '/acca#lo-trinh-acca' },
        { name: 'F2', href: '/acca#f2' },
        { name: 'F3', href: '/acca#f3' },
        { name: 'F7', href: '/acca#f7' },
        { name: 'F8', href: '/acca#f8' },
      ],
      tagline: 'Đào tạo ACCA thực chiến, lớp học nhỏ tương tác cao, tập trung vào bản chất.',
      bannerTitle: 'Đào tạo ACCA',
    },
    {
      name: t('articles'),
      href: '/sector',
      dropdown: [
        { name: 'Tài chính doanh nghiệp', href: '/sector?category=doanh-nghiep' },
        { name: 'ACCA & Kế toán', href: '/sector?category=acca' },
      ],
      tagline: 'Cập nhật tin tức, kiến thức tài chính vĩ mô, kế toán và kiểm toán thực tiễn.',
      bannerTitle: 'Bài viết',
    },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ];

  const getAvatarSrc = (url: string | null) => {
    if (!url || url === '/Logo.jpg' || url.startsWith('/')) {
      return '/Logo.jpg';
    }
    return `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  };

  const fetchUser = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setLoading(true);

      try {
        const res = await fetch(`/api/auth/me?v=${Date.now()}`, {
          credentials: 'include',
        });

        if (res.status === 401 || res.status === 403) {
          setUserData(null);
          document.cookie = 'yt2future_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
          if (pathname.startsWith('/admin')) {
            window.location.replace(`/${locale}/signin?err=expired`);
          }
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        }
      } catch (err) {
        console.error('User fetch error:', err);
      } finally {
        setLoading(false);
        setIsInitialRender(false);
      }
    },
    [pathname, locale]
  );

  useEffect(() => {
    if (isInitialRender) {
      fetchUser();
    } else {
      fetchUser(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger scroll handler initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, fetchUser, isInitialRender]);

  useEffect(() => {
    const handleSync = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const hasMyToken = document.cookie.includes('yt2future_token');

      if (session?.user && !hasMyToken) {
        try {
          await fetch(`${getApiBaseURL()}/auth/grant-google-role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: session.user.email,
              name:
                session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                session.user.email?.split('@')[0],
              picture:
                session.user.user_metadata?.avatar_url ||
                session.user.user_metadata?.picture ||
                undefined,
            }),
            credentials: 'include',
          });
          await fetchUser(true);
        } catch (err) {
          console.error('Sync error:', err);
        }
      }
    };

    handleSync();
    const profileUpdatedHandler = () => fetchUser(true);
    window.addEventListener('profileUpdated', profileUpdatedHandler);
    return () => window.removeEventListener('profileUpdated', profileUpdatedHandler);
  }, [supabase, fetchUser]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut({ scope: 'global' });
      await fetch('/api/auth/logout', { method: 'POST' });
      document.cookie = 'yt2future_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
      window.location.replace(`/${locale}/signin?status=logout&t=${Date.now()}`);
    } catch {
      window.location.replace(`/${locale}/signin`);
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') || href.includes('#')) {
      const hash = href.substring(href.indexOf('#'));
      const qIndex = hash.indexOf('?');
      const cleanHash = qIndex !== -1 ? hash.substring(0, qIndex) : hash;
      const element = document.querySelector(cleanHash);
      if (element) {
        e.preventDefault();
        setIsMenuOpen(false);
        const yOffset = -75; // Account for sticky navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.pushState(null, '', href);
        window.dispatchEvent(new Event('popstate'));
      }
    }
  };

  const checkIsActive = (path: string) => {
    let cleanPath = pathname;
    if (cleanPath.startsWith('/en')) cleanPath = cleanPath.replace('/en', '');
    else if (cleanPath.startsWith('/vi')) cleanPath = cleanPath.replace('/vi', '');
    if (cleanPath === '') cleanPath = '/';

    let isActive = false;
    if (path.startsWith('/#')) {
      isActive = false;
    } else {
      isActive = cleanPath === path;
    }

    return isActive;
  };

  const getLinkStyle = (path: string, isMobile = false) => {
    const isActive = checkIsActive(path);
    const baseStyle = `text-[11px] xl:text-[12px] font-bold uppercase tracking-wider transition-all duration-200 rounded-sm cursor-pointer whitespace-nowrap`;
    if (isMobile)
      return `${baseStyle} w-full px-6 py-4 border-b border-gray-50 ${isActive ? 'bg-[#1a365d] text-white font-extrabold' : 'text-[#1a365d]'}`;
    return `${baseStyle} px-3 xl:px-4 py-1.5 xl:py-2 ${isActive ? 'bg-[#1a365d] text-white shadow-md' : 'text-[#1a365d] hover:bg-[#1a365d] hover:text-white'}`;
  };

  return (
    <header
      className={`w-full bg-white border-b border-gray-100 sticky top-0 z-100 h-18 md:h-18.75 flex items-center transition-shadow duration-300 ${isScrolled ? 'shadow-md border-transparent' : ''}`}
    >
      <nav className="max-w-360 mx-auto w-full px-4 md:px-12 flex justify-between items-center relative">
        <Link href="/" className="flex items-center gap-2 md:gap-3 z-110 min-w-40 md:min-w-55">
          <div className="relative w-10 h-10 md:w-14 md:h-14 overflow-hidden rounded-full border border-gray-100 shrink-0 shadow-sm">
            <Image src="/Logo.jpg" alt="Logo" fill sizes="56px" className="object-cover" priority />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[#1a365d] font-extrabold text-base md:text-xl tracking-tighter uppercase leading-none whitespace-nowrap">
              YT2FUTURE
            </h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group py-4">
              <Link
                href={link.href}
                className={`${getLinkStyle(link.href)} flex items-center gap-1`}
                onClick={(e) => handleNavLinkClick(e, link.href)}
              >
                <span>{link.name}</span>
                {link.dropdown && (
                  <ChevronDown
                    size={13}
                    className="transition-transform duration-300 group-hover:rotate-180 text-current shrink-0"
                  />
                )}
              </Link>
              {link.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[680px] bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-150 flex overflow-hidden">
                  {/* Left Banner - 50% width */}
                  <div className="w-1/2 bg-gradient-to-br from-[#1a365d] to-[#0f172a] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl" />
                    <div className="relative z-10">
                      <h4 className="text-sm font-black uppercase tracking-wider text-yellow-500 mb-3">
                        {link.bannerTitle}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed font-medium">
                        {link.tagline}
                      </p>
                    </div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-6 relative z-10">
                      YT2Future
                    </div>
                  </div>
                  {/* Right sub-menu list - 50% width */}
                  <div className="w-1/2 p-6 flex flex-col gap-1.5 bg-white">
                    {link.dropdown.map((subItem, index) => (
                      <Link
                        key={index}
                        href={subItem.href}
                        onClick={(e) => handleNavLinkClick(e, subItem.href)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#1a365d]/5 text-slate-700 hover:text-[#1a365d] text-xs sm:text-sm font-bold transition-all duration-200 group/sub"
                      >
                        <span>{subItem.name}</span>
                        <ArrowRight
                          size={14}
                          className="text-[#1a365d] group-hover/sub:text-orange-500 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 z-110 min-w-30 md:min-w-45">
          <div className="hidden xl:flex items-center border-r border-gray-200 pr-2 h-10">
            {loading && !userData ? (
              <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse ml-2" />
            ) : userData ? (
              <div className="flex items-center gap-3">
                {userData.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-yellow-100 border border-yellow-100 shadow-sm whitespace-nowrap"
                  >
                    <ShieldCheck size={16} /> {t('admin')}
                  </Link>
                )}
                <div className="relative group ml-2">
                  <div className="relative w-9 h-9 overflow-hidden rounded-full border-2 border-[#1a365d]/20 cursor-pointer">
                    <Image
                      src={getAvatarSrc(userData.avatarUrl)}
                      alt="Avatar"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200">
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-[#1a365d] font-bold text-sm truncate">
                        {userData.fullName}
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">
                        {userData.role}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-xs font-medium"
                      >
                        <User size={16} /> {t('profile')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md text-xs font-medium mt-1 border-t pt-2"
                      >
                        <LogOut size={16} /> {t('signOut')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/signin" className={getLinkStyle('/signin')}>
                {t('signIn')}
              </Link>
            )}
          </div>

          <LanguageSwitcher />

          <button
            className="xl:hidden p-2 text-[#1a365d] shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden fixed inset-0 bg-white z-[150] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Mobile Menu Header Bar */}
          <div className="h-18 md:h-18.75 px-4 md:px-12 flex justify-between items-center border-b border-gray-100 bg-white">
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-100 shrink-0 shadow-sm">
                <Image src="/Logo.jpg" alt="Logo" fill sizes="40px" className="object-cover" />
              </div>
              <h1 className="text-[#1a365d] font-extrabold text-base tracking-tighter uppercase leading-none">
                YT2FUTURE
              </h1>
            </Link>
            <button
              className="p-2 text-[#1a365d] shrink-0 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col h-[calc(100%-4.5rem)] px-6 overflow-y-auto pt-8 pb-12 bg-white">
            {userData ? (
              <div className="flex flex-col gap-4 mb-8">
                <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1a365d]">
                    <Image
                      src={getAvatarSrc(userData.avatarUrl)}
                      alt="Avatar"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#1a365d] text-lg leading-tight">
                      {userData.fullName}
                    </p>
                    <p className="text-[10px] uppercase text-yellow-500 font-bold tracking-widest mt-1">
                      {userData.role}
                    </p>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex items-center gap-1 mt-2 text-blue-600 text-[11px] font-bold uppercase underline"
                    >
                      <Settings size={12} /> {t('profile')}
                    </Link>
                  </div>
                </div>
                {userData.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-yellow-500 text-white rounded-xl font-black uppercase text-xs shadow-lg"
                  >
                    <LayoutDashboard size={18} /> {t('admin')}
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                className="mb-8 w-full py-4 bg-[#1a365d] text-white text-center rounded-xl font-bold uppercase text-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('signIn')}
              </Link>
            )}

            {/* Mobile Navigation List with Tree Branch styling */}
            <div className="flex flex-col pb-12">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col w-full border-b border-gray-100 py-2">
                  <Link
                    href={link.href}
                    className="text-[13px] font-bold uppercase tracking-wider text-[#1a365d] py-2 px-2 hover:bg-slate-50 rounded"
                    onClick={(e) => {
                      handleNavLinkClick(e, link.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 flex flex-col gap-2 mt-1 border-l border-slate-100 ml-3 py-1">
                      {link.dropdown.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.href}
                          onClick={(e) => {
                            handleNavLinkClick(e, subItem.href);
                            setIsMenuOpen(false);
                          }}
                          className="text-xs text-slate-500 hover:text-[#1a365d] font-bold py-2 flex items-center gap-2 group/sub"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/sub:bg-yellow-500 transition-colors shrink-0" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {userData && (
              <div className="mt-auto pb-12">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-red-50 text-red-600 rounded-2xl font-bold uppercase text-[12px] tracking-widest border border-red-100"
                >
                  <LogOut size={20} /> {t('signOut')}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
