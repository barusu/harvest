import message from './message.js';
import oInput from './input';
import oButton from './button';
import oRadioGroup from './radioGroup';
import oSvg from './svg';
import oSwitch from './switch';
import oSelect from './select';

const install = function(Vue) {
  Vue.prototype.$msg = message;
  Vue.component('oInput', oInput);
  Vue.component('oButton', oButton);
  Vue.component('oRadioGroup', oRadioGroup);
  Vue.component('oSvg', oSvg);
  Vue.component('oSwitch', oSwitch);
  Vue.component('oSelect', oSelect);
};

export default {
  install
};