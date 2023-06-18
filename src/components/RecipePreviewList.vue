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
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
