<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/books" v-if="isLoggedIn()">Search for a Book</router-link>
      |
      <router-link to="/signup" v-if="!isLoggedIn()">Signup</router-link>
      |
      <router-link to="/login" v-if="!isLoggedIn()">Login</router-link>
      |
      <router-link :to="`/users/${userID()}`" v-if="isLoggedIn()">My Profile</router-link>
      |
      <router-link to="/user_books" v-if="isLoggedIn()">My Bookshelf</router-link>
      |
      <router-link to="/logout" v-if="isLoggedIn()">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

<script>
export default {
  data: function () {
    return {
      flashMessage: "",
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    userID: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
