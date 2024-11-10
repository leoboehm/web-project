import { defineStore } from 'pinia'
import categories from '@/data/categories.json'

export const useCategoryStore = defineStore('CategoryStore', {
  state: () => ({
    categories: [],
    selectedCategory: undefined,
  }),
  getters: {
    getCategories: state => state.categories,
    getSelectedCategory: state => state.selectedCategory,
  },
  actions: {
    async actionFetchAllCategories() {
      this.categories = categories.list
      this.actionClearSelectedCategory()
    },
    actionClearSelectedCategory() {
      this.selectedCategory = undefined
    },
    actionSetSelectedCategoryById(categoryId) {
      this.selectedCategory = this.categories.filter(
        item => item.id == categoryId,
      )[0]
    },
  },
})
