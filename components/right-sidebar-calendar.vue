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
      this.isDownload = true
      this.$axios({
        method: 'GET',
        url: 'me/channel_report?channel=GoFood&issued_at=' + this.formatDate + '&xlsx=true',
        responseType: 'blob',
      }).then(r => {
        this.isDownload = false
        const url = window.URL.createObjectURL(new Blob([r.data], {
          'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }));
        var fileLink = document.createElement('a');
        fileLink.href = url;
        fileLink.setAttribute('download', 'laporan-all-in-one.xlsx');
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
