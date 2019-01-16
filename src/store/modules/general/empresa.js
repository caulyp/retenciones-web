import { fetchList } from '@/api/general/empresa';
import { setEmpresa, getEmpresa } from '@/util/empresa';

const SET_EMPRESA = 'SET_EMPRESA';

const empresa = {
  namespaced: true,
  state: {
    empresa: getEmpresa(),
    items: []
  },

  mutations: {
    SET_EMPRESA: (state, empresa) => {
      state.empresa = empresa;
    },

    setItems: (state, empresas) => {
      state.items = empresas;
    }
  },

  actions: {
    getList({ commit }, payload) {     
      return new Promise((resolve, reject) => {
        fetchList(payload).then(response => {
          commit('setItems', response.data.data);
          resolve();
        })                      
        .catch(error => (reject(error)));     
      });
    },
    
    SET_EMPRESA({ commit }, data) {      
      setEmpresa(data);
      const emp = getEmpresa();
      commit(SET_EMPRESA, emp);
    }
  }
};

export default empresa;
