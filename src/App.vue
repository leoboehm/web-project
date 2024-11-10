<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

import { useQuestionStore } from '@/store/QuestionStore'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },

  data() {
    return {
      questionStore: undefined,
    }
  },

  async beforeMount() {
    this.questionStore = useQuestionStore()

    await this.questionStore.actionFetchAllCategories()
  },
}
</script>

<style scoped></style>
