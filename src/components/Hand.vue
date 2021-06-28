<template>
  <section>
    <card
      v-for="(card, index) in hand"
      :key="index"
      display="front"
      :value="card.value"
      :suite="card.suite"
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
};
</script>

<style scoped>
section {
  display: flex;
}
</style>
