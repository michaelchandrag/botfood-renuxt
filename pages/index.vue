<template>
  <div class="flex">
    <sidebar-menu class="md:w-2/12 px-6 pt-8 " />

    <div class="md:w-7/12 sm:w-full h-screen  bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan Terkini</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <outlet-overview :data="data.GrabFood" channel="Grab Food" />
        <outlet-overview :data="data.GoFood" channel="Go Food" />
    
        <!-- table start -->
           <idle-items-table :items="data.idle_items" />
        <!-- table end -->
      </div>
    </div>
    <right-sidebar-calendar class="w-3/12 pl-6 pt-10" />
  </div>
</template>
<script>
import IdleItemsTable from '~/components/dashboard/idle-items-table.vue'
import outletOverview from '~/components/dashboard/outlet-overview.vue'
  export default {
  components: { outletOverview, IdleItemsTable },
   data() {
      return {
        data: {},
          GoFood: '',
          GrabFood: '',
          idle_items: {
            items: ''
          },
        isLoading: true
      }
   },
    middleware: ['auth-ssr'],
    mounted() {
        this.$axios.get('me/dashboard').then(r=> {
            this.data = r.data.data
            this.isLoading = false
            console.log(r.data.data)
        })
    }
  }
</script>
