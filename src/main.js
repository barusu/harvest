// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/libs/relic';

import oInput from '@/components/base/input';
import oButton from '@/components/base/button';
import oRadioGroup from '@/components/base/radioGroup';
import oSvg from '@/components/base/svg';
import oSwitch from '@/components/base/switch';

Vue.component('oInput', oInput);
Vue.component('oButton', oButton);
Vue.component('oRadioGroup', oRadioGroup);
Vue.component('oSvg', oSvg);
Vue.component('oSwitch', oSwitch);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.isLogin) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})