<template>
  <div class="app">
    <router-link to="/">
      <h1>Deck of Cards Simulator</h1>
    </router-link>
    <router-view @createGame="createGame" @joinRoom="joinRoom" />
    <mwc-snackbar id="message" :labelText="message"></mwc-snackbar>
  </div>
</template>

<script>
import "./assets/reset.css";
import "@material/mwc-snackbar";
export default {
  mounted() {
    this.$store.dispatch("connectToServer");
    const messageBar = document.querySelector("#message");
    this.messageBar = messageBar;
  },
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
  },
  methods: {
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
      console.log("navigating to room");
      this.$router.push(`/rooms/${this.roomCode}`);
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
</style>
