<template>
  <div class="flex">
    <sidebar-menu class="w-2/12 px-6 pt-8 " />

    <div class="w-7/12 h-screen bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan Terkini</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <outlet-overview :data="data.GrabFood" channel="Grab Food" />
        <outlet-overview :data="data.GoFood" channel="Go Food" />
        <idle-items-table :items="data.idle_items" />
        <!-- table start -->
       
        <!-- table end -->
      </div>
    </div>
    <div class="w-3/12 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan All in One</span>
        <calendar/>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from '~/components/calendar.vue'
import IdleItemsTable from '~/components/dashboard/idle-items-table.vue'
import outletOverview from '~/components/dashboard/outlet-overview.vue'
  export default {
  components: { outletOverview, IdleItemsTable,Calendar},
   data() {
      return {
        data: {
          GoFood: '',
          GrabFood: '',
          idle_items: {
            items: ''
          }
        },
        isLoading: true
      }
    },
    middleware: ['auth-ssr'],
    mounted() {
        this.$axios.get('me/dashboard').then(r=> {
            this.data = r.data.data
            this.isLoading = false
        })
    }
  }
</script>