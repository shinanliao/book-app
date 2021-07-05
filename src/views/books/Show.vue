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
    <!-- <button v-on:click="addBooktoShelf()">Add</button> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      book: [],
    };
  },
  created: function () {
    axios.get(`/books/${this.$route.params.id}`).then((response) => {
      console.log("Book Object:", response.data);
      this.book = response.data;
    });
  },
  methods: {
    // addBooktoShelf: function () {
    //   axios.post("/user_books").then((response) => {
    //     console.log(response.data);
    //     this.$router.push("/users_books");
    //   });
    // },
  },
};
</script>
