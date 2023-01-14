<template>
  <div>
    <label :for="id">{{ label }}</label> <br />
    <input
      class="mt-2 px-3 py-2 rounded-lg text-black"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: "ui-input",
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: [String, Number],
      required: false,
    },
  },
};
</script>
<style scoped></style>
