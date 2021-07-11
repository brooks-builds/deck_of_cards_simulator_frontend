<template>
  <mwc-textfield
    label="My Textfield"
    @input="handleInput"
    :class="calculateClasses"
  ></mwc-textfield>
</template>

<script>
import "@material/mwc-textfield";

export default {
  methods: {
    handleInput(rawInput) {
      this.$emit("input", rawInput.target.value);
    },
  },
  props: {
    fullwidth: Boolean,
  },
  computed: {
    calculateClasses() {
      return this.fullwidth ? "fullwidth" : "normalwidth";
    },
  },
};
</script>

<style scoped>
.normalwidth {
  width: 25rem;
}

.fullwidth {
  width: 100%;
}
</style>
