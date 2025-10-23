# إعداد نموذج الاتصال على سيرفر CWP

## الخيار الأول: Web3Forms (موصى به)

### الخطوات:

1. اذهب إلى: https://web3forms.com
2. سجل حساب مجاني
3. احصل على Access Key
4. استبدل 'your-access-key-here' في الكود

### المميزات:

- مجاني حتى 250 رسالة/شهر
- سهل الإعداد
- يعمل فوراً بعد النشر
- لا يحتاج إعدادات سيرفر

## الخيار الثاني: إعداد SMTP على CWP

### الخطوات:

1. في cPanel، اذهب إلى "Email Accounts"
2. أنشئ حساب بريد إلكتروني: investment@yourdomain.com
3. استخدم إعدادات SMTP:
   - Host: mail.yourdomain.com
   - Port: 587 أو 25
   - Username: investment@yourdomain.com
   - Password: كلمة المرور التي اخترتها

### تعديل الكود:

استبدل Web3Forms بـ PHP mail أو مكتبة SMTP

## الخيار الثالث: Netlify Forms (عند النشر على Netlify)

### المميزات:

- مجاني
- يعمل تلقائياً
- لا يحتاج إعدادات

## التوصية:

استخدم Web3Forms للحصول على أسرع حل وأسهله!



