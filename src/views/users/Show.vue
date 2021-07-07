<template>
  <div class="users-show">
    <h1>{{ user.username }}'s Profile</h1>
    <strong>My Biography:</strong>
    <br />
    {{ user.biography }}
    <br />
    <br />
    <strong>Currently Reading:</strong>
    <br />
    {{ user.currently_reading }}
    <br />
    <br />
    <router-link to="/user_books">My Bookshelf</router-link>
    <form v-on:submit.prevent="updateUser()">
      <br />
      <strong>Update Your Account Information</strong>
      <ul>
        <li class="error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <label>
        Username:
        <input type="text" v-model="editUserParams.username" />
      </label>
      <br />
      <label>
        Email Address:
        <input type="text" v-model="editUserParams.email" />
      </label>
      <br />
      <label>
        Password:
        <input type="text" v-model="editUserParams.password" />
      </label>
      <br />
      <label>
        Password Confirmation:
        <input type="text" v-model="editUserParams.password_confirmation" />
      </label>
      <br />
      <label>
        Biography:
        <input type="text" v-model="editUserParams.biography" />
      </label>
      <br />
      <label>
        Currently Reading:
        <input type="text" v-model="editUserParams.currently_reading" />
      </label>
      <br />
      <input type="submit" value="Save Changes" />
      <br />
      <button v-on:click="destroyUser()">Delete Account</button>
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
      editUserParams: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User object", response.data);
      this.user = response.data;
      this.user_books = response.data;
    });
  },
  methods: {
    updateUser: function () {
      axios
        .patch(`/users/${this.$route.params.id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          this.editUserParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete your account?")) {
        axios
          .delete(`/users/${this.user.id}`)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/logout");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>
