<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <span class="text-title">Laporan Ulasan</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <div class="flex flex-wrap -m-2" v-if="!isLoading">
          <div class="w-full sm:w-6/12 p-2">
            <!-- go -->
            <div class="text-white p-3 text-center mb-5 rounded-md text-xl" style="background:#029835 !important;">Bulan
              Lalu</div>
            <div class="bg-white flex items-center gap-4 p-5 rounded-fd mb-5" v-for="(context, index) in last_month" :key="index">
              <div>
                <div class="w-10 h-10">
                  <img class="w-10 h-10" src="~/assets/png/star.png" alt="">
                </div>
              </div>
              <div class="flex justify-between w-full items-center">
                <div class="block font-bold pt-1 sm:text-md md:text-xl">Bintangnya {{context.rating}}</div>
                <div class="text-md font-bold text-green-600">{{context.total_rating}}</div>
              </div>
            </div>
            <!-- end go -->
          </div>
          <div class="w-full sm:w-6/12 p-2">
            <!-- go -->
            <div class="text-white p-3 text-center mb-5 rounded-md text-xl" style="background:#029835 !important;">Bulan
              Sekarang</div>
            <div class="bg-white flex items-center gap-4 p-5 rounded-fd mb-5" v-for="(context, index) in current_month" :key="index">
              <div>
                <div class="w-10 h-10">
                  <img class="w-10 h-10" src="~/assets/png/star.png" alt="">
                </div>
              </div>
              <div class="flex justify-between w-full items-center">
                <div class="block font-bold pt-1 sm:text-md md:text-xl">Bintangnya {{context.rating}}</div>
                <div class="text-md font-bold text-green-600">{{context.total_rating}}</div>
              </div>
            </div>
            <!-- end go -->
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4" v-if="isLoading">
          <div v-if="isLoading" class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
          <div v-if="isLoading" class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
        </div>
        <div class="h-6"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    data() {
      return {
        isLoading: true,
        last_month: [],
        current_month: [],
      }
    },
    middleware: ['auth-ssr'],
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$axios.get(
            `me/review/stats`
          )
          .then(r => {
            this.isLoading = false;
            this.last_month = r.data.data.last_month;
            this.current_month = r.data.data.this_month;
          })
      },

    },
  }

</script>
