<template>
    <div>
        
         <!-- go -->
         <div class="bg-white flex gap-4 p-12 rounded-fd">
            <div>
              <img class="h-18" v-if="channel.channel=='GoFood'" src="~/assets/svg/gofood.svg" alt="">
              <img class="h-18" v-if="channel.channel=='GrabFood'" src="~/assets/svg/grabfood.svg" alt="">
              <img class="h-18" v-if="channel.channel=='ShopeeFood'" src="~/assets/svg/shopeefood.svg" alt="">
              <img class="h-18" v-if="channel.channel=='TravelokaEats'" src="~/assets/svg/travelokaeats.svg" alt="">
            </div>
            <div>
              <span class="text-summary-text">{{channel.total}} Total Item</span>
              <span class="block font-bold text-summary-title">{{channel.channel}}</span>
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