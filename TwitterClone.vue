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
      userSelections: [],
      postName: "",
      postBody: "",
      userName: "",
      myPublicPost: [],
    };
  },
  mounted() {
      AppDB.ref("public").on("value", this.publicAddHandler);
      AppDB.ref("public").child(store.getters.user).on("child_removed", this.publicRemoveListener);
  },
  beforeDestroy() {
      AppDB.ref("public").child(store.getters.user).off("child_added", this.publicAddHandler);
      AppDB.ref("public").child(store.getters.user).off("child_removed", this.publicDeleteButtonHandler);
  },
  methods: {
      publicAddHandler(snapshot) {
            const item = snapshot.val();
            for(let home in item){
                    for(let something in item[home]){
                        const postPublic = item[home][something];
                        this.myPublicPost.push({ ...postPublic, key: something});
                    }
            }
            
        },
      
    publicRemoveListener(snapshot) {
    /* snapshot.key will hold the key of the item being REMOVED */
    this.myPublicPost = this.myPublicPost.filter(z => z.key != snapshot.key);
    },
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
      
      deleteButtonHandler(){
            this.userSelections.forEach((victimKey) => {
                AppDB.ref('public').child(store.getters.user).child(victimKey).remove();
            });
          
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