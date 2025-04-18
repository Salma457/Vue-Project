<template>
  <div class="host-adventure">
    <section class="hero">
      <img src="@/assets/host1.jpg" alt="Host Adventure" />
      <div class="overlay">
        <h1>Welcome to Your Adventure</h1>
        <p>Share your journey, inspire others, and relive the thrill!</p>
        <div class="buttons">
          <router-link to="/details">Details</router-link>
          <router-link to="/photos">Photos</router-link>
          <router-link to="/itinerary">Itinerary</router-link>
        </div>
      </div>
    </section>

    <!-- Rectangular Feature Boxes Section -->
    <section class="feature-boxes">
      <div class="feature-box">
        <i class="earn-money"></i>
        <h5>EARN MONEY</h5>
        <p>Our P2P Marketplace allows you to make money doing the kinds of adventurous activities you love!</p>
      </div>
      <div class="feature-box">
        <i class="explore-adventure"></i>
        <h5>EXPLORE ADVENTURES</h5>
        <p>Discover new places and share your adventures with the world!</p>
      </div>
      <div class="feature-box">
        <i class="connect-people"></i>
        <h5>CONNECT WITH PEOPLE</h5>
        <p>Meet new people and build connections through your shared experiences!</p>
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
  background-color:rgb(1, 116, 93);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.buttons a:hover {
  background-color: #019874;
}

/* Feature Boxes Section */
.feature-boxes {
  display: flex;
  justify-content: space-around;
  padding: 2rem 0;
  background-color: #f7f7f7;
}

.feature-box {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 30%;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-box i {
  font-size: 3rem;
  color:rgb(1, 71, 57);
  margin-bottom: 1rem;
}

.feature-box h5 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.feature-box p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.feature-box:hover {
  transform: translateY(-10px);
}
</style>
