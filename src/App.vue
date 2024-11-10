<template>
  <v-app>
    <AppHeader @toggleTheme="toggleTheme" />

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
import { useTheme } from 'vuetify/lib/framework.mjs'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },

  data() {
    return {
      questionStore: undefined,
      theme: undefined,
    }
  },

  async beforeMount() {
    this.questionStore = useQuestionStore()
    this.theme = useTheme()

    await this.questionStore.actionFetchAllCategories()
  },

  methods: {
    toggleTheme() {
      this.theme.global.name =
        this.theme.global.name == 'customDarkTheme'
          ? 'customLightTheme'
          : 'customDarkTheme'
    },
  },
}
</script>

<style scoped></style>
