<template>
  <div
    style="padding: 24px 32px; margin-bottom: 16px"
    class="flex bg-white rounded-fd items-center"
  >
    <form class="w-full max-w-m">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-full">
          <label class="block font-bold mb-1 md:mb-0 pr-4">
            Performa Outlet - Menu Snapshot
          </label>
          <label>
            Laporan rekap performa outlet-menu selama tanggal yang diberikan
          </label>
        </div>
      </div>
      <div class="md:flex mb-3 -m-1 gap-8" style="min-height: 23vh;justify-items: center;align-items: center;">
        <div
          class="w-full md:w-6/12 lg:w-3/12 cursor-pointer items-center relative"
        >
          <vue-datepicker-2
            v-model="filters.date"
            placeholder="Tanggal Operasional"
            style="width: 100%; height: 50px"
            :type="'date'"
            :format="'DD/MM/YYYY'"
            :value-type="'YYYY-MM-DD'"
            :default-value="filters.date"
            :disabled-date="disabledDates"
          >
            <template #icon-calendar
              ><img
                src="~/assets/png/icon-calendar.png"
                width="20px"
                height="20px"
            /></template>
          </vue-datepicker-2>
        </div>
        <div class="flex flex-row gap-5 pb-7">
          <div>
            <label for="">Jam Mulai</label>
            <vue-timepicker v-model="startTimeValue" @change="changeHandler"></vue-timepicker>
          </div>
          <div>
            <label for="">Jam Akhir</label>
            <vue-timepicker v-model="endTimeValue" @change="changeHandlerEnd"></vue-timepicker>
          </div>
        </div>

        <div class="md:w-1/12 p-1"></div>
        <div class="md:w-3/12 p-1">
          <div class="">
            <button
              v-if="isDownload"
              class="cursor-not-allowed shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm"
            >
              <span class="animate-spin">Downloading . . .</span>
            </button>
            <button
              v-if="!isDownload"
              class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm"
              @click.prevent="download()"
            >
              <span v-if="!isDownload">Download</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import VueTimePicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import "vue2-datepicker/index.css";
import VueDatePicker2 from "vue2-datepicker";
export default {
  components: {
    "vue-datepicker-2": VueDatePicker2,
    "vue-timepicker": VueTimePicker,
  },
  data() {
    return {
      isDownload: false,
      statusDropdownFrom: false,
      statusDropdownUntil: false,
      filters: {
        date: this.$moment().subtract(1, "days").format("YYYY-MM-DD"),
      },
      startTimeValue: "09:00",
      endTimeValue: "23:00",
      jamAwal:"",
      jamAkhir:""
    };
  },
  methods: {
    changeHandler(eventData){
      var hasil=eventData.data
     //console.log(hasil)
      this.jamAwal=hasil.HH+":"+hasil.mm
      //console.log(this.jamAwal)
    },
    changeHandlerEnd(eventData){
      var hasil=eventData.data
      this.jamAkhir=hasil.HH+":"+hasil.mm
    },
    download() {
      this.isDownload = true;
      var queryParams = {
        from_snapshot_time: this.$moment(this.filters.date).format(
          "YYYY-MM-DD "+this.jamAwal
        ),
        until_snapshot_time: this.$moment(this.filters.date).format(
          "YYYY-MM-DD "+this.jamAkhir
        ),
        xlsx: true,
      };
      var queryParams = new URLSearchParams(queryParams).toString();
      this.$axios({
        method: "GET",
        url: `me/report/performance_snapshot?${queryParams}`,
        responseType: "blob",
      }).then((r) => {
        this.isDownload = false;
        const url = window.URL.createObjectURL(
          new Blob([r.data], {
            "content-type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.setAttribute("download", "performa-outlet-menu-snapshot.xlsx");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    disabledDates(date) {
      var now = new Date();
      var maxDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      return date >= maxDate;
    },
  },
};
</script>

<style>
.border-date {
  border: 1px solid black;
  padding: 3px;
}

</style>
