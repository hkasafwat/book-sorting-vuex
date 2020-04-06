<template>
  <div class="container max-w-sm mx-auto">
    <div class="mt-2">
      <ul class="flex border-b border-teal-500 justify-center pb-2">
        <li class="-mb-px mr-1">
          <router-link
            class="items-center text-center w-full hover:bg-teal-400 bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-600 mt-3 rounded flex"
            to="/"
          >All</router-link>
        </li>
        <li class="mr-1">
          <router-link
            class="items-center text-center w-full hover:bg-teal-400 bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-600 mt-3 rounded flex"
            to="/current"
          >Currently Reading</router-link>
        </li>
        <li class="mr-1">
          <router-link
            class="items-center text-center w-full hover:bg-teal-400 bg-teal-500 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-600 mt-3 rounded flex"
            to="/done"
          >Done</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>