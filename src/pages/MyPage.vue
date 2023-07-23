<template>
  <div class="container">
    <h1 class="title">{{  $root.store.shared_data.firstname }}'s food spells!</h1>

    <table align="center" id="myCol">  
        <recipe-preview-list :recipes="userRecipes" :user="username" ></recipe-preview-list>    
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
    userRecipes: [],
    };
  },
mounted()
{
  if (this.$root.store.shared_data.username != "")
  {
    this.username = this.$root.store.shared_data.username
  }
  this.myRecipes()
},
methods:
{
    async myRecipes() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/myRecipes");
        this.userRecipes = response.data;

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
