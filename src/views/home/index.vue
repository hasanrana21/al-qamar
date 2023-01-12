<template lang="">
  <div class="wrapper">
    <div v-if="!state.openForm">
      <div class="header__wrapper">
        <div class="header">
          <h3 class="">Invoices</h3>
          <p>There are 5 invoices available</p>
        </div>
        <ui-button
          label="Create Invoice"
          @click="state.openForm = true"
        ></ui-button>
      </div>
      <ui-table :headers="state.headers">
        <div
          v-for="(item, index) in state.data"
          :key="index"
          class="bg-[#1e2139] w-full grid grid-cols-10 gap-4 my-2 px-4 py-6 rounded-xl"
        >
          <div class="col-span-2">{{ item.name }}</div>
          <div class="col-span-2">{{ item.date }}</div>
          <div class="col-span-2">{{ item.email }}</div>
          <div class="col-span-2">{{ item.bill }}</div>
          <div class="col-span-2">ac</div>
        </div>
      </ui-table>
    </div>
    <create-form v-else></create-form>
  </div>
</template>
<script>
import { reactive } from "vue";
import UiButton from "@/components/ui/button";
import UiTable from "@/components/ui/table/index.vue";
import CreateForm from "@/components/local/home/CreateForm.vue";
export default {
  name: "home-page",
  components: { UiButton, UiTable, CreateForm },
  setup() {
    const state = reactive({
      openForm: false,
      headers: [
        {
          label: "Name",
        },
        {
          label: "Date",
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
      data: [
        {
          name: "Hasan Rana",
          date: "12-09-22",
          email: "hasan@gmail.com",
          bill: "$6999",
        },
        {
          name: "Akkas Ali",
          date: "12-09-22",
          email: "hasan@gmail.com",
          bill: "$6999",
        },
        {
          name: "Jabbar Ali",
          date: "12-09-22",
          email: "hasan@gmail.com",
          bill: "$6999",
        },
      ],
    });
    return {
      state,
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
