<template>
  <img :src="filename" :alt="alt" class="visibility-toggle" />
</template>

<script>
import VisibilityOffIcon from "../assets/visibility_off_white_24dp.svg";
import VisibilityOnIcon from "../assets/visibility_white_24dp.svg";

export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      icons: {
        off: VisibilityOffIcon,
        on: VisibilityOnIcon,
      },
    };
  },
  computed: {
    filename() {
      return this.visible ? this.icons.on : this.icons.off;
    },
    alt() {
      return `Card is ${
        this.visible ? "visible" : "invisible"
      } to other players`;
    },
  },
};
</script>

<style scoped>
.visibility-toggle {
  width: 30%;
}
</style>
