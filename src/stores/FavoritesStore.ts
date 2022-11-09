import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useFavoritesStore = defineStore('FavoritesStore', {
  state: () => {
    return {
      favorites: useLocalStorage('FavoritesStore:favorites', [] as string[]),
    }
  },

  actions: {
    addFavorite(breweryId: string) {
      this.favorites.indexOf(breweryId) === -1 ? this.favorites.push(breweryId) : console.log('Already favorited')
    },
    removeFavorite(breweryId: string) {
      const index = this.favorites.indexOf(breweryId)
      if (index !== -1) {
        this.favorites.splice(index, 1)
      }
    },
  },

  getters: {
    getFavorites: async (state) => state.favorites,
  }
})
