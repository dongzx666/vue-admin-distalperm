import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/common/login'
import NotFound from '@/views/common/404'
import Layout from '@/views/layout/index'

Vue.use(Router)

const Routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: '仪表盘',
        component: resolve => require(['@/views/dashboard/index.vue'], resolve),
        meta: {ignore: true}
      }
    ],
    redirect: { name: '仪表盘' }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {hidden: true}
  }
]

export default new Router({
  routes: Routes
})
