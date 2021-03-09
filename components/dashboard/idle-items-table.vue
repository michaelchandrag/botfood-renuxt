<template>
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
                <tr class="border-b">
                  <th class="py-4 text-text text-center">Nama Item</th>
                  <th class="py-4 text-text text-center">Nama Outlet</th>
                  <th class="py-4 text-text text-center">Channel</th>
                  <th class="py-4 text-text text-center">Terakhir Aktif</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items.items" :key="item.id" class="hover:bg-gray-200 text-center border-b rounded-fds hover:border-white">
                  <td class="p-4 text-text rounded-l-fds">{{item.name}}</td>
                  <td class="p-4 text-text">{{item.branch_channel_name}}</td>
                  <td class="p-4 text-text">{{item.branch_channel_channel}}</td>
                  <td class="p-4 text-text rounded-r-fds">{{$moment(item.last_not_active_at).format('D MMM YYYY HH:mm')}}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
        items: Object
    },
    watch: {
        items: {
            handler(r) {
                if(!r) {
                    this.isLoading = true
                } else {
                    this.isLoading = false
                }
            }
        }
    }

}
</script>