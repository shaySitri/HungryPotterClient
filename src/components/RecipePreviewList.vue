<template>
  <div>
    <ul>
      <li v-for="r in recipes" :key="r.id">
        <recipe-preview :recipe="r" :favorite="isFavorite(r.id)"></recipe-preview>
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
  methods:
  {
    isFavorite(recipeid) { 
      if (this.favorites.length != 0)
      {
        return this.favorites.includes(recipeid)
      }
      else
      {
        return false
      }
    }
  },
  props: ['recipes','favorites'],
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
