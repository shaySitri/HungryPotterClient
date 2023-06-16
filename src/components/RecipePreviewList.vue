<template>
  <div>

    <ul>
      <li v-for="r in recipes" :key="r.id">
        <recipe-preview :recipe="r"></recipe-preview>
      </li>
    </ul>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreviewPage.vue";
export default {
  name: "RecipeRandom",
  components: {
    RecipePreview
  },
  props: ['recipes'],
  // data() {
  //   return {
  //     recipes: []
  //   };
  // },
  mounted() {
    
  },
  // methods: {
  //   async updateRecipes() {
  //     try {
  //       const response = await this.axios.get(
  //         this.$root.store.server_domain + "/randomRecipes",
  //         // "https://test-for-3-2.herokuapp.com/recipes/random"
        
  //       );
  //       this.recipes = response.data.randRecipes;
  //     } catch (error) {

  //       console.log(error);
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
