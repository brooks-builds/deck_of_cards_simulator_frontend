<template>
  <mwc-top-app-bar>
    <div slot="title">{{ title }}</div>
    <div slot="actionItems" v-if="roomCode">
      <custom-button label="Quit" @click="handleQuit"></custom-button>
    </div>
    <div slot="actionItems" v-if="roomCode">Room Code: {{ roomCode }}</div>
  </mwc-top-app-bar>
</template>

<script>
import "@material/mwc-top-app-bar";
import CustomButton from "./CustomButton.vue";
export default {
  props: {
    title: String,
    roomCode: Number,
  },
  components: {
    CustomButton,
  },
  methods: {
    handleQuit() {
      this.$emit("quit");
    },
  },
};
</script>

<style scoped>
mwc-top-app-bar {
  --mdc-top-app-bar-width: 90vw;
}
</style>
