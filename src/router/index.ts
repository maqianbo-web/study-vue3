import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        meta: {
            isShow: false,
        },
        redirect: {
            path: '/home',
        },
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            name: '首页',
            isShow: true,
        },
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            name: 'about',
            isShow: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
