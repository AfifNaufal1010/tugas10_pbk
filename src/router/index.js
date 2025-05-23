import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import BookList from '@/views/books/List.vue'
import AddBook from '@/views/books/Add.vue'
import Unread from '@/views/status/Unread.vue'
import Reading from '@/views/status/Reading.vue'
import Finished from '@/views/status/Finished.vue'
import NotesList from '@/views/notes/List.vue'
import AddNote from '@/views/notes/Add.vue'
import Stats from '@/views/reports/Stats.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/koleksi',
    children: [
      { path: '', component: BookList },
      { path: 'tambah', component: AddBook }
    ]
  },
  {
    path: '/status',
    children: [
      { path: 'belum', component: Unread },
      { path: 'sedang', component: Reading },
      { path: 'selesai', component: Finished }
    ]
  },
  {
    path: '/catatan',
    children: [
      { path: '', component: NotesList },
      { path: 'tambah', component: AddNote }
    ]
  },
  { path: '/laporan', component: Stats }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
