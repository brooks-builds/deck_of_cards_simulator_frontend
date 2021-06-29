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
      CreateGame: "handleCreateGame",
      None: "handleNoAction",
      JoinRoom: "handleJoinRoom",
      Chat: "handleChat",
      DrawCard: "handleDrawCard",
    },
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
    handleWebsocketMessages({ state, commit, dispatch }) {
      state.websocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.error) {
          commit("setMessage", message.error);
        }
        // let messageToDisplay = message.error ? message.error : message.message;
        // if (messageToDisplay) {
        //   commit("setMessage", messageToDisplay);
        // }
        // commit("setRoomCode", message.room_code);
        const command = message.command;
        dispatch(state.commandToAction[command], message);

        // if (message.chat_message) {
        //   commit("addChatMessage", message.chat_message);
        // }
        // if (message?.draw_deck_size >= 0) {
        //   commit("setDrawDeckSize", message.draw_deck_size);
        // }
        // if (message.command == "DrawCard" && message.card) {
        //   commit("addCard", message.card);
        // }
        // console.log(message);
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
      console.log(event);
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
      commit("addChatMessage", event.chat_message);
    },
    handleDrawCard({ commit }, event) {
      commit("addCard", event.card);
      commit("setDrawDeckSize", event.draw_deck_size);
    },
  },
  modules: {},
});
