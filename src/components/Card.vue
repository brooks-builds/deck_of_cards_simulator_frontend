<template>
  <div :class="computeClasses">
    <img :src="back" alt="Back of a playing card" v-if="displayCardBack" />
    <img :src="faceCard" alt="It's an ace!" v-else-if="displayCardFront" />
  </div>
</template>

<script>
import back from "../assets/back.png";
import aceOfClubs from "../assets/ace_of_clubs.svg";
import aceOfHearts from "../assets/ace_of_hearts.svg";

export default {
  props: {
    display: String, // possible choices are "front", "back", "nothing"
    value: String,
    suite: String,
  },
  data() {
    return {
      back,
      states: {
        front: "front",
        back: "back",
        nothing: "nothing",
      },
      cardFaces: {
        AceClub: aceOfClubs,
        AceHeart: aceOfHearts,
      },
    };
  },
  computed: {
    computeClasses() {
      return this.states[this.display];
    },
    displayCardBack() {
      return this.display == this.states.back;
    },
    displayCardFront() {
      return this.display == this.states.front;
    },
    faceCard() {
      console.log(`${this.value}${this.suite}`);
      return this.cardFaces[`${this.value}${this.suite}`];
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
