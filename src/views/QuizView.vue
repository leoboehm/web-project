<template>
  <v-container fluid>
    <v-row v-if="categoryStore.getSelectedCategory == undefined">
      <v-col cols="12">
        <h2 class="text-h4 text-center my-5">
          Select a category to start a quiz!
        </h2>
      </v-col>
      <CategorySelection />
    </v-row>

    <template v-else>
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <!-- Start Quiz -->
          <v-card flat v-if="!(quizStarted || quizEnded)">
            <v-card-actions
              ><v-btn color="primary" @click="changeCategory"
                ><v-icon class="mr-2" color="primary">mdi-arrow-left-top</v-icon
                >Change Category</v-btn
              ></v-card-actions
            >
            <v-card-title class="text-h4"
              >Category:
              {{ categoryStore.getSelectedCategory.name }}</v-card-title
            >
            <v-img
              :src="categoryStore.getSelectedCategory.img"
              max-width="500px"
              class="ma-4"
            ></v-img>
            <v-card-subtitle class="text-h6">{{
              categoryStore.getSelectedCategory.description
            }}</v-card-subtitle>
            <div class="pa-4">
              <h2 class="text-right text-secondary">
                Are you ready? Click the button below to start the Quiz!
              </h2>
              <v-row class="mt-3">
                <v-spacer />
                <v-btn @click="startQuiz" color="primary" size="large"
                  >Start!</v-btn
                ></v-row
              >
            </div>
          </v-card>

          <!-- Questions -->
          <v-stepper v-if="quizStarted" v-model="e1">
            <v-stepper-header>
              <template v-for="(question, index) in questionPool" :key="index">
                <v-stepper-item
                  :complete="e1 > index + 1"
                  :complete-icon="correctAnswer(index) ? '$complete' : '$error'"
                  :color="
                    e1 > index + 1
                      ? correctAnswer(index)
                        ? 'success'
                        : 'error'
                      : 'grey'
                  "
                  :step="`Step {{ index+1 }}`"
                  :value="index + 1"
                ></v-stepper-item>
                <v-divider
                  v-if="index !== questionPool.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-stepper-header>

            <v-stepper-window>
              <v-stepper-window-item
                v-for="(question, index) in questionPool"
                :key="index"
                :step="`Step {{ index+1 }}`"
                :value="index + 1"
              >
                <v-card flat>
                  <v-card-text class="text-h5">{{
                    question.question
                  }}</v-card-text>
                  <v-radio-group v-model="userAnswers[index]" :key="index" row>
                    <v-radio
                      v-for="(option, optionIndex) in question.options"
                      :key="optionIndex"
                      :label="option"
                      :value="option"
                    />
                  </v-radio-group>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      :disabled="userAnswers[index] == undefined"
                      size="large"
                      v-if="index < questionPool.length - 1"
                      color="primary"
                      @click="e1++"
                    >
                      Next Question<v-icon class="ml-2"
                        >mdi-arrow-right-thick</v-icon
                      >
                    </v-btn>
                    <v-btn
                      :disabled="userAnswers[index] == undefined"
                      size="large"
                      v-if="index === questionPool.length - 1"
                      color="primary"
                      @click="endQuiz"
                    >
                      End Quiz
                      <v-icon class="ml-2">mdi-check-bold</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>

          <!-- Results -->
          <v-card flat v-if="quizEnded">
            <v-card-title class="text-h4 text-center">Summary</v-card-title>
            <v-card-subtitle class="text-h6 text-center"
              >Category:
              {{ categoryStore.getSelectedCategory.name }}</v-card-subtitle
            >
            <div class="pa-4 text-center">
              <h2 class="mb-4">Here are your results:</h2>
              <v-progress-linear
                :model-value="quizStore.getCorrectAnswerCount"
                color="secondary"
                bg-color="error"
                rounded
                height="20"
                :max="questionPool.length"
              ></v-progress-linear>
              <p class="text-h6 text-secondary my-2">
                You correctly answered {{ quizStore.getCorrectAnswerCount }}/{{
                  questionPool.length
                }}
                questions!
              </p>
              <p v-if="quizStore.getCorrectAnswerCount != questionPool.length">
                Keep going to improve your knowledge in
                {{ categoryStore.getSelectedCategory.name }} and reach 100%!
              </p>
              <p v-else>
                Congratulations! You mastered the category
                {{ categoryStore.getSelectedCategory.name }} and reached 100%!
              </p>
              <v-divider class="mt-6"></v-divider>
              <h2 class="mb-4 mt-6">Ready for the next round?</h2>
              <v-btn @click="newQuiz" color="primary" size="large"
                >Start new Quiz!</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { useCategoryStore } from '@/store/CategoryStore'
import { useQuizStore } from '@/store/QuizStore'
import { useQuestionStore } from '@/store/QuestionStore'

import CategorySelection from '@/components/CategorySelection.vue'

export default {
  name: 'QuizView',
  components: { CategorySelection },

  data() {
    return {
      categoryStore: undefined,
      quizStore: undefined,
      questionStore: undefined,

      e1: 1,

      quizStarted: false,
      quizEnded: false,

      questionPool: [],
      userAnswers: [],
    }
  },

  async beforeMount() {
    this.categoryStore = useCategoryStore()
    this.quizStore = useQuizStore()
    this.questionStore = useQuestionStore()

    await this.questionStore.actionFetchAllQuestions()
  },

  methods: {
    changeCategory() {
      this.newQuiz()
    },
    async startQuiz() {
      await this.quizStore.actionLoadQuestionSet(
        this.categoryStore.getSelectedCategory.id,
      )
      this.questionPool = this.quizStore.getQuestionSet

      if (this.questionPool != undefined) {
        this.quizStarted = true
        this.quizEnded = false
      }
    },
    async endQuiz() {
      await this.quizStore.actionCalcCorrectAnswerCount(this.userAnswers)
      this.quizEnded = true
      this.quizStarted = false
    },
    newQuiz() {
      this.resetValues()
      this.categoryStore.actionClearSelectedCategory()
      this.$router.push({ name: 'quiz' })
    },
    resetValues() {
      this.e1 = 1
      this.quizEnded = false
      this.quizStarted = false
      this.userAnswers = []
    },
    correctAnswer(index) {
      if (this.quizStore.getAnswerSet[index] == this.userAnswers[index]) {
        return true
      }
      return false
    },
  },
}
</script>

<style scoped></style>
