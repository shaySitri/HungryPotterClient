<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <h1>LOOOOK AT MEEEE{{ username }}</h1>

    <table align="left" id="randomCol">
      <h> <b> Explore the spells... </b></h>
        <recipe-preview-list :recipes="randomRecipes" :user="username" ></recipe-preview-list>  
        <b-icon-arrow-repeat font-scale="5" animation="cylon" @click="random()"></b-icon-arrow-repeat>
  
    </table>
    <table align="right">
        <div v-if="username">
      <recipe-preview-list :user="username" :recipes="lastWatched" ></recipe-preview-list>
        </div>
        <div v-else>
          <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        </div>
    </table>
    

  <button @click="show"> Add Recipe </button>
    <new-recipe-modal v-show="showAddRecipe"></new-recipe-modal>
  

</div>
</template>

<script>
import NewRecipeModal from '../components/NewRecipeModal.vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  components: {
    RecipePreviewList,
    NewRecipeModal,
  },
  name: "Login",
  data(){
  return {
    username: "",
    randomRecipes: "",
    lastWatched: "",
    showAddRecipe: false,
    };
  },
mounted()
{
  if (this.$root.store.shared_data.username != "")
  {
    this.username = this.$root.store.shared_data.username
    this.getLastWatched();
  }
  this.random()
  this.isFavorite()

},
methods:
{
    async random() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/randomRecipes");
        
        let arrayRecipes = response.data.randRecipes;
        this.randomRecipes = arrayRecipes;
    } catch (error) {

        console.log(error);
    }
    },
    async getLastWatched() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/lastViews");
        // this.allWtached = response.data;
        console.log(response)
        this.lastWatched = response.data.reverse().splice(-3).reverse();
    } catch (error) {

        console.log(error);
    }
    }, 

    show: function()
    {
        this.showAddRecipe = !this.showAddRecipe 
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
