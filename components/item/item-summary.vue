<template>
  <div>
    <!-- go -->
    <div class="bg-white flex gap-4 p-12 rounded-fd">
      <div>
        <img
          v-if="channel.channel == 'GoFood'"
          class="h-18"
          src="~/assets/svg/gofood.svg"
          alt="" />
        <img
          v-if="channel.channel == 'GrabFood'"
          class="h-18"
          src="~/assets/svg/grabfood.svg"
          alt="" />
        <img
          v-if="channel.channel == 'ShopeeFood'"
          class="h-18"
          src="~/assets/svg/shopeefood.svg"
          alt="" />
        <img
          v-if="channel.channel == 'TravelokaEats'"
          class="h-18"
          src="~/assets/svg/travelokaeats.svg"
          alt="" />
      </div>
      <div>
        <span class="text-summary-text">{{ channel.total }} Total Item</span>
        <span class="block font-bold text-summary-title">{{
          channel.channel
        }}</span>
      </div>
    </div>
    <!-- end go -->
  </div>
</template>

<script>
export default {
  props: {
    channel: Object,
  },
  data() {
    return {
      isLoading: true,
    }
  },
}
</script>
