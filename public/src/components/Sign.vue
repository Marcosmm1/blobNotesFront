<template>
  <v-row class="justify-center backg">
    <v-card width="400px" height="460px" class="backg card-color">
      <v-card-title class="pb-0 mb-10">
        <h1>Signup</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            class="mb-6"
            label="Username"
            v-model="username"
            dark
            prepend-icon="mdi-account-circle"
            :rules="userRules"
          ></v-text-field>

          <v-text-field
            label="E-mail"
            v-model="email"
            clearable
            dark
            :rules="emailRules"
            prepend-icon="mdi-email"
            class="mb-10"
          ></v-text-field>

          <v-text-field
            class="mb-6"
            label="Password"
            v-model="userPassword"
            dark
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
        <v-btn class="button" color="green" x-large @click="signup">Sign Up</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import APIServices from "../services/api.js";

export default {
  data() {
    return {
      showPassword: false,
      userPassword: "",
      passwordRule: [
        v => !!v || "Password is required",
        v => v.length >= 10 || "Password must be more than 10 characters"
      ],
      username: "",
      userRules: [v => !!v || "Username is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    signup() {
      const newUser = {
        name: this.username,
        email: this.email,
        password: this.userPassword
      };
      APIServices.signup(newUser)
        .then(response => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("email", response.email);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.button {
  color: white;
}
.tras {
  opacity: 50%;
}
.backg {
  background-image: url("../assets/sticky.png");
  background-position: center;
}
.pad {
  padding-top: 0%;
  padding-bottom: 0%;
}
.card-color {
  color: rgba(255, 255, 255, 0.787);
}
</style>
