<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },
}
</script>

<style scoped></style>
