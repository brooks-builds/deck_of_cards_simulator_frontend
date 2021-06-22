import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    websocket: null,
    message: "",
  },
  mutations: {
    setWebsocket(state, websocket) {
      Vue.set(state, "websocket", websocket);
    },
    setMessage(state, message) {
      Vue.set(state, "message", message);
    },
  },
  actions: {
    connectToServer({ commit }) {
      const uri = process.env.VUE_APP_WEBSOCKET_URI;
      try {
        const websocket = new WebSocket(uri);
        commit("setWebsocket", websocket);
        websocket.addEventListener("error", (error) => {
          console.error(error);
          commit(
            "setMessage",
            "Cannot connect to game server, please try again later"
          );
        });
      } catch (error) {
        console.error("we got an error connecting to the websocket", error);
      }
    },
  },
  modules: {},
});
