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
      <input type="checkbox" id="checkbox" v-model="user_book.have_read" v-on:click="updateHaveRead(user_book)" />
      <label for="checkbox">{{ message }}</label>
      <br />
      <strong>Description:</strong>
      <p>{{ user_book.book.description }}</p>
      <strong>Comments:</strong>
      <p>{{ user_book.comments }}</p>
      <form v-on:submit.prevent="editUserBook(user_book)">
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
      <button v-on:click="destroyBook(user_book)">Delete Book From Shelf</button>
      <br />
      <br />
    </div>
  </div>
</template>

<style></style>

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
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>
