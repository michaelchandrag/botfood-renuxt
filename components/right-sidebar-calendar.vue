<template>
  <div class="fixed right-0 top-0 bg-white h-screen right-sidebar-calendar flex items-center justify-center p-4 flex-col">
    <div>
      <span class="text-title">Laporan All in One</span>
    </div>
    <div class="h-10"></div>
    <div class="">
      <client-only>
        <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :inline="true" :value="date" :disabledDates="disabledDates"/>
      </client-only>

    </div>
    
    <div class="w-full xl:w-12/12 lg:w-12/12 sm:w-12/12 p-2 cursor-pointer items-center relative text-center">
        <div @click.prevent="itemInStockDropdown?itemInStockDropdown=false:itemInStockDropdown=true"
          class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
          <div class="flex-auto">
            <span v-if="itemInStock==null">Semua Status</span>
            <span v-if="itemInStock==1">Item Aktif</span>
            <span v-if="itemInStock==0">Item Tidak Aktif</span>
          </div>
          <div>
            <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                fill="#9E9E9E" />
            </svg>
          </div>

        </div>
        <div v-if="itemInStockDropdown" class="w-full shadow-sm rounded-b-fds">
          <ul class="w-full border-gray-300">
            <li @click.prevent="itemInStockDropdown=false,itemInStock=null" class="bg-white px-4 py-3 w-full rounded-b-lg border-2">Semua Status</li>
            <li @click.prevent="itemInStockDropdown=false,itemInStock=1" class="bg-white px-4 py-3 w-full border-2">Item Aktif</li>
            <li @click.prevent="itemInStockDropdown=false,itemInStock=0" class="bg-white px-4 py-3 w-full border-2">Item Tidak Aktif</li>
          </ul>
        </div>
      </div>

    <div class="mt-4">
      <button v-if="isDownload"
        class="w-full cursor-not-allowed  rounded-fd p-3 border-2 border-gray-500 bg-gray-200 text-gray-500 focus:outline-none">
        <span class="animate-spin">Downloading . . .</span>

      </button>
      <button v-if="!isDownload"
        class="w-full rounded-fd p-3 border-2 border-green-food bg-green-200 text-green-food focus:outline-none"
        @click.prevent="download()">
        <span v-if="!isDownload">Download All in One</span>
      </button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      formatDate: '',
      isDownload: false,
      itemInStock: null,
      itemInStockDropdown: false,
      disabledDates: {
        to: new Date(Date.now() - 8640000),
        from: new Date()
      }

    }
  },
  watch: {
    // date: {
    //   handler(r) {
    //     this.date = new Date()
    //   }
    // }
  },
  methods: {
    download() {
      var me = this.$store.state.user.user
      var time = this.$moment().format('DD MMM HH.mm')
      var filename = `${time} ${me.name} Performa Outlet`
      this.isDownload = true
      this.$axios({
        method: 'GET',
        url: 'me/channel_report?channel=GoFood&issued_at=' + this.formatDate + '&xlsx=true' + '&item_in_stock=' + this.itemInStock,
        responseType: 'blob',
      }).then(r => {
        this.isDownload = false
        const url = window.URL.createObjectURL(new Blob([r.data], {
          'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }));
        var fileLink = document.createElement('a');
        fileLink.href = url;
        fileLink.setAttribute('download', `${filename}.xlsx`);
        document.body.appendChild(fileLink);
        fileLink.click();
      })
    }
  }
}
</script>

<style>
.vdp-datepicker__calendar {
    width: 100% !important;
    position: static !important;
    border-radius: 16px !important;
    padding: 2rem !important;
}
.vdp-datepicker__calendar .cell.selected {
    background: #029835 !important;
    color: #fff !important;
    border-radius: 8px !important;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border: 1px solid #029835 !important;
    border-radius: 8px !important;
}
</style>
