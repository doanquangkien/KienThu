# 🔧 Supabase Keepalive - Giữ Database Hoạt Động

Để tránh Supabase pause database sau 7 ngày không hoạt động, dự án này có **2 cách** để giữ database sống:

---

## 📋 Cách 1: GitHub Actions (Khuyến khích ⭐)

**Ưu điểm:** 
- ✅ Miễn phí, tự động chạy
- ✅ Không cần server riêng
- ✅ Chạy trên máy chủ GitHub
- ✅ Không cần cấu hình phức tạp

**Cách cấu hình:**

### Bước 1: Đẩy code lên GitHub
```bash
git remote add origin https://github.com/doanquangkien/KienThu.git
git branch -M main
git push -u origin main
```

### Bước 2: Kích hoạt Workflow
1. Vào tab **Actions** trong GitHub
2. Chọn **Supabase Keepalive** workflow
3. Click **Run workflow** để test
4. Từ đó, nó sẽ **tự động chạy mỗi 5 ngày**

✅ **Xong!** Database sẽ không bao giờ bị pause!

Workflow đã có sẵn trong `.github/workflows/keepalive.yml` và sẽ tự động chạy mỗi 5 ngày.

---

## 🖥️ Cách 2: Chạy Local hoặc Server

**Khi nào dùng:**
- Chạy trên máy NAS, VPS, hoặc Raspberry Pi
- Muốn control đầy đủ

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy Keepalive
```bash
npm run keepalive
```

Kết quả:
```
🔔 Supabase Keepalive Cron Job đã khởi động
⏰ Sẽ gọi Supabase mỗi 5 ngày
📍 Interval: 5 ngày

✅ [18/3/2026 10:30:45] Keepalive thành công! Đã gọi Supabase.
```

### Bước 3: Chạy nền (tuỳ chọn)

**Trên Linux/Mac:**
```bash
nohup npm run keepalive > keepalive.log 2>&1 &
```

**Trên Windows (dùng PM2):**
```bash
npm install -g pm2
pm2 start keepalive.js
pm2 startup
pm2 save
```

**Hoặc dùng Windows Task Scheduler:**
1. Tạo task chạy `npm run keepalive` mỗi 5 ngày

---

## 🔍 Cách kiểm tra tiến trình

### GitHub Actions:
1. Vào **Actions** tab → **Supabase Keepalive**
2. Xem các runs và status

### Local/Server:
```bash
# Xem log
tail -f keepalive.log

# Kiểm tra process
ps aux | grep keepalive
```

---

## 📊 Cấu hình tuỳ chỉnh

Tệp `keepalive.js` có thể sửa:

```javascript
// Thay đổi chu kỳ (mặc định 5 ngày)
const INTERVAL_MS = 5 * 24 * 60 * 60 * 1000;  // ← Sửa số này

// Ví dụ: 3 ngày
const INTERVAL_MS = 3 * 24 * 60 * 60 * 1000;

// Ví dụ: 6 giờ
const INTERVAL_MS = 6 * 60 * 60 * 1000;
```

---

## ⚠️ Troubleshooting

### GitHub Actions không chạy?
- ✓ Kiểm tra Secrets có đúng không
- ✓ Kiểm tra workflow file `.github/workflows/keepalive.yml`
- ✓ Manual trigger via **Run workflow** button

### Supabase vẫn pause?
- ✓ Giảm chu kỳ xuống 3-4 ngày
- ✓ Dùng GitHub Actions thay vì local
- ✓ Kiểm tra logs để xem lỗi gì

### Process bị dừng?
- ✓ Dùng PM2 hoặc systemd để tự động restart
- ✓ Để process chạy trong screen/tmux

---

## 🎯 Kết luận

| Cách | Chạy | Chi phí | Dễ | Tiện |
|------|------|--------|-----|------|
| GitHub Actions | Auto | Miễn phí | ⭐⭐⭐ | ⭐⭐⭐ |
| Node.js Local | Manual + cron | $0 | ⭐⭐ | ⭐ |
| VPS/Server | Manual + cron | $5-20/tháng | ⭐⭐ | ⭐⭐ |

**Khuyến cáo:** Dùng **GitHub Actions** vì nó miễn phí và hoàn toàn tự động! 🚀
