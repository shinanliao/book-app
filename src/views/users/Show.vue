<template>
  <div class="users-show">
    <h1>My Profile Page</h1>
    <strong>My Biography:</strong>
    <br />
    {{ user.biography }}
    <br />
    <br />
    <strong>Currently Reading:</strong>
    <br />
    {{ user.currently_reading }}
    <ul>
      <li class="error" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="updateUser()">
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
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
  },
};
</script>
