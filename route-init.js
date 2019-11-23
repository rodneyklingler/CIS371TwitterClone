import Login from "@/components/Login.vue";
import Post from "@/components/Post.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
/* Map path to component */
const routeTable = [
  { path: "/", component: Login },
  { path: "/Post", component: Post }
];

const AppRouter = new VueRouter({ 
  routes: routeTable, 
  mode: "history", 
});
export { AppRouter };