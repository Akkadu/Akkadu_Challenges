<template>
  <v-footer fixed padless class="white">
    <v-layout row wrap justify-end pa-2>
      <v-flex xs12 md10 pa-2>
        <v-text-field
          solo
          rounded
          flat
          label="Message"
          color="primary"
          v-model="message"
          background-color="#edf2f7"
          append-icon="mdi-send"
          @keyup.enter="send"
          @click:append="send"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  computed: {
    meta() {
      return {
        receivers: this.$store.state.receivers,
        sender: this.$store.state.senderName,
        room: this.$store.state.room,
      };
    },
  },
  data: () => ({ message: "" }),
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
  },
  methods: {
    async send() {
      //Emit message to the server
      await this.socket.emit("createMessage", {
        ...this.meta,
        message: this.message,
        date: new Date(),
      });
      this.message = "";
    },
  },
};
</script>