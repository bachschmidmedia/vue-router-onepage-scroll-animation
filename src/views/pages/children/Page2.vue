<template lang="pug">
main
  article
    section {{ $route.name }}
    router-link(:to="{name: 'Page1'}") Page 1
    router-link(:to="{name: 'Page3'}") Page 3
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Page2'
}
</script>


<style lang="scss" scoped>
main {
  background: lightcoral;
}
</style>

