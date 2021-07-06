<template>
  <div class="user_books">
    <h2>My Bookshelf</h2>
    <div v-for="user_book in user_books" v-bind:key="user_book.id">
      <span class="image">
        <img v-bind:src="user_book.book.image" />
      </span>
      <br />
      <strong>Title:</strong>
      <p>{{ user_book.book.title }}</p>
      <strong>Description:</strong>
      <p>{{ user_book.book.description }}</p>
      <strong>Comments:</strong>
      <p>{{ user_book.comments }}</p>
      <form v-on:submit.prevent="editBook()">
        <ul>
          <li class="error" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <label>
          <input type="text" v-model="user_book.comments" placeholder="Write comments here" />
        </label>
        <input type="submit" value="Save Changes" />
      </form>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user_books: [],
      errors: [],
      editUserBook: {},
    };
  },
  created: function () {
    axios.get("/user_books").then((response) => {
      console.log(response.data);
      this.user_books = response.data;
    });
  },
  methods: {
    editBook: function () {
      var params = {
        comments: this.user_books.comments,
      };
      axios
        .patch(`/user_books/${this.$route.params.id}`, params)
        .then((response) => {
          console.log(response.data);
          this.user_books = response.data;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>
