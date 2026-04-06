# Đóng góp & môi trường dev

## Cài đặt

- Node.js 22 LTS (khuyến nghị)
- PostgreSQL (local hoặc Docker)

### Backend

```bash
cd yt2future-be-v2
cp .env.example .env   # chỉnh DATABASE_URL, JWT_SECRET, ...
npm ci
npx prisma generate
npm run dev
```

### Frontend

```bash
cd yt2future-f2-v2
cp .env.example .env.local
npm ci
npm run dev
```

### Docker (Postgres + API)

```bash
docker compose up -d --build
# API: http://localhost:5000 — chạy FE trên host với NEXT_PUBLIC_BE_URL=http://localhost:5000
```

## Monorepo (một repo)

Toàn bộ FE + BE nằm trong **một** Git ở thư mục gốc `yt2future/`. Xem `MONOREPO.md` (remote cũ, cách push repo mới).

### Deploy VPS (một `git pull`)

```bash
cd /path/to/yt2future
git pull

cd yt2future-be-v2 && npm ci && npm run build && pm2 restart <tên-api>
cd ../yt2future-f2-v2 && npm ci && npm run build && pm2 restart <tên-web>
```

Đường dẫn trên server (ví dụ `/home/deploy/yt2future`) giữ nguyên; chỉ đổi **một** remote Git thay vì pull hai repo.

## Git & Husky

Ở thư mục gốc monorepo, chạy `npm install` để cài Husky hooks (`pre-commit` = lint-staged, `commit-msg` = commitlint).

## Lint & format

Từ **thư mục gốc repo** (sau `npm install` để có Husky + Prettier):

```bash
npm install          # một lần (husky, lint-staged, prettier)
npm run format       # format FE + BE
npm run format:check
npm run lint         # eslint cả hai app
```

Hoặc từng app:

```bash
cd yt2future-f2-v2 && npm run lint && npm run format
cd yt2future-be-v2 && npm run lint && npm run format
```

## Commit

Dùng [Conventional Commits](https://www.conventionalcommits.org/), ví dụ:

- `feat: add category filter`
- `fix: market index sync log path`
- `chore: update eslint config`

Nếu không dùng commitlint tạm thời, có thể bỏ hook: `chmod -x .husky/commit-msg`.

## CI trên GitHub (đã cấu hình)

Sau khi push repo lên GitHub, vào **Settings → Actions → General** và bật **Allow all actions** (hoặc tương đương).

| Workflow | File | Khi nào chạy |
|----------|------|----------------|
| **CI** | `.github/workflows/ci.yml` | Push / PR vào `main` hoặc `master`; có thể chạy tay tab **Actions → CI → Run workflow** |
| **Dependabot** | `.github/dependabot.yml` | Hàng tuần tạo PR cập nhật `npm` trong `yt2future-f2-v2` và `yt2future-be-v2` |

**CI làm gì:** job **frontend** — Prettier check, ESLint, `next build` (có env giả `NEXT_PUBLIC_*`). Job **backend** — `prisma generate`, Prettier, ESLint, `tsc`.

## CD (deploy VPS) — mẫu, chưa bật

File `.github/workflows/deploy-vps.yml` là **khung** deploy qua SSH (appleboy/ssh-action). Mặc định job có `if: false` để **không** chạy nhầm.

1. Trên GitHub: **Settings → Secrets and variables → Actions** — thêm `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`.
2. Sửa trong file workflow: đường dẫn `cd /home/deploy/yt2future` và lệnh `pm2 restart …` cho đúng VPS.
3. Đổi `if: false` → `if: true` (hoặc xóa dòng `if`), commit.
4. **Actions → Deploy VPS → Run workflow** để deploy tay.

Nếu chưa dùng CD tự động, cứ **deploy tay** SSH như mục Deploy VPS ở trên.
