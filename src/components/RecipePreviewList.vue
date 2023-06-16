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
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/randomRecipes",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        
        );

        // const response = 
        // [
        //   { "id": 658947, "title": "S'mores-n-berry Bars for National S'mores Day - August 10", "readyInMinutes": 45, "image": "https://spoonacular.com/recipeImages/658947-556x370.jpg", "popularity": 12, "vegan": false, "vegetarian": false, "glutenFree": false },
        //   { "id": 636212, "title": "Broccoli Rabe with Tomatoes, Anchovies & Spaghetti", "readyInMinutes": 45, "image": "https://spoonacular.com/recipeImages/636212-556x370.jpg", "popularity": 6, "vegan": false, "vegetarian": false, "glutenFree": false },
        //   { "id": 642594, "title": "Farfalle with Shrimps, Tomatoes Basil Sauce", "readyInMinutes": 45, "image": "https://spoonacular.com/recipeImages/642594-556x370.jpg", "popularity": 9, "vegan": false, "vegetarian": false, "glutenFree": false }

        // ]
        console.log("GOT IN")
        //const recipes = response.data.randRecipes;  
        // this.recipes = response;
        this.recipes = response.data.randRecipes;
        console.log("THIS", this.recipes);
      } catch (error) {

        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
