<template>
  <section>
    <custom-button label="Create Game" @click="createGame"></custom-button>
    <div>
      <custom-text-field
        label="room code"
        @input="handleJoinRoomTextfield"
      ></custom-text-field>
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

export default {
  components: {
    CustomButton,
    CustomTextField,
  },
  data() {
    return {
      joiningRoomCode: "",
    };
  },
  methods: {
    createGame() {
      this.$emit("createGame");
      this.$router.push("/rooms");
    },
    handleJoinRoomTextfield(code) {
      this.joiningRoomCode = code;
    },
    handleJoinRoomClick() {
      this.$emit("joinRoom", this.joiningRoomCode);
    },
  },
};
</script>
