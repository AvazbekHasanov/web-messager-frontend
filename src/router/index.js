import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Registration.vue'
import Cabinet from "@/views/Cabinet.vue";
import NotFound from '@/views/NotFound.vue'
import Main from '@/views/Main.vue'
import jwtDecode from 'vue-jwt-decode'

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
            path: '/',
            name: 'main',
            component: Main
        },

        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'registration') {
    next();
  } else {
      let jwt = localStorage.getItem('access_token');
      if (!jwt) {
          next({
              name: 'login',
              query: {next: encodeURIComponent(to.fullPath)}
          });
      }
      let userData = jwtDecode.decode(jwt);
    if (userData.exp <  Date.now()/1000) {
      next({
        name: 'login',
        query: { next: encodeURIComponent(to.fullPath) }
      });
    } else {
      next();
    }
  }
});

export default router
