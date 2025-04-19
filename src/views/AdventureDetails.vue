<template>
  <div>
    <Navbar />
    <div class="adventure-details">
      <div v-if="loadError" class="error-message">
        <p>{{ errorMessage }}</p>
        <router-link to="/adventures">
          <button class="btn-back">Back to Adventures</button>
        </router-link>
      </div>

      <div v-else-if="adventure" class="details">
        <ShortInfo :adventureSt="adventure" />
        <AdventureFullView :fullInfo="adventure" />
      </div>

      <div v-else class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p>Loading adventure details...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ShortInfo from '@/components/AdventureDetails/ShortInfo.vue'
import AdventureFullView from '@/components/AdventureDetails/AdventureFullView.vue'
import { adventureStore } from '@/stores/adventureStore'
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    ShortInfo,
    AdventureFullView,
    Navbar
  },
  data() {
    return {
      adventure: null,
      loadError: false,
      errorMessage: 'Failed to load adventure details. Please try again later.'
    };
  },
  async mounted() {
    try {
      const adventureId = this.$route.params.id;
      console.log('Route params:', this.$route.params);
      
      if (!adventureId) {
        throw new Error("Adventure ID is missing");
      }

      this.adventure = await adventureStore.getAdventure(adventureId);
      
      if (!this.adventure) {
        throw new Error("Adventure not found");
      }
    } catch (error) {
      console.error("Error loading adventure:", error);
      this.loadError = true;
      if (error.message === "Adventure not found") {
        this.errorMessage = "Sorry, this adventure could not be found.";
      }
    }
  },
};
</script>

<style scoped>
.adventure-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.error-message {
  background-color: #f8d7da;
  padding: 20px;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
}

.btn-back {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2f80ed;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: #1b64da;
}

.details {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 2rem;
}

.loading {
  font-size: 18px;
  margin-top: 3rem;
  text-align: center;
}

.loading .spinner-border {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
}
</style>
