<template lang="pug">
  #app
    #nav
      router-link(to="/") Home 
      router-link(to="/page2") P2 
      router-link(to="/page3") P3 
      router-link(to="/page4") P4 
      div Direction: {{ direction }}

      div(style="max-height: 50px; overflow: scroll; background-color: red; color: #fff;" @wheel="preventWheel" @touchmove="preventWheel")
        p(v-for="i in Array(20)") PREVENT ALL

      div(style="max-height: 50px; overflow: scroll; background-color: blue; color: #fff;" @scroll="preventWheel")
        p(v-for="i in Array(20)") PREVENT SCROLL UNTIL REACHING TOP/BOTTOM
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

};
</script>
