<template>
    <div class="booklist-container">
      <!-- Search Section -->
      <div class="search-section">
        <div class="search-header">
          <h2 class="search-title">🔍 Pencarian</h2>
          <div class="search-results">
            {{ filteredBooks.length }} buku ditemukan
          </div>
        </div>
        
        <div class="search-grid">
          <div class="search-group">
            <label class="search-label">Judul</label>
            <div class="input-wrapper">
              <input 
                v-model="searchJudul" 
                placeholder="Judul buku..."
                class="search-input"
              />
              <div class="input-icon">📖</div>
            </div>
          </div>
  
          <div class="search-group">
            <label class="search-label">Genre</label>
            <div class="select-wrapper">
              <select v-model="searchGenre" class="search-select">
                <option value="">Semua Genre</option>
                <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
              </select>
              <div class="select-icon">📚</div>
            </div>
          </div>
  
          <div class="search-group">
            <label class="search-label">Penulis</label>
            <div class="input-wrapper">
              <input 
                v-model="searchPenulis" 
                placeholder="Nama penulis..."
                class="search-input"
              />
              <div class="input-icon">✍️</div>
            </div>
          </div>
        </div>
  
        <div class="search-actions">
          <button @click="clearFilters" class="clear-btn">
            <span class="btn-icon">🧹</span>
            Bersihkan Filter
          </button>
        </div>
      </div>
  
      <!-- Table Section -->
      <div class="table-section">
        <div class="table-container">
          <table class="booklist-table">
            <thead>
              <tr>
                <th class="th-number">No</th>
                <th class="th-title">Judul</th>
                <th class="th-genre">Genre</th>
                <th class="th-author">Penulis</th>
                <th class="th-status">Status</th>
                <th class="th-action">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(book, idx) in filteredBooks" 
                :key="book.id"
                class="book-row"
                :style="{ animationDelay: `${idx * 0.05}s` }"
              >
                <td class="td-number">
                  <div class="number-badge">{{ idx + 1 }}</div>
                </td>
                <td class="td-title">
                  <div class="book-title">
                    <span class="title-text">{{ book.judul }}</span>
                  </div>
                </td>
                <td class="td-genre">
                  <span class="genre-tag">{{ book.genre }}</span>
                </td>
                <td class="td-author">
                  <div class="author-info">
                    <span class="author-name">{{ book.penulis }}</span>
                  </div>
                </td>
                <td class="td-status">
                  <span class="status-badge" :class="getStatusClass(book.id)">
                    {{ getStatusText(book.id) }}
                  </span>
                </td>
                <td class="td-action">
                  <button 
                    v-if="isInReading(book.id)" 
                    @click="moveToFinished(book.id)"
                    class="action-btn finish-btn"
                  >
                    ✅ Selesai
                  </button>
                  <span v-else class="status-text">Belum Dibaca</span>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Empty State -->
          <div v-if="filteredBooks.length === 0" class="empty-state">
            <div class="empty-icon">📭</div>
            <h3 class="empty-title">Tidak ada buku ditemukan</h3>
            <p class="empty-text">Coba ubah kriteria pencarian Anda</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useBooksStore } from '@/stores/books'
  
  const booksStore = useBooksStore()
  onMounted(() => booksStore.fetchBooks())
  
  const searchJudul = ref('')
  const searchGenre = ref('')
  const searchPenulis = ref('')
  
  const genres = computed(() => {
    const set = new Set(booksStore.books.map(b => b.genre))
    return Array.from(set).sort()
  })
  
  const filteredBooks = computed(() => {
    return booksStore.books.filter(b =>
      b.judul.toLowerCase().includes(searchJudul.value.toLowerCase()) &&
      (searchGenre.value === '' || b.genre === searchGenre.value) &&
      b.penulis.toLowerCase().includes(searchPenulis.value.toLowerCase())
    )
  })
  
  const clearFilters = () => {
    searchJudul.value = ''
    searchGenre.value = ''
    searchPenulis.value = ''
  }

  // Status functions
  const isInReading = (id) => booksStore.koleksiSedangDibaca.includes(id)
  const isInFinished = (id) => booksStore.koleksiSelesaiDibaca.includes(id)

  const getStatusText = (id) => {
    if (isInFinished(id)) return 'Selesai'
    if (isInReading(id)) return 'Sedang Dibaca'
    return 'Belum Dibaca'
  }

  const getStatusClass = (id) => {
    if (isInFinished(id)) return 'status-finished'
    if (isInReading(id)) return 'status-reading'
    return 'status-unread'
  }

  const moveToFinished = (bookId) => {
    booksStore.moveToFinished(bookId)
  }
  </script>
  
  <style scoped>
  .booklist-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
  }
  
  /* Search Section */
  .search-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .search-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .search-results {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .search-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .search-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .search-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
  }
  
  .input-wrapper, .select-wrapper {
    position: relative;
  }
  
  .search-input, .search-select {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: white;
    transition: all 0.3s ease;
    outline: none;
  }
  
  .search-input:focus, .search-select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
  
  .input-icon, .select-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    pointer-events: none;
  }
  
  .search-actions {
    display: flex;
    justify-content: center;
  }
  
  .clear-btn {
    background: linear-gradient(135deg, #ff7675, #e84393);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .clear-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 118, 117, 0.3);
  }
  
  .btn-icon {
    font-size: 1.1rem;
  }
  
  /* Table Section */
  .table-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .booklist-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
  
  .booklist-table th {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 1.5rem 1rem;
    text-align: left;
    font-weight: 700;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .booklist-table td {
    padding: 1.5rem 1rem;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .book-row {
    transition: all 0.3s ease;
    animation: fadeInUp 0.5s ease both;
  }
  
  .book-row:hover {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    transform: translateX(5px);
  }
  
  .book-row:nth-child(even) {
    background: #f8fafc;
  }
  
  .book-row:nth-child(even):hover {
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  }
  
  .number-badge {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
  }
  
  .book-title {
    font-weight: 600;
    color: #2d3748;
    font-size: 1.05rem;
  }
  
  .genre-tag {
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }
  
  .author-info {
    color: #4a5568;
    font-weight: 500;
  }
  
  .author-name {
    position: relative;
  }
  
  .author-name::before {
    content: '✍️';
    margin-right: 0.5rem;
  }
  
  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #6c757d;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .empty-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #2d3748;
  }
  
  .empty-text {
    font-size: 1rem;
  }
  
  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .booklist-container {
      padding: 1rem;
    }
    
    .search-grid {
      grid-template-columns: 1fr;
    }
    
    .search-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-results {
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .search-section,
    .table-section {
      padding: 1rem;
    }
    
    .booklist-table th,
    .booklist-table td {
      padding: 0.5rem 0.3rem;
      font-size: 0.95rem;
    }
  }

  .th-title, .td-title {
    width: 28%;
    max-width: 140px;
    min-width: 60px;
    word-break: break-word;
  }
  .th-genre, .td-genre {
    width: 18%;
    max-width: 80px;
    min-width: 50px;
    word-break: break-word;
  }
  .th-author, .td-author {
    width: 22%;
    max-width: 110px;
    min-width: 60px;
    word-break: break-word;
  }
  .th-status, .td-status {
    width: 15%;
    max-width: 100px;
    min-width: 80px;
  }
  .th-action, .td-action {
    width: 17%;
    max-width: 120px;
    min-width: 100px;
  }

  /* Status Badge Styles */
  .status-badge {
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    display: inline-block;
    min-width: 80px;
  }

  .status-unread {
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: white;
  }

  .status-reading {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
  }

  .status-finished {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
  }

  /* Action Button Styles */
  .action-btn {
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }

  .finish-btn {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
  }

  .finish-btn:hover {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  }

  .status-text {
    color: #7f8c8d;
    font-size: 0.85rem;
    font-style: italic;
  }
  </style>