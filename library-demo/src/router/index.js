import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SeatBooking from '../views/SeatBooking.vue'
import Statistics from '../views/Statistics.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/booking',
        name: 'SeatBooking',
        component: SeatBooking
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: Statistics
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
