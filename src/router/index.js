import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    hidden: true,
    children:[
      {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '../views/index.vue')
      },
      // {
      //   path: '/Transaction',
      //   name: 'Transaction',
      //   component: () => import(/* webpackChunkName: "Transaction" */ '../views/Transaction/index.vue')
      // },
      // {
      //   path: '/Money',
      //   name: 'Money',
      //   component: () => import(/* webpackChunkName: "Money" */ '../views/Money/index.vue')
      // },
      // {
      //   path: '/First',
      //   name: 'First',
      //   component: () => import(/* webpackChunkName: "FirstHome" */ '../views/First/index.vue')
      // },
      // {
      //   path: '/optional',
      //   name: 'optional',
      //   component: () => import(/* webpackChunkName: "optional" */ '../views/optional/index.vue')
      // },
      // {
      //   path: '/information',
      //   name: 'information',
      //   component: () => import(/* webpackChunkName: "information" */ '../views/information/index.vue')
      // },
      
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
