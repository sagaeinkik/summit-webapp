import { createRouter, createWebHistory } from 'vue-router';
import { checkUser } from '../utils/auth';

//Layouter
import DefaultLayout from '../layouts/DefaultLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

//Vyer
import DashboardView from '../views/DashboardView.vue';
import StockView from '../views/StockView.vue';
import CategoryView from '../views/CategoryView.vue';
import SupplierView from '../views/SupplierView.vue';
import SettingsView from '../views/SettingsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: AuthLayout,
            children: [
                {
                    path: '',
                    name: 'login',
                    component: LoginView,
                },
                {
                    path: '/register',
                    name: 'register',
                    component: RegisterView,
                },
            ],
        },
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardView,
                },
                {
                    path: '/lager',
                    name: 'lager',
                    component: StockView,
                },
                {
                    path: '/kategorier',
                    name: 'kategorier',
                    component: CategoryView,
                },
                {
                    path: '/leverantorer',
                    name: 'leverantörer',
                    component: SupplierView,
                },
                {
                    path: '/settings',
                    name: 'inställningar',
                    component: SettingsView,
                },
            ],
        },
    ],
});

// Route guard som kräver autentisering för alla undersidor utom login och register
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    //Kolla om sidan kräver autentisering (finns ej i public pages)
    const authRequired = !publicPages.includes(to.path);
    //Kolla om användaren har en cookie med jwt-token
    const isAuthenticated = checkUser();

    //Omdirigera till login
    if (authRequired && !isAuthenticated) {
        return next('/login');
    }

    next();
});

//Route guard som kollar om användaren är inloggad och nekar tillgång till login och register
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const isAuthenticated = checkUser();

    if (isAuthenticated && publicPages.includes(to.path)) {
        return next('/');
    }

    next();
});

export default router;
