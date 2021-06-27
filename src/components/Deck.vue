<template>
  <section>
    <div class="cards">
      <card></card>
      <p>52</p>
    </div>
  </section>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
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
