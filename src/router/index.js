import Vue from 'vue'
import Router from 'vue-router'
import UI from '@/components/page/ui'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history', // history hash
  routes: [
    {path: '/', name: 'index', component: HelloWorld},
    {path: '/ui', name: 'ui', component: UI},
    {path: '/component', name: 'component', component: HelloWorld},
    {path: '/about', name: 'about', component: HelloWorld}
  ]
})