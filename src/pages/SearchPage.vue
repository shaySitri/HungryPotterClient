<template>
  <div>
    <h>Search Page</h>

    <input v-model="query" type="input" />
    <div>{{ query }}</div>
    <div>Selected: {{ numOfRes }}</div>

    <select v-model="numOfRes">
      <option>5</option>
      <option>10</option>
      <option>15</option>
    </select>
    
    <b-button v-b-toggle.collapse-1 variant="primary">Choose Cusine</b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <b-form-group
      label="Chose the cuisines you want to filter with"
      v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="cuisine"
            :options="filters.cuisine"
            :aria-describedby="ariaDescribedby"
            name="cuisine-choose"
          ></b-form-checkbox-group>
        </b-form-group>
    </b-card>
  </b-collapse>


  <b-button v-b-toggle.collapse-2 variant="primary">Choose Diet</b-button>
    <b-collapse id="collapse-2" class="mt-2">
      <b-card>
        <b-form-group
      label="Chose the diet you want to filter with"
      v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="diet"
            :options="filters.diet"
            :aria-describedby="ariaDescribedby"
            name="cuisine-choose"
          ></b-form-checkbox-group>
        </b-form-group>
    </b-card>
  </b-collapse>

  <b-button v-b-toggle.collapse-3 variant="primary">Choose Intolerances</b-button>
    <b-collapse id="collapse-3" class="mt-2">
      <b-card>
        <b-form-group
      label="Chose the diet you want to filter with"
      v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="intolerance"
            :options="filters.intolerance"
            :aria-describedby="ariaDescribedby"
            name="cuisine-choose"
          ></b-form-checkbox-group>
        </b-form-group>
    </b-card>
  </b-collapse>


  <select v-model="sort">
      <option>Popularity</option>
      <option>Time</option>
    </select>

    <button @click="search" :disabled="!query"> Search </button>

    <div>
      <recipe-preview-list :recipes="results"></recipe-preview-list>
      <div v-if="noRes">
        No Results Found.
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  name: "Search",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      query: "",
      numOfRes: "",
      cuisine: "",
      diet: "",
      intolerance: "",
      sort: "",
      filters: "",
      results: [],
      noRes: false
      }
    },
    mounted()
    {
      this.setFilters()
    },
    methods: {
      setFilters: async function()
      {
        try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/getFilters",        
        );
        
        this.filters = response.data;
        
        
      } catch (error) {

        console.log(error);
      }
      },
      search: async function()
      {
        this.noRes = false;
        let request =
        {
          query: this.query,
              cuisine: this.cuisine.toString(),
              diet: this.diet.toString(),
              intolerances: this.intolerance.toString(),
              number: this.numOfRes,
              sort: this.sort
        }
        console.log(request)
          try {
          const response =  await this.axios.get(this.$root.store.server_domain + "/search",{
          params:
          {
              query: this.query,
              cuisine: this.cuisine.toString(),
              diet: this.diet.toString(),
              intolerances: this.intolerance.toString(),
              number: this.numOfRes,
              sort: this.sort
          }}
          );

          this.results = response.data;
          
          if (this.results.length == 0)
          {
            this.noRes = true
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      
    },
  } 

</script>

<style>

</style>