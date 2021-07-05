<template>
  <section class="chat">
    <section-title label="Chat" center class="title"></section-title>
    <section class="chat-messages">
      <ol>
        <li v-for="(message, index) in chatMessages" :key="index">
          <span class="chat-name" v-if="message.sender"
            >{{ message.sender }}: </span
          >{{ message.message }}
        </li>
      </ol>
    </section>
    <form>
      <custom-text-field
        label="chat message"
        @input="handleInput"
      ></custom-text-field>
      <custom-button label="chat" @click="submitChat"></custom-button>
    </form>
  </section>
</template>

<script>
import SectionTitle from "./SectionTitle.vue";
import CustomTextField from "./CustomTextField.vue";
import CustomButton from "./CustomButton.vue";

export default {
  components: {
    SectionTitle,
    CustomTextField,
    CustomButton,
  },
  computed: {
    chatMessages() {
      return this.$store.state.chatMessages;
    },
  },
  data() {
    return {
      draft: "",
    };
  },
  methods: {
    handleInput(text) {
      this.draft = text;
    },
    submitChat() {
      this.$emit("sendChatMessage", this.draft);
    },
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-messages {
  overflow-y: scroll;
}

li {
  margin: 0.5rem;
}

.title {
  border-bottom: 3px solid lightgray;
}
</style>
