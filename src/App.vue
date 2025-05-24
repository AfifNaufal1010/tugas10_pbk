<template>
  <div class="app">
    <aside class="sidebar">
      <h2>📚 SIKOLEKSI</h2>
      <nav>
        <router-link to="/">🏠 Dashboard</router-link>

        <p>Koleksi Buku</p>
        <router-link to="/koleksi">📖 Daftar Buku</router-link>
        <router-link to="/koleksi/tambah">➕ Tambah Buku</router-link>

        <p>Status Bacaan</p>
        <router-link to="/status/belum">📕 Belum Dibaca</router-link>
        <router-link to="/status/sedang">📘 Sedang Dibaca</router-link>
        <router-link to="/status/selesai">📗 Selesai Dibaca</router-link>

        <p>Catatan</p>
        <router-link to="/catatan">📝 Semua Catatan</router-link>
        <router-link to="/catatan/tambah">➕ Tambah Catatan</router-link>

        <router-link to="/laporan">📊 Laporan</router-link>
        <router-link to="/login">🔐 Login</router-link>
      </nav>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

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

.sidebar a.router-link-active {
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

