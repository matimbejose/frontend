import Setting from "./views/Setting.vue";
import NewDocument from './views/NewDocument'
import { authorities } from '../../global'


export default router => {

  router.addRoute({
    name: 'settings',
    path: '/settings',
    component: Setting,
    meta: {
      requiresAuth: true,
      authority: authorities.SETTINGS_VIEW
    },
  })
  router.addRoute({
    name: 'documents',
    path: '/documents/new',
    component: NewDocument,
    meta: {
      requiresAuth: true,
      authority: authorities.DOCUMENT_CREATE
    },
  })
  router.addRoute({
    name: 'documents/edit',
    path: '/documents/:id',
    props: true,
    component: NewDocument,
    meta: {
      requiresAuth: true,
      authority: authorities.DOCUMENT_EDIT
    },
  })

};
