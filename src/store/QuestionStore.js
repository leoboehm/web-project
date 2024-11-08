import { defineStore } from 'pinia'
import categories from '@/data/categories.json'

export const useQuestionStore = defineStore('QuestionStore', {
  state: () => ({
    questions: [],
    categories: [],
  }),
  getters: {
    getCategories: state => state.categories,
  },
  actions: {
    async actionFetchAllCategories() {
      this.categories = categories.list;
    },
  },
})
