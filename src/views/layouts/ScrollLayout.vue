<template lang="pug">
.scroll-layout
  div(style="opacity: 0.5")
    .demo-area(@scroll="preventWheel", @touchstart="preventWheel")
      p(v-for="i in Array(20)") PREVENT SMALL
    .demo-area.touch-fixes(@scroll="preventTouch")
      p(v-for="i in Array(20)") PREVENT SCROLL UNTIL REACHING TOP/BOTTOM
    .demo-area(@wheel="preventWheel", @touchmove="preventWheel")
      p(v-for="i in Array(20)") PREVENT ALL

  transition(
    :name="direction > 0 ? 'slideinup' : 'slideindown'",
    mode="out-in",
    v-on:leave="onLeave"
  )
    router-view
  transition(
    :name="direction > 0 ? 'slideoutup' : 'slideoutdown'",
    mode="out-in",
    v-on:after-leave="afterLeave"
  )
    router-view
</template>

<script>
import fullpagescroll from "@/mixins/fullpagescroll";

export default {
  mixins: [fullpagescroll],

  data: function () {
    return {
      pageNames: ["Page1", "Page2", "Page3", "Page4"],
    };
  },

  mounted () {
    setTimeout(() => {
      // console.log(this.$route)
      console.log(this.$route.meta)
      console.log(this.$router.currentRoute.meta)
      console.log(this.$route.meta.fields?.pageType)
    }, 200);
  }
};
</script>
