'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType } from 'react';

type InlinePdfViewerProps = {
  src: string;
  title: string;
  className?: string;
};
type DocumentLoadSuccess = { numPages: number };
type DocumentProps = {
  file: string;
  loading?: React.ReactNode;
  onLoadSuccess?: (result: DocumentLoadSuccess) => void;
  onLoadError?: () => void;
  children?: React.ReactNode;
};
type PageProps = {
  pageNumber: number;
  width: number;
  renderTextLayer: boolean;
  renderAnnotationLayer: boolean;
};

function isMobileOrTabletDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Use Client Hints API if available (Chrome, Edge, etc.)
  // On desktop computers (including laptops with touchscreens/trackpads), mobile is strictly false
  const uaData = (navigator as unknown as { userAgentData?: { mobile?: boolean } }).userAgentData;
  if (uaData?.mobile !== undefined) {
    if (!uaData.mobile) return false;
  }

  const ua = navigator.userAgent;
  // Real mobile operating systems (phones / tablets)
  const isMobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  // iPadOS 13+ identifying as Macintosh with multi-touch
  const isIPad = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

  return isMobileUa || isIPad;
}

export default function InlinePdfViewer({ src, title, className }: InlinePdfViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [DocumentComp, setDocumentComp] = useState<ComponentType<DocumentProps> | null>(null);
  const [PageComp, setPageComp] = useState<ComponentType<PageProps> | null>(null);
  const renderWithPdfJs = useMemo(() => isMobileOrTabletDevice(), []);

  useEffect(() => {
    if (!renderWithPdfJs) return;

    const node = containerRef.current;
    if (!node) return;

    const updateSize = () => {
      const padding = node.clientWidth < 480 ? 12 : 24;
      const calculated = Math.floor(node.clientWidth - padding);
      setContainerWidth(Math.max(260, calculated));
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, [renderWithPdfJs]);

  useEffect(() => {
    if (!renderWithPdfJs) return;

    let mounted = true;
    import('react-pdf')
      .then((mod) => {
        if (!mounted) return;
        mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
        setDocumentComp(() => mod.Document);
        setPageComp(() => mod.Page);
      })
      .catch(() => setPdfError('Failed to initialize PDF viewer'));

    return () => {
      mounted = false;
    };
  }, [renderWithPdfJs]);

  if (!renderWithPdfJs) {
    if (!src) return <div className={className || 'w-full h-full'} />;
    return (
      <iframe
        src={src}
        className={className || 'w-full h-full border-0'}
        title={title}
        loading="lazy"
      />
    );
  }

  if (!src) return <div className={className || 'w-full h-full'} />;

  if (!DocumentComp || !PageComp) {
    return (
      <div className={`${className || 'w-full h-full'} overflow-auto bg-slate-100 p-2`}>
        <div className="py-8 text-center text-sm text-slate-500">Loading PDF viewer...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className || 'w-full h-full'} overflow-auto bg-slate-100 p-2 sm:p-4`}
    >
      <DocumentComp
        file={src}
        loading={<div className="py-8 text-center text-sm text-slate-500">Loading PDF...</div>}
        onLoadSuccess={({ numPages: pages }: { numPages: number }) => {
          setNumPages(pages);
          setPdfError(null);
        }}
        onLoadError={() => setPdfError('Failed to load PDF')}
      >
        {pdfError ? (
          <div className="py-8 text-center text-sm text-rose-600">
            <p className="mb-3">{pdfError}</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-[var(--brand-navy)] text-white text-xs font-bold rounded-lg hover:bg-[var(--brand-yellow)] hover:text-[#12243f] transition-all"
            >
              Mở tài liệu trong tab mới
            </a>
          </div>
        ) : (
          Array.from({ length: numPages }, (_, index) => (
            <div
              key={`pdf-page-${index + 1}`}
              className="mb-4 last:mb-0 flex justify-center shadow-md rounded-md overflow-hidden bg-white max-w-fit mx-auto"
            >
              <PageComp
                pageNumber={index + 1}
                width={containerWidth || 360}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))
        )}
      </DocumentComp>
    </div>
  );
}
