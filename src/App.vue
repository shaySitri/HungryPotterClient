<template>
  <div id="app">
    
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info" >
      <b-navbar-brand href="#">Hungrry Potter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link :to="{ name: 'main' }">Food Spells</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'about' }">About</router-link></b-nav-item>

        <b-nav-item-dropdown text="Personal Zone" right v-show="$root.store.shared_data.username">
          <b-dropdown-item><router-link :to="{ name: 'myRecipes' }">My Food Spells</router-link></b-dropdown-item>
          <b-dropdown-item><router-link :to="{ name: 'family' }">Family Food Spells</router-link></b-dropdown-item>
          <b-dropdown-item><router-link :to="{ name: 'favorite' }">Favorite Spells</router-link></b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>


      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form right v-show="!$root.store.shared_data.username">
        Hey Muggle! 
        <login-nav-bar></login-nav-bar>
        <b-nav-item><router-link :to="{ name: 'register' }">Register</router-link></b-nav-item>
        </b-nav-form>
 

        <b-nav-item-dropdown right v-show="$root.store.shared_data.username">
        <!-- Using 'button-content' slot -->
        <template #button-content>
        <em>Hey {{ $root.store.shared_data.firstname}}</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="Logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        

      </b-navbar-nav>
</b-collapse>
</b-navbar>
</div>
<router-view />
  </div>
</template>

<script>
import LoginNavBar from './components/LoginNavBar.vue';

export default {
  name: "App",
  components:
  {
    LoginNavBar
  },
  methods: {
    Logout() {
      this.$root.store.shared_data.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      location.reload();

    },

  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  font-size: larger;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
