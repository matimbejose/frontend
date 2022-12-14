import { authorities } from "../../global";
import CreditType from "./views/CreditType.vue";

export default router => {

  router.addRoute({
    name: 'credit_types',
    path: '/credit_types',
    component: CreditType,
    meta: {
      requiresAuth: true,
      authority: authorities.CREDIT_TYPE_VIEW
    },
  })

};
