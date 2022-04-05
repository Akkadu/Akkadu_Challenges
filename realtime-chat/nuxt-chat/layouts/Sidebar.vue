<template>
  <v-navigation-drawer app v-model="drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Chat Rooms </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon class="d-inline d-md-none">
        <v-icon>mdi-close</v-icon>
      </v-list-item-icon>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-radio-group v-model="selectedRoom">
        <v-list-item v-for="room in rooms" :key="room" link @click="setRoom">
          <v-radio :label="room" :value="room" />
        </v-list-item>
      </v-radio-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "chat",
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        return val;
      },
    },
    rooms() {
      return this.$store.state.rooms;
    },
  },
  data() {
    return {
      selectedRoom: "",
    };
  },
  methods: {
    setRoom() {
      this.$store.commit("setRoom", this.selectedRoom);
    },
    closeDrawer() {
      this.$store.commit("openDrawer");
    },
  },
};
</script>