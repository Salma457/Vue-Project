<template>
    <footer class="main-footer">
      <div class="social-icons">
        <a href="#"><img src="@/assets/2023_Facebook_icon.svg.webp" alt="Facebook"></a>
        <a href="#"><img src="@/assets/twitter-icon.png" alt="Twitter"></a>
        <a href="#"><img src="@/assets/download (1).png" alt="Instagram"></a>
        <a href="#"><img src="@/assets/email-icon--clipart-best-22.png" alt="Email"></a>
      </div>
      <div class="footer-links">
        <router-link to="#">About</router-link>
        <router-link to="#">Team</router-link>
        <router-link to="#">FAQs</router-link>
        <router-link to="#">Privacy</router-link>
        <router-link to="#">Terms</router-link>
        <router-link to="#">Feedback</router-link>
      </div>
      <div class="copyright">
        © 2023 Embark.org - Developed by <a href="https://boxnetsolutions.com/" target="_blank">Box Net Solutions</a>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'MainFooter'
  }
  </script>
  
  <style scoped>
.main-footer {
  background-color: #f8f8f8;
  color: #777;
  padding: 20px;
  display: flex; /* استخدام Flexbox للفوتر الرئيسي */
  justify-content: space-between; /* توزيع العناصر على طول الخط الرئيسي */
  align-items: center; /* محاذاة العناصر عموديًا في المنتصف */
  font-size: 0.9rem;
}

.footer-content {
  display: flex; /* استخدام Flexbox لترتيب محتوى الفوتر */
  align-items: center; /* محاذاة العناصر عموديًا في المنتصف */
  gap: 20px; /* مسافة بين مجموعات العناصر */
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons img {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.social-icons img:hover {
  opacity: 1;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-links a {
  color: #777;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #333;
}

.copyright {
  text-align: right; /* محاذاة نص حقوق النشر إلى اليمين */
}

.copyright a {
  color: #2196f3;
  text-decoration: none;
}

.copyright a:hover {
  text-decoration: underline;
}

/* استجابة للشاشات الأصغر */
@media (max-width: 768px) {
  .main-footer {
    flex-direction: column; /* ترتيب العناصر عموديًا على الشاشات الصغيرة */
    align-items: center; /* توسيط العناصر أفقيًا */
    text-align: center; /* توسيط النص */
  }

  .footer-content {
    flex-direction: column; /* ترتيب محتوى الفوتر عموديًا */
    align-items: center; /* توسيط العناصر أفقيًا */
    gap: 10px; /* تقليل المسافة بين العناصر */
  }

  .copyright {
    text-align: center; /* توسيط نص حقوق النشر على الشاشات الصغيرة */
  }
}
</style>