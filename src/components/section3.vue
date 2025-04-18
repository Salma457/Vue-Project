<template>
    <div class="host-section-container">
      <h1>Why become an adventure host?</h1>
      <div class="host-items-container">
        <div class="host-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.217.217 0 00.286 0l.028-.016.07-.041 9.136-5.154a2.5 2.5 0 00-1.79-3.227l-.027-.009a.251.251 0 00-.288-.04l-9.723 5.486-2.42-1.367a.25.25 0 01-.13-.2l-.007-.004-.024-.014a.217.217 0 00-.286 0l-.024.014-.007.004a.25.25 0 01-.13.2l-2.42 1.367-9.723-5.486a.251.251 0 00-.288.04l-.027.009a2.5 2.5 0 00-1.79 3.227l9.136 5.154zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>Share the adventures<br>you know and love</h2>
          <p>Put your outdoor passion, background, certifications, and expertise to use on the trail, on the ice, in the snow, in the water, and in the air.</p>
        </div>
  
        <div class="host-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.304 0-9.75 4.446-9.75 9.75s4.446 9.75 9.75 9.75 9.75-4.446 9.75-9.75S17.304 2.25 12 2.25zM12 14.25a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0V15a.75.75 0 00-.75-.75zm0-8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0V6a.75.75 0 00-.75-.75z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>Complete<br>flexibility</h2>
          <p>Host what you want, where you want, whenever you want to do it. You have full creative control. Do what you do best without corporate meddling.</p>
        </div>
  
        <div class="host-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.75 13.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>Full support from<br>the embark.org team</h2>
          <p>Marketing and advertisement of your adventure experiences to nearly 20,000 followers and subscribers. Liability waivers and optional add-on insurance available for all tours.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HostSection'
  }
  </script>
  
  <style scoped>
  .host-section-container {
    background-color: #6b0e0d; /* لون الخلفية الأحمر */
    color: white;
    padding: 40px 20px;
    text-align: center;
  }
  
  .host-section-container h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 30px;
    margin-bottom: 40px; /* إضافة هامش سفلي بمقدار 40 بكسل */

  }
  
  .host-items-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .host-item {
    width: calc(33% - 20px); /* ثلاث عناصر في الصف مع بعض المسافة */
    margin-bottom: 30px;
    padding: 20px;
    text-align: center;
  }
  
  .icon {
    margin-bottom: 15px;
  }
  
  .icon svg {
    width: 40px;
    height: 40px;
    fill: white; /* لون الأيقونات أبيض */
  }
  
  .host-item h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .host-item p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  /* استجابة للشاشات الأصغر */
  @media (max-width: 768px) {
    .host-item {
      width: calc(50% - 20px); /* عنصران في الصف للشاشات المتوسطة */
    }
  }
  
  @media (max-width: 576px) {
    .host-item {
      width: 100%; /* عنصر واحد في الصف للشاشات الصغيرة */
    }
  }
  </style>