import Vue from 'vue';
import Vuetify, { VIcon, VSnackbar, VBtn, VBreadcrumbs, VBreadcrumbsItem } from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '../theme/default.styl';

Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  components: { VIcon, VSnackbar, VBtn, VBreadcrumbs, VBreadcrumbsItem },
  customProperties: true,
  iconfont: 'fa4'
});