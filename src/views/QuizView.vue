<template>
  <div class="quiz">
    <h1>This is the quiz page</h1>
  </div>
</template>

<script>
import { useQuestionStore } from '@/store/QuestionStore'

export default {
  name: 'QuizView',

  data() {
    return {
      questionStore: undefined,
    }
  },

  async beforeMount() {
    this.questionStore = useQuestionStore()
    await this.questionStore.actionFetchAllQuestions()
  },
}
</script>
