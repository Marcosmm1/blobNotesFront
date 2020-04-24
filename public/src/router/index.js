import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth'
import Notes from '../views/Notes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) { // eslint-disable-line
        next({
          name: 'Auth'
        })
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
