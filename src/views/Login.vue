<template>
  <div class="login">
    <section class="section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8">
            <article class="post">
              <h1 class="text-center mt-0 mb-3 pb-3 text">Login</h1>
              <form v-on:submit.prevent="submit()" action="#" method="post" class="mt-4">
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input class="form-control" placeholder="Email" type="text" v-model="email" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input class="form-control" placeholder="Password" type="text" v-model="password" />
                    </div>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group text-center">
                      <button name="submit" type="submit" id="submit" class="btn btn-outline-custom">Login</button>
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
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
