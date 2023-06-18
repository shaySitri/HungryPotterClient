<template>
<div>

    <form class="">
      <div class="form-group">

        <div >
          <input
          v-model="ing.name" id="name"
            type="text"
            placeholder="Enter ingredient name" :disabled="disable"
            />
            <br>             

          <input  type="number" min="1"  placeholder="Enter ingredient quantity" id="quantity"
          v-model="ing.quantity"   :disabled="disable"
          >

          <br>

          <select v-model="ing.unit" id="unit" type="text" :disabled="disable"
           >
                <option v-for="u in units" :key="u">{{ u }}</option>
            </select>

            <b-icon-plus-circle  scale="1.2" @click="submit()" v-show="!disable"></b-icon-plus-circle>    
            <b-icon-x-circle scale="1.2" @click="$emit('del-ing', index)"></b-icon-x-circle>  


        </div>
      </div>
    </form>

</div>
</template>

<script>
import { required, alpha, numeric, sameAs } from 'vuelidate/lib/validators'

export default {
    name: "Ingredient",
    props: ['index', 'ing'],
    data() {
    return {
    units: [],
    validationState: {
        name: false,
        quantity: false,
        unit: false,
      },
      disable: false,

    };
    },
  validations: {
    ing: {
    name:
    {
        required,
        alpha
    },
    quantity:
    {
        required,
        numeric
    },
    unit:
    {
        required,
    } 
  },
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
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('err')
      } else {
        this.disable = true;
        this.$emit('add-new-ing')
      }

    },

  }
}
</script>

<style>

</style>