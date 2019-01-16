import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/general/auth';
import empresa from './modules/general/empresa';
import proveedor from './modules/compras/proveedor';
import conceptoCompra from './modules/compras/concepto';
import cuentaContable from './modules/contabilidad/cuenta';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    empresa,
    proveedor,
    conceptoCompra,
    cuentaContable
  },
  getters
});

export default store;
