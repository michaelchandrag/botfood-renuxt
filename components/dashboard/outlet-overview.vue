<template>
<div>
     <!-- start -->
        <div v-if="!isLoading" class="grid grid-cols-3 mr-6 bg-white rounded-fd p-8 mb-4 items-center">
          <div class="flex items-center">
            <div>
              <img v-if="channel=='Grab Food'" src="~/assets/png/grabfood.png" alt="">
              <img v-if="channel=='Go Food'" src="~/assets/png/gofood.png" alt="">
            </div>
            <div class="ml-6">
              <h3 class="text-3xl block">{{channel}}</h3>
              <span class="block">{{data.outlet_total}} Total Outlet</span>
            </div>

          </div>
          <div>
            <span class="block text-green-600">{{data.outlet_open}} Outlet Buka</span>
            <span class="block text-red-600">{{data.outlet_closed}} Outlet Tutup</span>
          </div>
          <div>
            <span class="block text-green-600">{{data.item_active}} Item Aktif</span>
            <span class="block text-red-600">{{data.item_inactive}} Item Tidak Aktif</span>
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