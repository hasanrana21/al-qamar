<template>
  <div>
    <div class="flex justify-end">
      <button
        class="flex items-center bg-yellow-500 px-2 py-1 rounded cursor-pointer mr-3"
      >
        <span class="mdi mdi-printer text-white text-2xl"> </span>
        <span class="text-base ml-1">Print</span>
      </button>
      <button
        class="flex items-center bg-blue-500 px-2 py-1 rounded cursor-pointer mr-3"
        @click="generate"
      >
        <span class="mdi mdi-download text-white text-2xl" @click="downloadPDF">
        </span>
        <span class="text-base ml-1">Download PDF</span>
      </button>
    </div>
    <div class="mb-10">
      <h3 class="text-xl font-medium mb-5 text-yellow-500">Bill To</h3>
      <table id="bill_to" class="w-full">
        <tr class="">
          <th class="text-left p-2 text-xl">Name</th>
          <th class="text-left p-2 text-xl">Email</th>
          <th class="text-left p-2 text-xl">Address</th>
          <th class="text-left p-2 text-xl">Bill</th>
          <th class="text-left p-2 text-xl">City</th>
          <th class="text-left p-2 text-xl">Country</th>
        </tr>
        <tr>
          <td class="p-2 text-lg">{{ this.invoice.billTo.invoiceName }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billTo.email }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billTo.address }}</td>
          <td class="p-2 text-lg">
            {{ this.getTotalPrice(this.invoice.productLists) }}
          </td>
          <td class="p-2 text-lg">{{ this.invoice.billTo.city }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billTo.country }}</td>
        </tr>
      </table>
    </div>
    <!-- BILL FROM -->
    <div class="mb-5">
      <h3 class="text-xl font-medium mb-5 text-yellow-500">Bill From</h3>
      <table id="bill_from" class="w-full">
        <tr class="">
          <th class="text-left p-2 text-xl">Name</th>
          <th class="text-left p-2 text-xl">Email</th>
          <th class="text-left p-2 text-xl">Address</th>
          <th class="text-left p-2 text-xl">City</th>
          <th class="text-left p-2 text-xl">Country</th>
        </tr>
        <tr>
          <td class="p-2 text-lg">{{ this.invoice.billFrom.invoiceName }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billFrom.email }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billFrom.address }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billFrom.city }}</td>
          <td class="p-2 text-lg">{{ this.invoice.billFrom.country }}</td>
        </tr>
      </table>
    </div>
    <div class="mb-5">
      <h3 class="text-xl font-medium mb-5 text-yellow-500">Bill From</h3>
      <table id="item_lists" class="w-full">
        <tr class="">
          <th class="text-left p-2 text-xl">Product Name</th>
          <th class="text-left p-2 text-xl">Price</th>
        </tr>
        <tr v-for="(item, key) in this.invoice.productLists" :key="key">
          <td class="p-2 text-lg">{{ item.name }}</td>
          <td class="p-2 text-lg">{{ item.price }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import VueHtml2pdf from "vue-html2pdf";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  components: {
    // VueHtml2pdf,
  },
  data() {
    return {
      invoice: {},
    };
  },
  methods: {
    fetchData() {
      const data = JSON.parse(localStorage.getItem("invoice"));
      this.invoice = data;
    },
    getTotalPrice(products) {
      let totalPrice = 0;
      products.map((item) => {
        totalPrice += parseInt(item?.price);
      });
      return totalPrice;
    },
    generate() {
      var doc = new jsPDF("p", "pt");
      var y = 20;
      doc.setLineWidth(2);
      doc.text(220, (y = y + 10), "Invoice Details");
      doc.text(40, (y = y + 30), "Bill To");
      doc.autoTable({
        html: "#bill_to",
        startY: 70,
        styles: {
          minCellHeight: 40,
        },
      });
      doc.text(40, (y = y + 130), "Bill From");
      doc.autoTable({
        html: "#bill_from",
        startY: 200,
        styles: {
          minCellHeight: 40,
        },
      });
      doc.text(40, (y = y + 130), "Product Lists");
      doc.autoTable({
        theme: "plain",
        html: "#item_lists",
        startY: 330,
        styles: {
          minCellHeight: 20,
        },
      });
      doc.save("invoice.pdf");
    },
  },
  beforeMount() {
    this.fetchData();
  },
};
</script>
