import message from './message.js';

const install = function(Vue) {
  Vue.prototype.$msg = message;
};

export default {
  install
};