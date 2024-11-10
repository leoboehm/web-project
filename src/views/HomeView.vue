<template>
  <v-container fluid>
    <!-- Hero Section -->
    <v-row class="hero-section" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <h1 class="text-h3 font-weight-bold">Challenge Your Knowledge</h1>
        <p class="text-h5 my-2 text-black">
          Ready to test your skills? Start a quiz and see how you rank!
        </p>
        <v-btn color="primary-darken-1" size="x-large" to="/quiz" class="my-2"
          >START A QUIZ</v-btn
        >
      </v-col>
    </v-row>

    <!-- Categories -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-h4 text-center my-5">Quiz Categories</h2>
      </v-col>
      <CategorySelection />
    </v-row>
  </v-container>
</template>

<script>
import CategorySelection from '@/components/CategorySelection.vue'

export default {
  name: 'HomeView',
  components: { CategorySelection },
  data() {
    return {}
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
