<template>
  <div>
    <!-- start -->
    <div
      v-if="!isLoading"
      style="padding: 24px 32px; margin-bottom: 16px"
      class="flex mr-6 bg-white rounded-fd items-center">
      <div class="w-6/12 flex items-center">
        <div>
          <img
            v-if="channel == 'GrabFood'"
            class="icon-height"
            src="~/assets/svg/grabfood.svg"
            alt="" />
          <img
            v-if="channel == 'GoFood'"
            class="icon-height"
            src="~/assets/svg/gofood.svg"
            alt="" />
          <img
            v-if="channel == 'ShopeeFood'"
            class="icon-height"
            src="~/assets/svg/shopeefood.svg"
            alt="" />
          <img
            v-if="channel == 'TravelokaEats'"
            class="icon-height"
            src="~/assets/svg/travelokaeats.svg"
            alt="" />
        </div>
        <div class="ml-6">
          <h3 class="block" style="font-size: 32px">{{ channel }}</h3>
          <span class="text-summary-text block"
            >{{ data.outlet_total }} Total Outlet</span
          >
        </div>
      </div>
      <div class="w-3/12 items-center">
        <span class="block text-summary-text text-green-600"
          >{{ data.outlet_open }} Outlet Buka</span
        >
        <span class="block text-summary-text text-red-600"
          >{{ data.outlet_closed }} Outlet Tutup</span
        >
      </div>
      <div class="w-3/12 items-center">
        <span class="block text-summary-text text-green-600"
          >{{ data.item_active }} Item Aktif</span
        >
        <span class="block text-summary-text text-red-600"
          >{{ data.item_inactive }} Item Tidak Aktif</span
        >
      </div>
    </div>

    <!-- foood -->
    <div
      v-if="isLoading"
      class="h-32 bg-gray-300 rounded-fd animate-pulse mr-6 mb-4"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    channel: String,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  watch: {
    data: {
      handler(r) {
        this.isLoading = false
      },
    },
  },
}
</script>
