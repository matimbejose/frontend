import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import userStore from './modules/users/store'
import '../src/assets/css/style.css'
import customersModule from "./modules/customers";
import managersModule from "./modules/managers";
import paymentsModule from "./modules/payments";
import loansModule from "./modules/loans";
import settingsModule from "./modules/settings";
import usersModule from "./modules/users";
import rolesModule from "./modules/roles";
import journalsModule from "./modules/journals";
import credit_typesModule from "./modules/credit_types";
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import VCalendar from 'v-calendar'
import Vue2Editor from "vue2-editor";
import { registerModules } from "./register-modules";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { autoLoginTime } from './global';


registerModules({
  settings: settingsModule,
  loans: loansModule,
  managers: managersModule,
  payments: paymentsModule,
  customers: customersModule,
  users: usersModule,
  journals: journalsModule,
  roles: rolesModule,
  credit_types: credit_typesModule,
})

router.beforeEach((to, from, next) => {
  if (store.getters.loggedIn) {
    setTimeout(() => {
      window.sessionStorage.clear()
      location.href = '/login'
    }, autoLoginTime);
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      if (!userStore.state.authorities.includes(to.meta.authority)) {
        next({ name: '403' })
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(Vue2Editor)
  .use(VCalendar, {})
  .use(VueSweetalert2)
  .use(PrimeVue).component('Dialog', Dialog).mount('#app')

