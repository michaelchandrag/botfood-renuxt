<template>
  <div>

    <!-- go -->
    <div class="bg-white flex items-center gap-4 p-10 rounded-fd">
      <div>
        <div class="w-16 h-16">
          <img class="w-16 h-16" v-if="channel.channel=='GoFood'" src="~/assets/svg/gofood.svg" alt="">
          <img class="w-16 h-16" v-if="channel.channel=='GrabFood'" src="~/assets/svg/grabfood.svg" alt="">
          <img class="w-16 h-16" v-if="channel.channel=='ShopeeFood'" src="~/assets/svg/shopeefood.svg" alt="">
          <img class="w-16 h-16" v-if="channel.channel=='TravelokaEats'" src="~/assets/svg/travelokaeats.svg" alt="">
          <img class="w-16 h-16" v-if="channel.channel=='AirAsiaFood'" src="~/assets/svg/airasiafood.svg" alt="">
          <img class="w-16 h-16" v-if="channel.channel=='ESBOrder'" src="~/assets/svg/esborder.svg" alt="">
        </div>
      </div>
      <div>
        <span>{{channel.total}} Total Outlet</span>
        <span  class="block font-bold pt-1 text-xl sm:text-xl md:text-2xl lg:text-summary-title" style="overflow-wrap:anywhere">{{channel.channel}}</span>
      </div>
    </div>
    <!-- end go -->
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
      channel: Object
    },
  }

</script>
