<template lang="pug">
main
  article
    section {{ $route.name }}
    router-link(:to="{name: 'Page2'}") Page 2
    router-link(:to="{name: 'Page3'}") Page 3
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
