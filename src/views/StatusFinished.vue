<template>
  <div class="app-container">
    <div class="background-overlay"></div>
    
    <div class="content-wrapper">
      <div class="header-section">
        <div class="header-icon">
          <span class="icon-badge">🎉</span>
        </div>
        <h1 class="main-title">Selesai Dibaca</h1>
        <p class="subtitle">Koleksi buku yang telah Anda tamatkan</p>
      </div>

      <div class="finished-container">
        <div class="stats-card">
          <div class="stat-item">
            <span class="stat-number">{{ books.length }}</span>
            <span class="stat-label">Buku Selesai</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ getTotalPages() }}</span>
            <span class="stat-label">Total Halaman</span>
          </div>
        </div>

        <div v-if="books.length === 0" class="empty-state">
          <div class="empty-icon">📚</div>
          <h3 class="empty-title">Belum Ada Buku yang Selesai</h3>
          <p class="empty-description">Mulai baca buku pertama Anda dan capai pencapaian membaca!</p>
          <button class="start-reading-btn">
            <span class="btn-icon">🚀</span>
            <span>Mulai Membaca</span>
          </button>
        </div>

        <div v-else class="books-grid">
          <div v-for="(book, index) in books" :key="book.id" class="book-card" :style="{ animationDelay: `${index * 0.1}s` }">
            
            <div class="book-cover">
              <div class="book-spine"></div>
              <div class="book-content">
                <div class="book-icon">📖</div>
              </div>
            </div>
            
            <div class="book-details">
              <h3 class="book-title">{{ book.judul }}</h3>
              <p class="book-author">oleh {{ book.penulis }}</p>
              <div class="book-meta">
                <span class="meta-item">
                  <span class="meta-icon">🌍</span>
                  {{ book.negara }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">📄</span>
                  {{ book.halaman || 'N/A' }} hal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBooksStore } from '@/stores/books'
import { computed } from 'vue'

const booksStore = useBooksStore()
const books = computed(() => booksStore.finishedBooks)

function getTotalPages() {
  return books.value.reduce((total, book) => total + (book.halaman || 0), 0)
}

function formatDate(date) {
  if (!date) return 'Hari ini'
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="books" width="50" height="50" patternUnits="userSpaceOnUse"><rect width="50" height="50" fill="none"/><path d="M10 10h5v30h-5z" fill="rgba(255,255,255,0.05)"/><path d="M20 15h5v25h-5z" fill="rgba(255,255,255,0.03)"/><path d="M35 12h5v28h-5z" fill="rgba(255,255,255,0.04)"/></pattern></defs><rect width="100" height="100" fill="url(%23books)"/></svg>');
  opacity: 0.3;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
}

.header-icon {
  margin-bottom: 20px;
}

.icon-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  padding: 15px;
  border-radius: 50%;
  font-size: 2rem;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.finished-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
}

.stat-item {
  text-align: center;
  color: white;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-description {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.5;
}

.start-reading-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.start-reading-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.book-card {
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
}

.book-cover {
  width: 80px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  margin: 0 auto 20px;
  position: relative;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px 0 0 8px;
}

.book-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

.book-icon {
  font-size: 2rem;
}

.book-details {
  text-align: center;
  margin-bottom: 20px;
}

.book-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  line-height: 1.3;
}

.book-author {
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 15px;
}

.book-meta {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #95a5a6;
  font-size: 0.9rem;
}

.meta-icon {
  font-size: 1rem;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .finished-container {
    padding: 30px 20px;
  }
  
  .books-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-card {
    flex-direction: column;
    gap: 20px;
  }
  
  .stat-divider {
    width: 60px;
    height: 1px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .finished-container {
    padding: 25px 15px;
  }
  
  .book-card {
    padding: 20px;
  }
  
  .achievement-list {
    justify-content: center;
  }
}
</style>