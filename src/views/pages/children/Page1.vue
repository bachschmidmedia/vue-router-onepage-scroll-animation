<template lang="pug">
main
  article
    section {{ $route.name }}
</template>

<script>
export default {
  name: 'Page1'
}
</script>

<style lang="scss" scoped>
main {
  background: lightblue;
}
</style>
