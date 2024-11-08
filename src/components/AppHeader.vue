<template>
  <v-app-bar class="navbar">
    <v-toolbar-title class="title" @click="toHome">
      TriviaMaster
    </v-toolbar-title>
    <v-spacer />
    <v-btn size="large" to="/start-quiz" class="btn" color="primary"
      ><v-icon class="mr-2">mdi-arrow-right</v-icon>Start a random Quiz!</v-btn
    >
    <v-btn size="large" to="/categories" class="btn">Categories</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  methods: {
    toHome() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped>
.navbar {
  height: fit-content;
}
.title {
  font-size: 32px;
  font-weight: bold;
}
.title.hover {
  cursor: pointer !important;
}
.btn {
  font-size: 24px;
  size: 30px;
}
</style>
