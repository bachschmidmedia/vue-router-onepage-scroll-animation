<template lang="pug">
main
  article
    section(v-for="i in Array(25)") {{ $route.name }}
      router-link(:to="{name: 'Page1'}") page 1
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Page3'
}
</script>


<style lang="scss" scoped>
main {
  background: lightgreen;
}
</style>

