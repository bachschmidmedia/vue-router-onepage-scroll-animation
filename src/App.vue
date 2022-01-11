<template lang="pug">
#app
  Navigation
  ScrollLayout
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import ScrollLayout from '@/views/layouts/ScrollLayout.vue'

export default {

  components: {
    Navigation,
    ScrollLayout
  },

  data: function() {
    return {
      pageNames: [
        'Page1',
        'Page2',
        'Page3',
        'Page4',
      ]
    }
  }

};
</script>
