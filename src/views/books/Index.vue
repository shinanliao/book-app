<template>
  <div class="books-index">
    <h3>Search for Books:</h3>
    <form v-on:submit.prevent="findBook()">
      Title:
      <input type="text" v-model="title" />
      <br />
      Author:
      <input type="text" v-model="author" />
      <br />
      Genre:
      <input type="text" v-model="genre" />
      <br />
      <button v-on:click="findBook()">Find Book</button>
      <div v-for="book in books" v-bind:key="book.id">
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      title: "",
      author: "",
      genre: "",
      books: [],
    };
  },
  methods: {
    findBook: function () {
      axios.get("/books").then((response) => {
        console.log(response.data);
        this.books = response.data;
      });
    },
  },
};
</script>