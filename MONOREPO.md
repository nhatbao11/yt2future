# Monorepo (một Git cho FE + BE)

## Remote cũ (trước khi gộp)

| Phần | Remote |
|------|--------|
| FE (`yt2future-f2-v2`) | `https://github.com/nhatbao11/yt2future-f2-v2.git` |
| BE (`yt2future-be-v2`) | `https://github.com/nhatbao11/yt2future-be-v2.git` |

Sau khi chuyển sang **một repo** ở thư mục này, tạo repo mới trên GitHub (ví dụ `yt2future`) và:

```bash
cd /path/to/yt2future
git remote add origin https://github.com/<user>/yt2future.git
git push -u origin main
```

Có thể **archive** hai repo cũ hoặc để README trỏ sang repo monorepo.

## Khôi phục repo con (khẩn cấp)

Nếu cần quay lại hai Git riêng:

```bash
mv yt2future-f2-v2/.git.backup yt2future-f2-v2/.git
mv yt2future-be-v2/.git.backup yt2future-be-v2/.git
rm -rf .git
```

## Deploy VPS (sau monorepo)

Một lần `git clone` / `git pull` ở thư mục cha, rồi build từng app trong `yt2future-f2-v2` và `yt2future-be-v2` như trước. Xem `CONTRIBUTING.md`.
