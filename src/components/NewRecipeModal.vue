<template>
    
    <div>

        <div>
        <b-button v-b-modal.modal-1 >Add New Recipe</b-button>
        <b-modal ref="modal" id="modal-1" title="Add New Recipe" hide-footer>
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
                    {{ index + 1 }}<input type="text" required v-model="inst.instruction">
                    <b-icon-plus-circle  scale="1.2" @click="addInstrction()" v-show="!disable"></b-icon-plus-circle>  
                    <b-icon-x-circle v-show="index==instructions.length-1" scale="1.2" @click="delInstruction(index)"></b-icon-x-circle>  

                </div>


                <br>
                <div v-show="type=='Family'">
                    Optional Description: <br>
                    <textarea  v-model="optionalDescription"></textarea>
                
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
    instructions: [{
        instruction: ""
    }],
    glutenFree: false,
    servings: "1",
    optionalDescription: " ",
    dangerAlert: false,
    currentInstruction: ""
    };
  },
  methods:
  {
    resetData() {
        this.type = "";
        this.title = "";
        this.readyInMintes = 30;
        this.image = "";
        this.vegan = false;
        this.vegeterian = false;
        this.ingredients = [{ name: "", unit: "", quantity: "" }];
        this.instructions = [{ instruction: "" }];
        this.glutenFree = false;
        this.servings = "1";
        this.optionalDescription = " ";
        this.dangerAlert = false;
        this.currentInstruction = "";
    },
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
        else{
            this.ingredients = [
            {
                name: "",
                unit: "",
                quantity: ""
            } ]
        }
    },

    addInstrction()
    {
        this.instructions.push({ instruction: "" });
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
        let recipeIngList = []
        for(let i=0;i< this.ingredients.length;i++){
            if(this.ingredients[i].name != "" && this.ingredients[i].quantity != "" && this.ingredients[i].unit != ""){
                recipeIngList.push (this.ingredients[i].name + "-" + this.ingredients[i].quantity + "-" + this.ingredients[i].unit)
            } 
        
        }
        recipeIng = recipeIngList.join(',')
        
        let instructionList = []
        for(let i=0; i< this.instructions.length;i++){
            instructionList.push(this.instructions[i].instruction)
        }
        let recipeInstructions = instructionList.join('^')
        try {
            const response = await this.axios.post(
            this.$root.store.server_domain + "/users/addRecipe", 
            {
                title: this.title,
                readyInMinutes: this.readyInMintes,
                image: this.image,
                vegan: this.vegan == false ? 0 : 1,
                vegetarian: this.vegetarian == false ? 0 : 1,
                glutenFree: this.glutenFree == false ? 0 : 1,
                ingredients: recipeIng,
                instructions: recipeInstructions,
                servings: this.servings,
                type: this.type,
                optionalDescription: this.optionalDescription
            }
            );

        if (response.status === 200) {
            this.$refs.modal.hide();
            this.resetData();
        }
        } catch (err) {
            console.log("RES", err.response);
            this.dangerAlert = true;
            
        }

    },
  },

};
</script>
    
<style>

</style>

