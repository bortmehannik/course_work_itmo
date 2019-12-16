import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '@/components/Home'
import Task from '@/components/Task'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    }
  ]
})
