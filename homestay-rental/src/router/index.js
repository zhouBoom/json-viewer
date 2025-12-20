import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import RoomDetail from '../views/RoomDetail.vue';
import Search from '../views/Search.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/room/:id',
        name: 'RoomDetail',
        component: RoomDetail
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router;
