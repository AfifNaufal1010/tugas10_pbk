<script setup>
import { ref } from 'vue'

const judul = ref('')
const status = ref('Belum Dibaca')

const tambahBuku = () => {
  console.log('Tambah:', judul.value, status.value)
  // Simpan ke database nanti
}
</script>

<template>

  <h1>➕ Tambah Buku Baru</h1>


  <h1>Tambah Buku</h1>
  <form @submit.prevent="tambahBuku">
    <input v-model="judul" placeholder="Judul Buku" />
    <select v-model="status">
      <option>Belum Dibaca</option>
      <option>Sedang Dibaca</option>
      <option>Selesai Dibaca</option>
    </select>
    <button type="submit">Simpan</button>
  </form>
</template>

