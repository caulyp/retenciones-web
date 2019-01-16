import { getCurrentUser, setCurrentUser, removeCurrentUser, getToken, setToken, removeToken } from '@/util/auth';
import { login } from '@/api/login';

const auth = {
  state: {
    user: getCurrentUser(),
    token: getToken()
  },
  
  mutations: {
    setToken: (state, token) => {      
      state.token = token;      
    },

    setUser: (state, user) => {      
      state.user = user;      
    },

    deleteUser: state => {      
      state.user = null;
    }
  },
  
  actions: {
    login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      const password = userInfo.password;

      return new Promise((resolve, reject) => {
        login(email, password).then(response => {
          const token = response.data.token;
          commit('setToken', token);          
          setToken(token);
          commit('setUser', email);
          setCurrentUser(email);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    logout(context) {
      context.commit('deleteUser');
      removeCurrentUser();
      removeToken();
    }
    
  }
};

export default auth;