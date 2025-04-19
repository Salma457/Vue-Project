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
    }
  },

  async fetchLocations() {
    try {
      const response = await axios.get('http://localhost:5000/locations')
      this.locations = response.data
    } catch (error) {
      console.error("Error fetching locations:", error)
    }
  },

  async getAdventure(_id) {
    try {
      const response = await axios.get(`http://localhost:5000/adventures/${_id}`)
      this.currentAdventure = response.data
      return response.data
    } catch (error) {
      console.error("Error fetching adventure:", error)
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