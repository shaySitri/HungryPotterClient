<template>
  <div class="container">
    <h1 class="title">{{  $root.store.shared_data.firstname }}'s favorite food spells!</h1>
    <table align="center" id="favoriteCol">  
        <recipe-preview-list :recipes="userFavorites" :user="username" ></recipe-preview-list>    
    </table>
  

</div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  components: {
    RecipePreviewList,
  },
  data(){
  return {
    username: "",
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
