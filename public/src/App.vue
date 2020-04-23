<template>
  <v-app id="app">
    <v-content>
      <router-view>
        <router-link to="/auth"></router-link>
      </router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app"
};
</script>
