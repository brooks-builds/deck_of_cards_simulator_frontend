<template>
  <section class="room">
    <section class="main">
      <deck @drawCard="handleDrawCard"></deck>
    </section>
    <chat class="chat" @sendChatMessage="sendChatMessage"></chat>
  </section>
</template>

<script>
import Chat from "../components/Chat.vue";
import Deck from "../components/Deck.vue";

export default {
  components: {
    Chat,
    Deck,
  },
  computed: {
    roomCode() {
      return this.$store.state.roomCode;
    },
  },
  mounted() {
    if (!this.roomCode) {
      this.$router.push("/");
    }
  },
  methods: {
    sendChatMessage(message) {
      this.$emit("sendChatMessage", message);
    },
    handleDrawCard() {
      this.$emit("drawCard");
    },
  },
};
</script>

<style scoped>
.room {
  display: flex;
  border: 3px solid lightgray;
}

.main {
  width: 75vw;
  display: flex;
  justify-content: center;
}

.chat {
  width: 25vw;
  border-left: 3px solid lightgray;
  height: 90vh;
}
</style>
