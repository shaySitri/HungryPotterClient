<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <h1>{{ username }}</h1>
    <recipe-preview-list :recipes="randomRecipes" :favorites="this.userFavorites"></recipe-preview-list>    
    
    <div v-if="lastWatched">
      <recipe-preview-list :recipes="lastWatched" :favorites="this.userFavorites"></recipe-preview-list>
    </div>
    <div v-else>
      <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
      {{ !$root.store.username }}
  </div>

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
    userFavorites: [],
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
        let arrayWatched = response.data;
        this.lastWatched = arrayWatched;
    } catch (error) {

        console.log(error);
    }
    }, 
    async isFavorite() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/favorites");
        this.userFavorites = response.data;
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
