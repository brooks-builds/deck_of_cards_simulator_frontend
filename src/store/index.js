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
        commit("setWebsocket", null);
      });
    },
    handleWebsocketMessages({ state, commit }) {
      state.websocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        commit("setRoomCode", message.room_code);
        let messageToDisplay = message.error ? message.error : message.message;
        if (messageToDisplay) {
          commit("setMessage", messageToDisplay);
        }
        if (message.chat_message) {
          commit("addChatMessage", message.chat_message);
        }
        if (message?.draw_deck_size >= 0) {
          commit("setDrawDeckSize", message.draw_deck_size);
        }
        if (message.command == "DrawCard" && message.card) {
          commit("addCard", message.card);
        }
        console.log(message);
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
  },
  modules: {},
});
