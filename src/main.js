import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './mock/mock'
import apiFun from "@/axios/api.js";
import qs from 'qs'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$apiFun = apiFun;
Vue.prototype.$Qs = qs;

const setFontSize= () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 75}px`
};
window.onresize = setFontSize;
setFontSize()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
