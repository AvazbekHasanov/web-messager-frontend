import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Registration.vue'
import Cabinet from "@/views/Cabinet.vue";
import NotFound from '@/views/NotFound.vue'

// Create router instance
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/cabinet/:id?',
            name: 'cabinet',
            component: Cabinet
        },

        {
            path: '/auth/login',
            name: 'login',
            component: Login
        },

        {
            path: '/auth/registration/:user_id?',
            name: 'registration',
            component: Register
        },

        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFound
        }
    ]
})

export default router
