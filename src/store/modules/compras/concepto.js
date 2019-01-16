import { fetchList, fetchConcepto, createConcepto, updateConcepto, deleteConcepto } from '@/api/compras/concepto';

const SET_ITEMS = 'SET_ITEMS';
const SET_LOADING = 'SET_LOADING';
const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS';
const SET_PAGES = 'SET_PAGES';

export const FETCH_ALL = 'FETCH_ALL';
export const SAVE = 'SAVE';
export const GET = 'GET';
export const DELETE = 'DELETE';

const conceptoCompra = {
  namespaced: true,
  state: {    
    items: [],
    loading: false,    
    totalItems: 0,
    pages: 0       
  },

  mutations: {
    SET_ITEMS: (state, empresas) => {
      state.items = empresas;
    },

    SET_LOADING: (state, loading) => {
      state.loading = loading;
    },

    SET_TOTAL_ITEMS: (state, total) => {
      state.totalItems = total;
    },

    SET_PAGES: (state, pages) => {
      state.pages = pages;
    },

  },

  actions: {
    FETCH_ALL({ commit }, payload) {
      commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
        fetchList(payload).then(response => {
          const data = response.data; 
          commit(SET_TOTAL_ITEMS, data.total);
          commit(SET_ITEMS, data.data);
          commit(SET_PAGES, data.last_page);
          resolve();
        })        
        .catch(error => (reject(error)))
        .finally(() => commit(SET_LOADING, false));     
      });
    },

    SAVE({ commit }, model) {
      commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
        if (model.id > 0) {
          updateConcepto(model).then(res => {
            resolve(res.data);
          })
          .catch(error => (reject(error)))
          .finally(() => commit(SET_LOADING, false));
        } else {
          createConcepto(model).then(res => {
            resolve(res.data);
          })
          .catch(error => (reject(error)))
          .finally(() => commit(SET_LOADING, false));
        }
      });      
    },

    GET({ commit }, id) {
      commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
        fetchConcepto(id).then(response => {
          resolve(response.data);
        })        
        .catch(error => (reject(error)))
        .finally(() => commit(SET_LOADING, false));     
      });  
    },

    DELETE({ commit }, id) {
      commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
        deleteConcepto(id).then(response => {                  
          resolve(response);
        })        
        .catch(error => (reject(error)))
        .finally(() => commit(SET_LOADING, false));     
      });    
    }
    
  }
};

export default conceptoCompra;
