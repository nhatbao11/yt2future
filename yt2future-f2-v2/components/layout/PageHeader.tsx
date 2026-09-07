'use client';
import Link from '@/components/common/Link';

import { useTranslations } from 'next-intl';

export type PageHeaderParent = {
  label: string;
  /** Đường dẫn không locale; `Link` sẽ thêm locale. */
  href: string;
};

interface PageHeaderProps {
  title: string;
  /** Cấp giữa: ví dụ Sản phẩm dịch vụ → `/services` trước tên trang chi tiết. */
  parent?: PageHeaderParent;
}

export default function PageHeader({ title, parent }: PageHeaderProps) {
  const t = useTranslations('nav');

  return (
    <div className="w-full bg-white py-4 md:py-5 border-b border-slate-200 shadow-sm">
      <div className="max-w-360 mx-auto w-full px-4 md:px-12">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
          <Link href="/" className="hover:text-[var(--brand-navy)] transition-colors duration-200">
            {t('home')}
          </Link>

          <span className="text-slate-300 select-none font-light">/</span>

          {parent ? (
            <>
              <Link
                href={parent.href}
                className="hover:text-[var(--brand-navy)] transition-colors duration-200"
              >
                {parent.label}
              </Link>
              <span className="text-slate-300 select-none font-light">/</span>
            </>
          ) : null}

          <span className="text-[#0a192f]">{title}</span>
        </nav>
      </div>
    </div>
  );
}
