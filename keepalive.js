/**
 * Supabase Keepalive Cron Job
 * Gọi API Supabase mỗi 5 ngày để tránh database bị pause
 * 
 * Cài đặt:
 *   npm install node-cron
 * 
 * Chạy:
 *   node keepalive.js
 * 
 * Hoặc để chạy nền (Linux/Mac):
 *   nohup node keepalive.js > keepalive.log 2>&1 &
 * 
 * Hoặc để chạy nền (Windows):
 *   Dùng Task Scheduler hoặc PM2
 */

const SUPABASE_URL = 'https://eyfuinpxbsegydvopimf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZnVpbnB4YnNlZ3lkdm9waW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTg5ODUsImV4cCI6MjA4ODI3NDk4NX0.Z0gRct2EuwnP9Do1aP_IZSELUVrsQl7hAoWOfrVcWso';
const TABLE_NAME = 'tien_mung';

// Interval: mỗi 5 ngày (5 * 24 * 60 * 60 * 1000 milliseconds)
const INTERVAL_MS = 5 * 24 * 60 * 60 * 1000;

// Headers cho Supabase
const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
};

/**
 * Gọi 1 lệnh SELECT đơn giản để keep Supabase alive
 */
async function pingSupabase() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?limit=1`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    const now = new Date().toLocaleString('vi-VN');
    console.log(`✅ [${now}] Keepalive thành công! Đã gọi Supabase.`);
    
  } catch (error) {
    const now = new Date().toLocaleString('vi-VN');
    console.error(`❌ [${now}] Lỗi keepalive:`, error.message);
  }
}

/**
 * Khởi động cron job
 */
function startKeepalive() {
  console.log('🔔 Supabase Keepalive Cron Job đã khởi động');
  console.log(`⏰ Sẽ gọi Supabase mỗi 5 ngày`);
  console.log(`📍 Interval: ${INTERVAL_MS / 1000 / 60 / 60 / 24} ngày (${INTERVAL_MS / 1000 / 3600} giờ)\n`);
  
  // Gọi ngay lần đầu
  pingSupabase();
  
  // Rồi gọi lại theo chu kỳ
  setInterval(pingSupabase, INTERVAL_MS);
}

// Khởi động
startKeepalive();

// Xử lý khi thoát
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Dừng Keepalive Cron Job');
  process.exit(0);
});
