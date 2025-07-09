import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import BookList from '@/views/BookList.vue'
import BookAdd from '@/views/BookAdd.vue'
import StatusReading from '@/views/StatusReading.vue'
import StatusFinished from '@/views/StatusFinished.vue'
import User from '@/views/User.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {
    path: '/koleksi',
    children: [
      { path: '', component: BookList },
      { path: 'tambah', component: BookAdd }
    ]
  },
  {
    path: '/status',
    children: [
      { path: 'sedang', component: StatusReading },
      { path: 'selesai', component: StatusFinished }
    ]
  },
  { path: '/user', name: 'User', component: User },
  // Redirect root to login
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('login') === 'true';
  if (!loggedIn && to.path !== '/login') {
    return next('/login');
  }
  if (loggedIn && to.path === '/login') {
    return next('/dashboard');
  }
  if (loggedIn && to.path === '/') {
    return next('/dashboard');
  }
  next();
});

export default router
