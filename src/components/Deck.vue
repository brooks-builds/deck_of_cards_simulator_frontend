<template>
  <section>
    <div class="cards" v-if="deckExists" @click="handleClickingDeck">
      <card :display="displayCard"></card>
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
  computed: {
    cardCount() {
      return this.$store.state.drawDeckSize;
    },
    deckExists() {
      return this.$store.state.drawDeckSize != null;
    },
    displayCard() {
      if (this.$store.state.drawDeckSize > 0) {
        return "back";
      }

      return "nothing";
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
  width: 2.5rem;
  display: flex;
  align-items: center;
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
