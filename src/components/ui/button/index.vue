<template lang="">
  <button class="button__wrapper" type="button">{{ label }}</button>
</template>
<script>
export default {
  name: "ui-button",
  props: {
    label: String,
    required: true,
    default: "",
  },
};
</script>
<style scoped>
.button__wrapper {
  @apply text-xl text-center rounded-full px-8 py-3 bg-blue-700 text-white;
}
</style>
