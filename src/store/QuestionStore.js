import { defineStore } from 'pinia'
import questions from '@/data/questions.json'

export const useQuestionStore = defineStore('QuestionStore', {
  state: () => ({
    questions: [],
  }),
  getters: {
    getAllQuestions: state => state.questions,
  },
  actions: {
    async actionFetchAllQuestions() {
      this.questions = questions
    },
    async actionGetQuestionSetByCategoryId(categoryId) {
      let questionPool = []
      if (categoryId == 0) {
        // return random questions from all categories
        this.questions.forEach(category =>
          questionPool.push(questions[category]),
        )
      } else {
        // return random questions by category
        questionPool = this.questions[categoryId]
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
        // return the first 15 questions
        return questionPool.slice(0, 15)
      }
    },
  },
})
