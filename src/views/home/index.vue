<template lang="">
  <div class="wrapper">
    <!-- TABLE LISTS -->
    <div v-if="!state.openForm">
      <div class="header__wrapper">
        <div class="header">
          <h3 class="">Invoices</h3>
          <p v-if="state.lists?.length">
            There are {{ state.lists.length }} invoices available
          </p>
        </div>
        <ui-button
          label="Create Invoice"
          @click="state.openForm = true"
        ></ui-button>
      </div>
      <ui-table :headers="state.headers">
        <div
          v-if="state.lists?.length"
          v-for="(item, index) in state.lists"
          :key="index"
          class="bg-[#1e2139] w-full grid grid-cols-10 gap-4 my-2 px-4 py-6 rounded-xl"
        >
          <div class="col-span-2 break-words">
            {{ item.billTo?.invoiceName }}
          </div>
          <div class="col-span-2 break-words">{{ item.billTo?.address }}</div>
          <div class="col-span-2 break-words">{{ item.billTo?.email }}</div>
          <div class="col-span-2 break-words">
            {{ getTotalPrice(item?.productLists) }}
          </div>
          <div class="col-span-2">
            <span
              class="mdi mdi-eye-outline text-white text-2xl cursor-pointer mr-3"
            ></span>
            <span
              class="mdi mdi-eye-outline text-white text-2xl cursor-pointer mr-3"
            ></span>
            <span
              class="mdi mdi-eye-outline text-white text-2xl cursor-pointer mr-3"
            ></span>
          </div>
        </div>
        <div v-else class="text-3xl text-center mt-7">No Data Found</div>
      </ui-table>
    </div>
    <!-- CREATE FORM -->
    <create-form v-else @created="handleCreated"></create-form>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "vue";
import UiButton from "@/components/ui/button";
import UiTable from "@/components/ui/table/index.vue";
import CreateForm from "@/components/local/home/CreateForm.vue";
export default {
  name: "home-page",
  components: { UiButton, UiTable, CreateForm },
  setup() {
    const state = reactive({
      totalPrice: 0,
      openForm: false,
      headers: [
        {
          label: "Name",
        },
        {
          label: "Address",
        },
        {
          label: "Email",
        },
        {
          label: "Bill",
        },
        {
          label: "Action",
        },
      ],
      lists: [],
    });
    const fetchData = () => {
      const data = JSON.parse(localStorage.getItem("invoiceLists"));
      state.lists = data;
    };
    const getTotalPrice = (products) => {
      let totalPrice = 0;
      products.map((item) => {
        totalPrice += parseInt(item?.price);
      });
      return totalPrice;
    };

    const handleCreated = () => {
      fetchData();
      state.openForm = false;
    };
    onBeforeMount(() => {
      fetchData();
    });
    return {
      state,
      getTotalPrice,
      handleCreated,
    };
  },
};
</script>
<style scoped>
.wrapper {
  @apply w-[1100px] py-10 mx-auto;
}
.header__wrapper {
  @apply flex justify-between items-center mb-10;
}
.header h3 {
  @apply text-5xl text-white mb-3;
}
.header p {
  @apply text-sm text-white;
}
.tbody__row {
  @apply bg-[#1e2139];
}
.tbody__td {
  @apply py-6 px-4 first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl;
}
</style>
