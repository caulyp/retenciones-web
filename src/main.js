import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router/';
import store from './store/index';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';
import VeeValidate from 'vee-validate';
import VuetifyToast from 'vuetify-toast-snackbar';
import VueBreadcrumbs from 'vue-breadcrumbs';
import VuetifyConfirm from 'vuetify-confirm';
import VueTheMask from 'vue-the-mask';
import Truncate from 'lodash.truncate';
import * as filters from './filters';
import { mask, maskAccount } from './filters/mask';

Vue.config.productionTip = false;

// Global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.filter('truncate', Truncate);
Vue.filter('mask', mask);
Vue.filter('maskAccount', maskAccount);

Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(VueTheMask);
Vue.use(VuetifyToast, { x: 'center' });
Vue.use(VuetifyConfirm);
Vue.use(VueBreadcrumbs);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');



