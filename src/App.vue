<template>
  <div class="container max-w-sm mx-auto">
    <div class="mt-2">
      <ul class="flex border-b border-teal-500 justify-center pb-2">
        <li @click="changeTab('none')" class="-mb-px mr-1">
          <router-link
            class="items-center text-center w-full hover:bg-teal-400 bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-600 mt-3 flex"
            to="/"
          >All</router-link>
        </li>
        <li @click="changeTab('reading')" class="mr-1">
          <router-link
            class="items-center text-center w-full hover:bg-teal-400 bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-600 mt-3 flex"
            to="/current"
          >Currently Reading</router-link>
        </li>
        <li @click="changeTab('done')" class="mr-1">
          <router-link
            class="items-center text-center w-full hover:bg-teal-400 bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-600 mt-3 flex"
            to="/done"
          >Done</router-link>
        </li>
      </ul>
    </div>
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
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
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
    changeTab(tab) {
      this.$store.commit("changeTab", tab);
    }
  }
};
</script>