import Vue from 'vue'
import Router from 'vue-router'
import UsersTable from '@/components/UsersTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UsersTable',
      component: UsersTable
    }
  ]
})
