<template>
  <v-container fluid>
    <!-- FAQ Section -->
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-card class="py-5 px-4 mb-6" flat>
          <v-card-title class="text-h4 text-center mb-4"
            >Frequently Asked Questions</v-card-title
          >
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel v-for="(faq, index) in faqs" :key="index" class="my-1">
                <v-expansion-panel-title class="text-h6 text-primary">{{
                  faq.question
                }}</v-expansion-panel-title>
                <v-expansion-panel-text class="panel-text">{{
                  faq.answer
                }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Form Section -->
    <v-row class="justify-center" id="contact">
      <v-col cols="12" md="8">
        <v-card class="py-5 px-4">
          <v-card-title class="text-h4 text-center mb-4"
            >Contact Us</v-card-title
          >
          <v-card-subtitle class="text-h6 text-primary">If you have any further questions, suggestions or feedback, we're happy to receive your message!</v-card-subtitle>
          <v-card-text>
            <v-form
              ref="contactForm"
              v-model="formValid"
              @submit.prevent="submitForm"
            >
              <v-text-field
                v-model="contactForm.name"
                label="Name"
                :rules="[v => !!v || 'Name is required']"
                required
              ></v-text-field>

              <v-text-field
                v-model="contactForm.email"
                label="Email"
                :rules="[
                  v => !!v || 'Email is required',
                  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ]"
                required
              ></v-text-field>

              <v-textarea
                v-model="contactForm.message"
                label="Your Message"
                :rules="[v => !!v || 'Message is required']"
                required
              ></v-textarea>

              <v-row class="px-3">
              <v-spacer />
              <v-btn
                color="primary"
                class="mt-4"
                size="large"
                type="submit"
                :disabled="!formValid"
                >Submit</v-btn
              ></v-row>
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
          question: 'How do I start a quiz?',
          answer:
            "Simply choose a category from the homepage or click 'Start a Quiz' to begin answering questions.",
        },
        {
          question: 'Can I select multiple categories?',
          answer:
            "Currently, you can only choose one category at a time, but we're working to add more options in the future.",
        },
        {
          question: 'How is my score calculated?',
          answer:
            'Your score is based on the number of correct answers you provide. Each question is worth one point.',
        },
        {
          question: 'Can I play this quiz offline?',
          answer:
            "TriviaMaster requires an internet connection to fetch the latest questions, so make sure you're online to enjoy the full experience.",
        },
      ],
      contactForm: {
        name: '',
        email: '',
        message: '',
      },
      formValid: false,
    }
  },
  methods: {
    submitForm() {
      if (this.formValid) {
        alert("Contact message sent.")
        this.resetForm()
      }
    },
    resetForm() {
      this.contactForm.name = ''
      this.contactForm.email = ''
      this.contactForm.message = ''
      this.formValid = false
      this.$refs.contactForm.resetValidation()
    },
  },
}
</script>

<style scoped>
.panel-text{
  font-size: 16px;
}
</style>
