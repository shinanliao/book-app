<template>
  <div class="user_books">
    <strong>My Bookshelf</strong>
    <div v-for="user_book in user_books" v-bind:key="user_book.id" />
    <p>{{ user_books }}</p>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user_books: [],
    };
  },
  created: function () {
    axios.get("/user_books").then((response) => {
      console.log(response.data);
      this.user_books = response.data;
    });
  },
  methods: {},

};
</script>
