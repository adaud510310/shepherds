# 🚀 دليل رفع المشروع على CWP (CentOS Web Panel)

## الخطوة 1️⃣: بناء المشروع

### على جهازك المحلي:

```bash
# تأكد من أنك في مجلد المشروع
cd C:\Users\ADAUD\Desktop\shepherds\shepherd

# بناء المشروع للإنتاج
npm run build
```

سيتم إنشاء مجلد `dist` يحتوي على الملفات الجاهزة للرفع.

---

## الخطوة 2️⃣: تحضير السيرفر

### تسجيل الدخول إلى CWP:

1. افتح متصفح واذهب إلى: `http://your-server-ip:2082`
2. سجل دخول بحساب المستخدم (User Panel)

### أو استخدام SSH:

```bash
ssh username@your-server-ip
```

---

## الخطوة 3️⃣: إنشاء Domain/Subdomain (اختياري)

### من لوحة CWP:

1. اذهب إلى **Domains**
2. اختر **Add Domain** أو **Add Subdomain**
3. أدخل اسم النطاق (مثل: `sponsorship.alfaisalyfc.net`)
4. احفظ الإعدادات

سيتم إنشاء مجلد `public_html` تلقائياً

---

## الخطوة 4️⃣: رفع الملفات

### الطريقة 1: استخدام File Manager في CWP

1. **افتح File Manager:**

   - من لوحة CWP → **File Management** → **File Manager**

2. **اذهب إلى مجلد الموقع:**

   - انتقل إلى `public_html` (أو المجلد الخاص بالنطاق)

3. **رفع الملفات:**

   - احذف الملفات الافتراضية (index.html القديم)
   - ارفع جميع محتويات مجلد `dist` من جهازك:
     - `index.html`
     - مجلد `assets`
     - جميع الصور (.jpg, .png)

4. **البديل - رفع كملف مضغوط:**
   - اضغط مجلد `dist` بالكامل كملف `.zip`
   - ارفع الملف المضغوط
   - فك الضغط من File Manager
   - انقل المحتويات إلى `public_html`

---

### الطريقة 2: استخدام FTP

#### باستخدام FileZilla:

1. **تنزيل FileZilla:**

   - [https://filezilla-project.org/](https://filezilla-project.org/)

2. **الاتصال بالسيرفر:**

   - Host: `ftp.yourdomain.com` أو `server-ip`
   - Username: اسم مستخدم CWP
   - Password: كلمة المرور
   - Port: 21

3. **رفع الملفات:**
   - في الجانب المحلي (Local): افتح مجلد `dist`
   - في الجانب البعيد (Remote): افتح `public_html`
   - اسحب جميع الملفات من `dist` إلى `public_html`

---

### الطريقة 3: استخدام SSH/SCP (الأسرع)

#### على Windows (PowerShell):

```bash
# ضغط مجلد dist
Compress-Archive -Path .\dist\* -DestinationPath dist.zip

# رفع الملف المضغوط
scp dist.zip username@server-ip:~/public_html/

# الاتصال بـ SSH
ssh username@server-ip

# فك الضغط
cd ~/public_html
unzip dist.zip
rm dist.zip
```

#### على Linux/Mac:

```bash
# ضغط ورفع في أمر واحد
cd dist
tar -czf ../site.tar.gz *
scp ../site.tar.gz username@server-ip:~/public_html/

# SSH وفك الضغط
ssh username@server-ip
cd ~/public_html
tar -xzf site.tar.gz
rm site.tar.gz
```

---

## الخطوة 5️⃣: إعدادات .htaccess (مهم جداً!)

### إنشاء ملف .htaccess في public_html:

```apache
# Enable Rewrite Engine
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect HTTP to HTTPS (اختياري)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Handle React Router (Single Page Application)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# MIME Types
AddType image/svg+xml .svg
AddType application/font-woff2 .woff2
</IfModule>
```

---

## الخطوة 6️⃣: التحقق من الأذونات

### من SSH أو File Manager:

```bash
# التأكد من أذونات الملفات
chmod 644 index.html
chmod 644 *.html
chmod 755 assets/
chmod 644 assets/*
chmod 644 *.jpg *.png
chmod 644 .htaccess
```

### من File Manager في CWP:

- حدد جميع الملفات
- اختر **Change Permissions**
- الملفات: `644`
- المجلدات: `755`

---

## الخطوة 7️⃣: إعداد SSL (HTTPS) - اختياري

### من لوحة CWP:

1. **اذهب إلى SSL:**

   - **SSL Certificates** → **AutoSSL**

2. **تفعيل Let's Encrypt:**

   - اختر النطاق
   - اضغط **Install SSL**

3. **أو رفع SSL يدوي:**
   - **SSL Certificates** → **Install SSL**
   - الصق المفتاح والشهادة

---

## الخطوة 8️⃣: اختبار الموقع

### افتح المتصفح:

```
http://yourdomain.com
# أو
https://yourdomain.com
```

### التحقق من:

- ✅ الصفحة تفتح بشكل صحيح
- ✅ الصور تظهر
- ✅ التبديل بين اللغات يعمل
- ✅ الروابط الخارجية تعمل
- ✅ SSL نشط (القفل الأخضر)

---

## 🔧 استكشاف الأخطاء

### المشكلة: الصور لا تظهر

**الحل:**

```bash
# تأكد من رفع جميع الصور
ls -la ~/public_html/*.jpg
ls -la ~/public_html/*.png

# تحقق من الأذونات
chmod 644 ~/public_html/*.jpg ~/public_html/*.png
```

### المشكلة: خطأ 403 Forbidden

**الحل:**

```bash
# أذونات المجلد
chmod 755 ~/public_html

# أذونات index.html
chmod 644 ~/public_html/index.html
```

### المشكلة: خطأ 404 عند التنقل

**الحل:**

- تأكد من وجود ملف `.htaccess`
- تأكد من تفعيل `mod_rewrite` في Apache

### المشكلة: CSS/JS لا يعمل

**الحل:**

```bash
# تحقق من مسارات الملفات
ls -la ~/public_html/assets/

# أذونات مجلد assets
chmod 755 ~/public_html/assets/
chmod 644 ~/public_html/assets/*
```

---

## 📊 هيكل الملفات النهائي في السيرفر:

```
~/public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-BGQBIL4P.css
│   └── index-BqtuoPr8.js
├── 001.jpg
├── 01.jpg
├── 04.jpg
├── 05.jpg
├── 253.png
├── 35.jpg
├── 37.jpg
├── 99.jpg
├── aldrees_logo.jpg
├── ROCO.jpg
├── الدريس.jpg
├── الملعب.jpg
├── ركو.jpg
├── شعار-ابيض.png
├── شعار-الرميح.jpg
└── يلو.jpg
```

---

## 🚀 التحديثات المستقبلية

### عند تحديث المشروع:

```bash
# 1. على جهازك
npm run build
في عرض 
# 2. احذف الملفات القديمة من السيرفر (عدا .htaccess)
ssh username@server-ip
cd ~/public_html
rm -rf assets/ index.html *.jpg *.png
# احتفظ بـ .htaccess

# 3. ارفع الملفات الجديدة من dist

# 4. امسح الكاش
# Ctrl + Shift + R في المتصفح
```

---

## 📝 ملاحظات مهمة:

1. **احتفظ بنسخة احتياطية:** دائماً احتفظ بنسخة من الملفات قبل التحديث
2. **الأمان:** لا ترفع ملفات `.env` أو معلومات حساسة
3. **الأداء:** استخدم CDN لتسريع الموقع (Cloudflare مجاني)
4. **المراقبة:** راقب سجلات الأخطاء في CWP

---

## 🎯 الخلاصة:

```bash
# الخطوات السريعة:
1. npm run build
2. رفع محتويات dist/ إلى public_html/
3. إنشاء .htaccess
4. ضبط الأذونات
5. تفعيل SSL
6. اختبار الموقع ✅
```

---

**بالتوفيق! 🎉**

إذا واجهت أي مشكلة، راجع قسم استكشاف الأخطاء أو تواصل مع دعم السيرفر.
