<template>
  <div>
    <div class="max-w-sm mx-auto">
      <ul>
        <li v-for="(book, i) in readingNow" :key="i">
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
export default {
  computed: {
    readingNow () {
      return this.$store.getters.readingNow
    }
  },
};
</script>

<style>
</style>