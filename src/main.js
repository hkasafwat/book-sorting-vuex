import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import routes from './routes'
import '@/assets/tailwind.css'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

const vuexPersist = new VuexPersist({
  key: 'bookSorter',
  storage: window.localStorage
})

const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    books: [
      {
        id: 0,
        book_name: 'Add a backlog of books here',
        status: 'none'
      },
      {
        id: 1,
        book_name: 'Add your current books here',
        status: 'reading'
      },
      {
        id: 2,
        book_name: 'Add your completed books here',
        status: 'done'
      }
    ],
    tab: 'none'
  },
  getters: {
    backlog: state => {
      return state.books.filter(book => book.status == 'none')
    },
    readingNow: state => {
      return state.books.filter(book => book.status == 'reading')
    },
    doneBooks: state => {
      return state.books.filter(book => book.status == 'done')
    }
  },
  mutations: {
    addBook(state, item) {
      let lastItem = state.books[state.books.length - 1] || { id: -1 };
      state.books.push({
        id: (lastItem.id) + 1,
        book_name: item,
        status: state.tab
      })
    },
    editBook(state, item) {
      state.books.forEach(book => {
        if (book.id == item.id) {
          book.book_name = item.edit;
        }
      })
    },
    deleteBook(state, item) {
      state.books = state.books.filter((book) => {
        return book.id !== item
      })
    },
    changeStatus(state, item) {
      state.books.forEach(book => {
        if (book.id == item.id) {
          book.status = item.status;
        }
      })
    },
    changeTab(state, item) {
      state.tab = item;
    }
  }
})

new Vue({
  render: h => h(App),
  store,
  router: new VueRouter(routes),
}).$mount('#app')
