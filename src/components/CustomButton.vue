<template>
  <mwc-button :label="label"></mwc-button>
</template>

<script>
import "@material/mwc-button";
export default {
  props: {
    label: String,
  },
};
</script>
