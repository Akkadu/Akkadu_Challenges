<template>
  <div style="height: 100%">
    <v-layout style="height: 100%" row wrap align-center justify-center pa-2>
      <v-flex xs12 md3 pa-2>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="username"
              label="User name"
              @keyup.enter="setUsername"
            />
            <div>
              <v-btn class="primary" @click="setUsername">Continue</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MessageBox from "../components/MessageBox.vue";
export default {
  components: { MessageBox },
  name: "chat",
  layout: "default",
  data() {
    return {
      username: "",
    };
  },
  computed: {
    sender() {
      return this.$store.state.senderName;
    },
  },
  mounted() {
    if (this.sender !== "") this.$router.push("/chat");
  },
  methods: {
    setUsername() {
      this.$store.commit("setSender", this.username);
      this.$router.push("/chat");
    },
  },
};
</script>