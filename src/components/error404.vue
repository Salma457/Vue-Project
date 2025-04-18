<template>
    <div class="not-found-container">
      <img src="../assets/404-error-page-svg-animation.gif" >
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* لجعل الحاوية تأخذ ارتفاع الشاشة بالكامل */
    background-color: #f0f0f0; /* يمكنك إضافة لون خلفية إذا أردت */
  }
  
  img {
    max-width: 80%; /* للتحكم في الحجم النسبي للصورة */
    height: auto;
  }
  </style>