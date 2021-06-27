<template>
  <div :class="computeClasses">
    <img :src="back" alt="Back of a playing card" v-if="displayCard" />
  </div>
</template>

<script>
import back from "../assets/back.png";

export default {
  props: {
    display: String, // possible choices are "front", "back", "nothing"
  },
  data() {
    return {
      back,
      states: {
        front: "front",
        back: "back",
        nothing: "nothing",
      },
    };
  },
  computed: {
    computeClasses() {
      return this.states[this.display];
    },
    displayCard() {
      return this.display == this.states.back;
    },
  },
};
</script>

<style scoped>
img {
  width: inherit;
}

div {
  width: 2.5rem;
  height: 4rem;
}

.nothing {
  border: 1px solid green;
  border-radius: 10px;
}
</style>
