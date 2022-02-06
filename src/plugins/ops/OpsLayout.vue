<template lang="pug">
.scroll-layout
  transition(:name="getTransition('in')" mode="out-in" v-on:leave="onLeave")
    router-view
  transition(:name="getTransition('out')" mode="out-in" v-on:after-leave="afterLeave")
    router-view

  Menu(
    v-if="$ops.menu"
    :pages="pageNames"
  )

  Debug(v-if="$ops.debug")
</template>

<script>
import Debug from "./components/debug.vue"
import Menu from "./components/menu.vue"

export default {
  components: {
    Debug,
    Menu,
  },

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
    this.addAllEvents();

    this.$ops.preventWheel = this.preventWheel
    this.$ops.preventTouch = this.preventTouch

    this.$router.beforeEach((to, from, next) => {
      if(!this.router_locked) {
        next();
      }
    })
  },

  beforeRouteUpdate(to, from, next) {
    const pages = this.pageNames;
    const dir = pages.indexOf(from.name) < pages.indexOf(to.name) ? 1 : -1;
    this.direction = dir;
    next();
  },

  beforeDestroy() {
    this.removeAllEvents();
  },

  methods: {
    getTransition(when) {
      const trans = this.$route?.meta?.transition ?? "slideY";
      const dir = this.direction > 0 ? "back" : "next";

      return `${trans}_${when}_${dir}`;
    },

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
      const windowsSteps = (event?.wheelDelta % 120) - 0 == 0;

      if (event.wheelDelta) {
        if (windowsSteps) {
          speed = event.wheelDelta / 120;
        } else {
          speed = event.wheelDelta / 12;
        }
      } else {
        let rawAmmount = event.deltaY ? event.deltaY : event.detail;
        speed = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
      }

      if (
        // Mac sensitive and touch
        (Math.abs(speed) > 1 &&
          Math.abs(speed) > Math.abs(this.last_speed) + 2) ||
        // Windows Test with only pure 100 or
        (windowsSteps &&
          (Math.abs(this.last_speed) === 1 || Math.abs(this.last_speed) === 0))
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
        const dir = this.direction;
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
