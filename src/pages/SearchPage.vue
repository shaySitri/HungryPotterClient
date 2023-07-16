<template>
  <div class="searchDiv">

    <h1  class="title">Search Page</h1>
    <br>

    <div>
     
    <input v-model="query" type="input" placeholder="Find a spell..."/> <br>

    <br>
      <div align="center">
        <div class="accordion" role="tablist" >
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="outline-dark">Cuisines</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-form-checkbox-group
                        v-model="cuisine"
                        :options="filters.cuisine"
                        :aria-describedby="ariaDescribedby"
                        name="cuisine-choose"
                      ></b-form-checkbox-group>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="outline-dark">Diet</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-form-checkbox-group
                        v-model="diet"
                        :options="filters.diet"
                        :aria-describedby="ariaDescribedby"
                        name="cuisine-choose"
                      ></b-form-checkbox-group>

              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="outline-dark">Intolerances</b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-form-checkbox-group
                        v-model="intolerance"
                        :options="filters.intolerance"
                        :aria-describedby="ariaDescribedby"
                        name="cuisine-choose"
                      ></b-form-checkbox-group>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

      </div>

    <br>

    
  <div id="sort">
    Sort by:
    <select v-model="sort">
      <option>Popularity</option>
      <option>Time</option>
    </select>
  </div>

  <div id="results">
    Results:
    <select v-model="numOfRes">
      <option>5</option>
      <option>10</option>
      <option>15</option>
    </select>
  </div>


  

    <br>
    <button @click="search" :disabled="!query"> Search </button>

    <div>
      <recipe-preview-list :recipes="results"></recipe-preview-list>
      <div v-if="noRes">
        No Results Found.
      </div>
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
      noRes: false,
      
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
.searchDiv
{
  text-align: center;
}

.accordion 
{
  width: 60%;
}


</style>