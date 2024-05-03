import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "../views/MainView.vue";
import CreateTestView from "../views/CreateTestView.vue";
import ResultsView from "../views/ResultsView.vue";
import TestView from "../views/TestView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: MainView,
    },
    {
        path: "/Create-Test",
        name: "Create-Test",
        component: CreateTestView,
    },
    {
        path: "/Results",
        name: "Results",
        component: ResultsView,
    },
    {
        path: "/Test",
        name: "Test",
        component: TestView,
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;