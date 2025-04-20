<template>
  <div>
    <h2>Dropdown Debug</h2>
    <button @click="testClick">Test Button</button>
    <p>Dropdown state: {{ showDropdown ? 'OPEN' : 'CLOSED' }}</p>
    
    <!-- Simplified dropdown -->
    <div style="position: relative">
      <button 
        @click="toggleDropdown"
        style="padding: 8px 12px; border: 1px solid #ddd"
      >
        Debug Dropdown ▼
      </button>
      <div 
        v-show="showDropdown"
        style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #eee; padding: 8px"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    toggleDropdown(e) {
      console.log('Dropdown clicked', e)
      e.stopPropagation()
      this.showDropdown = !this.showDropdown
    },
    testClick() {
      console.log('Regular button clicked')
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      console.log('Document click detected')
      this.showDropdown = false
    })
  }
}
</script>