<template lang="pug">
.debug
  .demo-area(@scroll="$ops.preventWheel", @touchstart="$ops.preventWheel")
    p(v-for="i in Array(20)") PREVENT SMALL
  .demo-area.touch-fixes(@scroll="$ops.preventTouch")
    p(v-for="i in Array(20)") PREVENT SCROLL UNTIL REACHING TOP/BOTTOM
  .demo-area(@wheel="$ops.preventWheel", @touchmove="$ops.preventWheel")
    p(v-for="i in Array(20)") PREVENT ALL
</template>

<style lang="scss" scoped>
.debug {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  background: blue;
  opacity: .5;
  color: white;
}
</style>

