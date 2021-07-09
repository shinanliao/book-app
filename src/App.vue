<template>
  <div id="app">
    <header id="topnav">
      <div class="container">
        <a href="#" class="logo-mobile">
          <img src="images/logo.png" alt="logo" />
        </a>
        <div class="menu-extras">
          <div class="menu-item">
            <!-- Mobile menu toggle-->
            <a class="navbar-toggle">
              <div class="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
            <!-- End mobile menu toggle-->
          </div>
        </div>

        <div id="navigation">
          <!-- Navigation Menu-->
          <ul class="navigation-menu">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/login" v-if="!isLoggedIn()">Login</router-link>
            </li>
            <li>
              <router-link to="/signup" v-if="!isLoggedIn()">Signup</router-link>
            </li>
            <li>
              <router-link :to="`/users/${userID()}`" v-if="isLoggedIn()">My Profile</router-link>
            </li>
            <li>
              <router-link to="/user_books" v-if="isLoggedIn()">My Bookshelf</router-link>
            </li>
            <li>
              <router-link to="/books" v-if="isLoggedIn()">
                Search for a Book
                <i class="mdi mdi-magnify noti-icon"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/logout" v-if="isLoggedIn()">Logout</router-link>
            </li>
          </ul>
          <!-- End navigation menu-->
        </div>
      </div>
    </header>
    <div v-if="flashMessage">
      {{ flashMessage }}
      <button v-on:click="flashMessage = ''">Dismiss</button>
    </div>
    <router-view />
  </div>
</template>

<style></style>

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
