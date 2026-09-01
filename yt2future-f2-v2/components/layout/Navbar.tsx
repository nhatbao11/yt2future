'use client';

import Link from '@/components/common/Link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const navLinks = [
    {
      name: t('services'),
      href: '/services',
    },
    {
      name: t('insights'),
      href: '/sector',
    },
    {
      name: t('career'),
      href: '/career',
    },
    {
      name: t('company'),
      href: '#',
      dropdown: [
        { name: t('aboutYT'), href: '/about' },
        { name: t('clientImpact'), href: '/client-impact' },
        { name: t('offices'), href: '/contact' },
      ],
      tagline: 'Shaping tomorrow through agile innovation and sustainable growth.',
      bannerTitle: 'YT2FUTURE',
    },
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
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger scroll handler initially
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, fetchUser, isInitialRender]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    if (href === '#') {
      e.preventDefault();
      return;
    }
    if (href.startsWith('/#') || href.includes('#')) {
      const hash = href.substring(href.indexOf('#'));
      const qIndex = hash.indexOf('?');
      const cleanHash = qIndex !== -1 ? hash.substring(0, qIndex) : hash;

      if (cleanHash && cleanHash !== '#') {
        try {
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
        } catch (err) {
          console.warn('Invalid hash selector:', cleanHash);
        }
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
      return `${baseStyle} w-full px-6 py-4 border-b border-[#1a365d] ${isActive ? 'bg-[#1a365d] text-white font-extrabold' : 'text-white hover:bg-[#1a365d]/50'}`;
    return `${baseStyle} px-3 xl:px-4 py-1.5 xl:py-2 ${isActive ? 'text-white border-b-2 border-white rounded-none' : 'text-gray-300 hover:text-white'}`;
  };

  return (
    <>
      <header
        className={`w-full bg-[#051c2c] text-white fixed top-0 left-0 right-0 z-[100] h-18 md:h-18.75 flex items-center transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'shadow-md shadow-black/20 bg-[#051c2c]/95 backdrop-blur-sm' : ''}`}
      >
        <nav className="max-w-360 mx-auto w-full px-4 md:px-12 flex justify-between items-center relative">
          <Link href="/" className="flex items-center gap-2 md:gap-3 z-110 min-w-40 md:min-w-55">
            <div className="relative w-10 h-10 md:w-14 md:h-14 overflow-hidden rounded-full border border-gray-100 shrink-0 shadow-sm">
              <Image
                src="/Logo.jpg"
                alt="Logo"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-white font-extrabold text-base md:text-xl tracking-tighter uppercase leading-none whitespace-nowrap">
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-[220px] bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-150 flex flex-col p-2 overflow-hidden">
                    {link.dropdown.map((subItem, index) => (
                      <Link
                        key={index}
                        href={subItem.href}
                        onClick={(e) => handleNavLinkClick(e, subItem.href)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#051c2c] text-xs sm:text-sm font-bold transition-all duration-200 group/sub"
                      >
                        <span>{subItem.name}</span>
                        <ArrowRight
                          size={14}
                          className="text-[#051c2c] opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 z-110 min-w-30 md:min-w-45">
            <div className="hidden xl:flex items-center h-10">
              {loading && !userData ? (
                <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse ml-2" />
              ) : userData ? (
                <div className="flex items-center gap-3">
                  {userData.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-white/20 border border-white/10 shadow-sm whitespace-nowrap"
                    >
                      <ShieldCheck size={16} /> {t('admin')}
                    </Link>
                  )}
                  <div className="relative group ml-2">
                    <div className="relative w-9 h-9 overflow-hidden rounded-full border-2 border-white/20 cursor-pointer">
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
                <Link href="/signin" className={`${getLinkStyle('/signin')} hidden`}>
                  {t('signIn')}
                </Link>
              )}
            </div>

            <LanguageSwitcher />

            <button
              className="xl:hidden p-2 text-white shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`xl:hidden fixed inset-0 z-[150] bg-[#0a192f] transition-all duration-500 ease-in-out flex flex-col ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {/* Top Bar inside Mobile Menu */}
        <div className="h-18 md:h-18.75 px-4 md:px-12 flex justify-between items-center border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 shrink-0">
              <Image src="/Logo.jpg" alt="Logo" fill sizes="40px" className="object-cover" />
            </div>
            <h1 className="text-white font-extrabold text-base md:text-lg tracking-widest uppercase">
              YT2FUTURE
            </h1>
          </Link>
          <button
            className="p-2 text-white hover:text-blue-400 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <div key={link.name} className="flex flex-col group">
                <Link
                  href={link.href === '#' ? '#' : link.href}
                  className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase hover:text-blue-400 transition-colors"
                  onClick={(e) => {
                    if (link.href !== '#') {
                      handleNavLinkClick(e, link.href);
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  {link.name}
                </Link>

                {link.dropdown && (
                  <div className="mt-4 flex flex-col gap-4 pl-4 border-l-2 border-blue-600/30">
                    {link.dropdown.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        href={subItem.href}
                        onClick={(e) => {
                          handleNavLinkClick(e, subItem.href);
                          setIsMenuOpen(false);
                        }}
                        className="text-base sm:text-lg font-bold text-slate-400 hover:text-white transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Info Section */}
          <div className="mt-auto pt-12 pb-6">
            <div className="w-12 h-1 bg-blue-600 mb-8" />
            <p className="text-sm text-slate-400 font-medium uppercase tracking-widest mb-4">
              {t('contact') || 'Contact Us'}
            </p>
            <a
              href="mailto:ytcapital.group@gmail.com"
              className="block text-lg text-white font-bold hover:text-blue-400 mb-2 transition-colors"
            >
              ytcapital.group@gmail.com
            </a>
            <a
              href="tel:0822082407"
              className="block text-lg text-white font-bold hover:text-blue-400 transition-colors"
            >
              +84 822 082 407
            </a>

            {userData && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <Image
                      src={getAvatarSrc(userData.avatarUrl)}
                      alt="Avatar"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-base">{userData.fullName}</p>
                    <p className="text-[10px] uppercase text-blue-400 font-bold tracking-widest">
                      {userData.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-bold text-slate-300 hover:text-white uppercase tracking-wider"
                  >
                    {t('profile')}
                  </Link>
                  {userData.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider"
                    >
                      {t('admin')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-sm font-bold text-red-400 hover:text-red-300 uppercase tracking-wider mt-2"
                  >
                    {t('signOut')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
