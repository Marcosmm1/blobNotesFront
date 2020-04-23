import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth'
import Notes from '../views/Notes'

Vue.use(VueRouter)

let Storage: {
  new(): Storage;
  prototype: Storage;
}

const routes = [{
    path: '/notes',
    name: 'Notes',
    component: Notes,
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        next({
          name: 'Auth'
        })
      }
      next()
    }
  },
  {
    path: '/',
    name: 'Auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router