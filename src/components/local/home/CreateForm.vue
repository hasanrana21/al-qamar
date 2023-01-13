<template>
  <div>
    <h3 class="text-3xl font-medium">New Invoice</h3>
    <h5 class="text-xl font-medium mt-8 mb-4">Bill From</h5>
    <div class="grid grid-flow-row grid-cols-3 gap-6">
      <ui-input
        id="from_name"
        type="text"
        label="Name"
        placeholder="Write name"
        v-model="state.formData.billFrom.invoiceName"
      ></ui-input>
      <ui-input
        id="from_email"
        type="email"
        label="Email"
        placeholder="Write email"
        v-model="state.formData.billFrom.email"
      ></ui-input>
      <ui-input
        id="from_address"
        type="text"
        label="Street address"
        placeholder="Write address"
        v-model="state.formData.billFrom.address"
      ></ui-input>
      <ui-input
        id="from_city"
        type="text"
        label="City"
        placeholder="Write city"
        v-model="state.formData.billFrom.city"
      ></ui-input>
      <ui-input
        id="from_country"
        type="text"
        label="Country"
        placeholder="Write country"
        v-model="state.formData.billFrom.country"
      ></ui-input>
    </div>
    <h5 class="text-xl font-medium mt-8 mb-4">Bill To</h5>
    <div class="grid grid-flow-row grid-cols-3 gap-6">
      <ui-input
        id="to_name"
        type="text"
        label="Name"
        placeholder="Write name"
        v-model="state.formData.billTo.invoiceName"
      ></ui-input>
      <ui-input
        id="to_email"
        type="email"
        label="Email"
        placeholder="Write email"
        v-model="state.formData.billTo.email"
      ></ui-input>
      <ui-input
        id="to_address"
        type="text"
        label="Street address"
        placeholder="Write address"
        v-model="state.formData.billTo.address"
      ></ui-input>
      <ui-input
        id="to_city"
        type="text"
        label="City"
        placeholder="Write city"
        v-model="state.formData.billTo.city"
      ></ui-input>
      <ui-input
        id="to_country"
        type="text"
        label="Country"
        placeholder="Write country"
        v-model="state.formData.billTo.country"
      ></ui-input>
    </div>
    <h5 class="text-2xl font-medium mt-8 mb-4">Product Lists</h5>
    <div v-if="state.productLists.length">
      <div class="grid grid-flow-row grid-cols-3 gap-6 mb-3">
        <h6 class="text-lg">Item name</h6>
        <h5 class="text-lg">Price</h5>
      </div>
      <div
        v-for="(item, key) in state.productLists"
        :key="key"
        class="grid grid-flow-row grid-cols-3 gap-6 mb-2"
      >
        <h6 class="text-lg">{{ item.name }}</h6>
        <h5 class="text-lg">
          $ {{ item.price }}
          <span>X</span>
        </h5>
      </div>
    </div>
    <div class="grid grid-flow-row grid-cols-3 gap-6 mt-5">
      <ui-input
        id="product_name"
        type="text"
        label="Product Name"
        placeholder="Write product name"
        v-model="state.productData.name"
      ></ui-input>
      <div class="flex space-x-4 items-end">
        <ui-input
          id="product_price"
          type="text"
          label="Product Price"
          placeholder="Write product price"
          v-model="state.productData.price"
        ></ui-input>
        <ui-button
          label="Add"
          buttonWrapper="!text-lg !py-2"
          @click="addProduct"
        ></ui-button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import UiInput from "@/components/ui/input/index.vue";
import UiButton from "@/components/ui/button/index.vue";
export default {
  name: "create-form",
  components: { UiInput, UiButton },
  setup() {
    const state = reactive({
      formData: {
        billFrom: {
          invoiceName: "",
          email: "",
          address: "",
          city: "",
          country: "",
        },
        billTo: {
          invoiceName: "",
          email: "",
          address: "",
          city: "",
          country: "",
        },
      },
      productData: {
        name: "",
        price: "",
      },
      productLists: [],
    });
    const addProduct = () => {
      state.productLists.push({
        name: state.productData.name,
        price: state.productData.price,
      });
    };
    return {
      state,
      addProduct,
    };
  },
};
</script>
<style scoped></style>
