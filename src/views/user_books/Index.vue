<template>
  <div class="user_books">
    <h2>My Bookshelf</h2>
    <div v-for="user_book in user_books" v-bind:key="user_book.id">
      <span class="image">
        <img v-bind:src="user_book.book.image" />
      </span>
      <br />
      <strong>Title:</strong>
      <p>{{ user_book.book.title }}</p>
      <strong>Comments:</strong>
      <p>{{ user_book.comments }}</p>
      <strong>Description:</strong>
      <p>{{ user_book.book.description }}</p>
    </div>
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
