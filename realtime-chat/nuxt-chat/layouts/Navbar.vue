<template>
  <v-app-bar app color="primary" dense dark>
    <v-app-bar-nav-icon @click.stop="openDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="title">
      <span class="d-none d-md-inline">Real-time Chat: {{ room }} </span>
      <span class="d-inline d-md-none"> {{ room }} </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y :close-on-content-click="closeOnContentClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="text-capitalize body-1" text v-bind="attrs" v-on="on">
          Select Room
          <v-icon small>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          link
          v-for="room in rooms"
          :key="room"
          @click="setRoom(room)"
        >
          <v-list-item-title> {{ room }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-text-field
              label="User Name"
              v-model="senderName"
              @input="setSender(senderName)"
            />
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "chat",
  computed: {
    room() {
      return this.$store.state.room;
    },
    rooms() {
      return this.$store.state.rooms;
    },
  },
  data() {
    return {
      senderName: this.$store.state.senderName,
      closeOnContentClick: true,
      users: ["John", "David", "Michael", "Solomon"],
    };
  },
  methods: {
    ...mapMutations(["openDrawer", "setRoom", "setSender"]),
  },
};
</script>