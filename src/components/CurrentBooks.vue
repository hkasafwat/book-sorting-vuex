<template>
  <div>
    <div class="max-w-sm mx-auto">
      <ul>
        <li v-for="(book, i) in readingNow" :key="i">
          <BookItem v-bind:book="book" v-bind:index="i"></BookItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BookItem from "./BookItem";

export default {
  components: {
    BookItem
  },
  computed: {
    ...mapGetters(["readingNow"])
  }
};
</script>

<style>
</style>