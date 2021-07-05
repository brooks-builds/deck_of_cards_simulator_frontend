import Vue from "vue";
import Vuex from "vuex";
import Api from "../api";

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
      JoinRoom: "handleJoinRoom",
      Chat: "handleChat",
      DrawCard: "handleDrawCard",
      DrawDeckUpdated: "handleDrawDeckUpdated",
      PlayerJoinedRoomInSession: "handlePlayerJoinedRoomInSession",
    },
    name: "",
    playerId: null,
    otherPlayers: [],
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
    setPlayerId(state, playerId) {
      Vue.set(state, "playerId", playerId);
    },
    addPlayer(state, player) {
      const otherPlayers = state.otherPlayers;
      otherPlayers.push(player);
      Vue.set(state, "otherPlayers", otherPlayers);
    },
    addCardToOtherPlayer(state, { card, playerId }) {
      const otherPlayer = state.otherPlayers.find(
        (otherPlayer) => otherPlayer.id === playerId
      );
      if (otherPlayer) {
        otherPlayer.hand.push(card);
      }
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
      Api.createGame(state.websocket, state.name);
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
        console.log(message);
        if (message.error) {
          commit("setMessage", message.error);
        }
        const incomingAction = message.action;
        dispatch(state.commandToAction[incomingAction], message.data);
      });
    },
    joinRoom({ state, commit }, rawRoomId) {
      const roomId = Number(rawRoomId);
      if (isNaN(roomId)) {
        commit("setMessage", "Invalid room code");
        return;
      }
      Api.joinRoom(state.websocket, roomId, state.name);
    },
    resetState({ commit }) {
      commit("setRoomCode", null);
    },
    sendChatMessage({ state }, chatMessage) {
      console.log("sending chat message", chatMessage);
      Api.sendChatMessage(
        state.websocket,
        chatMessage,
        state.name,
        state.roomCode
      );
    },
    drawCard({ state }) {
      Api.drawCard(state.websocket, state.roomCode, state.playerId);
    },
    handleCreateGame({ commit, dispatch }, messageData) {
      commit("setMessage", "game created");
      dispatch("handleJoinRoom", messageData);
      commit("setPlayerId", messageData.player_id);
    },
    handleNoAction() {
      console.error("no action was sent from the server");
    },
    handleJoinRoom({ commit }, messageData) {
      if (messageData.room_id) {
        commit("setRoomCode", messageData.room_id);
      }
      commit("addChatMessage", {
        message: `${messageData.player_name} joined the room`,
      });
      if (messageData.draw_deck_size) {
        commit("setDrawDeckSize", messageData.draw_deck_size);
      }
      if (messageData.player_id) {
        commit("setPlayerId", messageData.player_id);
      }
    },
    handleChat({ commit }, event) {
      commit("addChatMessage", {
        sender: event.player_name,
        message: event.message,
      });
    },
    handleDrawCard({ commit }, event) {
      commit("addCard", event.card);
    },
    handleDrawDeckUpdated({ commit }, messageData) {
      commit("setDrawDeckSize", messageData.draw_deck_size);
      let { card } = messageData;
      if (!card) {
        card = { suite: null, value: null };
      }
      commit("addCardToOtherPlayer", { card, playerId: messageData.player_id });
    },
    handlePlayerJoinedRoomInSession({ commit }, messageData) {
      const player = {
        hand: [],
        id: messageData.player_id,
        name: messageData.player_name,
      };
      commit("addPlayer", player);
    },
    setName({ commit }, name) {
      commit("setName", name);
    },
  },
  modules: {},
});
