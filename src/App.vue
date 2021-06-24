<template>
  <div class="app">
    <h1 v-on:click="resetState" class="clickable">Deck of Cards Simulator</h1>
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
