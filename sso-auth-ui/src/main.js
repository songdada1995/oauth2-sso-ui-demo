// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui';
import './assets/icon/iconfont.css'

Vue.use(ElementUI)
// 挂载到Vue全局
Vue.prototype.$message = Message
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 配置请求的根路径
axios.defaults.baseURL = 'http://oauth.com/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
