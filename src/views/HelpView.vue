<template>
  <v-container fluid>
    <!-- FAQ Section -->
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-card class="py-5 px-4 mb-6">
          <v-card-title class="text-h4 text-center mb-4">Frequently Asked Questions</v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
                <v-expansion-panel-header>{{ faq.question }}</v-expansion-panel-header>
                <v-expansion-panel-content>{{ faq.answer }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Form Section -->
    <v-row class="justify-center" id=contact>
      <v-col cols="12" md="8">
        <v-card class="py-5 px-4">
          <v-card-title class="text-h4 text-center mb-4">Contact Us</v-card-title>
          <v-card-text>
            <v-form ref="contactForm" v-model="formValid" @submit.prevent="submitForm">
              <v-text-field
                v-model="contactForm.name"
                label="Your Name"
                :rules="[v => !!v || 'Name is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="contactForm.email"
                label="Email"
                :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                required
              ></v-text-field>

              <v-textarea
                v-model="contactForm.message"
                label="Message"
                :rules="[v => !!v || 'Message is required']"
                required
              ></v-textarea>

              <v-btn color="primary" class="mt-4" type="submit" :disabled="!formValid">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: "How do I start a quiz?",
          answer: "Simply choose a category from the homepage and click 'Start Quiz' to begin answering questions."
        },
        {
          question: "Can I select multiple categories?",
          answer: "Currently, you can only choose one category at a time, but we're working to add more options in the future."
        },
        {
          question: "How is my score calculated?",
          answer: "Your score is based on the number of correct answers you provide. Each question is worth one point."
        },
        {
          question: "Can I play this quiz offline?",
          answer: "TriviaMaster requires an internet connection to fetch the latest questions, so make sure you're online to enjoy the full experience."
        }
      ],
      contactForm: {
        name: '',
        email: '',
        message: ''
      },
      formValid: false
    };
  },
  methods: {
    submitForm() {
      if (this.formValid) {
        // Handle form submission (e.g., send email or API request)
        alert("Thank you for your message! We'll get back to you soon.");
        this.resetForm();
      }
    },
    resetForm() {
      this.contactForm.name = '';
      this.contactForm.email = '';
      this.contactForm.message = '';
      this.formValid = false;
      this.$refs.contactForm.resetValidation();
    }
  }
};
</script>

<style scoped>
</style>
