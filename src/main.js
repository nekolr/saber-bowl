import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import store from './store/index'
import router from './router'
// 全局插件
import Plugins from '@/plugin/index'

Vue.use(Plugins)

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
