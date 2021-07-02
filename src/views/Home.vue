<template>
  <section class="home">
    <section-title
      class="center"
      label="Enter Your Name and then create or join a game"
    ></section-title>
    <div class="center">
      <custom-text-field
        label="name"
        @input="handleNameTextfield"
      ></custom-text-field>
    </div>
    <custom-button label="Create Game" @click="createGame"></custom-button>
    <div class="center">
      <custom-text-field
        label="room code"
        @input="handleJoinRoomTextfield"
      ></custom-text-field>
    </div>
    <div class="center">
      <custom-button
        label="Join with room code"
        @click="handleJoinRoomClick"
      ></custom-button>
    </div>
  </section>
</template>

<script>
import CustomButton from "../components/CustomButton.vue";
import CustomTextField from "../components/CustomTextField.vue";
import SectionTitle from "../components/SectionTitle.vue";

export default {
  components: {
    CustomButton,
    CustomTextField,
    SectionTitle,
  },
  data() {
    return {
      joiningRoomCode: "",
    };
  },
  methods: {
    createGame() {
      this.$emit("createGame");
    },
    handleJoinRoomTextfield(code) {
      this.joiningRoomCode = code;
    },
    handleJoinRoomClick() {
      this.$emit("joinRoom", this.joiningRoomCode);
    },
    handleNameTextfield(name) {
      this.$emit("nameSet", name);
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.center {
  display: flex;
  justify-content: center;
}
</style>
