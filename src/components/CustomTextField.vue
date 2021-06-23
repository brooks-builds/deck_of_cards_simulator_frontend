<template>
  <mwc-textfield label="My Textfield" @input="handleInput"></mwc-textfield>
</template>

<script>
import "@material/mwc-textfield";

export default {
  methods: {
    handleInput(rawInput) {
      this.$emit("input", rawInput.target.value);
    },
  },
};
</script>
