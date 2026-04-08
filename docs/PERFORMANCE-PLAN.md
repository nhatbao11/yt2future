# Kế hoạch hiệu năng & chất lượng (YT2Future)

## Đã làm / đang làm

- [x] **Bước 1 — Code-split Chart.js** (`/dashboard/market-index`): tách `MarketIndexChartBlock`, load bằng `next/dynamic` (`ssr: false`) + skeleton loading.

## Tiếp theo (ưu tiên)

### Bước 2 — Ảnh & LCP

- [x] Rà soát `<img>` → `next/image` / `FallbackImage` (UserAvatar, FeedbackHome, sector, business, admin, CreateReport).
- [x] Hero video: `poster` + `preload="metadata"` (dùng `/Logo.jpg` làm poster tạm).
- [ ] (Tuỳ chọn) Thay poster bằng khung hình thật từ video (`video-poster.jpg`).

### Bước 3 — Bundle & layout

- [ ] Tránh thêm thư viện nặng vào `Navbar` / `Footer` (đã là client).
- [ ] Các trang admin nặng: cân nhắc `dynamic()` cho bảng/biểu đồ tương tự.

### Bước 4 — Backend (production)

- [x] Thu hẹp **CORS** — `CORS_ORIGINS` (env) + mặc định `yt2future.com` / www / localhost.
- [x] Rate limit cho `/register`, `/login`, `/grant-google-role` (`authPublicLimiter`).

### Bước 5 — Đo lường

- [ ] Lighthouse (mobile) cho `/vi` và `/vi/dashboard/market-index` — lưu số LCP / TBT làm baseline trước khi redesign lớn.

## Không gấp

- [ ] Giảm warning ESLint (`any`, hooks deps).
- [ ] `npm audit` / cập nhật dependency (Dependabot PR).
