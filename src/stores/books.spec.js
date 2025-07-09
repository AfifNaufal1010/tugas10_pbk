import { setActivePinia, createPinia } from 'pinia'
import { useBooksStore } from './books'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('Books Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchBooks mengisi state books', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, judul: 'Test', status: 'Belum Dibaca' }] })
    const store = useBooksStore()
    await store.fetchBooks()
    expect(store.books.length).toBe(1)
    expect(store.books[0].judul).toBe('Test')
  })
})
