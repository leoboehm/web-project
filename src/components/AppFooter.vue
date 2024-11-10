<template>
  <v-footer class="bg-secondary-darken-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        class="mx-2"
        color="white"
        rounded="xl"
        variant="text"
        :to="link.url"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>TriviaMaster</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', url: '/' },
      { name: 'About TriviaMaster', url: '/about' },
      { name: 'help', url: '/help' },
      { name: 'contact', url: '/help#contact' },
    ],
  }),
}
</script>
