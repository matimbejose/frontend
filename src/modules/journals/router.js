import Module from "./Module.vue";
import Journals from "./views/Journals.vue";
import Extracts from "./views/Extracts.vue";
import PGC from './views/PGC.vue'
import Dashboard from './views/Dashboard.vue'
import { authorities } from "../../global";


export default router => {
  //router.addRoute(moduleRoute);

  router.addRoute({
    name: 'journals',
    path: '/journals',
    component: Journals,
    //  props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })

  router.addRoute({
    name: 'extracts',
    path: '/extracts',
    component: Extracts,
    //  props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })
  router.addRoute({
    name: 'dashbordacc',
    path: '/accounting/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })
  router.addRoute({
    name: 'pgc',
    path: '/pgc',
    component: PGC,
    //  props: true,
    meta: {
      requiresAuth: true,
      authority: authorities.ACCOUNT_VIEW
    },
  })


};
