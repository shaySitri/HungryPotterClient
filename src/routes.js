import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/random",
    name: "RandomRecipes",
    component: () => import("./components/RecipePreviewList.vue"),
  },

  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage.vue"),
  },

  // {
  //   path: "/about",
  //   name: "about",
  //   component: () => import("./pages/About"),
  // },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
