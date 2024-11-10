import { defineStore } from 'pinia'
import { useQuestionStore } from './QuestionStore'

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
    questionStore: undefined,
    questionSet: [],
    answerSet: [],
    correctAnswerCount: 0,
  }),
  getters: {
    getQuestionSet: state => state.questionSet,
    getAnswerSet: state => state.answerSet,
    getCorrectAnswerCount: state => state.correctAnswerCount,
  },
  actions: {
    async actionLoadQuestionSet(categoryId) {
      this.questionStore = useQuestionStore()
      this.questionSet =
        await this.questionStore.actionGetQuestionSetByCategoryId(categoryId)
      this.answerSet = []
      this.correctAnswerCount = 0
      this.questionSet.forEach(item => this.answerSet.push(item.answer))
    },
    async actionCalcCorrectAnswerCount(userAnswers) {
      for (let i = 0; i < this.answerSet.length; i++) {
        if (this.answerSet[i] == userAnswers[i]) {
          this.correctAnswerCount++
        }
      }
    },
  },
})
