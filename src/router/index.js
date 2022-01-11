import Vue from 'vue'
import VueRouter from 'vue-router'
import Page1 from '@/views/pages/Page1.vue'
import Page2 from '@/views/pages/Page2.vue'
import Page3 from '@/views/pages/Page3.vue'
import Page4 from '@/views/pages/Page4.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Page1',
    component: Page1
  },
  {
    path: '/page2',
    name: 'Page2',
    component: Page2
  },
  {
    path: '/page3',
    name: 'Page3',
    component: Page3
  },
  {
    path: '/page4',
    name: 'Page4',
    component: Page4
  },
  {
    path: '/page5',
    name: 'Page5',
    component: Page2
  },
  {
    path: '/page6',
    name: 'Page6',
    component: Page3
  },
  {
    path: '/page7',
    name: 'Page7',
    component: Page1
  },
  {
    path: '/page8',
    name: 'Page8',
    component: Page2
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
