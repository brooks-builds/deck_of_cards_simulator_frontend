<template>
  <mwc-button :label="label" @click="handleClick"></mwc-button>
</template>

<script>
import "@material/mwc-button";
export default {
  props: {
    label: String,
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
mwc-button {
  --mdc-theme-primary: #e9437a;
  --mdc-theme-on-primary: white;
}
</style>
