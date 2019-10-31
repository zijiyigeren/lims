// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'

import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'

import entrustList from '@/views/entrust/componentsview/Entrustlist.vue'


Vue.component('entrustList', entrustList);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.use(ElementUI);

/*
* 事件总线
* */
Vue.prototype.$EventBus = new Vue();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
