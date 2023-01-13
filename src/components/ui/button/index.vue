<template lang="">
  <div>
    <button class="button__wrapper" :class="buttonWrapper" :type="type">
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
    type: {
      type: String,
      required: false,
      default: "button",
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
