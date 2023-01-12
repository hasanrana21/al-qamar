<template>
  <!-- <table class="w-full">
    <thead> -->
  <div class="w-full grid grid-cols-10 gap-4 px-4">
    <div v-for="(item, key) in headers" :key="key" class="table__heading">
      {{ item.label }}
    </div>
  </div>
  <div :class="wrapperClass">
    <slot />
  </div>
  <!-- </thead>
    <tbody>
      <slot />
    </tbody>
  </table> -->
</template>
<script>
export default {
  name: "ui-table",
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => [],
    },
    wrapperClass: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped>
.table__heading {
  @apply col-span-2 text-lg mb-5;
}
</style>
