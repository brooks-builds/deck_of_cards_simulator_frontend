<template>
  <section>
    <div class="cards" v-if="deckExists">
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
}

.cards {
  display: flex;
  flex-direction: column;
}
</style>
