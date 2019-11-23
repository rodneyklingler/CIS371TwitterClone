<template>
  <div>
    <h2>Profile</h2>
    <div id="tweetForm">
        <v-text-field label="PostName" type="text" v-model="postName" />
        <v-text-field label="PostBody" type="text" v-model="postBody" />  
        <v-text-field label="UserName" type="text" v-model="userName" />
        <v-radio-group label="Private or Public" v-model="active">
            <v-radio name="active" label="Private" :value="0"></v-radio>
            <v-radio name="active" label="Public" :value="1"></v-radio>                
        </v-radio-group>
        <v-btn color="primary" v-bind:disabled="userSelections.length == 0" @click="deleteButtonHandler">Delete</v-btn>
        <v-btn color="primary" @click="yourButtonHandler">Add</v-btn>
    </div>
    <div id="personalTweetTable">
        <table>
            <thead>
            <tr>
                <th>Personal Post</th>
            </tr>
            </thead>
            <tbody>
            <tr id="postrow" v-for="(myPost,pos) in myPost" :key="pos">
                <td >{{myPost.postName}}</td>
                <td id="postrow">{{myPost.postBody}}</td>
                <td>
                    <input 
                    type="checkbox" 
                    v-bind:id="myPost.key"
                    v-on:change="selectionHandler"
                     />
                </td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
</template>

<script>
import { AppDB } from "../db-init.js";

  export default {
    /* You will fill this in later */
    data() {
    return {
      active:[],
      userSelections: [],
      postName: "",
      postBody: "",
      userName: "",
      myPost: [],
    };
  },

  mounted() {
      AppDB.ref("").on("child_added", this.fbAddHandler);
      AppDB.ref("").on("child_removed", this.fbRemoveListener)
  },

  beforeDestroy() {
      AppDB.ref("").off("child_added", this.fbAddHandler);
      AppDB.ref("").off("child_removed", this.deleteButtonHandler);
  },

  methods: {

      fbAddHandler(snapshot) {
          const item = snapshot.val();
          this.myPost.push({ ...item, key: snapshot.key });

      },

       fbRemoveListener(snapshot) {
    /* snapshot.key will hold the key of the item being REMOVED */
    this.myPost = this.myPost.filter(z => z.key != snapshot.key);
  },


      selectionHandler (changeEvent) {
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
          /*alert(`You enter ${this.expenseAmt}`);*/
          AppDB.ref("private")
          .push()
          .set({
              postname: this.postName,
              post: this.postBody,
              user: this.userName
          });

          AppDB.ref("public")
          .push()
          .set({
              postname: this.postName,
              post: this.postBody,
              user: this.userName
          })
      },

      deleteButtonHandler(){
          this.userSelections.forEach((victimKey) => {
        AppDB.ref('TwitterClone').child(victimKey).remove();
        });
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
