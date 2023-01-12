<template>
  <div class="page__wrapper">
    <home-page></home-page>
  </div>
</template>

<script>
import HomePage from "./views/home/index.vue";

export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

<style scoped>
.page__wrapper {
  @apply bg-[#141624] h-screen text-white;
}
</style>
