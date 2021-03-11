<template>
    <div>
        
         <!-- go -->
         <div class="bg-white flex gap-4 p-12 rounded-fd">
            <div>
              <img style="height:72px" v-if="channel.channel=='GoFood'" src="~/assets/svg/gofood.svg" alt="">
              <img style="height:72px" v-if="channel.channel=='GrabFood'" src="~/assets/svg/grabfood.svg" alt="">
            </div>
            <div>
              <span>{{channel.total}} Total Outlet</span>
              <span class="block font-bold text-3xl">{{channel.channel}}</span>
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