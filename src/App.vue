<template>
  <div class="app">
    <aside class="sidebar">
      <h2>📚 SIKOLEKSI</h2>
      <nav>
        <router-link to="/dashboard" exact-active-class="router-link-exact-active">🏠 Dashboard</router-link>
        <router-link to="/koleksi" exact-active-class="router-link-exact-active">📖 Daftar Buku</router-link>
        <router-link to="/koleksi/tambah" exact-active-class="router-link-exact-active">➕ Tambah Buku</router-link>

        <p>Status Bacaan</p>
        <router-link to="/status/sedang" exact-active-class="router-link-exact-active">📘 Sedang Dibaca</router-link>
        <router-link to="/status/selesai" exact-active-class="router-link-exact-active">📗 Selesai Dibaca</router-link>

        <p>Akun</p>
        <router-link to="/login" exact-active-class="router-link-exact-active">🔐 Login</router-link>
        <router-link to="/user" exact-active-class="router-link-exact-active">👤 Pengguna</router-link>
      </nav>
    </aside>
    <div class="main-area">
      <Header />
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import { useBooksStore } from '@/stores/books'
import { onMounted } from 'vue'
const booksStore = useBooksStore()
onMounted(() => booksStore.fetchBooks())
</script>

<style scoped>
/* Font dan warna dasar */
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
}

/* Layout utama */
.app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #fff;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.sidebar h2 {
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
}

.sidebar p {
  margin-top: 25px;
  margin-bottom: 5px;
  font-size: 13px;
  text-transform: uppercase;
  color: #bdc3c7;
  font-weight: bold;
}

.sidebar a {
  text-decoration: none;
  color: #ecf0f1;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 15px;
}

.sidebar a:hover {
  background-color: #34495e;
  padding-left: 15px;
}

.sidebar a.router-link-exact-active {
  background-color: #1abc9c;
  color: #fff;
}

/* Konten utama */
.content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: #fff;
  border-left: 1px solid #eee;
}

/* Heading halaman */
.content h1 {
  font-size: 26px;
  margin-bottom: 20px;
  color: #2c3e50;
}
</style>

