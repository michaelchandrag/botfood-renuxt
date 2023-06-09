<template>
  <div style="padding:24px 32px;margin-bottom:16px;" class="flex bg-white rounded-fd items-center">
    <form class="w-full max-w-m">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-full">
          <label class="block font-bold mb-1 md:mb-0 pr-4">
            History Outlet Rating
          </label>
          <label>
            Daftar rating outlet pada tanggal yang diberikan
          </label>
        </div>
      </div>
      <div class="md:flex md:items-center mb-3 -m-1">
        <div class="w-full md:w-6/12 lg:w-3/12 cursor-pointer items-center relative p-3">
          <vue-datepicker-2 v-model="filters.date" placeholder="Tanggal" style="width:100%;height:50px;"
            :type="'date'" :format="'DD/MM/YYYY'" :value-type="'YYYY-MM-DD'" :disabled-date="disabledDates">
            <template #icon-calendar><img src="~/assets/png/icon-calendar.png" width="20px"
                height="20px"></template>
          </vue-datepicker-2>
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
  import 'vue2-datepicker/index.css';
  import VueDatePicker2 from 'vue2-datepicker';
  export default {
    components: {
      'vue-datepicker-2': VueDatePicker2,
    },
    data() {
      return {
        isDownload: false,
        statusDropdownFrom: false,
        statusDropdownUntil: false,
        filters: {
          date: this.$moment().subtract(1, "days").format('YYYY-MM-DD'),
        }
      }
    },
    methods: {
      download() {
        this.isDownload = true
        var queryParams = {
          date: this.$moment(this.filters.date).format('YYYY-MM-DD')
        }
        var queryParams = new URLSearchParams(queryParams).toString()
        this.$axios({
          method: 'GET',
          url: `me/report/rating_export?${queryParams}`,
          responseType: 'blob',
        }).then(r => {
          this.isDownload = false
          const url = window.URL.createObjectURL(new Blob([r.data], {
            'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }));
          var fileLink = document.createElement('a');
          fileLink.href = url;
          fileLink.setAttribute('download', 'rating-outlet.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
      },
      disabledDates (date) {
        var now = new Date()
        var maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        return date >= maxDate
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
