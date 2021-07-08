<template>
  <img :src="discardIcon" alt="Discard your card" class="discard-icon" />
</template>

<script>
import discardIcon from "../assets/delete_outline_white_24dp.svg";
export default {
  data() {
    return {
      discardIcon,
    };
  },
};
</script>

<style scoped>
.discard-icon {
  width: 45%;
}

.discard-icon:hover {
  background-color: crimson;
}
</style>
