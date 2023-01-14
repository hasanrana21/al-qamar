<template>
  <form @submit.prevent="saveInvoice">
    <h3 class="text-3xl font-medium">New Invoice</h3>
    <!-- BILL FROM FORM -->
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
    <!-- BILL TO FORM -->
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
    <!-- PRODUCT LISTS -->
    <h5 class="text-2xl font-medium mt-8 mb-4">Product Lists</h5>
    <div v-if="state.formData.productLists.length">
      <div class="grid grid-flow-row grid-cols-3 gap-6 mb-3">
        <h6 class="text-lg">Item name</h6>
        <h5 class="text-lg">Price</h5>
      </div>
      <div
        v-for="(item, key) in state.formData.productLists"
        :key="key"
        class="grid grid-flow-row grid-cols-3 gap-6 mb-2"
      >
        <h6 class="text-lg">{{ item.name }}</h6>
        <h5 class="text-lg">
          $ {{ item.price }}
          <span
            class="bg-red-500 px-2 ml-4 cursor-pointer rounded-full py-1 text-sm"
            @click="removeItem(key)"
            >X</span
          >
        </h5>
      </div>
    </div>
    <!-- PRODUCT ADD -->
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
    <!-- FORM SUBMIT BUTTON -->
    <div class="flex space-x-4 mt-10 justify-end">
      <ui-button
        label="Cancel"
        buttonWrapper=" !py-2"
        @click="$emit('cancel')"
      ></ui-button>
      <ui-button
        label="Save"
        type="submit"
        buttonWrapper="!bg-yellow-500 !py-2"
      ></ui-button>
    </div>
  </form>
</template>
<script>
import { onBeforeMount, reactive } from "vue";
import UiInput from "@/components/ui/input/index.vue";
import UiButton from "@/components/ui/button/index.vue";
export default {
  name: "create-form",
  components: { UiInput, UiButton },
  setup(props, { emit }) {
    const state = reactive({
      invoiceLists: [],
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
        productLists: [],
      },
      productData: {
        name: "",
        price: "",
      },
    });
    const addProduct = () => {
      if (!state.productData.name && !state.productData.price) return;
      state.formData.productLists.push({
        name: state.productData.name,
        price: state.productData.price,
      });
      state.productData.name = "";
      state.productData.price = "";
    };
    const removeItem = (index) => {
      state.formData.productLists.splice(index, 1);
    };
    const saveInvoice = () => {
      state.invoiceLists.push(state.formData);
      const data = JSON.stringify(state.invoiceLists);

      localStorage.setItem("invoiceLists", data);
      emit("created");
    };

    onBeforeMount(() => {
      const data = JSON.parse(localStorage.getItem("invoiceLists"));
      if (!data) return;
      state.invoiceLists = data;
    });
    return {
      state,
      addProduct,
      saveInvoice,
      removeItem,
    };
  },
};
</script>
<style scoped></style>
