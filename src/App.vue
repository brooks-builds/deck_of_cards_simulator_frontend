<template>
  <div class="app">
    <top-bar
      title="Deck of Cards Simulator"
      class="top-bar"
      :roomCode="roomCode"
      @quit="handleQuit"
    ></top-bar>
    <custom-button
      v-if="websocketFailed"
      label="reset connection"
      @click="connectToServer"
    ></custom-button>
    <router-view
      class="router"
      @createGame="createGame"
      @joinRoom="joinRoom"
      @sendChatMessage="handleSendingChatMessage"
      @drawCard="handleDrawCard"
      @nameSet="handleNameSet"
      @cardTogglingVisibility="handleCardTogglingVisibility"
      @discard="handleDiscard"
      @resetDeck="handleResetDeck"
    />
    <mwc-snackbar id="message" :labelText="message"></mwc-snackbar>
  </div>
</template>

<script>
import "./assets/reset.css";
import "@material/mwc-snackbar";
import CustomButton from "./components/CustomButton.vue";
import TopBar from "./components/TopBar.vue";

export default {
  mounted() {
    this.connectToServer();
    const messageBar = document.querySelector("#message");
    this.messageBar = messageBar;
    this.$store.commit("resetDrawDeck", 52);
  },
  components: { CustomButton, TopBar },
  data() {
    return {
      messageBar: null,
    };
  },
  computed: {
    message() {
      return this.$store.state.message;
    },
    roomCode() {
      return this.$store.state.roomCode;
    },
    websocketFailed() {
      return !this.$store.state.websocket;
    },
  },
  methods: {
    connectToServer() {
      this.$store.dispatch("connectToServer");
    },
    showMessage() {
      this.messageBar.show();
    },
    createGame() {
      this.$store.dispatch("createGame");
    },
    joinRoom(roomCode) {
      this.$store.dispatch("joinRoom", roomCode);
    },
    navigateToRoom() {
      if (!this.roomCode && this.$route.name == "Home") return;
      if (!this.roomCode && this.$route.name != "Home") {
        this.$router.push("/");
      } else if (this.roomCode) {
        this.$router.push(`/rooms/${this.roomCode}`);
      }
    },
    resetState() {
      this.$store.dispatch("resetState");
    },
    handleSendingChatMessage(message) {
      this.$store.dispatch("sendChatMessage", message);
    },
    handleDrawCard() {
      this.$store.dispatch("drawCard");
    },
    handleNameSet(name) {
      this.$store.dispatch("setName", name);
    },
    handleCardTogglingVisibility(card) {
      this.$store.dispatch("toggleCardVisibility", card);
    },
    handleDiscard(card) {
      this.$store.dispatch("discardCard", card);
    },
    handleResetDeck() {
      this.$store.dispatch("resetDeck");
    },
    handleQuit() {
      this.$store.dispatch("quit");
    },
  },
  watch: {
    message: {
      handler: "showMessage",
    },
    roomCode: {
      handler: "navigateToRoom",
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
body {
  background-color: #252525;
  color: lightskyblue;
}

.clickable {
  cursor: pointer;
}

.app {
  font-family: "Noto Sans JP", sans-serif;
}

.app > *,
.router > * {
  margin-bottom: 1rem;
}
</style>
