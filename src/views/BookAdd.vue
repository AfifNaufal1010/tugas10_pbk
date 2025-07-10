<template>
  <div class="add-book-form">
    <h2 class="form-title">Tambah Buku ke Daftar Bacaan</h2>
    <div class="form-content">
      <label for="bookSelect" class="form-label">Pilih Buku yang Ingin Dibaca:</label>
      <select 
        v-model="selectedBookId" 
        id="bookSelect" 
        :disabled="loading || booksStore.books.length === 0"
        class="book-select"
      >
        <option value="" disabled>Pilih buku...</option>
        <option v-for="book in availableBooks" :key="book.id" :value="book.id" :disabled="isInReading(book.id)">
          {{ book.judul }} — {{ book.penulis }} ({{ book.negara }})
        </option>
      </select>
      <button 
        :disabled="!selectedBookId || loading" 
        @click="addToUnread"
        class="add-button"
      >
        Tambahkan ke Daftar Sedang Dibaca
      </button>
      <div class="message-container">
        <div v-if="successMsg" class="message success-msg">
          {{ successMsg }}
        </div>
        <div v-if="loading" class="message loading-msg">
          Memuat data buku...
        </div>
        <div v-if="errorMsg" class="message error-msg">
          {{ errorMsg }}
        </div>
        <div v-if="!loading && booksStore.books.length === 0" class="message empty-msg">
          Tidak ada data buku tersedia.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()
const loading = ref(true)
const errorMsg = ref('')
const selectedBookId = ref('')
const successMsg = ref('')

onMounted(async () => {
  try {
    await booksStore.fetchBooks()
    loading.value = false
  } catch (e) {
    errorMsg.value = 'Gagal memuat data buku.'
    loading.value = false
  }
})

const isInReading = (id) => booksStore.koleksiSedangDibaca.includes(id)
const availableBooks = computed(() => booksStore.books)

async function addToUnread() {
  if (selectedBookId.value) {
    booksStore.moveToReading(Number(selectedBookId.value))
    await booksStore.fetchBooks()
    successMsg.value = 'Buku berhasil ditambahkan ke daftar Sedang Dibaca!'
    selectedBookId.value = ''
    setTimeout(() => { successMsg.value = '' }, 3000)
  }
}
</script>

<style scoped>
.add-book-form {
  max-width: 420px;
  margin: 40px auto;
  background: #fff;
  padding: 15px 10px;
  border-radius: 14px;
  box-shadow: 0 2px 16px 0 rgba(44, 62, 80, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 18px;
  text-align: center;
}
.form-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}
.book-select {
  width: 100%;
  padding: 1px 5px;
  font-size: 1rem;
  border: 1.5px solid #dfe6e9;
  border-radius: 5px;
  background: white;
  color: #2c3e50;
  outline: none;
  transition: border 0.2s;
}
.book-select:focus {
  border: 1.5px solid #1abc9c;
}
.book-select:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.6;
}
.add-button {
  background: #1abc9c;
  color: #fff;
  border: none;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px 0 rgba(26,188,156,0.08);
}
.add-button:hover:not(:disabled) {
  background: #159c86;
}
.add-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
.message-container {
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message {
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}
.success-msg {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
  border: 1px solid rgba(39, 174, 96, 0.2);
}
.loading-msg {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  border: 1px solid rgba(52, 152, 219, 0.2);
}
.error-msg {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.2);
}
.empty-msg {
  background: rgba(149, 165, 166, 0.1);
  color: #95a5a6;
  border: 1px solid rgba(149, 165, 166, 0.2);
}
.booklist-table th,
.booklist-table td {
  padding: 0.7rem 0.5rem;
}
</style>