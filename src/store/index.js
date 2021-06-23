import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    websocket: null,
    message: "",
    roomCode: null,
  },
  mutations: {
    setWebsocket(state, websocket) {
      Vue.set(state, "websocket", websocket);
    },
    setMessage(state, message) {
      Vue.set(state, "message", message);
    },
    setRoomCode(state, roomCode) {
      Vue.set(state, "roomCode", roomCode);
    },
  },
  actions: {
    connectToServer({ commit, dispatch }) {
      const uri = process.env.VUE_APP_WEBSOCKET_URI;
      const websocket = new WebSocket(uri);
      commit("setWebsocket", websocket);
      dispatch("handleWebsocketErrors");
      dispatch("handleWebsocketMessages");
    },
    createGame({ commit, state }) {
      commit("setMessage", "creating game");
      const message = { command: "CreateGame" };
      state.websocket.send(JSON.stringify(message));
    },
    handleWebsocketErrors({ state, commit }) {
      state.websocket.addEventListener("error", (error) => {
        console.error(error);
        commit(
          "setMessage",
          "Cannot connect to game server, please try again later"
        );
      });
    },
    handleWebsocketMessages({ state, commit }) {
      state.websocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        commit("setRoomCode", message.room_code);
      });
    },
    joinRoom({ state }, roomCode) {
      const message = { command: "JoinRoom", room_code: roomCode };
      state.websocket.send(JSON.stringify(message));
    },
  },
  modules: {},
});
