<template>
  <section>
    <custom-button label="Create Game" @click="createGame"></custom-button>
  </section>
</template>

<script>
import CustomButton from "../components/CustomButton.vue";

export default {
  components: {
    CustomButton,
  },
  methods: {
    createGame() {
      this.$emit("createGame");
      this.$router.push("/rooms");
    },
  },
};
</script>
