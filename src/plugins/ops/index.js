export default {
    install(Vue, options) {
        Vue.prototype.$ops = {
            debug: false,
            ...options
        }
    },
}

const OpsLayout =  () => import('@/plugins/ops/OpsLayout.vue')
export { OpsLayout }

