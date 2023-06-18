<template>
<div>

    <!-- @change="emit('updateIngredient', name, quantity, unit)"
  <b-input-group prepend="Ingredient" class="mb-2">
    <input v-model="ingredient.name">
    <input v-model="ingredient.quantity" type="number" min="1" >
  </b-input-group>
    <b-icon-plus-circle @click="$emit('new-ing',ingredient)" scale="1.2"></b-icon-plus-circle>    
    <b-icon-x-circle scale="1.2" @click="clearIng" v-show="this.ingId == this.totalIng"></b-icon-x-circle> -->

    <form class="">
      <div class="form-group">
        <div >
          <input
          v-model="ing.name"
            type="text"
            placeholder="Enter ingredient name"
          />
            <br>             

          <input  type="number" min="1"  placeholder="Enter ingredient quantity"
          v-model="ing.quantity">

          <br>

          <select v-model="ing.unit" id="unit" type="text">
                <option v-for="u in units" :key="u">{{ u }}</option>
            </select>
            <!-- @click="$emit('new-ing', ingredient.name, ingredient.quantity, ingredient.unit)" 
            @click="$emit('del-ing', ingId)  " -->
            <b-icon-plus-circle  scale="1.2" @click="$emit('add-new-ing')"></b-icon-plus-circle>    
            <b-icon-x-circle scale="1.2" @click="$emit('del-ing', index)"></b-icon-x-circle>  



        </div>
      </div>
    </form>

</div>
</template>

<script>
export default {
    name: "Ingredient",
    props: ['index', 'ing'],
    data() {
    return {
    units: [],
    };
  },

  mounted()
  {
    this.setUnit();
  },
  methods: {
    setUnit: async function()
      {
        try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/getUnits",        
        );
        
        this.units = response.data;
        
        
      } catch (error) {

        console.log(error);
      }
      

    },
    newIng()
    {
        this.$emit('new-ing',ingredient)
    },

  },

}
</script>

<style>

</style>