<template>
  <div class="users-show">
    <section class="section">
      <div class="container">
        <div class="row">
          <!-- Content-->
          <div class="col-lg-8">
            <!-- Post-->
            <article class="post">
              <h5 class="text-center mt-0 mb-5 pb-3 text-uppercase">
                <b>{{ user.username }}'s Profile</b>
              </h5>

              <p class="text-center"></p>
              <p>
                {{ user.biography }}
              </p>
              <p>I'm currently reading: {{ user.currently_reading }}</p>
              <div class="text-center">
                <router-link to="/user_books" class="btn btn-outline-custom">My Bookshelf</router-link>
              </div>
              <form action="#" method="post" class="mt-4">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input
                        id="author"
                        class="form-control"
                        placeholder="Name*"
                        name="author"
                        type="text"
                        required=""
                      />
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <div class="form-group">
                      <input
                        id="email"
                        class="form-control"
                        placeholder="Email*"
                        name="email"
                        type="text"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input id="subject" class="form-control" placeholder="Subject" name="subject" type="text" />
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
                        placeholder="Your Message*"
                        name="comment"
                        required=""
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group text-right">
                      <button name="submit" type="submit" id="submit" class="btn btn-dark">Send</button>
                    </div>
                  </div>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    </section>

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
