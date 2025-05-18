import type { RouteRecordRaw } from 'vue-router'

export const constantRouterMap: RouteRecordRaw[] = [{
    path: '/',
    redirect: '/home',

}, {
    path: '/home',
    name: 'home',
    component: () => import('../views/PC/Home.vue'),
}]

export const asyncRouterMap: RouteRecordRaw[] = [
]

