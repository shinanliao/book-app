<template>
  <div id="app">
    <header id="topnav">
      <div class="container">
        <a href="#" class="logo-mobile"></a>
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
              <router-link to="/books" v-if="isLoggedIn()">
                Search for a Book
                <i class="mdi mdi-magnify noti-icon"></i>
              </router-link>
            </li>
            <li>
              <router-link to="/bookshelf" v-if="isLoggedIn()">My Bookshelf</router-link>
            </li>
            <li>
              <router-link :to="`/users/${userID()}`" v-if="isLoggedIn()">My Profile</router-link>
            </li>
            <li>
              <router-link to="/logout" v-if="isLoggedIn()">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div v-if="flashMessage" class="text-center">
      <br />
      <h6>
        <b>{{ flashMessage }}</b>
      </h6>
      <button v-on:click="flashMessage = ''" class="btn btn-outline-custom">Dismiss</button>
    </div>
    <router-view />
    <footer>
      <div class="copy-wrapper">
        <div class="container">
          <p class="copyright">Created by Shinan Liao</p>
          <ul class="socials right-socials">
            <li>
              <a href="https://github.com/shinanliao"><i class="mdi mdi-git"></i></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/shinanl/"><i class="mdi mdi-linkedin"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
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
