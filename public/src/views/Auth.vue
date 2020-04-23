<template>
  <v-row class="justify-center auth fondo">
    <v-col cols="4">
      <v-card color="nav">
        <v-card-title class="text-center justify-center">
          <h1 class="tittle">BlogNotes</h1>
        </v-card-title>
        <v-tabs v-model="tab" background-color="green darken-3" grow>
          <v-tab class="mytab nav" v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="bgpic">
            <v-col class="pad">
              <Login />
            </v-col>
          </v-tab-item>
          <v-tab-item class="bgpic">
            <v-col class="pt-0">
              <Signup />
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Login from "../components/Login.vue";
import Signup from "../components/Sign.vue";

export default {
  data() {
    return {
      tab: null,
      items: ["Login", "Sign Up"]
    };
  },
  components: {
    Login,
    Signup
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.tittle {
  color: rgba(255, 255, 255, 0.733);
}
.mytab {
  color: rgba(255, 255, 255, 0.733) !important;
  font-weight: 600;
}
.auth {
  margin-top: 2%;
}
.nav {
  height: 100%;
  background-image: url("../assets/sticky.png");
}
.fondo {
  background-image: url("../assets/notes.png");
  background-position: center;
  height: 100vh;
}
.pad {
  padding-top: 0%;
}
</style>
