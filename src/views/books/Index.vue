<template>
  <div class="books-index">
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8">
            <article class="post">
              <ul>
                <li class="error" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <h3 class="text-center mt-0 mb-5 pb-3 text-uppercase"><b>Search for a Book</b></h3>
              <div class="form-group text-center">
                <input class="form-control" placeholder="Title or Author" type="text" v-model="query" />
              </div>

              <div class="form-group text-center">
                <input class="form-control" placeholder="Genre" type="text" v-model="genre" />
              </div>

              <div class="form-group text-center">
                <button v-on:click="findBook()" name="Search" type="submit" id="Search" class="btn btn-outline-custom">
                  Search
                </button>
              </div>
            </article>
            <section class="section">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10">
                    <article class="post">
                      <div class="text-center post-header">
                        <div v-for="book in books" v-bind:key="book.id">
                          <form v-on:submit.prevent="addBooktoShelf(book)" method="post" class="mt-4">
                            <span class="image">
                              <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" v-bind:alt="book.title" />
                            </span>
                            <br />
                            <h3 class="text-center mt-3 mb-2 pb-2 text">
                              <b>{{ book.volumeInfo.title }}</b>
                            </h3>
                            <h5 class="text-center mt-0 mb-2 pb-2 text">
                              <b>by {{ book.volumeInfo.authors[0] }}</b>
                            </h5>
                            <h6 class="text-left mt-0 mb-2 pb-3 text">
                              {{ book.volumeInfo.description }}
                            </h6>
                            <div class="form-group text-center">
                              <button name="submit" type="submit" id="submit" class="btn btn-outline-custom">
                                Add to Bookshelf
                              </button>
                            </div>
                            <div class="form-group text-center">
                              <router-link tag="button" :to="`/books/${book.id}`" class="btn btn-outline-custom">
                                See More Information
                              </router-link>
                            </div>
                            <br />
                          </form>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
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
          this.$router.push("/bookshelf");
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
