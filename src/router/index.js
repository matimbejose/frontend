import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/home/Home'
import PermissionDenied from '../views/statuses/403'
import { authorities } from "../global";

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      authority: authorities.DASHBOARD_VIEW
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    props: true,
    component: Home,
    meta: {
      requiresAuth: true,
      authority: authorities.DASHBOARD_VIEW
    },

  },
  {
    path: "/error-403",
    name: "403",
    props: true,
    component: PermissionDenied,

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;