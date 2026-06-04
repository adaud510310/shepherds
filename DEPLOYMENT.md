# 🚀 دليل النشر - Deployment Guide

## نشر المشروع على GitHub Pages

### الخطوات:

#### 1. تحضير المشروع

```bash
# بناء المشروع
npm run build
```

#### 2. تكوين GitHub Pages

1. ادفع المشروع إلى GitHub repository
2. اذهب إلى **Settings** في الـ repository
3. اختر **Pages** من القائمة الجانبية
4. في **Source**، اختر **gh-pages** branch

#### 3. النشر التلقائي

```bash
# بناء ونشر المشروع بأمر واحد
npm run build && npm run deploy
```

**ملاحظة مهمة:**

- تأكد من تحديث قيمة `base` في ملف `vite.config.js` لتطابق اسم الـ repository الخاص بك
- الإعداد الحالي: `base: "/shepherd/"`

### متغيرات البيئة (اختياري)

إذا كنت تريد استخدام متغيرات بيئة، أنشئ ملف `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=نادي الفيصلي
```

---

## النشر على خادم آخر

### Netlify

1. قم بتسجيل الدخول إلى [Netlify](https://www.netlify.com)
2. اسحب مجلد `dist` بعد تشغيل `npm run build`
3. أو اربط الـ repository مباشرة

**إعدادات البناء:**

- Build command: `npm run build`
- Publish directory: `dist`
- Base directory: (اتركه فارغاً)

### Vercel

1. قم بتسجيل الدخول إلى [Vercel](https://vercel.com)
2. استورد الـ repository
3. Vercel ستكتشف إعدادات Vite تلقائياً

**إعدادات البناء:**

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

## تحديث المشروع

### بعد إجراء تعديلات:

```bash
# 1. بناء المشروع
npm run build

# 2. نشر التحديثات
npm run deploy
```

---

## روابط مفيدة

- [وثائق Vite](https://vitejs.dev/guide/)
- [وثائق React](https://react.dev/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

## استكشاف الأخطاء

### المشكلة: الصور لا تظهر بعد النشر

**الحل:** تأكد من أن المسارات تبدأ بـ `/` وأن الصور موجودة في مجلد `public`

### المشكلة: صفحة 404 عند التنقل

**الحل:** GitHub Pages لا يدعم client-side routing بشكل افتراضي. المشروع الحالي صفحة واحدة فلا مشكلة.

### المشكلة: الموقع لا يفتح على الرابط الصحيح

**الحل:** تحقق من قيمة `base` في `vite.config.js`

---

© 2026 نادي الفيصلي



