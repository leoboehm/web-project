import { defineStore } from 'pinia'
import { useQuestionStore } from './QuestionStore'

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
    questionStore: undefined,
    questionSet: [],
    answerSet: [],
  }),
  getters: {
    getQuestionSet: state => state.questionSet,
    getAnswerSet: state => state.answerSet,
  },
  actions: {
    async actionLoadQuestionSet(categoryId) {
      this.questionStore = useQuestionStore()
      this.questionSet =
        await this.questionStore.actionGetQuestionSetByCategoryId(categoryId)
      this.questionSet.forEach(item => this.answerSet.push(item.answer))
    },
    async actionGetCorrectAnswerCount(userAnswers) {
      let correctAnswerCount = 0

      for (let i = 0; i < this.answerSet.length; i++) {
        if (this.answerSet[i] == userAnswers[i]) {
          correctAnswerCount++
        }
      }

      return correctAnswerCount
    },
  },
})
