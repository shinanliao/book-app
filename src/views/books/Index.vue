<template>
  <div class="books-index">
    <h3>Search for Books:</h3>
    <form v-on:submit.prevent="findBook()">
      Title:
      <input type="text" v-model="query" />
      <button v-on:click="findBook()">Find Book</button>
      <div v-for="book in books" v-bind:key="book.id">
        <p>{{ book.volumeInfo.title }} </p>
        <p>{{ book.volumeInfo.authors }} </p>

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
