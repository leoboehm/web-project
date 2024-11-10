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

import { useCategoryStore } from '@/store/CategoryStore'
import { useTheme } from 'vuetify/lib/framework.mjs'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },

  data() {
    return {
      categoryStore: undefined,
      theme: undefined,
    }
  },

  async beforeMount() {
    this.categoryStore = useCategoryStore()
    this.theme = useTheme()

    await this.categoryStore.actionFetchAllCategories()
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
