// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/CSS/reset.css';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import store from '@/store/index';
import VueScrollLock from 'vue-scroll-lock';

Vue.use(VueScrollLock);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyLoad, {
  error: 'https://y.gtimg.cn/mediastyle/global/img/album_300.png',
  loading: 'https://y.gtimg.cn/mediastyle/global/img/album_300.png'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
