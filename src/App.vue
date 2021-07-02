<template>
  <div class="app">
    <top-bar
      title="Deck of Cards Simulator"
      class="top-bar"
      :roomCode="roomCode"
    ></top-bar>
    <custom-button
      v-if="websocketFailed"
      label="reset connection"
      @click="connectToServer"
    ></custom-button>
    <router-view
      @createGame="createGame"
      @joinRoom="joinRoom"
      @sendChatMessage="handleSendingChatMessage"
      @drawCard="handleDrawCard"
      @nameSet="handleNameSet"
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
body {
  background-color: #252525;
  color: lightskyblue;
}

.app {
  margin: 1rem;
}

.clickable {
  cursor: pointer;
}
</style>
