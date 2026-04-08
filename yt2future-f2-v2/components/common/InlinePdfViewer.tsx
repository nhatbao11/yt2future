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

function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

export default function InlinePdfViewer({ src, title, className }: InlinePdfViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [DocumentComp, setDocumentComp] = useState<ComponentType<DocumentProps> | null>(null);
  const [PageComp, setPageComp] = useState<ComponentType<PageProps> | null>(null);
  const renderWithPdfJs = useMemo(() => isIOSDevice(), []);

  useEffect(() => {
    if (!renderWithPdfJs) return;

    const node = containerRef.current;
    if (!node) return;

    const updateSize = () => setContainerWidth(Math.max(320, Math.floor(node.clientWidth - 16)));
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
      className={`${className || 'w-full h-full'} overflow-auto bg-slate-100 p-2`}
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
          <div className="py-8 text-center text-sm text-rose-600">{pdfError}</div>
        ) : (
          Array.from({ length: numPages }, (_, index) => (
            <div key={`pdf-page-${index + 1}`} className="mb-3 last:mb-0 flex justify-center">
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
