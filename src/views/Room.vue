<template>
  <section class="room">
    <section class="main">
      <section class="other-players row">
        <div
          v-for="otherPlayer in otherPlayers"
          :key="otherPlayer.id"
          class="other-player"
        >
          <p class="other-name">{{ otherPlayer.name }}</p>
          <div class="row">
            <card
              v-for="(card, index) in otherPlayer.hand"
              :key="index"
              :display="displayCardFrontOrBack(card)"
              :suite="card.suite"
              :value="card.value"
              small
              class="card"
            ></card>
          </div>
        </div>
      </section>
      <section class="center">
        <div>
          <reset-deck-icon
            hover
            class="reset-deck-icon"
            @click="handleResetDeck"
          ></reset-deck-icon>
          <deck
            @drawCard="handleDrawCard"
            class="deck row"
            :cards="$store.state.drawDeck"
          ></deck>
        </div>
        <deck :cards="$store.state.discardPile" faceup class="deck"></deck>
      </section>
      <section class="center">
        <hand
          class="hand"
          @toggleVisibility="handleCardTogglingVisibility"
          @discard="handleDiscard"
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
import ResetDeckIcon from "../components/ResetDeckIcon.vue";

export default {
  components: {
    Chat,
    Deck,
    Hand,
    Card,
    ResetDeckIcon,
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
    handleDiscard(card) {
      this.$emit("discard", card);
    },
    handleResetDeck() {
      this.$emit("resetDeck");
    },
  },
};
</script>

<style scoped>
.room {
  display: flex;
  border: 3px solid lightgray;
  font-size: 1.5rem;
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

.deck {
  margin: 0.5rem;
}

.other-name {
  margin-bottom: 2.5rem;
}

.card {
  margin-right: 2.5rem;
}
</style>
