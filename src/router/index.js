import Vue from 'vue';
import Router from 'vue-router';
import UI from '@/components/page/ui';
import Login from '@/components/login';
import Unboxing from '@/components/page/unboxing';
import Index from '@/components/page/index';
import AddView from '@/components/page/addView';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  mode: 'history', // history hash
  routes: [
    {path: '/', name: 'index', component: Index, meta: {requiresAuth: true}},
    {path: '/login', name: 'login', component: Login},
    {path: '/addview', name: 'addview', component: AddView, meta: {requiresAuth: true}},
    {path: '/ui', name: 'ui', component: UI},
    {path: '/unboxing', name: 'unboxing', component: Unboxing, meta: {requiresAuth: true}},
    {path: '/component', name: 'component', component: HelloWorld},
    {path: '/about', name: 'about', component: HelloWorld}
  ]
});