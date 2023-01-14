<template>
  <div>
    <div class="flex justify-between mb-7">
      <span
        class="mdi mdi-chevron-left-circle-outline text-2xl cursor-pointer"
        @click="$emit('back')"
      ></span>
      <div class="flex">
        <button
          class="flex items-center bg-yellow-500 px-2 py-1 rounded cursor-pointer mr-3"
          @click="print"
        >
          <span class="mdi mdi-printer text-white text-2xl"> </span>
          <span class="text-base ml-1">Print</span>
        </button>
        <button
          class="flex items-center bg-blue-500 px-2 py-1 rounded cursor-pointer mr-3"
          @click="downloadPDF"
        >
          <span
            class="mdi mdi-download text-white text-2xl"
            @click="downloadPDF"
          >
          </span>
          <span class="text-base ml-1">Download PDF</span>
        </button>
      </div>
    </div>
    <div id="print_area">
      <!-- BILL TO -->
      <div class="mb-10">
        <h3 class="text-xl font-medium mb-5 text-yellow-500">Bill To</h3>
        <table id="bill_to" class="w-full">
          <tr class="">
            <th class="text-left p-2 text-xl">Name</th>
            <th class="text-left p-2 text-xl">Email</th>
            <th class="text-left p-2 text-xl">Address</th>
            <th class="text-left p-2 text-xl">City</th>
            <th class="text-left p-2 text-xl">Country</th>
          </tr>
          <tr>
            <td class="p-2 text-lg">{{ this.invoice.billTo.invoiceName }}</td>
            <td class="p-2 text-lg">{{ this.invoice.billTo.email }}</td>
            <td class="p-2 text-lg">{{ this.invoice.billTo.address }}</td>
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
      <!-- PRODUCT LISTS -->
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
          <tr>
            <td class="text-left p-2 text-xl">Total</td>
            <td class="p-2 text-lg">
              {{ this.getTotalPrice(this.invoice.productLists) }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "view-invoice-details",
  components: {},
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

    downloadPDF() {
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
        html: "#item_lists",
        startY: 330,
        styles: {
          minCellHeight: 20,
        },
      });
      doc.save("invoice.pdf");
    },
    async print() {
      let element = document.getElementById("print_area");
      let printWindow = window.open("", "", "height=800,width=1000");
      printWindow.document.write(
        "<html><head><title>Al Qamar Invoice Print</title>"
      );
      printWindow.document.write("</head><body >");
      printWindow.document.write(element.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    },
  },
  beforeMount() {
    this.fetchData();
  },
};
</script>
