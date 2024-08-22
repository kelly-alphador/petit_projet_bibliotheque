import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    books: [],
    selectedBook: null,
    searchQuery: null
  },
  getters: {
    allbooks(state) {
      return state.books;
    },
    selectBook(state) {
      return state.selectedBook;
    },
    search(state) {
      return state.searchQuery;
    }
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
    },
    SET_SELECTED_BOOK(state, book) {
      state.selectedBook = book;
    },
    ADD_BOOK(state, addbook) {
      state.books.push(addbook);
    },
    UPDATE_BOOK(state, updatebook) {
      const index = state.books.findIndex(book => book.id === updatebook.id);
      if (index !== -1) {
        state.books.splice(index, 1, updatebook);
      }
    },
    DELETE_BOOK(state, bookid) {
      state.books = state.books.filter(book => book.id !== bookid);
    }
  },
  actions: {
    async fetchBooks({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/livres');
        console.log(response.data['hydra:member']); // Vérifie ici que les livres sont bien dans 'hydra:member'
        commit('SET_BOOKS', response.data['hydra:member']); // Utilise 'hydra:member' pour récupérer les livres
      } catch (error) {
        console.error('Erreur lors du chargement de l\'API', error);
      }
    },
    async addBooks({ commit }, newBook) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/livres', newBook);
        commit('ADD_BOOK', response.data);
      } catch (error) {
        console.error('Erreur', error);
      }
    },
    async updateBook({ commit }, updatedBook) { // Correction ici
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/livres/${updatedBook.id}`, updatedBook);
        commit('UPDATE_BOOK', response.data);
      } catch (error) {
        console.error('Erreur', error);
      }
    },
    async deleteBook({ commit }, bookid) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/livres/${bookid}`); // Correction ici
        commit('DELETE_BOOK', bookid);
      } catch (error) {
        console.error('Erreur', error);
      }
    },
    selectBook({ commit }, book) {
      commit('SET_SELECTED_BOOK', book); // Correction ici
    }
  },
  modules: {}
});
