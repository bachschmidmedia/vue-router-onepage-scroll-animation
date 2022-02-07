<template lang="pug">
main
  article
    section {{ $route.name }}
    router-link(:to="{name: 'Page2'}") Page 2
    router-link(:to="{name: 'Page3'}") Page 3
    div jo
    div jo
    div jo
    div(v-if="!$ops.loading") JOGHURT 1
    transition(name="fade")
      p(v-if="$ops.loaded") hello
    input
    div jo
    .debug
      .demo-area(@scroll="$ops.preventWheel", @touchstart="$ops.preventWheel")
        p(v-for="i in Array(20)") PREVENT SMALL
      .demo-area.touch-fixes(@scroll="$ops.preventTouch")
        p(v-for="i in Array(20)") PREVENT SCROLL UNTIL REACHING TOP/BOTTOM
      .demo-area(@wheel="$ops.preventWheel", @touchmove="$ops.preventWheel")
        p(v-for="i in Array(20)") PREVENT ALL
</template>

<script>
export default {
  name: 'Page1',

  data () {
    return {
      // loading: false,
    }
  },

  created () {
    // setTimeout(() => {
    //   this.loading = false
    //   console.log('joghrutmeiyer')
    // }, 2000);
  },

  mounted () {
    setTimeout(() => {
      // this.loading = true
    }, 100);
  },
}
</script>

<style lang="scss" scoped>
main {
  background: lightblue;
}
</style>
