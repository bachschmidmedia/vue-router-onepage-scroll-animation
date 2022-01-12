<template lang="pug">
main
  article
    section {{ $route.name }}
      router-link(:to="{name: 'Page1'}") page 1
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Page4'
}
</script>


<style lang="scss" scoped>
main {
  background: lightslategray;
}
</style>

