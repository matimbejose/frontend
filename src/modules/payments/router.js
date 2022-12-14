import Payments from "./views/Payments.vue";
import Deposits from "./views/Deposits.vue"
import Bill from "./views/components/Bill"
import { authorities } from "../../global";

export default router => {

  router.addRoute({
    name: 'payments',
    path: '/payments',
    component: Payments,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })

  router.addRoute({
    name: 'journals_casts',
    path: '/journals_casts',
    component: Deposits,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })
  router.addRoute({
    name: 'payment_bill',
    path: '/payment_bill/:id',
    component: Bill,
    props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })

};
