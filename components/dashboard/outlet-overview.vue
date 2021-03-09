<template>
<div>
     <!-- start -->
        <div v-if="!isLoading" class="flex mr-6 bg-white rounded-fd p-8 mb-4 items-center">
          <div class="w-6/12 flex items-center">
            <div>
              <img v-if="channel=='Grab Food'" src="~/assets/svg/grabfood.svg" alt="">
              <img v-if="channel=='Go Food'" src="~/assets/svg/gofood.svg" alt="">
            </div>
            <div class="ml-6">
              <h3 class="text-summary-title block">{{channel}}</h3>
              <span class="text-summary-text block">{{data.outlet_total}} Total Outlet</span>
            </div>

          </div>
          <div class="w-3/12 items-center">
            <span class="block text-summary-text text-green-600">{{data.outlet_open}} Outlet Buka</span>
            <span class="block text-summary-text text-red-600">{{data.outlet_closed}} Outlet Tutup</span>
          </div>
          <div class="w-3/12 items-center">
            <span class="block text-summary-text text-green-600">{{data.item_active}} Item Aktif</span>
            <span class="block text-summary-text text-red-600">{{data.item_inactive}} Item Tidak Aktif</span>
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
                if(!r.item_active) {
                    this.isLoading = true
                } else {
                    this.isLoading = false
                }
            }
        }
    }
}
</script>