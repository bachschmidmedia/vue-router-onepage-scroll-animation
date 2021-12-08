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
      direction: 1,
    };
  },

  created: function() {
    // Mousewheel events
    window.addEventListener("mousewheel", this.wheel);
    window.addEventListener("DOMMouseScroll", this.wheel);
    window.addEventListener("wheel", this.wheel);

    // Touch events
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  },

  methods: {
    lockRouter() {
      this.router_locked = true
    },

    unlockRouter() {
      this.router_locked = false
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

      if (
        Math.abs(speed) > 1 &&
        Math.abs(speed) > Math.abs(this.last_speed) + 2
      ) {
        this.last_speed = speed;
        this.direction = speed > 0 ? -1 : 1;
        this.tryScrollTo(this.direction);
      }

      clearTimeout(this.wheeling);
      this.wheeling = setTimeout(() => {
        this.wheeling = undefined;
        this.last_speed = 0;
      }, 100);
    },

    tryScrollTo(dir = this.direction) {
      if (!this.router_locked) {
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
