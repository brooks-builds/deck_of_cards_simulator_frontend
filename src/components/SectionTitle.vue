<template>
  <h2 :class="classes">{{ label }}</h2>
</template>

<script>
export default {
  props: {
    label: String,
    center: Boolean,
  },
  computed: {
    classes() {
      const classes = [];
      if (this.center) classes.push("center");
      return classes;
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

.center {
  text-align: center;
}
</style>
