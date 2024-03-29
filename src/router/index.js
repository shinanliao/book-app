import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersShow from "../views/users/Show.vue";
import UserBooks from "../views/user_books/Index.vue";
import BooksIndex from "../views/books/Index.vue";
import BooksShow from "../views/books/Show.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow,
  },
  {
    path: "/bookshelf",
    name: "books-show",
    component: UserBooks,
  },
  {
    path: "/books",
    name: "books-index",
    component: BooksIndex,
  },
  {
    path: "/books/:id",
    name: "books-show",
    component: BooksShow,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
