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
              <a href="index.html">Home</a>
            </li>

            <li class="has-submenu">
              <a href="#">Features</a>
            </li>

            <li>
              <a href="javascript:void(0);">Lifestyle</a>
            </li>
            <li>
              <a href="javascript:void(0);">Travel</a>
            </li>
            <li>
              <a href="javascript:void(0);">Music</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="toggle-search" data-target="#search-wrap">
                <i class="mdi mdi-magnify noti-icon"></i>
              </a>
            </li>
          </ul>
          <!-- End navigation menu-->
        </div>
      </div>
    </header>
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
