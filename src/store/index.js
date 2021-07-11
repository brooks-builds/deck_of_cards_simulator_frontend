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
    drawDeck: [],
    hand: [],
    commandToAction: {
      CreateGame: "handleCreateGame",
      JoinRoom: "handleJoinRoom",
      Chat: "handleChat",
      DrawCard: "handleDrawCard",
      DrawDeckUpdated: "handleDrawDeckUpdated",
      PlayerJoinedRoomInSession: "handlePlayerJoinedRoomInSession",
      ToggleVisibilityOfCard: "handleToggleVisibilityOfCard",
      DiscardCard: "handleDiscardCard",
      ResetDeck: "handleResetDeck",
      Quit: "handleQuit",
    },
    name: "",
    playerId: null,
    otherPlayers: [],
    discardPile: [],
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
    removeCardFromDrawDeck(state) {
      state.drawDeck.pop();
      Vue.set(state, "drawDeck", state.drawDeck);
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
    setHand(state, hand) {
      Vue.set(state, "hand", hand);
    },
    setOtherPlayers(state, otherPlayers) {
      Vue.set(state, "otherPlayers", otherPlayers);
    },
    removeCardFromPlayerHand(state, card) {
      let cardIndex;
      for (let index in state.hand) {
        let cardInHand = state.hand[index];
        if (cardInHand.suite == card.suite && cardInHand.value == card.value) {
          cardIndex = index;
        }
      }
      state.hand.splice(cardIndex, 1);
    },
    resetDrawDeck(state, cardCount) {
      const drawDeck = [];
      for (let count = 0; count < cardCount; count++) {
        drawDeck.push({ suite: null, value: null, visible: false });
      }
      Vue.set(state, "drawDeck", drawDeck);
    },
    addCardToDiscardPile(state, card) {
      state.discardPile.push(card);
      Vue.set(state, "discardPile", state.discardPile);
    },
    setDiscardPile(state, discardPile) {
      Vue.set(state, "discardPile", discardPile);
    },
    resetOtherPlayersHands(state) {
      const { otherPlayers } = state;
      const updatedOtherPlayers = otherPlayers.map((player) => {
        player.hand = [];
        return player;
      });
      Vue.set(state, "otherPlayers", updatedOtherPlayers);
    },
    removePlayerById(state, playerId) {
      const { otherPlayers } = state;
      const updatedOtherPlayers = otherPlayers.filter((player) => {
        return player.id !== playerId;
      });
      Vue.set(state, "otherPlayers", updatedOtherPlayers);
    },
    leaveRoom(state) {
      Vue.set(state, "roomCode", null);
    },
    clearChat(state) {
      Vue.set(state, "chatMessages", []);
    },
    setPlayerHand(state, { playerId, hand }) {
      const player = state.otherPlayers.find(
        (player) => player.id === playerId
      );
      if (player) {
        player.hand = hand;
      }
      Vue.set(state, "otherPlayers", state.otherPlayers);
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
        commit("resetDrawDeck", messageData.draw_deck_size);
      }
      if (messageData.player_id) {
        commit("setPlayerId", messageData.player_id);
      }

      if (messageData.other_players) {
        messageData.other_players.forEach((player) => {
          commit("addPlayer", player);
        });
      }

      if (messageData.discard_pile) {
        commit("setDiscardPile", messageData.discard_pile);
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
      commit("removeCardFromDrawDeck");
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
    toggleCardVisibility({ state }, card) {
      Api.toggleCardVisibility(
        state.websocket,
        state.roomCode,
        state.playerId,
        card
      );
    },
    // We are having to do a lot of extra work due to the lack of ids on the cards. This is causing us
    // to do lots of searching, if statements, and other evil things.
    handleToggleVisibilityOfCard({ state, commit }, messageData) {
      if (messageData.player_id == state.playerId) {
        state.hand.map((card) => {
          if (
            card.suite === messageData.card.suite &&
            card.value === messageData.card.value
          ) {
            card.visible = messageData.card.visible;
          }
        });
        commit("setHand", state.hand);
      } else {
        state.otherPlayers.map((player) => {
          if (player.id == messageData.player_id) {
            for (let card of player.hand) {
              if (messageData.card.visible) {
                if (!card.visible) {
                  card.visible = true;
                  card.suite = messageData.card.suite;
                  card.value = messageData.card.value;
                  break;
                }
              } else {
                if (
                  card.suite == messageData.card.suite &&
                  card.value == messageData.card.value
                ) {
                  card.visible = false;
                  card.suite = null;
                  card.value = null;
                  break;
                }
              }
            }
          }
        });
        commit("setOtherPlayers", state.otherPlayers);
      }
    },
    discardCard({ state }, card) {
      Api.discardCard(state.websocket, state.roomCode, state.playerId, card);
    },
    handleDiscardCard({ state, commit }, messageData) {
      if (messageData.player_id == state.playerId) {
        commit("removeCardFromPlayerHand", messageData.card);
      } else {
        commit("setPlayerHand", {
          playerId: messageData.player_id,
          hand: messageData.hand,
        });
      }

      commit("addCardToDiscardPile", messageData.card);
    },
    resetDeck({ state }) {
      Api.resetDeck(state.websocket, state.roomCode);
    },
    handleResetDeck({ commit }, messageData) {
      commit("setDiscardPile", messageData.discard_pile);
      commit("resetDrawDeck", messageData.draw_deck_size);
      commit("setMessage", messageData.message);
      commit("setHand", []);
      commit("resetOtherPlayersHands");
    },
    quit({ state, commit }) {
      Api.quit(state.websocket, state.roomCode, state.playerId);
      commit("leaveRoom");
      commit("setMessage", "left room");
      commit("setOtherPlayers", []);
      commit("setHand", []);
      commit("clearChat");
    },
    handleQuit({ commit }, messageData) {
      commit("setMessage", messageData.message);
      commit("setDiscardPile", messageData.discard_pile);
      commit("removePlayerById", messageData.player_id);
    },
  },
  modules: {},
});
