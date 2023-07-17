<template>
  <div class="searchDiv">

    <h1  class="title">Search Page</h1>
    <br>

    <div>
    <br>
      <div align="center">
        <b-list-group>
          <div id="search">
            <b-list-group-item>
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="search" placeholder="Find a spell..." v-model="query" id="queryInput"></b-form-input>
                <b-button variant="outline-primary" @click="lastSearch">Last Search</b-button>
              </b-input-group>
            </b-list-group-item>
        </div>

          <b-list-group-item>
            <last-search name="Cuisines" id="cuisines" type="checkbox" :options="filters.cuisine" @update="(res) => cuisines = res"></last-search>
          </b-list-group-item>

          <b-list-group-item>
            <last-search name="Diet" id="diet" type="checkbox" :options="filters.diet" @update="(res) => diet = res"></last-search>
          </b-list-group-item>


          <b-list-group-item>
            <last-search name="Intolerances" id="intolerances" type="checkbox" :options="filters.intolerance" @update="(res) => intolerance = res"></last-search>
          </b-list-group-item>

          <b-list-group-item>
            <last-search name="Sort By" id="sort" type="radio" :options="sortOptions" @update="(res) => sort = res"></last-search>
          </b-list-group-item>

          <b-list-group-item>
            <last-search name="Result" id="result" type="radio" :options="resOptions" @update="(res) => numOfRes = res"></last-search>
          </b-list-group-item>
        </b-list-group>

      </div>

    <br>

    






    <br>
    <b-button pill variant="outline-success" @click="search" :disabled="!query">Search</b-button>
    <br>
    <div align="center">
      <br>
      <recipe-preview-list :recipes="results" :user="user"></recipe-preview-list>
      <div v-if="noRes">
        No Results Found.
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import LastSearch from '../components/LastSearch.vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  name: "Search",
  components: {
    RecipePreviewList,
    LastSearch
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
      user: "",
      lastSearchQuery : "",
      sortOptions: [
          { text: 'Time', value: 'time' },
          { text: 'Popularity', value: 'popularity' },
      ],
      resOptions: [
          { text: '5', value: '5' },
          { text: '10', value: '10' },
          { text: '15', value: '15' }
      ]
      
      }
    },
    mounted()
    {
      this.setFilters()
      this.user = this.$root.store.shared_data.username;
      this.lastSearchQuery = JSON.parse(this.$root.store.shared_data.lastsearch);
      this.queryData = JSON.parse(this.queryInfo)
    
    },

    methods: {
      setRes(newRes) {
        console.log(newRes)
        this.numOfRes = newRes
      },
      lastSearch()
      {
        console.log("DNE")
        this.query = this.lastSearchQuery.query
        this.cuisine = this.lastSearchQuery.cuisine
        this.nunOfRes = this.lastSearchQuery.numOfRes
        this.diet = this.lastSearchQuery.diet
        this.intolerance = this.lastSearchQuery.intolerances
      },
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
        
        let queryParams = 
        {
          query: this.query,
          cuisine: this.cuisine.toString(),
          diet: this.diet.toString(),
          intolerances: this.intolerance.toString(),
          number: this.numOfRes,
          sort: this.sort.toLowerCase()
        }


        try {
        const response =  await this.axios.get(this.$root.store.server_domain + "/search",{
          params:
          queryParams
        }
        );


        
        this.$root.store.shared_data.search(JSON.stringify(queryParams));
        
        this.query = ""
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
  //   makeToast(append = false) {
  //       this.toastCount++
  //       this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
  //         title: 'BootstrapVue Toast',
  //         autoHideDelay: 5000,
  //         appendToast: append
  //       })
  // },
} 

</script>

<style>
.searchDiv
{
  text-align: center;
}
#search
{
  width: 30%;
  align-content: center;
}
.accordion 
{
  width: 30%;
}

#queryInput
{
  text-align: center;
}

</style>