<template>
  <div class="books-show">
    <h3>{{ book.title }}</h3>
    <div v-for="book in books" v-bind:key="book.id"></div>
    <img :src="book.volumeInfo.imageLinks.thumbnail" alt="Image Not Available" />
    <br />
    <button v-on:click="addBooktoShelf()">Add</button>
    <p>Authors: {{ book.volumeInfo.authors }}</p>
    <p>Description: {{ book.volumeInfo.description }}</p>
    <p>Pages: {{ book.volumeInfo.pageCount }}</p>
    <p>Subject: {{ book.volumeInfo.categories }}</p>
    <p>Rating: {{ book.volumeInfo.averageRating }}</p>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      book: [],
      books: [],
    };
  },
  created: function () {
    axios.get(`/books/${this.book.id}`).then((response) => {
      console.log("Book Object:", response.data);
      this.book = response.data;
    });
  },
  methods: {
    addBooktoShelf: function () {
      axios.post("/user_books").then((response) => {
        console.log(response.data);
        this.$router.push("/users_books");
      });
    },
  },
};
</script>