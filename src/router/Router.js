import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
// 其他页面的导入

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    // 其他路由配置
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局路由守卫，判断是否是登录页面
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        document.body.classList.add('login-page');
    } else {
        document.body.classList.remove('login-page');
    }
    next();
});

export default router;
