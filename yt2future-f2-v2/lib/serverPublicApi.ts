/** Gọi API backend từ Server Component / generateMetadata (không có window). */
export function getServerPublicApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (raw) return raw.replace(/\/$/, '');
  return 'http://localhost:5000/api';
}
