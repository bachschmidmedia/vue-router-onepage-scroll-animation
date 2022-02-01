
// Parents
// import Home from '@/views/pages/parents/Home.vue'
import { OpsLayout } from '@/plugins/ops'

// Children
import Page1 from '@/views/pages/children/Page1.vue'
import Page2 from '@/views/pages/children/Page2.vue'
import Page3 from '@/views/pages/children/Page3.vue'
import Page4 from '@/views/pages/children/Page4.vue'
import Page5 from '@/views/pages/children/Page2.vue'

let routes = [
  {
    path: '/home',
    name: 'Home',
    // component: Home,
    component: OpsLayout,
    meta: {
      routeNames: ['Page1', 'Page2', 'Page3', 'Page4']
    },
    children: [
      {
        path: 'page1',
        name: 'Page1',
        component: Page1,
        meta: {
          transition: 'slideX',
          // transition: 'fade',
        }
      },
      {
        path: 'page2',
        name: 'Page2',
        component: Page2,
      },
      {
        path: 'page3',
        name: 'Page3',
        component: Page3,
        meta: {
          transition: 'slideX',
          // transition: 'fade',
        }
      },
      {
        path: 'page4',
        name: 'Page4',
        component: Page4,
        meta: {
          transition: 'slideX',
          // transition: 'fade',
        }
      },
      {
        path: 'page5',
        name: 'Page5',
        component: Page5,
        meta: {
          // transition: 'slideX',
        }
      },
    ]
  },
  {
    path: '/page3',
    name: 'Page3',
    component: Page3
  },
  {
    path: '/page4',
    name: 'Page4',
    component: Page4,
    // component: ScrollLayout,
    // children: [{path: '', component: Page4}]
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

export default routes
