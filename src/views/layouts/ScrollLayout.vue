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

  .debug
    | Jo debug
</template>

<script>
// window.addEventListener('scroll', async () => {
//   await new Promise(resolve => window.requestAnimationFrame(resolve))
//   const {
//     scrollTop,
//     scrollLeft,
//     scrollHeight,
//     clientHeight
//   } = this
//   const atTop = scrollTop === 0
//   const beforeTop = 1
//   const atBottom = scrollTop === scrollHeight - clientHeight
//   const beforeBottom = scrollHeight - clientHeight - 1

//   if (atTop) {
//     this.scrollTo(scrollLeft, beforeTop)
//   } else if (atBottom) {
//     this.scrollTo(scrollLeft, beforeBottom)
//   }
// })

export default {
  data: function () {
    return {
      wheeling: null,
      preventer: null,
      last_speed: 0,
      direction: 0,
    };
  },

  computed: {
    events: function () {
      return [
        // Mousewheel events
        { name: "mousewheel", function: this.wheel },
        { name: "DOMMouseScroll", function: this.wheel },
        { name: "wheel", function: this.wheel },

        // Touch events
        { name: "touchstart", function: this.touchStart },
        { name: "touchmove", function: this.touchMove },
      ];
    },
  },

  created() {
    this.initRouteNames();
  },

  mounted() {
    this.addAllEvents();
  },

  beforeRouteUpdate(to, from, next) {
    const pages = this.pageNames
    const dir = pages.indexOf(from.name) < pages.indexOf(to.name) ? 1 : -1
    this.direction = dir
    next();
  },

  beforeDestroy() {
    this.removeAllEvents();
  },

  methods: {
    initRouteNames() {
      const names = this.$route?.matched?.find((e) => e.meta?.routeNames)?.meta
        ?.routeNames;
      if (names) {
        this.pageNames = names;
      }
    },

    addAllEvents() {
      this.events.forEach((e) => {
        window.addEventListener(e.name, e.function);
      });
    },

    removeAllEvents() {
      this.events.forEach((e) => {
        window.removeEventListener(e.name, e.function);
      });
    },

    lockRouter() {
      this.router_locked = true;
    },

    unlockRouter() {
      this.direction = 0;
      this.router_locked = false;
    },

    preventTouch(e) {
      const target = e.target;
      const top = 0;
      const bottom = target.scrollHeight - target.clientHeight;
      const scroll = target.scrollTop;

      switch (true) {
        case scroll <= top:
          this.direction = -1;
          this.tryScrollTo();
          break;

        case scroll >= bottom:
          this.direction = 1;
          this.tryScrollTo();
          break;

        default:
          this.lockRouter();
          break;
      }

      clearTimeout(this.preventer);
      this.preventer = setTimeout(() => {
        this.preventer = undefined;
        this.last_speed = 0;
        this.unlockRouter();
      }, 500);
    },

    preventWheel() {
      this.lockRouter();

      clearTimeout(this.preventer);
      this.preventer = setTimeout(() => {
        this.preventer = undefined;
        this.last_speed = 0;
        this.unlockRouter();
      }, 250);
    },

    touchStart(e) {
      this.ts = e.touches[0].clientY;
    },

    touchMove(e) {
      var te = e.changedTouches[0].clientY;
      if (this.ts > te + 5) {
        const dir = 1;
        this.direction = dir;
        this.tryScrollTo();
      } else if (this.ts < te - 5) {
        const dir = -1;
        this.direction = dir;
        this.tryScrollTo();
      }
    },

    wheel(event) {
      // if(this.router_locked) return
      let speed;
      if (event.wheelDelta) {
        if ((event.wheelDelta % 120) - 0 == 0) {
          speed = event.wheelDelta / 120;
        } else {
          speed = event.wheelDelta / 12;
        }
      } else {
        let rawAmmount = event.deltaY ? event.deltaY : event.detail;
        speed = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
      }

      if (
        Math.abs(speed) > 1 &&
        Math.abs(speed) > Math.abs(this.last_speed) + 2
      ) {
        this.last_speed = speed;
        this.direction = speed > 0 ? -1 : 1;
        this.tryScrollTo();
      }

      clearTimeout(this.wheeling);
      this.wheeling = setTimeout(() => {
        this.wheeling = undefined;
        this.last_speed = 0;
      }, 100);
    },

    tryScrollTo() {
      if (!this.router_locked) {
        const dir = this.direction
        setTimeout(() => {
          if (!this.router_locked) {
            const currIndex = this.pageNames.findIndex(
              (x) => x === this.$route.name
            );
            const nextIndex = currIndex + dir;
            const nextRoute = this.pageNames[nextIndex] ?? false;

            if (nextRoute) {
              this.$router.push({ name: nextRoute });
            }
          }
        }, 100);
      }
    },

    onLeave() {
      this.lockRouter();
    },

    afterLeave() {
      this.unlockRouter();
    },
  },
};
</script>

<style lang="scss" scoped>
.debug {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: blue;
  color: white;
}
</style>
