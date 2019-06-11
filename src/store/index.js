import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import * as actions from './action';
import * as getters from './getter';
import mutations from './mutations';
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

export default store;
