import Module from "./Module.vue";
import AddLoan from "./views/AddLoan.vue";
import ListLoans from "./views/ListLoans.vue";
import LoanReports from "./views/LoanReports.vue";
import View from "./views/View.vue";
import LoanAgreement from './views/components/LoanAgreement.vue'
import { authorities } from "../../global";



export default router => {
  //router.addRoute(moduleRoute);

  router.addRoute({
    name: 'loans',
    path: '/loans',
    component: Module,
    meta: {
      requiresAuth: true,
      meta: { authority: authorities.LOAN_VIEW }
    },
    children: [
      { path: '', component: ListLoans, meta: { authority: authorities.LOAN_VIEW } },
      { path: 'reports', component: LoanReports, meta: { authority: authorities.LOAN_VIEW } },
      { path: 'create', component: AddLoan, meta: { authority: authorities.LOAN_SIMULATE } },
      { path: 'show/:id', component: View, props: true, meta: { authority: authorities.LOAN_VIEW } },
      { path: 'agreement/:id', component: LoanAgreement, props: true, meta: { authority: authorities.LOAN_VIEW } },
      { path: 'edit/:id', component: AddLoan, props: true, meta: { authority: authorities.ACCOUNT_EDIT } },
    ],
  })

};
