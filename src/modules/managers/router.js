import { authorities } from "../../global";
import Module from "./Module.vue";
import AddManager from "./views/AddManager.vue";
import ListManagers from "./views/ListManagers.vue";
import View from "./views/View.vue";


export default router => {
  //router.addRoute(moduleRoute);

  router.addRoute({
    name: 'managers',
    path: '/managers',
    component: Module,
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: '', component: ListManagers, meta: { authority: authorities.MANAGER_VIEW } },
      { path: 'new', component: AddManager, meta: { authority: authorities.MANAGER_CREATE } },
      { path: 'view/:id', component: View, props: true, meta: { authority: authorities.MANAGER_VIEW } },
      { path: 'edit/:id', component: AddManager, props: true, meta: { authority: authorities.MANAGER_EDIT } }
    ],
  })

};
