<template>
  <h1>You are in room {{ roomCode }}</h1>
</template>

<script>
export default {
  computed: {
    roomCode() {
      return this.$store.state.roomCode;
    },
  },
  mounted() {
    if (!this.roomCode) {
      this.$router.push("/");
    }
  },
};
</script>
