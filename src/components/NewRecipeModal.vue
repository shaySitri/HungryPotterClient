<template>
    
    <div>

        <div>
        <b-button v-b-modal.modal-1 >Add New Recipe</b-button>
        <b-modal id="modal-1" title="Add New Recipe" hide-footer>
            <form>
                Type:
                <b-form-select v-model="type" :options="typeOptions"></b-form-select> <br>
                Title:
                <b-form-input v-model="title" placeholder="Enter recipe title..."></b-form-input> <br>
                Ready in:
                <input v-model="readyInMintes" type="number" min="1" >
                Minutes <br>

                Image Url:
                <input v-model="image" type="text" >  <br>

                Servings: 
                <input v-model="servings" type="number" min="1" >  <br>


                <input type="checkbox" id="vegan" :value="!vegan" v-model="vegan">
                <label for="vegan">  Vegan </label> <br>

                <input type="checkbox" id="vegiterian" :value="!vegeterian" v-model="vegeterian">
                <label for="vegiterian"> Vegiterian </label> <br>

                <input type="checkbox" id="glutenFree" :value="!glutenFree" v-model="glutenFree">
                <label for="glutenFree"> Gluten Free </label> <br>


                <div v-for="(item, i) in ingredients" :key="item">
                    <ingredient :ing='item' :index="i"
                    @add-new-ing="addNewIng($event)" @del-ing="delIng($event)"> </ingredient>
                </div>
                

                Instructions:
                <div v-for="(inst,index) in instructions" :key="inst">
                    {{ index + 1 }}<input type="text" required>
                    <b-icon-plus-circle  scale="1.2" @click="addInstrction()" v-show="!disable"></b-icon-plus-circle>  
                    <b-icon-x-circle v-show="index==instructions.length-1" scale="1.2" @click="delInstruction(index)"></b-icon-x-circle>  

                </div>


                <br>
                <div v-show="type=='Family'">
                    Optional Description: <br>
                    <textarea></textarea>
                
                </div>
            </form>
            
            <div>
                <b-button @click="addRecipe()">Add Recipe</b-button>
            </div>

            <b-alert show variant="danger" v-show="dangerAlert">Danger Alert</b-alert>

        </b-modal>
        </div>

</div>


</template>

<script>
import Ingredient from "./Ingredient.vue"
export default {
    name: "NewRecipeModal",
    components:
    {
        Ingredient,
    },
    data() {
    return {
    type: "",
    typeOptions: ["Private","Family"],
    title: "",
    readyInMintes: 30,
    image: "",
    vegan: false,
    vegeterian: false,
    ingredients: [
        {
            name: "",
            unit: "",
            quantity: ""
        }
    
    ],
    instructions: [" "],
    glutenFree: false,
    servings: "1",
    optionalDescription: "",
    dangerAlert: false
    };
  },
  methods:
  {
    addNewIng()
    {
        this.ingredients.push
        (
            {
                name: "",
                quantity: "",
                unit: ""
            }
        )
    },
    delIng(index)
    {        
        // find index
        if (this.ingredients.length > 1)
        {
            this.ingredients.splice(index , 1);
        }
    },

    addInstrction()
    {
        this.instructions.push("")
    },
    delInstruction(index)
    {        
        // find index
        if (this.instructions.length > 1)
        {
            this.instructions.splice(index , 1);
        }
    },
    async addRecipe()
    {
        let recipeIng = ""
        for (let i = 0; i < this.ingredients.length - 1; i++)
        {  
            let ing = this.ingredients.at(i)
            recipeIng = recipeIng + ing.name + "-" + ing.quantity + "-" + ing.unit
            if (i != this.ingredients.length - 1)
            {
                recipeIng = recipeIng + ","
            }
        }
        
        let recipeInstructions = this.instructions.join('-')
        try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/addRecipe", 
          {
            title: this.title,
            readyInMinutes: this.readyInMintes,
            image: this.image,
            vegan: this.vegan,
            vegeterian: this.vegeterian,
            glutenFree: this.glutenFree,
            ingredients: recipeIng,
            instructions: recipeInstructions,
            servings: this.servings,
            type: this.type,
            optionalDescription: this.optionalDescription
          }
          );
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.dangerAlert = true
        
      }

    },
  }

};
</script>
    
<style>

</style>