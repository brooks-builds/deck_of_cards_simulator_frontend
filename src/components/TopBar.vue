<template>
  <mwc-top-app-bar>
    <div slot="title">{{ title }}</div>
    <div slot="actionItems" v-if="roomCode">Room Code: {{ roomCode }}</div>
  </mwc-top-app-bar>
</template>

<script>
import "@material/mwc-top-app-bar";
export default {
  props: {
    title: String,
    roomCode: Number,
  },
};
</script>

<style scoped>
mwc-top-app-bar {
  --mdc-top-app-bar-width: 90vw;
}
</style>
