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
          p(v-for="i in Array(20)") PREVENT SMALL

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

<script>
import fullpagescroll from './mixins/fullpagescroll'

export default {

  mixins: [
    fullpagescroll
  ],

  data: function() {
    return {
      pageNames: [
        'Page1',
        'Page2',
        'Page3',
        'Page4',
      ]
    }
  }

};
</script>
