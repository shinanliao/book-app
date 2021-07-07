<template>
  <div class="books-index">
    <h3>Search for Books:</h3>
    <form v-on:submit.prevent="findBook()">
      <input type="text" v-model="query" placeholder="Title or Author" />
      <br />
      <input type="text" v-model="genre" placeholder="Genre" />
      <br />
      <input type="submit" value="Find Book" />
    </form>
    <div v-for="book in books" v-bind:key="book.id">
      <span class="image">
        <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" v-bind:alt="book.title" />
      </span>
      <br />
      <p>Title: {{ book.volumeInfo.title }}</p>
      <p>Author: {{ book.volumeInfo.authors }}</p>
      <p>Description: {{ book.volumeInfo.description }}</p>
      <button v-on:click="addBooktoShelf(book)">Add to Bookshelf</button>
      <router-link tag="button" :to="`/books/${book.id}`">See More Information</router-link>
    </div>
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
    addBooktoShelf: function (book) {
      console.log("Book Object:", book);
      axios
        .post("/user_books", { google_books_api_id: book.id })
        .then((response) => {
          console.log("Successfully Added!", response.data);
          this.$router.push("/user_books");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
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
