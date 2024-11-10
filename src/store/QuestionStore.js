import { defineStore } from 'pinia'
import categories from '@/data/categories.json'
import questions from '@/data/questions.json'

export const useQuestionStore = defineStore('QuestionStore', {
  state: () => ({
    questions: [],
    categories: [],
    selectedCategory: undefined,
  }),
  getters: {
    getCategories: state => state.categories,
    getAllQuestions: state => state.questions,
    getSelectedCategory: state => state.selectedCategory,
  },
  actions: {
    async actionFetchAllCategories() {
      this.categories = categories.list
      this.selectedCategory = undefined
    },
    async actionFetchAllQuestions() {
      this.questions = questions
    },
    actionSetSelectedCategoryById(categoryId) {
      this.selectedCategory = this.categories.filter(
        item => item.id == categoryId,
      )[0]
    },
    async actionGetQuestionSetBySelectedCategory() {
      let questionPool = []
      if (this.selectedCategory == 0) {
        // return random questions from all categories
        this.questions.forEach(category =>
          questionPool.push(questions[category]),
        )
      } else {
        // return random questions by category
        questionPool = this.questions[this.selectedCategory.id]
      }
      return this.getRandomQuestions(questionPool)
    },

    // private functions
    getRandomQuestions(questionPool) {
      if (questionPool.length > 1) {
        // shuffle questionPool
        for (let i = questionPool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[questionPool[i], questionPool[j]] = [
            questionPool[j],
            questionPool[i],
          ]
        }
        // return the first 20 questions
        return questionPool.slice(0, 20)
      }
    },
  },
})
