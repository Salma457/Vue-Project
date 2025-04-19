<template>
  <div class="host-adventure">
    <section class="hero">
      <img src="@/assets/host1.jpg" alt="Host Adventure" />
      <div class="overlay">
        <h1>Welcome to Your Adventure</h1>
        <p>Share your journey, inspire others, and relive the thrill!</p>
        <div class="buttons">
       
          <!-- Add Adventure Button -->
          <router-link to="/host/add" class="add-adventure-btn">
            Add New Adventure
          </router-link>
        </div>
      </div>
    </section>

    <!-- Rectangular Feature Boxes Section -->
    <section class="feature-boxes">
      <div class="feature-box">
        <i class="earn-money"></i>
        <h5>EARN MONEY</h5>
        <p>Our P2P Marketplace allows you to make money doing the kinds of adventurous activities you love!</p>
        <!-- Additional CTA Button -->
        <router-link to="/host/add" class="feature-box-btn">
          Start Hosting
        </router-link>
      </div>
      <div class="feature-box">
        <i class="explore-adventure"></i>
        <h5>EXPLORE ADVENTURES</h5>
        <p>Discover new places and share your adventures with the world!</p>
        <router-link to="/host/add" class="feature-box-btn">
          Create Adventure
        </router-link>
      </div>
      <div class="feature-box">
        <i class="connect-people"></i>
        <h5>CONNECT WITH PEOPLE</h5>
        <p>Meet new people and build connections through your shared experiences!</p>
        <router-link to="/host/add" class="feature-box-btn">
          Get Started
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Host"
}
</script>

<style scoped>
.host-adventure {
  font-family: 'Arial', sans-serif;
}

.hero {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(60%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.overlay h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.overlay p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.buttons a {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: rgb(1, 116, 93);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.buttons a:hover {
  background-color: #019874;
}

/* Special style for Add Adventure button */
.add-adventure-btn {
  background-color: #ff5a5f !important; /* Different color to stand out */
  padding: 12px 24px !important;
  font-size: 1.1rem !important;
}

.add-adventure-btn:hover {
  background-color: #e04a50 !important;
  transform: translateY(-2px);
}

/* Feature Boxes Section */
.feature-boxes {
  display: flex;
  justify-content: space-around;
  padding: 4rem 2rem;
  background-color: #f7f7f7;
  flex-wrap: wrap;
}

.feature-box {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 30%;
  margin-bottom: 2rem;
  position: relative;
  min-height: 300px;
}

.feature-box i {
  font-size: 3rem;
  color: rgb(1, 71, 57);
  margin-bottom: 1rem;
}

.feature-box h5 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #01473d;
}

.feature-box p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #555;
}

.feature-box:hover {
  transform: translateY(-10px);
}

/* Feature box button */
.feature-box-btn {
  display: inline-block;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #009688;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  width: 80%;
  text-align: center;
}

.feature-box-btn:hover {
  background-color: #00796b;
}

@media (max-width: 768px) {
  .feature-box {
    width: 100%;
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .buttons a {
    margin: 5px 0;
  }
}
</style>

