import { createStore } from 'vuex'
import axios from 'axios' // أضف هذا الاستيراد في الأعلى

export default createStore({
  state: {
    adventures: [], // أضيفي هذا السطر
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || []
  },
  mutations: {
    SET_ADVENTURES(state, adventures) { // أضيفي هذا الـ mutation
      state.adventures = adventures
    },
    UPDATE_WISHLIST(state, newList) {
      state.wishlist = newList
      localStorage.setItem('wishlist', JSON.stringify(newList))
    }
  },
  actions: {
    async fetchAdventures({ commit }) { // أضيفي هذا الـ action
      const response = await axios.get('http://localhost:5000/adventures')
      commit('SET_ADVENTURES', response.data)
    },
    toggleWishlist({ commit, state }, adventureId) {
      const newList = state.wishlist.includes(adventureId)
        ? state.wishlist.filter(id => id !== adventureId)
        : [...state.wishlist, adventureId]
      commit('UPDATE_WISHLIST', newList)
    }
  },
  getters: {
    wishlistCount: state => state.wishlist.length,
    isInWishlist: state => id => state.wishlist.includes(id)
  }
})