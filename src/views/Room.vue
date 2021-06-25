<template>
  <section class="room">
    <section class="main">Main</section>
    <chat class="chat" @sendChatMessage="sendChatMessage"></chat>
  </section>
</template>

<script>
import Chat from "../components/Chat.vue";

export default {
  components: {
    Chat,
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
}

.chat {
  width: 25vw;
  border-left: 3px solid lightgray;
  height: 90vh;
}
</style>
