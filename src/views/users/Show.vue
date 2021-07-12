<template>
  <div class="users-show">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <article class="post">
              <h2 class="text-center mt-0 mb-2 pb-1 text">
                <b>{{ user.username }}'s Profile</b>
              </h2>
              <h6 class="text-center text-center mt-2 mb-4 pb-3 text">
                {{ user.biography }}
              </h6>
              <h5 class="text-center mt-0 mb-2 pb-0 text"><b>Currently Reading:</b></h5>
              <h6 class="text-center text-center mt-0 mb-4 pb-3 text">
                {{ user.currently_reading }}
              </h6>
              <div class="text-center">
                <router-link to="/user_books" class="btn btn-outline-custom">My Bookshelf</router-link>
              </div>
              <br />
              <br />
              <h5 class="text-center mt-0 mb-2 pb-0 text"><b>Update Account</b></h5>
              <form v-on:submit.prevent="updateUser()" action="#" method="post" class="mt-4">
                <ul>
                  <li class="error" v-for="error in errors" v-bind:key="error">
                    {{ error }}
                  </li>
                </ul>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Username"
                        type="text"
                        v-model="editUserParams.username"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input class="form-control" placeholder="Email" type="text" v-model="editUserParams.email" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Password"
                        type="text"
                        v-model="editUserParams.password"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Password Confirmation"
                        type="text"
                        v-model="editUserParams.password_confirmation"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input
                        id="subject"
                        class="form-control"
                        placeholder="Currently Reading"
                        type="text"
                        v-model="editUserParams.currently_reading"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <textarea
                        id="comment"
                        class="form-control"
                        rows="5"
                        placeholder="About Me"
                        v-model="editUserParams.biography"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group text-right">
                      <button name="submit" type="submit" id="submit" class="btn btn-outline-custom">Send</button>
                    </div>
                    <div class="form-group text-right">
                      <button
                        v-on:click="destroyUser()"
                        name="Delete"
                        type="submit"
                        id="submit"
                        class="btn btn-outline-custom"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
