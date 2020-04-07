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
      // { 
      //   id: 1,
      //   book_name: 'test',
      //   status: 'none'
      // },
      // { 
      //   id: 2,
      //   book_name: 'test2',
      //   status: 'reading'
      // },
      // { 
      //   id: 3,
      //   book_name: 'test3',
      //   status: 'done'
      // },
      // { 
      //   id: 4,
      //   book_name: 'test4',
      //   status: 'none'
      // },
      // { 
      //   id: 5,
      //   book_name: 'test5',
      //   status: 'reading'
      // },
      // { 
      //   id: 6,
      //   book_name: 'test6',
      //   status: 'done'
      // }
    ]
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
    addBook (state, item) {
      let lastItem = state.books[state.books.length - 1] || { id: -1 };

      state.books.push({
        id: (lastItem.id) + 1,
        book_name: item,
        status: 'none'
      })
    },
    editBook (state, item) {
      state.books.forEach( book => {
        if(book.id == item.id) {
          book.book_name = item.edit;
        }
      })
    },
    deleteBook (state, item) {
      state.books = state.books.filter((book) => {
        return book.id !== item
      })
    }
  }
})

new Vue({
  render: h => h(App),
  store,
  router: new VueRouter(routes),
}).$mount('#app')
