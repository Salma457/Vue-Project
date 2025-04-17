

  <template>
    <div class="why-book-section">
      <h1>Why book an adventure with embark.org?</h1>
      <div class="reasons-container">
        <div class="reason-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M3.44 2.53a.75.75 0 011.06.54l1.53 1.53a.75.75 0 01-1.06 1.06l-1.53-1.53a.75.75 0 010-1.06zM6.75 6a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0v-9a.75.75 0 01.75-.75zM10.5 9a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM13.5 12a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM16.5 9.75a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V10.5a.75.75 0 01.75-.75zM19.56 2.53a.75.75 0 010 1.06l-1.53 1.53a.75.75 0 01-1.06-1.06l1.53-1.53a.75.75 0 011.06 0zM21 6.75a.75.75 0 01-.75.75h-9a.75.75 0 010-1.5h9a.75.75 0 01.75.75z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>We do adventure.<br>Only adventure.</h2>
          <p>You won't find cruises or dinner shows here. We're inspired to get outside and rock climb, mountaineer, ski, hike, kayak, surf, dive, and so much more. If we end up in a remote village or by a hidden waterfall, then all the better!</p>
        </div>
  
        <div class="reason-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M12 14a5 5 0 100-10 5 5 0 000 10zm-2-6a2 2 0 114 0 2 2 0 01-4 0z" />
              <path fill-rule="evenodd" d="M7 16.62A8 8 0 1117 16.62V17h-2a6 6 0 00-6 0h-2v-.38zM12 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>Passionate, responsible,<br>local adventure hosts</h2>
          <p>Each host is vetted for quality and reliability. We only work with P2P hosts, certified guides, and small tour operators. We support local business; NOT big tour conglomerates.</p>
        </div>
  
        <div class="reason-item">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.304 0-9.75 4.446-9.75 9.75s4.446 9.75 9.75 9.75 9.75-4.446 9.75-9.75S17.304 2.25 12 2.25zM12 16.5a.75.75 0 01-.75-.75v-3.75a.75.75 0 011.5 0v3.75a.75.75 0 01-.75.75zm-3-5.25a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>Booking a tour<br>is easy</h2>
          <p>Message our hosts to set up a tour OR just pick a day and book it. Communicate with ease with adventure hosts and our knowledgeable customer service team.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WhyBookSection'
  }
  </script>
  
  <style scoped>
  .why-book-section {
    background-color: #80DEEA;
    color: #333;
    padding: 60px 20px;
    text-align: center;
  }
  
  .why-book-section h1 {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 60px;
    color: #000;
  }
  
  .reasons-container {
    display: flex;
    justify-content: center;
    gap: 30px; /* مسافات متساوية بين العناصر */
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .reason-item {
    flex: 1; /* يجعل العناصر تأخذ نفس المساحة */
    max-width: 350px; /* تحديد أقصى عرض لكل عنصر */
    padding: 30px;
    text-align: center;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .reason-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    margin-bottom: 20px;
  }
  
  .icon svg {
    width: 50px;
    height: 50px;
    fill: #00BCD4;
  }
  
  .reason-item h2 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #000;
    line-height: 1.4;
  }
  
  .reason-item p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
  }
  
  /* التكيف مع الشاشات الصغيرة */
  @media (max-width: 992px) {
    .reasons-container {
      gap: 20px;
    }
    
    .reason-item {
      padding: 25px;
    }
  }
  
  @media (max-width: 768px) {
    .reasons-container {
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    
    .reason-item {
      max-width: 500px;
      width: 100%;
    }
    
    .why-book-section h1 {
      font-size: 1.8rem;
      margin-bottom: 40px;
    }
  }
  
  @media (max-width: 576px) {
    .why-book-section {
      padding: 40px 15px;
    }
    
    .reason-item {
      padding: 20px;
    }
    
    .reason-item h2 {
      font-size: 1.3rem;
    }
    
    .reason-item p {
      font-size: 0.95rem;
    }
  }
  </style>