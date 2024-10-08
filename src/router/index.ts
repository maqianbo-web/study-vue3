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
        component: () => import('../views/form/index.vue'),
    },
    {
        path: '/echart',
        name: 'echart',
        meta: {
            name: 'echart展示',
            isShow: true,
        },
        component: () => import('../views/echart/index.vue'),
    },
    {
        path: '/x6',
        name: 'x6',
        meta: {
            name: '血缘关系',
            isShow: true,
        },
        component: () => import('../views/x6/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
