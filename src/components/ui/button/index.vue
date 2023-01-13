<template lang="">
  <div>
    <button class="button__wrapper" :class="buttonWrapper" type="button">
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  name: "ui-button",
  props: {
    label: {
      type: String,
      required: true,
      default: "",
    },
    buttonWrapper: {
      type: String,
      required: false,
    },
  },
};
</script>
<style scoped>
.button__wrapper {
  @apply text-xl text-center rounded-full px-6 py-3 bg-blue-700 text-white;
}
</style>
