'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'src' | 'onError'> & {
  src: string;
  fallbackSrc?: string;
};

/** Ảnh remote có fallback khi lỗi (dùng cho thumbnail admin, báo cáo, …). */
export default function FallbackImage({ src, fallbackSrc = '/Logo.jpg', alt, ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <Image {...rest} src={failed ? fallbackSrc : src} alt={alt} onError={() => setFailed(true)} />
  );
}
