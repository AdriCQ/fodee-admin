import { RouteRecordRaw } from 'vue-router';
import MainLayoutVue from 'layouts/MainLayout.vue';
import { ROUTE_NAME } from './const';
import AuthLayoutVue from 'src/layouts/AuthLayout.vue';
import { authGuard } from './guards';
/**
 *
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayoutVue,
    beforeEnter: authGuard,
    children: [
      {
        name: ROUTE_NAME.MAIN,
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        name: ROUTE_NAME.CONFIG,
        path: 'config',
        component: () => import('pages/ConfigPage.vue'),
      },
      {
        name: ROUTE_NAME.COMMENT_LIST,
        path: 'comments',
        component: () => import('pages/CommentsPage.vue'),
      },
      {
        name: ROUTE_NAME.DISH_LIST,
        path: 'dishes',
        component: () => import('pages/DishesPage.vue'),
      },
      {
        name: ROUTE_NAME.EVENT_LIST,
        path: 'events',
        component: () => import('pages/EventsPage.vue'),
      },
    ],
  },
  // Login
  {
    path: '/login',
    component: AuthLayoutVue,
    children: [
      {
        name: ROUTE_NAME.LOGIN,
        path: '',
        component: () => import('src/pages/Login.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
