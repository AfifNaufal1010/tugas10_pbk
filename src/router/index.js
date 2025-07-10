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
    name: 'Koleksi',
    children: [
      { path: '', name: 'BookList', component: BookList },
      { path: 'tambah', name: 'BookAdd', component: BookAdd }
    ]
  },
  {
    path: '/status',
    name: 'Status',
    children: [
      { path: 'sedang', name: 'StatusReading', component: StatusReading },
      { path: 'selesai', name: 'StatusFinished', component: StatusFinished }
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
  
  // Jika user sudah login dan mencoba akses halaman login, redirect ke dashboard
  if (loggedIn && to.path === '/login') {
    return next('/dashboard');
  }
  
  // Jika user belum login dan mencoba akses halaman yang memerlukan login
  if (!loggedIn && to.path !== '/login') {
    return next('/login');
  }
  
  // Jika user sudah login dan mengakses root path, redirect ke dashboard
  if (loggedIn && to.path === '/') {
    return next('/dashboard');
  }
  
  next();
});

export default router
