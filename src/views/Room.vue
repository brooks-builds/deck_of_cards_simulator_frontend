<template>
  <section class="room">
    <section class="main">
      <section class="other-players row">
        <div
          v-for="otherPlayer in otherPlayers"
          :key="otherPlayer.id"
          class="other-player"
        >
          <p>{{ otherPlayer.name }}</p>
          <div class="row">
            <card
              v-for="(card, index) in otherPlayer.hand"
              :key="index"
              :display="displayCardFrontOrBack(card)"
              :suite="card.suite"
              :value="card.value"
              small
            ></card>
          </div>
        </div>
      </section>
      <section class="center">
        <deck @drawCard="handleDrawCard" class="deck row"></deck>
      </section>
      <section class="center">
        <hand
          class="hand"
          @toggleVisibility="handleCardTogglingVisibility"
        ></hand>
      </section>
    </section>
    <section class="row">
      <chat class="chat" @sendChatMessage="sendChatMessage"></chat>
    </section>
  </section>
</template>

<script>
import Chat from "../components/Chat.vue";
import Deck from "../components/Deck.vue";
import Hand from "../components/Hand.vue";
import Card from "../components/Card.vue";

export default {
  components: {
    Chat,
    Deck,
    Hand,
    Card,
  },
  computed: {
    roomCode() {
      return this.$store.state.roomCode;
    },
    otherPlayers() {
      return this.$store.state.otherPlayers;
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
    displayCardFrontOrBack(card) {
      if (card.value && card.suite) {
        return "front";
      }

      return "back";
    },
    handleCardTogglingVisibility(card) {
      this.$emit("cardTogglingVisibility", card);
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
  flex-direction: column;
  justify-content: space-between;
}

.chat {
  width: 25vw;
  border-left: 3px solid lightgray;
  height: 90vh;
}

.hand {
  align-self: flex-end;
}

.other-players {
  display: flex;
  justify-content: space-evenly;
}

.row {
  display: flex;
}

.center {
  display: flex;
  justify-content: center;
}

.other-player {
  display: flex;
  flex-direction: column;
}
</style>
