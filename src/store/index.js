import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    websocket: null,
    message: "",
    roomCode: null,
    chatMessages: [],
    drawDeckSize: 0,
    hand: [],
    commandToAction: {
      GameCreated: "handleCreateGame",
      None: "handleNoAction",
      RoomJoined: "handleJoinRoom",
      Chat: "handleChat",
      DrawCard: "handleDrawCard",
      CardDrawn: "handleDrawDeckUpdated",
    },
    name: "",
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
    addChatMessage(state, message) {
      const messages = state.chatMessages;
      messages.push(message);
      Vue.set(state, "chatMessages", messages);
    },
    setDrawDeckSize(state, size) {
      Vue.set(state, "drawDeckSize", size);
    },
    addCard(state, card) {
      const hand = state.hand;
      hand.push(card);
      Vue.set(state, "hand", hand);
    },
    setName(state, name) {
      Vue.set(state, "name", name);
    },
  },
  actions: {
    connectToServer({ commit, dispatch }) {
      const uri = process.env.VUE_APP_WEBSOCKET_URI;
      const websocket = new WebSocket(uri);
      commit("setWebsocket", websocket);
      commit("setMessage", "Connected to server");
      dispatch("handleWebsocketErrors");
      dispatch("handleWebsocketMessages");
    },
    createGame({ state }) {
      const message = { command: "CreateGame", message: state.name };
      state.websocket.send(JSON.stringify(message));
    },
    handleWebsocketErrors({ state, commit }) {
      state.websocket.addEventListener("error", (error) => {
        console.error(error);
        commit(
          "setMessage",
          "Cannot connect to game server, please try again later"
        );
        commit("setWebsocket", null);
      });
    },
    handleWebsocketMessages({ state, commit, dispatch }) {
      state.websocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.error) {
          commit("setMessage", message.error);
        }
        const incomingEvent = message.event;
        dispatch(state.commandToAction[incomingEvent], message);
      });
    },
    joinRoom({ state }, roomCode) {
      const message = { command: "JoinRoom", room_code: roomCode };
      state.websocket.send(JSON.stringify(message));
    },
    resetState({ commit }) {
      commit("setRoomCode", null);
    },
    sendChatMessage({ state }, chatMessage) {
      const message = {
        command: "Chat",
        message: chatMessage,
        room_code: state.roomCode,
      };
      state.websocket.send(JSON.stringify(message));
    },
    drawCard({ state }) {
      const message = {
        command: "DrawCard",
        room_code: state.roomCode,
      };
      state.websocket.send(JSON.stringify(message));
    },
    handleCreateGame({ commit, dispatch }, event) {
      commit("setMessage", event.message);
      dispatch("handleJoinRoom", event);
    },
    handleNoAction() {
      console.error("no action was sent from the server");
    },
    handleJoinRoom({ commit }, event) {
      commit("setRoomCode", event.room_code);
      commit("setDrawDeckSize", event.draw_deck_size);
    },
    handleChat({ commit }, event) {
      commit("addChatMessage", event.message);
    },
    handleDrawCard({ commit }, event) {
      commit("addCard", event.card);
    },
    handleDrawDeckUpdated({ commit }, event) {
      commit("setDrawDeckSize", event.draw_deck_size);
    },
    setName({ commit }, name) {
      commit("setName", name);
    },
  },
  modules: {},
});
