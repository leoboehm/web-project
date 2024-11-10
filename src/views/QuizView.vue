<template>
  <v-container fluid>
    <v-row v-if="questionStore.getSelectedCategory == undefined">
      <v-col cols="12">
        <h2 class="text-h4 text-center my-5">Select a category to start a quiz!</h2>
      </v-col>
      <CategorySelection />
    </v-row>

    <template v-else>
      <v-card flat v-if="quizStart">
        <v-card-title class="text-h4"
          >Category: {{ questionStore.getSelectedCategory.name }}</v-card-title
        >
        <v-img
          :src="questionStore.getSelectedCategory.img"
          max-width="500px"
          class="ma-4"
        ></v-img>
        <v-card-subtitle class="text-h6">{{
          questionStore.getSelectedCategory.description
        }}</v-card-subtitle>
        <div class="pa-4">
          <v-divider class="mb-2"></v-divider>
          <h3>
            Up for some extra spice? Activate timed questions!
            <v-tooltip text="You will have 60 seconds to answer each question."
              ><template v-slot:activator="{ props }"
                ><v-icon v-bind="props"
                  >mdi-help-circle-outline</v-icon
                ></template
              ></v-tooltip
            >
          </h3>
          <v-checkbox
            label="Timed Questions"
            v-model="timedQuestions"
          ></v-checkbox>
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
    </template>
  </v-container>
</template>

<script>
import { useQuestionStore } from '@/store/QuestionStore'

import CategorySelection from '@/components/CategorySelection.vue'

export default {
  name: 'QuizView',
  components: { CategorySelection },

  data() {
    return {
      questionStore: undefined,

      e1: 1,

      timedQuestions: false,
      quizStart: true,
      quizStarted: false,
      quizEnded: false,

      questionPool: [],
      userAnswers: [],
    }
  },

  async beforeMount() {
    this.questionStore = useQuestionStore()
    await this.questionStore.actionFetchAllQuestions()
  },

  methods: {
    async startQuiz() {
      this.questionPool =
        await this.questionStore.actionGetQuestionSetBySelectedCategory()

      if (this.questionPool != undefined) {
        this.e1Steps = this.questionPool.length
        this.quizStart = false
        this.quizStarted = true
      }
    },
  },
}
</script>

<style scoped></style>
