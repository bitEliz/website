import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/views/resume'),
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/oop'),
  },
  {
    path: '*',
    redirect: '/404',
  },
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
