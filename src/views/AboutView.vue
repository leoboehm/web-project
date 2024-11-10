<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-card class="py-5 px-4">
          <v-card-title class="text-h4 text-center mb-4"
            >About TriviaMaster</v-card-title
          >
          <v-card-text>
            <p class="text-body-1 mb-4">
              TriviaMaster is a fun platform designed to test your knowledge
              across a wide range of topics. Whether you're a science buff, a
              history enthusiast, or just looking to learn something new,
              TriviaMaster has questions for everyone.
            </p>

            <p class="text-body-1 mb-4">
              Built with simplicity and interactivity in mind, TriviaMaster
              brings you an easy-to-use interface where you can challenge
              yourself or your friends. Our carefully crafted questions cover
              topics from Science to Pop Culture, making it a perfect way to
              spend your free time while learning.
            </p>

            <v-divider class="my-4"></v-divider>

            <h5 class="text-h5 mt-4">Key Features</h5>
            <v-list>
              <v-list-item class="list-item">
                <v-icon color="secondary" class="mr-2">mdi-book</v-icon> A wide
                range of categories to choose from
              </v-list-item>
              <v-list-item class="list-item">
                <v-icon color="secondary" class="mr-2">mdi-help</v-icon>
                Randomized questions to keep things fresh
              </v-list-item>
              <v-list-item class="list-item">
                <v-icon color="secondary" class="mr-2">mdi-lightbulb</v-icon>
                Track your progress and improve over time
              </v-list-item>
              <v-list-item class="list-item">
                <v-icon color="secondary" class="mr-2">mdi-star</v-icon>
                Beautiful, responsive design built with Vue and Vuetify
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>

            <p class="text-body-1">
              Ready to start your trivia journey? Select a category and dive
              into the questions! TriviaMaster is all about making learning fun,
              challenging, and rewarding.
            </p>

            <v-divider class="my-4"></v-divider>

            <h3>Disclaimers</h3>
            <p>
              All images displayed on this website are downloaded from
              <a href="https://loremflickr.com">Lorem Flickr</a>.
            </p>
            <p>
              Contents of About and Help page, as well as questions and answer
              options in quizzes are generated with
              <a href="https://chatgpt.com">ChatGPT</a>.
            </p>
            <p>All rights reserved.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.list-item {
  font-size: 16px;
}
</style>
