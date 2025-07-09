<template>
  <div class="reading-container">
    <div class="header">
      <h1>📚 Sedang Dibaca</h1>
      <p class="subtitle">Buku-buku yang sedang dalam perjalanan</p>
    </div>
    
    <div v-if="books.length === 0" class="empty-state">
      <div class="empty-icon">📖</div>
      <h3>Belum ada buku</h3>
      <p>Mulai petualangan membaca Anda!</p>
    </div>
    
    <div v-else class="reading-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <div class="book-content">
          <div class="book-header">
            <h3 class="book-title">{{ book.judul }}</h3>
            <div class="book-meta">
              <span class="book-author">{{ book.penulis }}</span>
              <span class="book-country">{{ book.negara }}</span>
            </div>
          </div>
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: '45%' }"></div>
            </div>
            <span class="progress-text">Sedang dibaca...</span>
          </div>
        </div>
        <button @click="openPopup(book.id)" class="finish-btn">
          <span>✓</span> Selesai
        </button>
      </div>
    </div>
    
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <div class="popup-icon">🎉</div>
        <h3>Selamat!</h3>
        <p>Apakah Anda yakin sudah selesai membaca buku ini?</p>
        <div class="popup-actions">
          <button @click="finishReading" class="confirm-btn">
            Ya, Selesai!
          </button>
          <button @click="closePopup" class="cancel-btn">
            Belum
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBooksStore } from '@/stores/books'

const booksStore = useBooksStore()
const books = computed(() => {
  const ids = booksStore.koleksiSedangDibaca
  const allBooks = booksStore.books
  return ids.map(id => allBooks.find(b => b.id === id)).filter(Boolean)
})

const showPopup = ref(false)
const selectedBookId = ref(null)

function openPopup(bookId) {
  selectedBookId.value = bookId
  showPopup.value = true
}
function closePopup() {
  showPopup.value = false
  selectedBookId.value = null
}
function finishReading() {
  if (selectedBookId.value !== null) {
    booksStore.moveToFinished(selectedBookId.value)
    showPopup.value = false
    selectedBookId.value = null
  }
}
</script>

<style scoped>
.reading-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  color: rgba(255,255,255,0.9);
  font-size: 1.1rem;
  margin: 8px 0 0 0;
  font-weight: 300;
}

.empty-state {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-state h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0 0 12px 0;
}

.empty-state p {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0;
}

.reading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.book-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
}

.book-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.book-content {
  margin-bottom: 20px;
}

.book-header {
  margin-bottom: 16px;
}

.book-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.book-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.book-author {
  color: #34495e;
  font-size: 0.95rem;
  font-weight: 500;
}

.book-country {
  color: #7f8c8d;
  font-size: 0.85rem;
  font-style: italic;
}

.progress-section {
  margin-top: 16px;
}

.progress-bar {
  background: #ecf0f1;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-style: italic;
}

.finish-btn {
  background: linear-gradient(135deg, #1abc9c, #16a085);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  width: 100%;
  justify-content: center;
}

.finish-btn:hover {
  background: linear-gradient(135deg, #16a085, #1abc9c);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(26,188,156,0.3);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.popup {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 400px;
  margin: 20px;
  animation: popupIn 0.3s ease;
}

@keyframes popupIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.popup-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.popup h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.popup p {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.popup-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.confirm-btn {
  background: linear-gradient(135deg, #1abc9c, #16a085);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #16a085, #1abc9c);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(26,188,156,0.3);
}

.cancel-btn {
  background: #ecf0f1;
  color: #7f8c8d;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.cancel-btn:hover {
  background: #bdc3c7;
  color: #2c3e50;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .reading-container {
    padding: 20px 16px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .reading-grid {
    grid-template-columns: 1fr;
  }
  
  .book-card {
    padding: 20px;
  }
  
  .popup {
    margin: 20px;
    padding: 30px 20px;
  }
  
  .popup-actions {
    flex-direction: column;
  }
  
  .confirm-btn, .cancel-btn {
    width: 100%;
  }
}
</style>