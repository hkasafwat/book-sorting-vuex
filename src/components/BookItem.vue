<template>
  <div id="BookItem">
    <div
      class="justify-center w-full bg-teal-500 text-white font-bold py-3 px-4 border-b-4 border-teal-700 mt-3 flex"
    >
      <template v-if="!isEditing">
        <span class="p-2 pt-3 text-lg">{{ book.book_name }}</span>
      </template>

      <template v-else>
        <input
          v-model="editedText"
          class="w-10/12 p-2 mr-3 text-black"
          type="text"
          v-on:keydown.enter="submitEdit(book.id)"
          :placeholder="book.book_name"
        />
      </template>
      <button
        @click="showMenu(index)"
        class="ml-auto h-12 bg-yellow-500 hover:bg-yellow-400 px-2 py-4 border-b-4 border-yellow-800 hover:border-yellow-700"
      >
        <span class="bg-yellow-800 flex close-button"></span>
      </button>
    </div>
    <div
      class="transition opacity-0 duration-1000 invisible h-0 button-menu content-center w-full bg-gray-200 text-white font-bold px-4 border-b-4 border-gray-500 flex justify-around"
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
        @click="changeStatus({ status: 'reading', id : book.id })"
        class="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500"
      >Reading</button>

      <button
        @click="changeStatus({ status: 'done', id : book.id })"
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
      >done</button>

      <button
        @click="removeItem(book.id)"
        class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-700"
      >Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    index: Number
  },
  data() {
    return {
      isEditing: false,
      editedText: "",
      toggle: false
    };
  },
  methods: {
    removeItem(index) {
      console.log(index)
      this.$store.commit("deleteBook", index);
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
    changeStatus(status) {
      this.$store.commit("changeStatus", status);
    },
    showMenu(e) {
      let listItem = document.querySelectorAll(".close-button")[e];
      let listMenu = document.querySelectorAll(".button-menu ")[e];
      this.isEditing = false;
      listItem.classList.toggle("active");
      listMenu.classList.toggle("invisible");
      listMenu.classList.toggle("h-0");
      listMenu.classList.toggle("py-3");
      listMenu.classList.toggle("opacity-0");
    }
  }
};
</script>

<style lang="scss">
.close-button {
  --bgColor: #975a16;
  --height: 3.5px;
  --width: 30px;
  position: relative;
  height: var(--height);
  width: var(--width);
  background-color: var(--bgColor);
  transition: 1s;
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