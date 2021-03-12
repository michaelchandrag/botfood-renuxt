<template>
<div class="mb-4">
        <!--  -->
        <div class=" p-6 bg-white rounded-fd shadow" v-if="!isLoading">
    <div class="flex flex-row items-center gap-4">
      <div>
        <img v-if="channel=='GrabFood'" class="h-16" src="~/assets/svg/grabfood.svg" alt="">
              <img v-if="channel=='GoFood'" class="h-16" src="~/assets/svg/gofood.svg" alt="">
           
      </div>
      <div>
        <span class="text-3xl font-bold block">{{channel}}</span>
        <span class=""> Total Outlet</span>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-6">
      <div>
        <span class="text-sm text-green-600 block">{{data.outlet_open}} Outlet Buka</span>
         <span class="text-sm text-red-600 block">{{data.outlet_closed}} Outlet Tutup</span>
      </div>
      <div>
        <span class="text-sm text-green-600 block">{{data.item_active}} Item Aktif</span>
        <span class="text-sm text-red-600 block">{{data.item_inactive}} Item Tidak Aktif</span>
      </div>
    </div>

    
  </div>
       
        <!-- foood -->
        <div v-if="isLoading" class="h-48 bg-gray-300 w-full rounded-fd animate-pulse mr-6 mb-4 ">

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