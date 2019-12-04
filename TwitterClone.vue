<template>
  <div>
    <div id="publicTweetTable">
        <table>
            <thead>
            <tr>
                <th>Public Post</th>
            </tr>
            </thead>
            <tbody>
            <tr id="postrow" v-for="(publicmyPost,pos) in myPublicPost" :key="pos">
                <td >{{publicmyPost.publicpostName}}</td>
                <td id="postrow">{{publicmyPost.publicpost}}</td>
                <td >{{publicmyPost.publicuser}}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</template>

<script>
import { AppDB } from "../db-init.js";
import store from "../store";
  export default {
    /* You will fill this in later */
    data() {
    return {
      active:[],
      userSelections: [],
      postName: "",
      postBody: "",
      userName: "",
      myPrivatePost: [],
      myPublicPost: [],
    };
  },
  mounted() {
      AppDB.ref("private").child(store.getters.user).on("child_added", this.privateAddHandler);
      AppDB.ref("private").child(store.getters.user).on("child_removed", this.privateRemoveListener);
      AppDB.ref("public").child(store.getters.user).on("child_added", this.publicAddHandler);
      AppDB.ref("public").child(store.getters.user).on("child_removed", this.publicRemoveListener);
  },
  beforeDestroy() {
      AppDB.ref("private").child(store.getters.user).off("child_added", this.privateAddHandler);
      AppDB.ref("private").child(store.getters.user).off("child_removed", this.privateDeleteButtonHandler);
      AppDB.ref("public").child(store.getters.user).off("child_added", this.publicAddHandler);
      AppDB.ref("public").child(store.getters.user).off("child_removed", this.publicDeleteButtonHandler);
  },
  methods: {
      privateAddHandler(snapshot) {
          const item = snapshot.val();
          this.myPrivatePost.push({ ...item, key: snapshot.key });
      },
      publicAddHandler(snapshot) {
          const item = snapshot.val();
          this.myPublicPost.push({ ...item, key: snapshot.key });
      },
      privateRemoveListener(snapshot) {
    /* snapshot.key will hold the key of the item being REMOVED */
    this.myPrivatePost = this.myPrivatePost.filter(z => z.key != snapshot.key);
    },
    publicRemoveListener(snapshot) {
    /* snapshot.key will hold the key of the item being REMOVED */
    this.myPublicPost = this.myPublicPost.filter(z => z.key != snapshot.key);
    },
      privateSelectionHandler (changeEvent) {
        const whichKey = changeEvent.target.id;
        if (changeEvent.target.checked) {
        this.userSelections.push(whichKey);
        } else {
        this.userSelections = this.userSelections.filter(x =>{if (x == whichKey) return true
        else return false;
        });
      }
      },
      publicSelectionHandler (changeEvent) {
        const whichKey = changeEvent.target.id;
        if (changeEvent.target.checked) {
        this.userSelections.push(whichKey);
        } else {
        this.userSelections = this.userSelections.filter(x =>{if (x == whichKey) return true
        else return false;
        });
      }
      },
      yourButtonHandler(){
          //alert(`You are logged in as ${store.getters.user}`);
          const userID = store.getters.user;
          if (this.active == "0") {
          AppDB.ref("private")
          .child(userID)
          .push()
          .set({
              privatepostname: this.postName,
              privatepost: this.postBody,
              privateuser: this.userName
          });
      } else {
          AppDB.ref("public")
          .child(userID)
          .push()
          .set({
              publicpostname: this.postName,
              publicpost: this.postBody,
              publicuser: this.userName
          });
      }
      },
      deleteButtonHandler(){
          if (this.active == "0") {
            this.userSelections.forEach((victimKey) => {
                AppDB.ref('private').child(store.getters.user).child(victimKey).remove();
        });
          } else {
            this.userSelections.forEach((victimKey) => {
                AppDB.ref('public').child(store.getters.user).child(victimKey).remove();
            });
          }
      }
  }
  };
</script>

<style scoped>
#tweetForm {  
    display: grid;
    grid-column: 1 / 2 ;
    width: 50%;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto auto auto;
    border: 4px solid lightgray;
    padding: 4px;
}
#datarow:nth-child(even) {
background: orange;
}
#datarow:nth-child(odd) {
    background: yellow;
}
#amountrow {
    text-align: right;
}
#totalName {
    text-align: right;
}
th {
background: brown;
color: white;
}
</style>