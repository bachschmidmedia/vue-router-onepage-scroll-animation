export default {
    install(Vue, options) {
        const ops = {
            debug: false,
            ...options
        }
        Vue.prototype.$ops = ops
    },
}

const OpsLayout =  () => import('@/plugins/ops/OpsLayout.vue')
export { OpsLayout }

