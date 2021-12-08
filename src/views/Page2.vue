<template lang="pug">
main
  article
    section {{ $route.name }}
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

