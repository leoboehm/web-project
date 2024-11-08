import { defineStore } from 'pinia'
import categories from '@/data/categories.json'
import questions from '@/data/questions.json'

export const useQuestionStore = defineStore('QuestionStore', {
  state: () => ({
    questions: [],
    categories: [],
  }),
  getters: {
    getCategories: state => state.categories,
    getAllQuestions: state => state.questions,
  },
  actions: {
    async actionFetchAllCategories() {
      this.categories = categories.list
    },
    async actionFetchQuestions() {
      this.questions = questions
    },
  },
})
