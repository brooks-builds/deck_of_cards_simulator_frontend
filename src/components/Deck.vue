<template>
  <section class="deck">
    <div class="cards" @click="handleClickingDeck">
      <card
        :display="displayCard"
        :suite="topSuite"
        :value="topValue"
        :visible="topVisible"
      ></card>
      <p>{{ cardCount }}</p>
    </div>
  </section>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  props: {
    cards: Array,
    faceup: Boolean,
  },
  computed: {
    cardCount() {
      return this.cards.length;
    },
    displayCard() {
      if (this.cards.length == 0) {
        return "nothing";
      }

      if (this.cards.length > 0) {
        if (this.faceup) {
          return "front";
        }

        return "back";
      }

      return "nothing";
    },
    topValue() {
      return this.cards[this.cardCount - 1]?.value;
    },
    topSuite() {
      return this.cards[this.cardCount - 1]?.suite;
    },
    topVisible() {
      return this.cards[this.cardCount - 1]?.visible;
    },
  },
  methods: {
    handleClickingDeck() {
      this.$emit("drawCard");
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

p {
  text-align: center;
  margin-top: 0.5rem;
}

.cards {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>
