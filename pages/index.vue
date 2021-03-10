<template>
  <div class="flex">
    <left-sidebar class="md:w-2/12 px-6 pt-8 " />

    <div class="md:w-7/12 bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan Terkini</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <outlet-overview :data="data.GrabFood" channel="Grab Food" />
        <outlet-overview :data="data.GoFood" channel="Go Food" />

        <!-- table start -->
         <div>
         <div v-if="isLoading" class="bg-gray-300 animate-pulse mr-6 rounded-fd h-64">
     
         </div>
         <div v-if="!isLoading" class="bg-white rounded-fd p-8 mr-6">
          <span class="items-center text-orange-500 inline-block align-middle">
            <svg class="inline-block h-5" fill="orange" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
            </svg>
            Item tidak aktif terlama
          </span>
          <div class="h-6">
          </div>
          <div>
            <table class="table-auto w-full">
              <thead>
                <tr class="border-b border-t">
                  <th class="py-4 text-text text-center">Nama Item</th>
                  <th class="py-4 text-text text-center">Nama Outlet</th>
                  <th class="py-4 text-text text-center">Channel</th>
                  <th class="py-4 text-text text-center">Terakhir Aktif</th>
                </tr>
              </thead>
               <tbody v-if="!isLoading">
                <tr v-if="!isLoading&&data.idle_items.items.length<=0">
                  <td colspan="4" class="p-20 text-center">
                    <span class="block mx-auto w-full">
                      <svg width="20" height="20" class="mx-auto mb-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z" fill="#9E9E9E"/>
</svg>

                    </span>
                     <span class="p-8 m-auto text-gray-500">
                  Data tidak tersedia
                </span>
                  </td>
                </tr>
               
              </tbody>
              <tbody>
                <tr v-for="item in data.idle_items.items" :key="item.id" class="hover:bg-gray-200 text-center border-b rounded-fds hover:border-white">
                  <td class="p-4 text-text rounded-l-fds">{{item.name}}</td>
                  <td class="p-4 text-text">{{item.branch_channel_name}}</td>
                  <td class="p-4 text-text">{{item.branch_channel_channel}}</td>
                  <td class="p-4 text-text rounded-r-fds">{{$moment(item.last_not_active_at).format('D MMM YYYY HH:mm')}}</td>
                </tr>
              </tbody>
            </table>

            <div class="mt-4 flex items-center float-right">
                  <div class="float-right p-2">
                <form @submit.prevent="changePageNumber()"></form>
                <input class="w-20 h-10 text-center border-2 rounded-md focus:outline-none" type="text"
                  inputmode="numeric" pattern="[0-9]*" v-model="page">
                of {{total_page}}
              </div>
            
            <!-- left -->
              <div v-if="page==1" class="cursor-not-allowed float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#9E9E9E" />
                </svg>
              </div>

              <div @click.prevent="changePage(1)" v-if="page!=1" class="cursor-pointer float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#424242" />
                </svg>
              </div>

              <!-- end left -->

              <!-- right -->
                <div @click.prevent="changePage(-1)" v-if="total_page>1" class="cursor-pointer float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#424242" />
                </svg>
              </div>
              <div  v-if="page==total_page||total_page<=1" class="cursor-not-allowed float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#9E9E9E" />
                </svg>
              </div>
              <!-- end right -->

            </div>
            <div class="h-20 bg-white"></div>

          </div>
        </div>
        
    </div>
        <!-- table end -->
      </div>
      <div class="h-8"></div>
    </div>
    <right-sidebar-calendar class="w-3/12 pl-6 pt-10" />
  </div>
</template>

<script>
import IdleItemsTable from '~/components/dashboard/idle-items-table.vue'
import outletOverview from '~/components/dashboard/outlet-overview.vue'
import LeftSidebar from '~/components/left-sidebar.vue'
export default {
  components: {
    outletOverview,
    IdleItemsTable,
    LeftSidebar
  },
  data() {
    return {
      data: {},
      GoFood: '',
      GrabFood: '',
      idle_items: {
        items: ''
      },
      isLoading: true,
      page: 1,
      total_page: 1
    }
  },
  middleware: ['auth-ssr'],
  mounted() {
    this.changePageNumber()
  },
   watch: {
    page: {
      handler(r) {
        if(r>this.total_page) {
          this.page = this.total_page
        } else if(r<=0) {
          this.page = 1
        }
      }
    }
  },
  methods: {
    changePage(v) {
      this.page = this.page+parseFloat(v)
      this.changePageNumber()
    },
    changePageNumber() {
      this.$axios.get('me/dashboard?data=10&page='+this.page).then(r => {
      this.data = r.data.data
      this.page = r.data.data.idle_items.current_page
      this.total_page = r.data.data.idle_items.total_page
      this.isLoading = false
      console.log(r)
    })
    }
  }
}
</script>
