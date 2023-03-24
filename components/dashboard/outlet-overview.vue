<template>
  <div>
    <!-- start -->
    <div style="padding:12px 16px;margin-bottom:2px;" v-if="!isLoading" class="bg-white border border-gray-300 rounded-fd items-center">
      <div class="w-6/12 flex items-center">
        <div>
          
          <img v-if="channel == 'GrabFood'" class="icon-height" src="~/assets/svg/grabfood.svg" alt="">
          <img v-if="channel == 'GoFood'" class="icon-height" src="~/assets/svg/gofood.svg" alt="">
          <img v-if="channel == 'ShopeeFood'" class="icon-height" src="~/assets/svg/shopeefood.svg" alt="">
          <img v-if="channel == 'TravelokaEats'" class="icon-height" src="~/assets/svg/travelokaeats.svg" alt="">
        </div>
        <div class="ml-6 md:ml-6">
          <h3 class="block text-md md:text-xl">{{ channel }}</h3>
          <span class=" text-xs md:text-sm block">{{ data.outlet_total }} Total Outlet</span>
        </div>

      </div>
      <div class="flex mt-3">
        <div class="mr-5 items-center">
          <span class="block text-xs md:text-sm text-green-600">{{ data.outlet_open }} Outlet Buka</span>
          <span class="block text-xs md:text-sm text-red-600">{{ data.outlet_closed }} Outlet Tutup</span>
        </div>
        <div class="ml-5 items-center">
          <span class="block text-xs md:text-sm text-green-600">{{ data.item_active }} Item Aktif</span>
          <span class="block text-xs md:text-sm text-red-600">{{ data.item_inactive }} Item Tidak Aktif</span>
        </div>
      </div>

    </div>


    <!-- foood -->
    <div v-if="isLoading" class="h-32 bg-gray-300 rounded-fd animate-pulse mr-6 mb-4 ">

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