<template>
  <v-app-bar class="navbar">
    <v-btn size="large" to="/" :active="false">
      <v-toolbar-title class="title">TriviaMaster</v-toolbar-title>
    </v-btn>
    <v-spacer />
    <v-btn size="large" to="/quiz" color="primary" :active="false"
      ><v-icon class="mr-2">mdi-arrow-right-thick</v-icon>Start a Quiz!</v-btn
    >
    <v-btn size="large" to="/about" :active="false">About</v-btn>
    <v-btn size="large" to="/help" :active="false">Help</v-btn>
    <v-tooltip text="Toggle dark/light theme"
      ><template v-slot:activator="{ props }">
        <v-btn icon @click="toggleTheme" v-bind="props"
          ><v-icon>mdi-brightness-6</v-icon></v-btn
        ></template
      ></v-tooltip
    >
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  methods: {
    toggleTheme() {
      this.$emit('toggleTheme')
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
</style>
