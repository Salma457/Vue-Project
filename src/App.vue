<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <AdventureList />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import AdventureList from './components/AdventureList.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    AdventureList
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>