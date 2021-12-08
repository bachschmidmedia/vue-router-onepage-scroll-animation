<template lang="pug">
main
  article
    section {{ $route.name }}
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Page1'
}
</script>

<style lang="scss" scoped>
main {
  background: lightblue;
}
</style>
