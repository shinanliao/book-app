<template>
  <div class="user_books">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-10">
            <article class="post">
              <h1 class="text-center mt-0 mb-4 pb-5 text">My Bookshelf</h1>
              <div v-for="user_book in user_books" v-bind:key="user_book.id">
                <form v-on:submit.prevent="editUserBook(user_book)">
                  <ul>
                    <li class="error" v-for="error in errors" v-bind:key="error">
                      {{ error }}
                    </li>
                  </ul>
                  <div class="post-content text-center">
                    <span class="image">
                      <img v-bind:src="user_book.book.image" />
                    </span>
                  </div>
                  <h4 class="text-center mt-3 mb-8 pb-1 text">
                    {{ user_book.book.title }}
                  </h4>
                  <h6 class="text-left mt-3 mb-8 pb-6 text">
                    <b>{{ user_book.book.description }}</b>
                  </h6>
                  <div class="post-content text-center">
                    <label for="checkbox">
                      <h6 class="text-center mt-3 mb-6 pb-1 text">
                        {{ message }}
                      </h6>
                    </label>
                    <input
                      type="checkbox"
                      id="checkbox"
                      class="checkbox"
                      v-model="user_book.have_read"
                      v-on:click="updateHaveRead(user_book)"
                    />
                    <h6 class="text-left mt-1 mb-2 pb-1 text">
                      <b>My thoughts on {{ user_book.book.title }}:</b>
                    </h6>
                    <h6 class="text-left mt-2 mb-1 pb-4 text">{{ user_book.comments }}</h6>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <textarea
                          id="comment"
                          class="form-control"
                          rows="2"
                          placeholder="Book Comments"
                          v-model="user_book.comments"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group text-right">
                        <button name="submit" type="submit" id="submit" class="btn btn-outline-custom">
                          Save Comments
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group text-right">
                        <button
                          v-on:click="destroyBook(user_book)"
                          name="Delete"
                          type="submit"
                          id="submit"
                          class="btn btn-outline-custom"
                        >
                          Delete this Book
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
              </div>
            </article>
          </div>
        </div>
      </div>
      <!-- end container -->
    </section>
  </div>
</template>

<style>
.checkbox {
  margin-left: 10px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user_books: {},
      errors: [],
      message: "Have Read",
    };
  },
  created: function () {
    axios.get("/user_books").then((response) => {
      console.log(response.data);
      this.user_books = response.data;
    });
  },
  methods: {
    updateHaveRead: function (user_book) {
      user_book.have_read = !user_book.have_read;
      console.log(user_book.have_read);
      var params = {
        have_read: user_book.have_read,
      };
      axios.patch(`/user_books/${user_book.id}`, params).then((response) => {
        console.log(response.data);
      });
    },
    destroyBook: function (user_book) {
      if (confirm("Are you sure you want to delete this book from your bookshelf?")) {
        axios
          .delete(`/user_books/${user_book.id}`, user_book)
          .then((response) => {
            console.log("Success!", response.data);
            this.$parent.flashMessage = "Book Deleted!";
            this.$router.push("/books");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
    editUserBook: function (user_book) {
      var params = {
        comments: user_book.comments,
      };
      axios
        .patch(`/user_books/${user_book.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.user_book = response.data;
          // this.user_book.comments = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>
