<template lang="pug">
  #app
    #nav
      router-link(to="/") Home 
      router-link(to="/page2") P2 
      router-link(to="/page3") P3 
      router-link(to="/page4") P4 
      div {{ direction }}
      div(style="max-height: 50px; overflow: scroll;")
        p(v-for="i in Array(100)") JO
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
  data: function() {
    return {
      wheeling: null,
      last_speed: 0,
      direction: 1,

      pages: [
        'Page1',
        'Page2',
        'Page3',
        'Page4',
      ]
    }
  },

  mounted: function () {
    window.addEventListener("mousewheel", this.wheel)
    window.addEventListener("DOMMouseScroll", this.wheel)
    window.addEventListener("wheel", this.wheel)

  },
  methods: {

    wheel(event) {

      if(this.router_locked) return

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

          if(!this.router_locked) {
            console.log('scroll!')

            const currIndex = this.$router.options.routes.findIndex(x => x.name === this.$route.name)
            this.direction = speed > 0 ? -1 : 1
            const nextIndex = currIndex + this.direction
            const nextRoute = this.$router.options.routes[nextIndex] ?? false

            if(nextRoute) {
              this.$router.push({name: nextRoute.name})
            }

          }
        }
      }

      clearTimeout(this.wheeling);
      this.wheeling = setTimeout(() => {
        this.wheeling = undefined
        this.last_speed = 0
      }, 100);

    },

    onLeave() {
      console.log('onLeave')
      this.router_locked = true
    },

    afterLeave() {
      console.log('afterLeave')
      this.router_locked = false
    },

  },
};
</script>

<style lang="scss">
.slideoutup-leave-active {
  transition: 1s ease-in;
}
.slideoutup-leave-to {
  transform: translateY(-100%);
}
.slideoutup-leave-from {
  transform: translateY(0%);
}
.slideoutup-enter-active {
  transform: translateY(100%);
}
.slideoutup-enter-to {
  transform: translateY(0%);
}

.slideoutdown-leave-active {
  transition: 1s ease-in;
}
.slideoutdown-leave-to {
  transform: translateY(100%);
}
.slideoutdown-leave-from {
  transform: translateY(0%);
}
.slideoutdown-enter-active {
  transform: translateY(-100%);
}
.slideoutdown-enter-to {
  transform: translateY(0%);
}

.slideinup-enter-active {
  transition: 1s ease-out;
}
.slideinup-leave-to {
  transform: translateY(0%);
}
.slideinup-leave-from {
  transform: translateY(100%);
}
.slideinup-enter-active {
  transform: translateY(100%);
}
.slideinup-enter-to {
  transform: translateY(0%);
}



.slideindown-enter-active {
  transition: 1s ease-out;
}
.slideindown-leave-to {
  transform: translateY(0%);
}
.slideindown-leave-from {
  transform: translateY(-100%);
}
.slideindown-enter-active {
  transform: translateY(-100%);
}
.slideindown-enter-to {
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
  z-index: 2;

  & + main {
    z-index: 1;
  }
}

#nav {
  position: fixed;
  top: 0;
  z-index: 9;
}
</style>
