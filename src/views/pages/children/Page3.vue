<template lang="pug">
main
  article
    router-link(:to="{name: 'Page1'}") page 1
    router-link(:to="{name: 'Page2'}") Page 2
    router-link(:to="{name: 'Page4'}") Page 4
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

