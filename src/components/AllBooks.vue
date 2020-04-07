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
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm font-bold border-4 text-white py-1 px-2"
          type="button"
          @click="submit()"
        >Add Book</button>
      </div>
    </form>
    <div class="max-w-sm mx-auto">
      <ul>
        <li v-for="(book, i) in backlog" :key="i">
          <div
            class="justify-center w-full bg-teal-500 text-white font-bold py-3 px-4 border-b-4 border-teal-700 mt-3 flex"
          >
            <template v-if="!isEditing">
              {{ book.book_name }}
            </template>

            <template v-else>
              <input
                v-model="editedText"
                class="w-8/12 p-2 mr-3 text-black"
                type="text"
                v-on:keydown.enter="submitEdit(book.id)"
                :placeholder="book.book_name"
              />
            </template>
            <button
              @click="showMenu(i)"
              class="ml-auto bg-red-600 hover:bg-red-500 px-2 py-4 border-b-4 border-red-900 hover:border-red-700"
            ><span class="bg-red-900 flex close-button"></span></button>
          </div>
          <div
            class="transition opacity-0 duration-1000 invisible h-0 button-menu content-center  w-full bg-gray-200 text-white font-bold px-4 border-b-4 border-gray-500 flex justify-around"
          >
            <template v-if="!isEditing">
              <button
                v-if="!isEditing"
                @click="editSelected()"
                class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500"
              >Edit</button>
            </template>

            <template v-else>
              <button
                @click="submitEdit(book.id)"
                class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500"
              >Submit</button>
            </template>

            <button
              @click="submitEdit(book.id)"
              class="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500"
            >Reading</button>

            <button
              @click="submitEdit(book.id)"
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
            >done</button>

            <button
              @click="removeItem(i)"
              class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-700"
            >Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      inputBody: "",
      isEditing: false,
      editedText: "",
      toggle: false
    };
  },
  methods: {
    submit() {
      if (this.inputBody) {
        this.$store.commit("addBook", this.inputBody);
      } else {
        alert("please insert text");
      }
    },
    removeItem(index) {
      this.$store.commit("deleteBook", this.backlog[index].id);
    },
    editSelected() {
      this.isEditing = true;
    },
    submitEdit(index) {
      if (this.editedText) {
        this.$store.commit("editBook", {
        id: index,
        edit: this.editedText
        });

        this.isEditing = false;
      } else {
        alert("please insert text");
      }
    },
    showMenu(e) {
      let listItem = document.querySelectorAll('.close-button')[e];
      let listMenu = document.querySelectorAll('.button-menu ')[e];
      listItem.classList.toggle('active')
      listMenu.classList.toggle('invisible')
      listMenu.classList.toggle('h-0')
      listMenu.classList.toggle('py-3')
      listMenu.classList.toggle('opacity-0')
    }
  },
  computed: {
    ...mapGetters(["backlog"])
  }
};
</script>

<style lang="scss">

.close-button {
    --bgColor: #742a2a;
    --height: 3.5px;
    --width: 30px;
    position: relative;
    height: var(--height);  
    width: var(--width);
    background-color: var(--bgColor);
    transition: 2s;
    display: block;
  }

  .close-button:before, 
  .close-button:after {
    content: "";
    position: absolute;
    height: var(--height);  
    width: var(--width);
    background-color: var(--bgColor);
    top: -8px;
    transition: 0.5s;
  }

  .close-button:before {
    top: -8px;
  }

  .close-button:after {
    top: 8px;
  }

  .active {
    &.close-button {
      background: rgba(0, 0, 0, 0);
      transition: 0.5s;
    }

    &.close-button:before {
      transform: rotate(45deg);
      top: 0;
      transition: 1s;
    }

    &.close-button:after {
      transform: rotate(135deg);
      top: 0;
      transition: 1s;
    }
  }
</style>