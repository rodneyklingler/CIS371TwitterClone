import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state){
      return state.user.data;
    },
    logged(state){
      return state.user.loggedIn;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data.userID;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      ("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          userID: user.uid
        });
      } else {
        commit("SET_LOGGED_IN", false);
        commit("SET_USER", null);
      }
    }
  }
});