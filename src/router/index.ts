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
        path: '/form',
        name: 'form',
        meta: {
            name: '表单展示',
            isShow: true,
        },
        component: () => import(/* webpackChunkName: "showform" */ '../views/form/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
