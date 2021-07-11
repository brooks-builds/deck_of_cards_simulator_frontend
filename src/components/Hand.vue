<template>
  <section>
    <card
      v-for="(card, index) in hand"
      :key="index"
      display="front"
      :value="card.value"
      :suite="card.suite"
      visibilityToggle
      :visible="card.visible"
      discardToggle
      @click="handleClickingCard"
      @discard="handleDiscard"
    ></card>
  </section>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  computed: {
    hand() {
      return this.$store.state.hand;
    },
  },
  methods: {
    handleClickingCard(card) {
      this.$emit("toggleVisibility", card);
    },
    handleDiscard(card) {
      this.$emit("discard", card);
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  margin-bottom: 0.5rem;
}

.card {
  margin-right: 0.25rem;
}
</style>
