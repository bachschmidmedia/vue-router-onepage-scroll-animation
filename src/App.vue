<template lang="pug">
  #app
    #nav
      router-link(to="/") Home 
      router-link(to="/page2") P2 
      router-link(to="/page3") P3 
      router-link(to="/page4") P4 
    transition(name="slidein" mode="out-in")
      router-view
    transition(name="slideout" mode="out-in")
      router-view
</template>

<script>
export default {
  data: function() {
    return {
      wheeling: null,
      last_speed: 0,
    }
  },
  mounted: function () {
    window.addEventListener("mousewheel", this.wheel);
    window.addEventListener("DOMMouseScroll", this.wheel);
    window.addEventListener("wheel", this.wheel);
  },
  methods: {
    wheel(event) {
      let speed
      if (event.wheelDelta) {
        if ((event.wheelDelta % 120) - 0 == 0) {
          speed = event.wheelDelta / 120
        } else {
          speed = event.wheelDelta / 12
        }
      } else {
        let rawAmmount = event.deltaY ? event.deltaY : event.detail
        speed = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3)
      }

      if(Math.abs(speed) > 1) {
        if(Math.abs(speed) > Math.abs(this.last_speed) + 2) {
          this.last_speed = speed
          console.log('scroll to', speed)
        }
      }

      clearTimeout(this.wheeling);
      this.wheeling = setTimeout(() => {
        this.wheeling = undefined
        this.last_speed = 0
      }, 100);

    },
  },
};
</script>

<style lang="scss">
.slideout-leave-active {
  transition: 1s ease-in;
}
.slideout-leave-to {
  transform: translateY(-100%);
}
.slideout-leave-from {
  transform: translateY(0%);
}
.slideout-enter-active {
  transform: translateY(100%);
}
.slideout-enter-to {
  transform: translateY(0%);
}

.slidein-enter-active {
  transition: 1s ease-out;
}
.slidein-leave-to {
  transform: translateY(0%);
}
.slidein-leave-from {
  transform: translateY(100%);
}
.slidein-enter-active {
  transform: translateY(100%);
}
.slidein-enter-to {
  transform: translateY(0%);
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  overscroll-behavior-y: none;
}

main {
  padding: 50px 25px;
  font: 18px helvetica;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

#nav {
  position: fixed;
  top: 0;
  z-index: 9;
}
</style>
