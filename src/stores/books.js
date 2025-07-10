import { defineStore } from 'pinia'
import axios from 'axios'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    koleksiSedangDibaca: JSON.parse(localStorage.getItem('koleksiSedangDibaca') || '[]'),
    koleksiSelesaiDibaca: JSON.parse(localStorage.getItem('koleksiSelesaiDibaca') || '[]')
  }),
  actions: {
    async fetchBooks() {
      const res = await axios.get('http://localhost:3000/books')
      this.books = res.data
    },
    async addBook(judul, genre, penulis, negara) {
      const res = await axios.post('http://localhost:3000/books', { judul, genre, penulis, negara })
      this.books.push(res.data)
    },
    moveToReading(bookId) {
      bookId = Number(bookId)
      if (!this.koleksiSedangDibaca.includes(bookId)) {
        this.koleksiSedangDibaca.push(bookId)
      }
      localStorage.setItem('koleksiSedangDibaca', JSON.stringify(this.koleksiSedangDibaca));
    },
    moveToFinished(bookId) {
      bookId = Number(bookId)
      // Remove from reading if present
      this.koleksiSedangDibaca = this.koleksiSedangDibaca.filter(id => id !== bookId)
      localStorage.setItem('koleksiSedangDibaca', JSON.stringify(this.koleksiSedangDibaca));
      if (!this.koleksiSelesaiDibaca.includes(bookId)) {
        this.koleksiSelesaiDibaca.push(bookId)
      }
      localStorage.setItem('koleksiSelesaiDibaca', JSON.stringify(this.koleksiSelesaiDibaca));
    },
    resetStatus() {
      this.koleksiSedangDibaca = [];
      this.koleksiSelesaiDibaca = [];
      localStorage.setItem('koleksiSedangDibaca', '[]');
      localStorage.setItem('koleksiSelesaiDibaca', '[]');
    }
  },
  getters: {
    readingBooks(state) {
      console.log('=== DEBUG GETTER readingBooks ===')
      console.log('koleksiSedangDibaca:', state.koleksiSedangDibaca)
      console.log('books length:', state.books.length)
      
      if (state.books.length > 0) {
        console.log('Sample book ID type:', typeof state.books[0].id, 'value:', state.books[0].id)
        console.log('Sample koleksi ID type:', typeof state.koleksiSedangDibaca[0], 'value:', state.koleksiSedangDibaca[0])
      }
      
      const result = state.koleksiSedangDibaca
        .map(id => {
          // Coba match dengan tipe data yang berbeda
          const book = state.books.find(b => b.id == id || b.id === id || b.id === String(id) || b.id === Number(id))
          console.log(`Looking for ID ${id} (${typeof id}):`, book ? `Found: ${book.judul}` : 'Not found')
          return book
        })
        .filter(Boolean)
      
      console.log('Final result:', result)
      return result
    },
    finishedBooks(state) {
      return state.koleksiSelesaiDibaca
        .map(id => {
          return state.books.find(b => b.id == id || b.id === id || b.id === String(id) || b.id === Number(id))
        })
        .filter(Boolean)
    }
  }
})