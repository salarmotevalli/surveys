import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../view/Dashboard.vue";
import Register from "../view/Register.vue";
import Login from "../view/Login.vue";
import Surveys from "../view/Surveys.vue";
import SurveyView from "../view/SurveyView.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import store from "../store";
import AuthLayout from "../components/AuthLayout.vue";


const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        meta: { requiresAuth: true },
        component: DefaultLayout,
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/surveys', name: 'Surveys', component: Surveys },
            { path: '/surveys/:id', name: 'SurveyEdit', component: SurveyView },
            { path: '/surveys/create', name: 'SurveyCreate', component: SurveyView },

        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        meta: { IsGuest: true },
        name: 'Auth',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },

        ]
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' });
    } else if (store.state.user.token && (to.meta.IsGuest)) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
});

export default router;
