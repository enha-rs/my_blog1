import { createWebHashHistory, createRouter, type RouteRecordRaw } from "vue-router";
// import { isMobileTerminal } from "@/utils/flexible";
import { constantRouterMap } from "./pc-routes";
// import mobileRoutes from "./mobile-routes";

// const routes: RouteRecordRaw[] = isMobileTerminal.value ? mobileRoutes : constantRouterMap
const routes: RouteRecordRaw[] = constantRouterMap;

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;
