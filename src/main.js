// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import '@/assets/CSS/reset.css'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  error: 'https://y.gtimg.cn/mediastyle/global/img/album_300.png',
  loading: 'https://y.gtimg.cn/mediastyle/global/img/album_300.png'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
