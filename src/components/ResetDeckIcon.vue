<template>
  <div @click="handleClick">
    <img :src="svg" alt="Reset Deck" :class="classes" />
  </div>
</template>

<script>
import svg from "../assets/autorenew_white_24dp.svg";

export default {
  props: {
    hover: Boolean,
  },
  data() {
    return {
      svg,
    };
  },
  computed: {
    classes() {
      return this.hover ? "hover" : "";
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
div {
  justify-content: center;
  display: flex;
}

img {
  width: 35%;
}

.hover:hover {
  background-color: green;
  cursor: pointer;
}
</style>
