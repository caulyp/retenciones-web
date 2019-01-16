/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../store/index';

Vue.use(Router);
const router = new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  const user = store.getters.user;
  const token = store.getters.token;
  const authRequired  = to.meta.auth;

  if (authRequired && !user && !token) {
    next('/login');
  } else {
    NProgress.start();
    next();
  }  
  
  
  /*
  NProgress.start();
  next();
  */
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
