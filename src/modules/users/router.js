import Module from "./Module.vue";
import Login from "./views/Login.vue";
import ListUsers from "./views/ListUsers.vue";
import AddUser from "./views/AddUser.vue";
import Logout from "./views/Logout.vue";
import { authorities } from "../../global";

// const moduleRoute = {
//   path: "/customers",
//   component: Module,
//   children: [
//     {
//       path: "",
//       component: Home
//     },
//     {
//       path: "/new",
//       component: New
//     }
//   ]
// };

export default router => {
  //router.addRoute(moduleRoute);

  router.addRoute({
    name: 'login',
    path: '/login',
    component: Login,
    props: true,
    meta: {
      requiresVisitor: true,
    },
  })

  router.addRoute({
    name: 'logout',
    component: Logout,

  })

  router.addRoute({
    name: 'users',
    path: '/users',
    component: ListUsers,
    props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.USER_VIEW
    },
  })

  router.addRoute({
    name: 'adduser',
    path: '/users/add',
    component: AddUser,
    props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.USER_CREATE
    },
  })

  router.addRoute({
    name: 'edituser',
    path: '/user/edit',
    component: AddUser,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_EDIT
    },
  })

};
