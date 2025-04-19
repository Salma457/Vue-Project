<template>
  <div class="adventure-details">
    <div v-if="loadError" class="error-message">
      <p>Failed to load adventure details. Please try again later.</p>
      <router-link to="/adventures">
        <button class="btn-back">Back to Adventures</button>
      </router-link>
    </div>

    <div v-else-if="adventure" class="details">
      <ShortInfo :adventureSt="adventure" />
      <AdventureFullView :fullInfo="adventure" />
    </div>

    <div v-else class="loading">Loading adventure details...</div>
  </div>
</template>

<script>
import ShortInfo from '@/components/AdventureDetails/ShortInfo.vue'
import AdventureFullView from '@/components/AdventureDetails/AdventureFullView.vue'
import { adventureStore } from '@/stores/adventureStore'

export default {
  components: {
    ShortInfo,
    AdventureFullView
  },
  data() {
    return {
      adventure: null,
      loadError: false,
    };
  },
  async mounted() {
    try {
      const adventureId = this.$route.params.id;
      this.adventure = await adventureStore.getAdventure(adventureId);
      
      if (!this.adventure) {
        throw new Error("Adventure not found");
      }
    } catch (error) {
      console.error("Error loading adventure:", error);
      this.loadError = true;
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
}

.btn-back {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2f80ed;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.details {
  background-color: #f4f4f4;
  padding: 25px;
  border-radius: 10px;
}

.loading {
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
}
</style>
