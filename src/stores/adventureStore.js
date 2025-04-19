import { reactive } from 'vue'
import axios from 'axios'

export const adventureStore = reactive({
  adventures: [],
  currentAdventure: null,
  locations: [],

  async fetchAdventures() {
    try {
      const response = await axios.get('http://localhost:5000/adventures?_sort=id&_order=desc')
      this.adventures = response.data
    } catch (error) {
      console.error("Error fetching adventures:", error)
      throw error
    }
  },

  async fetchLocations() {
    try {
      const response = await axios.get('http://localhost:5000/locations')
      this.locations = response.data
    } catch (error) {
      console.error("Error fetching locations:", error)
      throw error
    }
  },

  async getAdventure(id) {
    try {
      console.log('Fetching adventure with ID:', id)
      console.log('Adventure data:', this.adventure)
      const response = await axios.get(`http://localhost:5000/adventures/${id}`)
      console.log('Adventure data received:', response.data)
      this.currentAdventure = response.data
      return response.data
    } catch (error) {
      console.error("Error fetching adventure:", error.response || error)
      if (error.response?.status === 404) {
        throw new Error("Adventure not found")
      }
      throw error
    }
  },

  async addAdventure(newAdventure) {
    try {
      const response = await axios.post('http://localhost:5000/adventures', newAdventure)
      this.adventures.unshift(response.data)
      return response.data
    } catch (error) {
      console.error("Error adding adventure:", error)
      throw error
    }
  }
})