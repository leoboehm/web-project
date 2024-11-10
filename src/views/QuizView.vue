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
          <v-card flat v-if="!(quizStarted || quizEnded)">
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
              <h2 class="text-right">
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
                  <v-card-title>{{ question.question }}</v-card-title>
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
                      Next
                    </v-btn>
                    <v-btn
                      :disabled="userAnswers[index] == undefined"
                      size="large"
                      v-if="index === questionPool.length - 1"
                      color="success"
                      @click="submitQuiz"
                    >
                      Submit Quiz
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
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
    correctAnswer(index) {
      console.debug(this.quizStore.getAnswerSet)
      if (this.quizStore.getAnswerSet[index] == this.userAnswers[index]) {
        return true
      }
      return false
    },
  },
}
</script>

<style scoped></style>
