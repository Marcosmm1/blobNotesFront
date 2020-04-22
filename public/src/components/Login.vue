<template>
  <v-row class="justify-center backg">
    <v-card width="400px" height="390px">
      <v-card-title class="pb-0 mb-10">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="mb-10">
          <v-text-field
            class="mb-10"
            :label="errormsg"
            v-model="email"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            class="mb-10"
            label="Password"
            v-model="userPassword"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :rules="passwordRule"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="button" color="green" x-large @click="loginMethod">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import APIServices from "../services/api.js";
export default {
  data() {
    return {
      errormsg: "Email",
      isActive: true,
      hasError: false,
      email: "",
      showPassword: false,
      userPassword: "",
      passwordRule: [
        v => !!v || "Password is required",
        v => v.length >= 10 || "Password must be more than 10 characters"
      ]
    };
  },
  methods: {
    loginMethod() {
      const user = {
        email: this.email,
        password: this.userPassword
      };
      APIServices.login(user)
        .then(response => {
          if (!response.token) {
            this.errormsg = "Usuario Incorrecto";
          } else {
            localStorage.setItem("token", response.token);
            localStorage.setItem("email", response.email);
            this.$router.push("/home");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.button {
  color: white !important;
}
.backg {
  background-image: url("../assets/sticky.png");
  background-position: center;
}
</style>
