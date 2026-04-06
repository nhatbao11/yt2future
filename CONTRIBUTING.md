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

## CI

GitHub Actions chạy `format:check`, `lint`, `build` cho FE và BE khi push/PR vào `main`/`master`.
