<template>
  <div class="flex">
    <sidebar-menu class="w-2/12 px-6 pt-8 " />
    <div class="w-7/12 h-screen bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan Terkini</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <!-- grab food start -->
        <div class="grid grid-cols-3 mr-6 bg-white rounded-fd p-8 mb-4 items-center">
          <div class="flex items-center">
            <div>
              <img src="~/assets/png/grabfood.png" alt="">
            </div>
            <div class="ml-6">
              <h3 class="text-3xl block">Grab Food</h3>
              <span class="block">{{data.GrabFood.outlet_total}} Total Outlet</span>
            </div>

          </div>
          <div>
            <span class="block text-green-600">{{data.GrabFood.outlet_open}} Outlet Buka</span>
            <span class="block text-red-600">{{data.GrabFood.outlet_closed}} Outlet Tutup</span>
          </div>
          <div>
            <span class="block text-green-600">{{data.GrabFood.item_active}} Item Aktif</span>
            <span class="block text-red-600">{{data.GrabFood.item_inactive}} Item Tidak Aktif</span>
          </div>
        </div>
        <!-- end grab foood -->

        <!-- go food start -->
        <div class="grid grid-cols-3 mr-6 bg-white rounded-fd p-8 items-center mb-4">
          <div class="flex items-center">
            <div>
              <img src="~/assets/png/gofood.png" alt="">
            </div>
            <div class="ml-6">
              <h3 class="text-3xl block">Go Food</h3>
              <span class="block">{{data.GoFood.outlet_total}} Total Outlet</span>
            </div>

          </div>
          <div>
            <span class="block text-green-600">{{data.GoFood.outlet_open}} Outlet Buka</span>
            <span class="block text-red-600">{{data.GoFood.outlet_closed}} Outlet Tutup</span>
          </div>
          <div>
            <span class="block text-green-600">{{data.GoFood.item_active}} Item Aktif</span>
            <span class="block text-red-600">{{data.GoFood.item_inactive}} Item Tidak Aktif</span>
          </div>
        </div>
        <!-- end go food foood -->

        <!-- table start -->
        <div class="bg-white rounded-fd p-8 mr-6">
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
                <tr>
                  <th class="py-4">Nama Item</th>
                  <th class="py-4">Nama Outlet</th>
                  <th class="py-4">Channel</th>
                  <th class="py-4">Terakhir Aktif</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="item in data.idle_items.items" :key="item.id" class="hover:bg-gray-300">
                      <td class="text-center p-4 rounded-l-fds">{{item.name}}</td>
                       <td class="text-center p-4">{{item.branch_channel_name}}</td>
                        <td class="text-center p-4">{{item.branch_channel_channel}}</td>
                         <td class="text-center p-4 rounded-r-fds">{{item.last_not_active_at}}</td>
                        
                  </tr>

                  
              </tbody>
            </table>
          </div>
        </div>
        <!-- table end -->
      </div>
    </div>
    <div class="w-3/12 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan All in One</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          GoFood: '',
          GrabFood: '',
          idle_items: {
            items: ''
          }
        },
        isLoading: false
      }
    },
    middleware: ['auth-ssr'],
    mounted() {
        this.$axios.get('me/dashboard').then(r=> {
            this.data = r.data.data
            console.log(r)
        })
    }
  }
</script>