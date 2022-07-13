import { createRouter, createWebHistory } from "vue-router"

import UserAuth from "./pages/auth/UserAuth.vue"
import ChartsList from "./pages/home/ChartsList.vue"
import ClickhouseTest from "./pages/home/charts/ClickhouseTest.vue"
import UserSettings from "./pages/settings/UserSettings.vue"
import AboutService from "./pages/about/AboutService.vue"
import NotFound from "./pages/NotFound.vue"
import store from "./store/index.js"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: ChartsList },
        { path: "/home/clickhouse-test", component: ClickhouseTest },
        { path: "/settings", component: UserSettings },
        { path: "/about", component: AboutService },
        { path: "/auth", component: UserAuth },
        { path: "/:notFound(.*)", component: NotFound }
    ]
})

router.beforeEach(function(to, _, next) {
    store.dispatch("mainbar/hideSidebar")
    if(!store.getters["auth/isAuthenticated"] && to.path !== "/auth") {
        next("/auth")
    } else {
        next()
    }
})

export default router