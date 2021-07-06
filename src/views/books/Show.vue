<template>
  <div class="books-show">
    <div v-for="book in books" v-bind:key="book.id"></div>
    <img :src="book.volumeInfo.imageLinks.thumbnail" alt="Image Not Available" />
    <br />
    <h3>{{ book.volumeInfo.title }}</h3>
    <p>Authors: {{ book.volumeInfo.authors }}</p>
    <p>Description: {{ book.volumeInfo.description }}</p>
    <p>Pages: {{ book.volumeInfo.pageCount }}</p>
    <p>Subject: {{ book.volumeInfo.categories }}</p>
    <button v-on:click="addBooktoShelf()">Add to Bookshelf</button>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      book: {},
      errors: [],
      newBookParam: {},
    };
  },
  created: function () {
    axios.get(`/books/${this.$route.params.id}`).then((response) => {
      console.log("Book Object:", response.data);
      this.book = response.data;
    });
  },
  methods: {
    addBooktoShelf: function () {
      this.newBookParam.google_books_api_id = this.$route.params.id;
      axios
        .post("/user_books", this.newBookParam)
        .then((response) => {
          console.log("Successfully Added!", response.data);
          this.$router.push("/user_books");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
