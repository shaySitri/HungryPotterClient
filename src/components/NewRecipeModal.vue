<template>
    
    <div>

        <div>
        <b-button v-b-modal.modal-1>Add New Recipe</b-button>

        <b-modal id="modal-1" title="Add New Recipe">
            <form>
                Type:
                <b-form-select v-model="type" :options="typeOptions"></b-form-select> <br>
                Title:
                <b-form-input v-model="title" placeholder="Enter recipe title..."></b-form-input> <br>
                Ready in:
                <input v-model="readyInMintes" type="number" min="1" >
                Minutes <br>

                Image:
                <b-form-file accept="image/*" v-model="image"></b-form-file> <br>

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

                <!-- // @:new-ing="addIng($event)" :ingId="index" :ingredient="item" @del-ing="delIng($event) -->
                

                Instructions:

                Optional Description:

                



            </form>
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
    instructions: [],
    glutenFree: false,
    servings: "1",
    optionalDescription: "",
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

  }

};
</script>
    
<style>

</style>