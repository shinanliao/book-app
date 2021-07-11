<template>
  <div class="books-show">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <article class="post">
              <div v-for="book in books" v-bind:key="book.id"></div>
              <div class="post-content text-center">
                <img :src="book.volumeInfo.imageLinks.thumbnail" alt="Image Not Available" class="img-fluid rounded" />
              </div>
              <h3 class="text-center mt-3 mb-8 pb-1 text">
                <p>{{ book.volumeInfo.title }} by {{ book.volumeInfo.authors[0] }}</p>
              </h3>
              <div class="blog-detail-description">
                <h6 class="text-left mt-0 mb-2 pb-2 text">
                  <p>{{ book.volumeInfo.description }}</p>
                </h6>
                <h6 class="text-left mt-2 mb-2 pb-1 text">
                  <b>{{ book.volumeInfo.categories[0] }}</b>
                </h6>
                <h6 class="text-left mt-2 mb-2 pb-1 text">
                  <b>{{ book.volumeInfo.pageCount }} pages</b>
                </h6>
              </div>
              <div class="form-group text-right">
                <button
                  v-on:click="addBooktoShelf()"
                  name="Delete"
                  type="submit"
                  id="submit"
                  class="btn btn-outline-custom"
                >
                  Add to Bookshelf
                </button>
              </div>
            </article>
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
