<template>
<div>
 <sidebar-menu/>
  <div class="h-20"></div>

  <div class="px-4">
    <outlet-overview-mobile :data="data.GrabFood" channel="GrabFood" />
    <outlet-overview-mobile :data="data.GoFood" channel="GoFood" />
    <outlet-overview-mobile :data="data.ShopeeFood" channel="ShopeeFood" />
  </div>

  <div class="px-4">
    <!-- table start -->
    <div>
      <div v-if="isLoading" class="bg-gray-300 animate-pulse rounded-fd h-64">

      </div>
      <div v-if="!isLoading" class="bg-white rounded-fd p-6 shadow">
        <span class="items-center text-orange-500 inline-block align-middle">
          <svg class="inline-block h-5" fill="orange" viewBox="0 0 24 24">
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
          </svg>
          <span class="ml-2">Item Tidak Aktif Terlama</span>

        </span>
        <div class="h-2">
        </div>
        <div>
          <table class="table-auto w-full">
            <tbody v-if="!isLoading&&!listLoading">
              <tr v-if="!isLoading&&!listLoading&&data.idle_items.items.length<=0">
                <td class="p-20 text-center">
                  <span class="block mx-auto w-full">
                    <svg width="20" height="20" class="mx-auto mb-4" viewBox="0 0 20 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z"
                        fill="#9E9E9E" />
                    </svg>

                  </span>
                  <span class="p-8 m-auto text-gray-500">
                    Data tidak tersedia
                  </span>
                </td>
              </tr>

            </tbody>
            <tbody v-if="!listLoading">
              <tr v-for="item in data.idle_items.items" :key="item.id" class="border-b rounded-fds hover:border-white">
                <td class="py-4 rounded-l-fds">
                  <span class="block text-xs text-gray-600">Terakhir Aktif
                    {{$moment(item.last_not_active_at).format('D MMM YYYY HH:mm')}}</span>
                  <span class="block font-bold">{{item.name}}</span>
                  <span class="block text-xs">{{item.branch_channel_channel}} | {{item.branch_channel_name}}</span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div class="h-24"></div>
    </div>
    <!-- table end -->
  </div>





</div>
</template>

<script>
import outletOverviewMobile from '~/components/dashboard/outlet-overview-mobile.vue'
import SidebarMenu from '~/components/mobile/sidebar-menu.vue'

export default {
  components: { outletOverviewMobile, SidebarMenu },
  layout: 'mobile',
  data() {
    return {
      data: {},
      GoFood: '',
      GrabFood: '',
      ShopeeFood: '',
      idle_items: {
        items: ''
      },
      isLoading: true,
      listLoading: false,
      page: 1,
      total_page: 1,
      showNav: false
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
      this.listLoading = true
      this.page = this.page+parseFloat(v)
      this.changePageNumber()
    },
    changePageNumber() {
      this.listLoading = true
      this.$axios.get('me/dashboard?data=5&page='+this.page).then(r => {
      this.data = r.data.data
      // this.page = r.data.data.idle_items.current_page
      this.total_page = r.data.data.idle_items.total_page
      this.listLoading = false
      this.isLoading = false
    })
    }
  }
}
</script>
