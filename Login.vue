<template>
<div id="loginForm">
<v-container v-show="isLoggedIn === false">
  <v-row justify="end">
    <v-btn @click="doCreateAccount">Create Account</v-btn>
    <v-btn @click="doLogin">Login</v-btn>
  </v-row>
</v-container>
<v-text-field type="text" label="Your Email" v-model="userEmail" />
<v-text-field type="password" label="Your Password" v-model="userPassword" />
</div>
</template>

<script>
import {AppAUTH} from '../db-init.js';
export default {
data: function() {
  return {
    userEmail: "",
    userPassword: "",
    isLoggedIn: false
  }
},
mounted(){
AppAUTH.onAuthStateChanged((u) => {
  this.isLoggedIn = u !== null;
});
},
methods: {
  doCreateAccount(){
    AppAUTH.createUserWithEmailAndPassword(this.userEmail, this.userPassword)
  .then(() => {
    this.$router.push({ path: "/TwitterClone" });
  })
  .catch((err) => {
    alert("Error " + err);
  });
  },
  doLogin(){
  AppAUTH.signInWithEmailAndPassword(this.userEmail, this.userPassword)
  .then((z) => {
    this.$router.push({ path: "/TwitterClone" });
    this.$store.commit("SET_USER", z.user.uid);
    this.$store.commit("SET_LOGGED_IN", true);
  })
  .catch((err) => {
    alert("Error " + err);
  });
}
}
};
</script>

<style>
#loginForm {
  display:flexbox;
  border-style: solid;
  border-width: small;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  float: left;
  margin: 10px;
}
</style>