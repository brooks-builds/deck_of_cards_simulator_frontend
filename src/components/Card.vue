<template>
  <div>
    <img :src="back" alt="Back of a playing card" />
  </div>
</template>

<script>
import back from "../assets/back.png";

export default {
  data() {
    return {
      back,
    };
  },
};
</script>

<style scoped>
img {
  width: 2.5rem;
}
</style>
