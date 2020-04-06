<template>
  <div class="container">
    <form class="w-full max-w-sm mx-auto">
      <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Enter Book Name"
          aria-label="Book name"
          v-model="inputBody"
          v-on:keydown.enter.prevent="submit()"
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm font-bold border-4 text-white py-1 px-2 rounded"
          type="button"
          @click="submit()"
        >Add Book</button>
      </div>
    </form>
    <div class="max-w-sm mx-auto">
      <ul>
        <li v-for="(book, i) in backlog" :key="i">
          <div
            class="items-center text-center w-full bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 mt-3 rounded flex"
          >
            <template v-if="!isEditing">
              <span class="pl-4">{{ book.book_name }}</span>
              <button
                v-if="!isEditing"
                @click="editSelected()"
                class="ml-auto bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded"
              >Edit</button>
            </template>

            <template v-else>
              <input
                v-model="editedText"
                class="w-8/12 p-2 mr-3 rounded text-black"
                type="text"
                v-on:keydown.enter="submitEdit(i)"
                :placeholder="book.book_name"
              />
              <button
                @click="submitEdit(i)"
                class="ml-auto bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded"
              >Submit</button>
            </template>

            <button
              @click="removeItem(i)"
              class="ml-3 mr-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-700 rounded"
            >X</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      bookNames: "",
      inputBody: "",
      url: "http://localhost:8000/api/",
      isEditing: false,
      editedText: ""
    };
  },
  methods: {
    submit() {
      if (this.inputBody) {
        this.$store.commit('addBook', this.inputBody);
      } else {
        alert("please insert text");
      }
    },
    getBooks() {
      // this.book()
      // axios
      //   .get("http://localhost:8000/api")
      //   .then(res => {
      //     // console.log('Books Retrieved successfully')
      //     this.bookNames = res.data;
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },
    removeItem(index) {
      console.log(this.backlog[index].id)
        this.$store.commit('deleteBook', this.backlog[index].id);
        // this.getBooks();
    },
  //   editSelected(e) {
  //     this.isEditing = true;
  //   },
  //   submitEdit(index) {
  //     if (this.editedText) {
  //       axios
  //         .put(this.url + this.bookNames[index].book_id, {
  //           book_name: this.editedText
  //         })
  //         .then(res => {
  //           // console.log(res);
  //           this.getBooks();
  //         })
  //         .catch(err => {
  //           console.error(err);
  //         });
  //     } else {
  //       alert("please insert text");
  //     }

  //     this.isEditing = false;
  //   }
  },
  computed: {
    ...mapGetters([
      'backlog'
    ])
  },
  mounted() {
  }
};
</script>