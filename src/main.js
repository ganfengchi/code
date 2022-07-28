import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


Vue.prototype.$axios=axios

// 环境的切换
if (process.env.NODE_ENV == 'development') { 
  // axios.defaults.baseURL = 'http://172.24.148.199:7003';
} else if (process.env.NODE_ENV == 'production') { 
  // axios.defaults.baseURL = 'http://172.24.148.199:7003';
 }



Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
