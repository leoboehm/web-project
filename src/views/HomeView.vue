<template>
  <v-container fluid>
    <!-- Hero Section -->
    <v-row class="hero-section" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <h1 class="display-2 font-weight-bold">Challenge Your Knowledge</h1>
        <p class="subtitle-1">
          Ready to test your skills? Start a quiz and see how you rank!
        </p>
        <v-btn color="primary-darken-1" size="x-large" to="/quiz" class="my-2"
          >Start a Quiz</v-btn
        >
      </v-col>
    </v-row>

    <!-- Categories -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-center my-5">Quiz Categories</h2>
      </v-col>
      <CategorySelection />
    </v-row>

    <!-- Features -->
    <!-- <v-row class="features my-10">
      <v-col cols="12" md="4" v-for="feature in features" :key="feature.title">
        <v-icon color="primary">{{ feature.icon }}</v-icon>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import CategorySelection from '@/components/CategorySelection.vue'

import { useQuestionStore } from '@/store/QuestionStore'

export default {
  name: 'HomeView',
  components: { CategorySelection },
  data() {
    return {
      questionStore: undefined,
      // features: [
      //   {
      //     icon: 'mdi-trophy',
      //     title: 'Earn Points',
      //     description: 'Collect points and climb the leaderboard!',
      //   },
      //   {
      //     icon: 'mdi-lightbulb',
      //     title: 'Learn & Improve',
      //     description: 'Explanations after each question help you grow.',
      //   },
      //   {
      //     icon: 'mdi-account-multiple',
      //     title: 'Challenge Friends',
      //     description: 'Invite friends and compete in live quizzes.',
      //   },
      // ],
    }
  },

  async beforeMount() {
    this.questionStore = useQuestionStore()

    await this.questionStore.actionFetchAllCategories()
  },
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #388e3c, #8bc34a);
  color: white;
  padding: 40px 0;
  overflow-x: hidden;
}
.features {
  text-align: center;
}
</style>
