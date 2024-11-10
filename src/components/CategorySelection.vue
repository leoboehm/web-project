<template>
  <v-col cols="12" sm="3" v-for="category in categories" :key="category.name">
    <v-card class="category-card" @click="categorySelection(category.id)">
      <v-img :src="category.img" max-height="500px" />
      <div class="overlay">
        <p class="pa-3">{{ category.description }}</p>
      </div>
      <v-card-title class="card-title">{{ category.name }}</v-card-title>
    </v-card>
  </v-col>
</template>

<script>
import { useQuestionStore } from '@/store/QuestionStore'

export default {
  name: 'CategorySelection',

  data() {
    return {
      questionStore: undefined,
      categories: [],
    }
  },

  async beforeMount() {
    this.questionStore = useQuestionStore()

    this.categories = this.questionStore.getCategories
  },

  methods: {
    categorySelection(categoryId) {
      this.questionStore.actionSetSelectedCategoryById(categoryId)

      this.$router.push({ name: 'quiz' })
    },
  },
}
</script>

<style scoped>
.category-card {
  transition: transform 0.2s;
}
.category-card:hover {
  transform: scale(1.05);
}
.card-title {
  background-color: #388e3c;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsla(125, 40%, 6%, 0.8);
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #fff;
}
.category-card:hover .overlay {
  opacity: 1;
}
</style>
