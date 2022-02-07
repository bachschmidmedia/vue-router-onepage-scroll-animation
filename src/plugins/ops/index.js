export default {
  install(Vue, options) {
    // Globals $ops
    Vue.prototype.$ops = {
      debug: false,
      loading: false,
      ...options,
    };

    // Create Directive Prevent Scroll
    // v-prevent-scroll
    Vue.directive("preventScroll", {
      bind: (el, binding, vnode) => {
        el.onscroll = vnode.context.$ops.preventWheel;
      },
    });

    // Create Directive Prevent All
    // v-prevent-all
    Vue.directive("preventAll", {
      bind: (el, binding, vnode) => {
        el.onwheel = vnode.context.$ops.preventWheel;
        el.ontouchmove = vnode.context.$ops.preventWheel;
      },
    });

  },
};

const OpsLayout = () => import("@/plugins/ops/OpsLayout.vue");
export { OpsLayout };
