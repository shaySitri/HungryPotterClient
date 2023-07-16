<template>
  <div class="container">
    <h1 class="title">Favorite Page</h1>
    <h1>{{ username }}'s favorite food spells!</h1>

    <!-- randomCol -->
    <table align="center" id="favoriteCol">  
      <h> <b> favvvvvvvvvv... </b></h>
        <recipe-preview-list :recipes="userFavorites" :user="username" ></recipe-preview-list>  
        <!-- <b-icon-arrow-repeat font-scale="5" animation="cylon" @click="isFavorite()"></b-icon-arrow-repeat> -->
  
    </table>
    <!-- <table align="right">
        <div v-if="username">
      <recipe-preview-list :user="username" :recipes="lastWatched" ></recipe-preview-list>
        </div>
        <div v-else>
          <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        </div> -->
    <!-- </table> -->
    

  <!-- <button @click="show"> Add Recipe </button>
    <new-recipe-modal v-show="showAddRecipe"></new-recipe-modal> -->
  

</div>
</template>

<script>
// import NewRecipeModal from '../components/NewRecipeModal.vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  components: {
    RecipePreviewList,
    // NewRecipeModal,
  },
//   name: "Login",
  data(){
  return {
    username: "",
    // randomRecipes: "",
    // lastWatched: "",
    // showAddRecipe: false,
    userFavorites: [],
    };
  },
mounted()
{
  if (this.$root.store.shared_data.username != "")
  {
    this.username = this.$root.store.shared_data.username
  }
  this.isFavorite()

},
methods:
{
    // async random() {
    // try {
    //     const response = await this.axios.get(
    //     this.$root.store.server_domain + "/randomRecipes");
        
    //     let arrayRecipes = response.data.randRecipes;
    //     this.randomRecipes = arrayRecipes;
    // } catch (error) {

    //     console.log(error);
    // }
    // },
    // async getLastWatched() {
    // try {
    //     const response = await this.axios.get(
    //     this.$root.store.server_domain + "/users/lastViews");
    //     // this.allWtached = response.data;
    //     this.lastWatched = response.data.reverse().splice(-3);
    // } catch (error) {

    //     console.log(error);
    // }
    // }, 
    async isFavorite() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/favorites");
        let resFavorite = response.data;
        for (let i=0; i<resFavorite.length; i++){
          this.userFavorites.push(resFavorite[i].preview);
        }
    } catch (error) {

        console.log(error);
    }
    // }, 
    // show: function()
    // {
    //     this.showAddRecipe = !this.showAddRecipe 
    }

}
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

</style>
