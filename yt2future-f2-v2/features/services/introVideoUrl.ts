/** Video mặc định site khi dịch vụ chưa gán link. */
export const FALLBACK_INTRO_WEBM = '/Videohome.webm';
export const FALLBACK_INTRO_MP4 = '/Videohome.mp4';

export type IntroVideoResolved =
  | { kind: 'youtube'; id: string }
  | { kind: 'direct'; url: string }
  | { kind: 'fallback' };

const YT_ID = /^[\w-]{11}$/;

/**
 * Nhận URL từ CMS: YouTube (watch / embed / youtu.be) hoặc file trực tiếp (.mp4/.webm hoặc bất kỳ https).
 * Để trống → phát video mặc định của site.
 */
export function resolveIntroVideo(raw: string | undefined | null): IntroVideoResolved {
  const s = raw?.trim() ?? '';
  if (!s) return { kind: 'fallback' };

  if (s.startsWith('/') && /\.(mp4|webm)(\?|$)/i.test(s)) {
    return { kind: 'direct', url: s };
  }

  try {
    const url = new URL(s);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      if (id && YT_ID.test(id)) return { kind: 'youtube', id };
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname.startsWith('/embed/')) {
        const id = url.pathname.split('/')[2];
        if (id && YT_ID.test(id)) return { kind: 'youtube', id };
      }
      const v = url.searchParams.get('v');
      if (v && YT_ID.test(v)) return { kind: 'youtube', id: v };
    }
  } catch {
    /* not absolute URL */
  }

  if (/^https?:\/\//i.test(s)) {
    return { kind: 'direct', url: s };
  }

  return { kind: 'fallback' };
}

export function youtubePosterUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(videoId: string, autoplay: boolean) {
  const q = autoplay ? '?autoplay=1&rel=0' : '?rel=0';
  return `https://www.youtube.com/embed/${videoId}${q}`;
}
