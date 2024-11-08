<template>
  <v-container fluid>
    <!-- Hero Section -->
    <v-row class="hero-section" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <h1 class="display-2 font-weight-bold">Challenge Your Knowledge</h1>
        <p class="subtitle-1">
          Ready to test your skills? Start a quiz and see how you rank!
        </p>
        <v-btn
          color="primary-darken-1"
          size="x-large"
          to="/quiz"
          class="my-2"
          >Start a Quiz</v-btn
        >
      </v-col>
    </v-row>

    <!-- Categories -->
    <v-row class="my-10">
      <v-col cols="12">
        <h2 class="text-center my-5">Quiz Categories</h2>
      </v-col>
      <v-col
        cols="12"
        sm="3"
        v-for="category in categories"
        :key="category.name"
      >
        <v-card :to="'/categories/' + category.id" class="category-card">
          <v-img :src="category.image" max-height="500px" />
          <div class="overlay">
            <p class="pa-3">{{ category.description }}</p>
          </div>
          <v-card-title class="card-title">{{ category.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features -->
    <v-row class="features my-10">
      <v-col cols="12" md="4" v-for="feature in features" :key="feature.title">
        <v-icon color="primary">{{ feature.icon }}</v-icon>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Science',
          image: '/img/science.jpg',
          description:
            'Questions about physics, biology, chemistry, and space.',
        },
        {
          id: 2,
          name: 'History',
          image: '/img/history.jpg',
          description:
            'Topics covering world history, famous events, and important figures.',
        },
        {
          id: 3,
          name: 'Sports',
          image: '/img/sports.jpg',
          description:
            'Cover popular sports, athletes, teams, and major events.',
        },
        {
          id: 4,
          name: 'Literature',
          image: '/img/literature.jpg',
          description: 'Focus on famous authors, books, and literary terms.',
        },
        {
          id: 5,
          name: 'Pop Culture',
          image: '/img/pop_culture.jpg',
          description:
            'Movies, music, celebrities, and trends in entertainment.',
        },
        {
          id: 6,
          name: 'Technology',
          image: '/img/technology.jpg',
          description:
            'Innovations, tech companies, gadgets, and computing basics.',
        },
        {
          id: 7,
          name: 'Geography',
          image: '/img/geography.jpg',
          description:
            'Includes countries, capitals, landmarks, and natural wonders.',
        },
        {
          id: 8,
          name: 'General Knowledge',
          image: '/img/general_knowledge.jpg',
          description:
            'Test your general knowledge with random questions from all categories!',
        },
      ],
      features: [
        {
          icon: 'mdi-trophy',
          title: 'Earn Points',
          description: 'Collect points and climb the leaderboard!',
        },
        {
          icon: 'mdi-lightbulb',
          title: 'Learn & Improve',
          description: 'Explanations after each question help you grow.',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Challenge Friends',
          description: 'Invite friends and compete in live quizzes.',
        },
      ],
    }
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
.category-card {
  transition: transform 0.2s;
}
.category-card:hover {
  transform: scale(1.05);
}
.card-title {
  background-color: #388E3C;
}
.features {
  text-align: center;
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
