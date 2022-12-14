import { authorities } from "../../global";
import Module from "./Module.vue";
import AddCustomer from "./views/AddCustomer.vue";
import ListCustomers from "./views/ListCustomers.vue";
import View from "./views/View.vue";


export default router => {
  //router.addRoute(moduleRoute);

  router.addRoute({
    name: 'customers',
    path: '/customers',
    component: Module,
    meta: {
      requiresAuth: true,
      meta: { authority: authorities.CUSTOMER_VIEW }
    },
    children: [
      { path: '', component: ListCustomers, meta: { authority: authorities.CUSTOMER_VIEW } },
      { path: 'new', component: AddCustomer, meta: { authority: authorities.CUSTOMER_CREATE } },
      { path: 'view', component: View, meta: { authority: authorities.CUSTOMER_VIEW } },
      { path: 'edit', component: AddCustomer, meta: { authority: authorities.CUSTOMER_EDIT } }
    ],
  })

};
