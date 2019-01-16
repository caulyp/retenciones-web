const getters = {
  currentUser: state => state.auth.user,
  token: state => state.auth.token,
  empresa: state => state.empresa.empresa  
};
export default getters;

