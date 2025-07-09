import { defineStore } from 'pinia'
import axios from 'axios'
import { onMounted } from 'vue'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    koleksiBelumDibaca: JSON.parse(localStorage.getItem('koleksiBelumDibaca') || '[]'),
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
    addToUnread(bookId) {
      bookId = Number(bookId)
      if (!this.koleksiBelumDibaca.includes(bookId)) {
        this.koleksiBelumDibaca.push(bookId)
      }
      localStorage.setItem('koleksiBelumDibaca', JSON.stringify(this.koleksiBelumDibaca));
    },
    moveToReading(bookId) {
      bookId = Number(bookId)
      // Remove from unread if present
      this.koleksiBelumDibaca = this.koleksiBelumDibaca.filter(id => id !== bookId)
      localStorage.setItem('koleksiBelumDibaca', JSON.stringify(this.koleksiBelumDibaca));
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
      this.koleksiBelumDibaca = [];
      this.koleksiSedangDibaca = [];
      this.koleksiSelesaiDibaca = [];
      localStorage.setItem('koleksiBelumDibaca', '[]');
      localStorage.setItem('koleksiSedangDibaca', '[]');
      localStorage.setItem('koleksiSelesaiDibaca', '[]');
    }
  },
  getters: {
    unreadBooks(state) {
      return state.koleksiBelumDibaca
        .map(id => state.books.find(b => b.id === id))
        .filter(Boolean)
    },
    readingBooks(state) {
      return state.koleksiSedangDibaca
        .map(id => state.books.find(b => b.id === id))
        .filter(Boolean)
    },
    finishedBooks(state) {
      return state.koleksiSelesaiDibaca
        .map(id => state.books.find(b => b.id === id))
        .filter(Boolean)
    }
  }
})