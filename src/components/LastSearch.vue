<template >
    <div class="accordion" >

        <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="id" variant="outline-dark">  {{ name }}</b-button>
              </b-card-header>
              <b-collapse :id="id" accordion="my-accordion" role="tabpanel">
                <b-card-body v-if="type=='radio'" >
                  <b-form-radio-group @input="$emit('update',transfer)"
                    v-model="transfer"
                    :options="options"
                  ></b-form-radio-group>
                </b-card-body>
                <b-card-body v-else-if="type=='checkbox'">
                    <b-form-checkbox-group @input="$emit('update',transfer)"
                          v-model="transfer"
                          :options="options"
                        ></b-form-checkbox-group>

                </b-card-body>
              </b-collapse>
            </b-card>

    </div>
</template>
  
  <script>

  export default {
    name: "LastSearch",
    props:
    {
        name:
        {
            type: String,
            required: true
        },
        id:
        {
            type: String,
            required: true
        },
        type:
        {
            type: String,
            required: true
        },
        options:
        {
            type: Array,
            required: true
        }
    },
    data() {
    return {
      transfer: ""
      
      }
    },
    mounted()
    {
        this.queryData = JSON.parse(this.queryInfo)
    }
  }
  </script>

<style>
.accordion
{
    width: 30%
}
</style>
  