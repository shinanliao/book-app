<template>
  <div class="books-index">
    <h3>Search for Books:</h3>
    <form v-on:submit.prevent="findBook()">
      Search:
      <br />
      <input type="text" v-model="query" placeholder="Title or Author" />
      <br />
      <input type="text" v-model="genre" placeholder="Genre" />
      <br />
      <button v-on:click="findBook()">Find Book</button>
      <div v-for="book in books" v-bind:key="book.id">
        <span class="image">
          <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" v-bind:alt="book.title" />
        </span>
        <br />
        <p>Title: {{ book.volumeInfo.title }}</p>
        <p>Author: {{ book.volumeInfo.authors }}</p>
        <p>Description: {{ book.volumeInfo.description }}</p>
        <router-link tag="button" :to="`/books/${book.id}`">See More Information</router-link>
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
      genre: "",
      books: [],
    };
  },
  methods: {
    findBook: function () {
      axios.get(`/books?query=+subject:${this.genre}`).then((response) => {
        console.log("Books", response.data);
        this.books = response.data;
      });
      axios.get(`/books?query=${this.query}`).then((response) => {
        console.log("Books", response.data);
        this.books = response.data;
      });
    },
  },
};
</script>
