<template lang="pug">
  #app
    #nav
      router-link(to="/") Home 
      router-link(to="/page2") P2 
      router-link(to="/page3") P3 
      router-link(to="/page4") P4 
      div {{ direction }}
      div(style="max-height: 50px; overflow: scroll; background-color: red;" @wheel="preventWheel" @touchmove="preventWheel")
        p(v-for="i in Array(20)") PREVENT ALL

      div(style="max-height: 50px; overflow: scroll; background-color: blue;" @scroll="preventWheel")
        p(v-for="i in Array(20)") PREVENT SCROLL
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
export default {
  data: function () {
    return {
      wheeling: null,
      preventer: null,
      last_speed: 0,
      direction: 1,

      pages: ["Page1", "Page2", "Page3", "Page4"],
    };
  },

  mounted: function () {
    window.addEventListener("mousewheel", this.wheel);
    window.addEventListener("DOMMouseScroll", this.wheel);
    window.addEventListener("wheel", this.wheel);

    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  },
  methods: {
    preventWheel() {
      console.log("prevent wheel!");
      this.router_locked = true;

      clearTimeout(this.preventer);
      this.preventer = setTimeout(() => {
        console.log("unlock router");
        this.preventer = undefined;
        this.router_locked = false;
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
        this.tryScrollTo(1);
      } else if (this.ts < te - 5) {
        const dir = -1;
        this.direction = dir;
        this.tryScrollTo(-1);
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

      if (Math.abs(speed) > 1) {
        if (Math.abs(speed) > Math.abs(this.last_speed) + 2) {
          this.last_speed = speed;
          console.log("scroll to", speed);
          this.direction = speed > 0 ? -1 : 1;
          this.tryScrollTo(this.direction);
        }
      }

      clearTimeout(this.wheeling);
      this.wheeling = setTimeout(() => {
        this.wheeling = undefined;
        this.last_speed = 0;
      }, 100);
    },

    tryScrollTo(dir = this.direction) {
      setTimeout(() => {
        if (!this.router_locked) {
          const currIndex = this.$router.options.routes.findIndex(
            (x) => x.name === this.$route.name
          );
          const nextIndex = currIndex + dir;
          const nextRoute = this.$router.options.routes[nextIndex] ?? false;

          if (nextRoute) {
            this.$router.push({ name: nextRoute.name });
          }
        }
      }, 100);
    },

    onLeave() {
      this.router_locked = true;
    },

    afterLeave() {
      this.router_locked = false;
    },
  },
};
</script>
