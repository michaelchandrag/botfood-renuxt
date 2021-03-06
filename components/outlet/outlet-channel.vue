<template>
    <div>
        
         <!-- go -->
         <div class="bg-white flex gap-4 p-8 rounded-fd">
            <div>
              <img v-if="channel.channel=='GoFood'" src="~/assets/png/gofood.png" alt="">
              <img v-if="channel.channel=='GrabFood'" src="~/assets/png/grabfood.png" alt="">
            </div>
            <div>
              <span>{{channel.total}} Total Outlet</span>
              <span class="block font-bold text-2xl">{{channel.channel}}</span>
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