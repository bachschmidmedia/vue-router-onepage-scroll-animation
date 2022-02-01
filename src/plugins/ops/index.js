const Ops = {
    install(Vue, options) {
        const ops = {
            debug: false,
            ...options
        }
        Vue.prototype.$ops = ops
    },
};

export { Ops }

const OpsLayout =  () => import('@/plugins/ops/OpsLayout.vue')

export { OpsLayout }

// export default OpsLayout = () => import('@/plugins/ops/OpsLayout.vue')


