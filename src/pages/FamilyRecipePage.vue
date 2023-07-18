<template>
    <div>
        <h1>FAMILY RECIPE!!!!!!</h1>
        <div class="title">{{ preview.title }}</div>
        <div class="ready">Ready in: {{ preview.readyInMinutes }} minutes <br></div>
        <table align="center">
          <tr>
              <th>
                <td v-show="preview.vegan">
                  <b-badge pill id=vegaanB >Vegan</b-badge>
                </td>
                <td v-show="preview.vegetarian">
                  <b-badge pill id=vegiB >Vegiterian</b-badge>
                </td>
                <td v-show="preview.glutenFree">
                  <b-badge pill id=glutenFree >Gluten Free</b-badge>
                </td>
                <td v-show="!preview.glutenFree">
                  <b-badge pill id=containGluten >Contain Gluten</b-badge>
                </td>
              </th> 
          </tr>
      </table>
       

        <img :src="preview.image" class="image" />        
        <div class="ingredients"> 
          <ul>
            <li v-for="ing in ingredients" :key="ing.name">
              {{ ing.name }}, {{ ing.quantity }}, {{ing.unit}}
            </li>
          </ul>
        </div>
        <div class="instructions"> 
          <ul>
            <li v-for="ins in instructions" :key="ins.id">
              {{ ins.step }}
            </li>
          </ul>
        </div>
        <div 
        class="opt"> optional: {{ optional }}</div>
      </div>
      
</template>

<script>
export default {
  name: "FamilyRecipePage",

  data() {
    return {
      ingredients: [],
      instructions: [],
      servings: 0,
      optional: "",
      preview: null,
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.server_domain + `/users/myRecipes/family/${this.$route.params.recipeId}`
        );
        // console.log(response.data,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.ingredients = response.data.ingredients;
      this.servings = response.data.servings;
      this.preview = response.data.recipeDetails;
      let _instructions = response.data.instructions;
      this.optional = response.data.optional;
      console.log(response.data)
      for (let i = 0; i < _instructions.length; i++)
      {
        this.instructions.push(
          {
            id: i + 1,
            step: _instructions[i]
          }
        )
      }


    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
}
.ready {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.opt {
  display: flex;
  justify-content: center;
  align-items: center;
  
}

h1 {
  text-align: center;
}


</style>
