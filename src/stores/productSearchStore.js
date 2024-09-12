import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductSearchStore = defineStore('productSearchStore', () => {
  const keyword = ref("")

  return {
    keyword
  }
})

