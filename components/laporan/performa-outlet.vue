<template>
  <div style="padding:24px 32px;margin-bottom:16px;" class="flex bg-white rounded-fd items-center">
    <form class="w-full max-w-m">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-full">
          <label class="block font-bold mb-1 md:mb-0 pr-4">
            Performa Outlet
          </label>
          <label>
            Rekap performa dari rata-rata outlet beroperasi dan rata-rata item aktif dalam jangka waktu yang telah
            ditentukan.
          </label>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6 -m-1">
        <div class="md:w-2/12 p-1">
          <label class="block md:text-right mb-1 md:mb-0 pr-4 text-sm" for="inline-old-password">
            Dari Tanggal
          </label>
        </div>
        <div class="md:w-2/12 p-1 relative" @click.prevent="statusDropdownFrom = !statusDropdownFrom">
          <div class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none cursor-pointer">
            <div class="flex-auto">
              <span>{{$moment(filters.fromDate).format('DD MMM YYYY')}}</span>
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
          <div v-if="statusDropdownFrom" class="absolute -ml-24 right-0 shadow-sm rounded-b-fds z-10">
            <client-only>
              <date-picker class="w-64 z-10" format="YYYY-MM-DD" v-model="filters.fromDate" :inline="true"
                autoclose="true" />
            </client-only>
          </div>
        </div>
        <div class="md:w-2/12 p-1">
          <label class="block md:text-right mb-1 md:mb-0 pr-4 text-sm" for="inline-old-password">
            Sampai Tanggal
          </label>
        </div>
        <div class="md:w-2/12 p-1 relative" @click.prevent="statusDropdownUntil = !statusDropdownUntil">
          <div class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none cursor-pointer">
            <div class="flex-auto">
              <span>{{$moment(filters.untilDate).format('DD MMM YYYY')}}</span>
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
          <div v-if="statusDropdownUntil" class="absolute -ml-24 right-0 shadow-sm rounded-b-fds z-10">
            <client-only>
              <date-picker class="w-64 z-10" format="YYYY-MM-DD" v-model="filters.untilDate" :inline="true"
                autoclose="true" />
            </client-only>
          </div>
        </div>
        <div class="md:w-1/12 p-1">
        </div>
        <div class="md:w-3/12 p-1">
          <div class="">
            <button v-if="isDownload"
              class="cursor-not-allowed shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm">
              <span class="animate-spin">Downloading . . .</span>
            </button>
            <button v-if="!isDownload"
              class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm"
              @click.prevent="download()">
              <span v-if="!isDownload">Download</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isDownload: false,
        statusDropdownFrom: false,
        statusDropdownUntil: false,
        filters: {
          fromDate: this.$moment().subtract(7, "days").format('YYYY-MM-DD'),
          untilDate: this.$moment().subtract(1, "days").format('YYYY-MM-DD')
        }
      }
    },
    methods: {
      download() {
        this.isDownload = true
        var queryParams = {
          start_date: this.$moment(this.filters.fromDate).format('YYYY-MM-DD 00:00:00'),
          end_date: this.$moment(this.filters.untilDate).format('YYYY-MM-DD 23:59:59'),
          xlsx: true
        }
        var queryParams = new URLSearchParams(queryParams).toString()
        this.$axios({
          method: 'GET',
          url: `me/report/atp_period_export?${queryParams}`,
          responseType: 'blob',
        }).then(r => {
          this.isDownload = false
          const url = window.URL.createObjectURL(new Blob([r.data], {
            'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }));
          var fileLink = document.createElement('a');
          fileLink.href = url;
          fileLink.setAttribute('download', 'laporan-performa-outlet.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
      }
    }
  }

</script>

<style>
  .border-date {
    border: 1px solid black;
    padding: 3px;
  }

</style>
