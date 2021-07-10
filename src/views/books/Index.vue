<template>
  <div class="books-index">
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Content-->
          <div class="col-8">
            <!-- Post-->
            <article class="post">
              <ul>
                <li class="error" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <h3 class="text-center mt-0 mb-5 pb-3 text-uppercase"><b>Search for a Book</b></h3>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <input class="form-control" placeholder="Title or Author" type="text" v-model="query" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <input class="form-control" placeholder="Genre" type="text" v-model="genre" />
                  </div>
                </div>
              </div>
              <div class="form-group text-right">
                <button v-on:click="findBook()" name="Search" type="submit" id="Search" class="btn btn-outline-custom">
                  Search
                </button>
              </div>
              <form action="#" method="post" class="mt-4">
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
              </form>
            </article>
            <!-- Post end-->
          </div>
          <!-- Content end-->
        </div>
      </div>
      <!-- end container -->
    </section>
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
