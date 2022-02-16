<template>
  <div>
    <!-- start -->
    <div v-if="!isLoading" class="flex bg-white rounded-fd items-center flex-wrap mb-8 p-3 sm:p-5">
      <div class="w-full  md:w-6/12 sm:w-full flex items-center p-3">
        <div>
          <div style="width:50px;height:50px;">
            <img v-if="channel=='GrabFood'" class="icon-height" src="~/assets/svg/grabfood.svg" alt="">
            <img v-if="channel=='GoFood'" class="icon-height" src="~/assets/svg/gofood.svg" alt="">
            <img v-if="channel=='ShopeeFood'" class="icon-height" src="~/assets/svg/shopeefood.svg" alt="">
            <img v-if="channel=='TravelokaEats'" class="icon-height" src="~/assets/svg/travelokaeats.svg" alt="">
          </div>
        </div>
        <div class="ml-3">
          <h3 class="block text-lg sm:text-xl font-semibold md:text-2xl" style="overflow-wrap:anywhere">{{channel}}</h3>
          <span class="text-sm md:text-summary-text">{{data.outlet_total}} Total Outlet</span>
        </div>

      </div>
      <div class="w-6/12  md:w-3/12 sm:w-6/12 items-center p-3">
        <span class="block text-sm md:text-summary-text text-green-600">{{data.outlet_open}} Outlet Buka</span>
        <span class="block text-sm md:text-summary-text text-red-600">{{data.outlet_closed}} Outlet Tutup</span>
      </div>
      <div class="w-6/12  md:w-3/12 sm:w-6/12 items-center p-3">
        <span class="block text-sm md:text-summary-text text-green-600">{{data.item_active}} Item Aktif</span>
        <span class="block text-sm md:text-summary-text text-red-600">{{data.item_inactive}} Item Tidak Aktif</span>
      </div>
    </div>


    <!-- foood -->
    <div v-if="isLoading" class="h-32 bg-gray-300 rounded-fd animate-pulse mb-4 ">

    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        isLoading: true
      }
    },
    props: {
      data: Object,
      channel: String
    },
    watch: {
      data: {
        handler(r) {
          this.isLoading = false
        }
      }
    }
  }

</script>
