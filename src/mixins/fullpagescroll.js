export default {
  data: function () {
    return {
      wheeling: null,
      preventer: null,
      last_speed: 0,
      direction: 1,
    }
  },

  mounted: function () {
    window.addEventListener("mousewheel", this.wheel)
    window.addEventListener("DOMMouseScroll", this.wheel)
    window.addEventListener("wheel", this.wheel)

    window.addEventListener("touchstart", this.touchStart)
    window.addEventListener("touchmove", this.touchMove)
  },
  methods: {
    lockRouter() {
      this.router_locked = true
    },

    unlockRouter() {
      this.router_locked = false
    },

    preventWheel() {
      this.lockRouter()

      clearTimeout(this.preventer)
      this.preventer = setTimeout(() => {
        this.preventer = undefined
        this.last_speed = 0
        this.unlockRouter()
      }, 250)
    },

    touchStart(e) {
      this.ts = e.touches[0].clientY
    },

    touchMove(e) {
      var te = e.changedTouches[0].clientY
      if (this.ts > te + 5) {
        const dir = 1
        this.direction = dir
        this.tryScrollTo(1)
      } else if (this.ts < te - 5) {
        const dir = -1
        this.direction = dir
        this.tryScrollTo(-1)
      }
    },

    wheel(event) {
      // if(this.router_locked) return
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

      if (
        Math.abs(speed) > 1 &&
        Math.abs(speed) > Math.abs(this.last_speed) + 2
      ) {
        this.last_speed = speed
        this.direction = speed > 0 ? -1 : 1
        this.tryScrollTo(this.direction)
      }

      clearTimeout(this.wheeling)
      this.wheeling = setTimeout(() => {
        this.wheeling = undefined
        this.last_speed = 0
      }, 100)
    },

    tryScrollTo(dir = this.direction) {
      setTimeout(() => {
        if (!this.router_locked) {
          const currIndex = this.$router.options.routes.findIndex(
            (x) => x.name === this.$route.name
          )
          const nextIndex = currIndex + dir
          const nextRoute = this.$router.options.routes[nextIndex] ?? false

          if (nextRoute) {
            this.$router.push({ name: nextRoute.name })
          }
        }
      }, 100)
    },

    onLeave() {
      this.lockRouter()
    },

    afterLeave() {
      this.unlockRouter()
    },
  },
}
