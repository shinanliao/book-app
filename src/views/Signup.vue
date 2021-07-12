<template>
  <div class="signup">
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8">
            <article class="post">
              <h1 class="text-center mt-0 mb-4 pb-3 text">Signup</h1>
              <form v-on:submit.prevent="submit()" action="#" method="post" class="mt-4">
                <ul>
                  <li class="text-danger" v-for="error in errors" v-bind:key="error">
                    {{ error }}
                  </li>
                </ul>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input class="form-control" placeholder="Username" type="text" v-model="newUserParams.username" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input class="form-control" placeholder="Email" type="text" v-model="newUserParams.email" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input class="form-control" placeholder="Password" type="text" v-model="newUserParams.password" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Password Confirmation"
                        type="text"
                        v-model="newUserParams.password_confirmation"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input
                        class="form-control"
                        placeholder="Currently Reading"
                        v-model="newUserParams.currently_reading"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        rows="3"
                        placeholder="About You"
                        v-model="newUserParams.biography"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group text-center">
                      <button name="submit" type="submit" id="submit" class="btn btn-outline-custom">
                        Create Account
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

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
