<template>
  <div class="books-index">
    <h3>Search for Books:</h3>
    <form v-on:submit.prevent="findBook()">
      Search:
      <input type="text" v-model="query" placeholder="Title or Author"/>
      <br />
      <button v-on:click="findBook()">Find Book</button>
      <div v-for="book in books" v-bind:key="book.id">
        <span class="image">
        <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" v-bind:alt="book.name" />
      </span>
      <br />
        <p>Title: {{ book.volumeInfo.title }}</p>
        <p>Author: {{ book.volumeInfo.authors }}</p>
        <p>Description: {{ book.volumeInfo.description }}</p>
        <p>Pages: {{ book.volumeInfo.pageCount }}</p>
        <p>Subject: {{ book.volumeInfo.categories }}</p>
      </div>
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      query: "",
      books: [],
    };
  },
  methods: {
    findBook: function () {
      axios.get(`/books?query=${this.query}`).then((response) => {
        console.log("Books", response.data);
        this.books = response.data;
      });
    },
  },
};
</script>
