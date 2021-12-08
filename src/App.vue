<template lang="pug">
  #app
    #nav
      router-link(to="/") Home 
      router-link(to="/page2") P2
      router-link(to="/page3") P3
      router-link(to="/page4") P4
      div Direction: {{ direction }}

      div(style="opacity:.5")
        .demo-area(@scroll="preventWheel" @touchstart="preventWheel")
          p(v-for="i in Array(1)") PREVENT SMALL

        .demo-area.touch-fixes(@scroll="preventTouch")
          p(v-for="i in Array(20)") PREVENT SCROLL UNTIL REACHING TOP/BOTTOM

        .demo-area(@wheel="preventWheel" @touchmove="preventWheel")
          p(v-for="i in Array(20)") PREVENT ALL
    transition(
      :name="direction > 0 ? 'slideinup' : 'slideindown'"
      mode="out-in"
      v-on:leave="onLeave"
    )
      router-view
    transition(
      :name="direction > 0 ? 'slideoutup' : 'slideoutdown'"
      mode="out-in"
      v-on:after-leave="afterLeave"
    )
      router-view
</template>

<style lang="scss">

.demo-area {
  display: inline-block;
  max-height: 50px;
  overflow: scroll;
  background: green;
  color: #fff;
  padding: 12px;
  margin: 12px;

  &:nth-of-type(2n) {
    background: blue;
  }

  &:nth-of-type(3n) {
    background: red;
  }
}

// .touch-fixes {
//   overflow: scroll;
//   overscroll-behavior-y: none;
//   overflow-y: scroll;
//   -webkit-overflow-scrolling: touch;
//   touch-action: pan-y;
// }

</style>

<script>
import fullpagescroll from './mixins/fullpagescroll'

export default {

  mixins: [
    fullpagescroll
  ],

};
</script>
