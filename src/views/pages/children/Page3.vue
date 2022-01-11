<template lang="pug">
main
  article
    section(v-for="i in Array(25)") {{ $route.name }}
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

