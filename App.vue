<template>
  <v-app>
    <v-app-bar
      app
      id="toolbar"
      dark
    >
      <span>TWITTER CLONE</span>

      <v-spacer></v-spacer>
      <v-btn @click="ButtonHandler">SignOut</v-btn>
    </v-app-bar>

    <v-content>
      <Login/>
    </v-content>
  </v-app>
</template>

<style>
  #toolbar {
    background-color: rgba(119, 181, 215,0.5);
    /* Experimental web feature (Can be viewed in Microsoft Edge) */
    backdrop-filter: saturate(180%) blur(20px);  
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    position: fixed;
  }
</style>

<script>
import Login from '../src/Login.vue';
import {AppAUTH} from '../db-init.js';
export default {
  name: 'App',
  components: {
    Login,
  },
  data: () => ({
    //
  }),
  methods: {
  ButtonHandler() {
    AppAUTH.signOut().then(() => {
    //alert("Outta here");
    this.$router.Login();
  });
  }
  },
  mounted() {
    AppAUTH.onAuthStateChanged((u) => {
        this.isLoggedIn = u !== null;
    });
  }
};
</script>
