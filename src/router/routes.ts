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
            { name: ROUTE_NAME.MAIN, path: '', component: () => import('pages/Index.vue') },
            { name: ROUTE_NAME.CONFIG, path: 'config', component: () => import('pages/Config.vue') },
            { name: ROUTE_NAME.DESTINATIONS, path: 'destinations', component: () => import('pages/Destinations.vue') },
            { name: ROUTE_NAME.PRODUCTS, path: 'product', component: () => import('pages/Product.vue') },
            { name: ROUTE_NAME.PRODUCT_EDIT, path: 'product/:id', component: () => import('pages/ProductEdit.vue') },
            { name: ROUTE_NAME.USERS, path: 'users', component: () => import('pages/Users.vue') }
        ],
    },
    // Login
    {
        path: '/login',
        component: AuthLayoutVue,
        children: [
            { name: ROUTE_NAME.LOGIN, path: '', component: () => import('src/pages/Login.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue'),
    },
];

export default routes;
