import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import store from './store';
import SvgG from './components/library/SvgG.vue';
import plugin from './plugin';

Vue.component("gt", SvgG);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
