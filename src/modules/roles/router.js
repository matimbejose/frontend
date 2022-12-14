import Module from "./Module.vue";
import ListRoles from "./views/ListRoles.vue";
import AddRole from "./views/AddRole.vue";
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
    name: 'roles',
    path: '/roles',
    component: ListRoles,
    //  props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.ROLE_VIEW
    },
  })

  router.addRoute({
    name: 'addrole',
    path: '/roles/add',
    component: AddRole,
    props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.ROLE_CREATE
    },
  })

  router.addRoute({
    name: 'editrole',
    path: '/roles/edit',
    component: AddRole,
    meta: {
      requiresAuth: true,
      authority: authorities.ROLE_EDIT
    },
  })

};
