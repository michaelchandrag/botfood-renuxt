<template>
   <div class="flex">
    <sidebar-menu class="w-2/12 px-6 pt-8 " />

    <div class="w-7/12 h-screen bg-gray-200 pl-6 pt-10">
     <div>
        <span class="text-title">Laporan Item</span>
      </div>
      <div class="h-8"></div>
      <div class="grid grid-cols-2 gap-4 mr-6">
        <item-summary v-if="!isLoading" v-for="(d,index) in data.summary" :key="index" :channel="d" />
          <div v-if="isLoading" class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
          <div v-if="isLoading" class="bg-gray-300 h-48 rounded-fd animate-pulse"></div> 
      </div>
<div class="h-6"></div>
<div v-if="isLoading" class="bg-gray-300 h-64 rounded-fd animate-pulse mr-6"></div> 
      <div v-if="!isLoading"  class="bg-white rounded-fd p-8 mr-6">
           <table class="table-auto w-full">
              <thead>
                <tr>
                  <th class="py-4 text-text text-center">Nama Item</th>
                  <th class="py-4 text-text text-center">Status</th>
                  <th class="py-4 text-text text-center">Nama Outlet</th>
                  <th class="py-4 text-text text-center">Channel</th>
                  <th class="py-4 text-text text-center">Terakhir Aktif</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="item in data.items" :key="item.id" class="hover:bg-gray-200 border-b">
                      <td class="text-center text-text p-4 rounded-l-fds">{{item.name}}</td>
                        <td class="text-center text-text p-4">
                          <span v-if="item.in_stock>0" class="text-green-500">Aktif</span>
                           <span v-if="item.in_stock<=0" class="text-red-500">Tidak Aktif</span>
                        </td>
                         <td class="text-center text-text p-4 rounded-r-fds">
                           {{item.branch_channel_name}}
                         </td>   
                         <td class="text-text text-center">{{item.branch_channel_channel}}</td>
                         <td class="text-text text-center">{{$moment(item.last_not_active_at).format('D MMM YYYY,HH:mm')}}</td>
                        
                  </tr>
              </tbody>
            </table>
      </div>
    </div>
      <right-sidebar class="w-3/12 pl-6 pt-10" />
   </div>
</template>

<script>
export default 
{
  data() {
    return {
      data: '',
      listLoading: true,
      isLoading: true
    }
  },
  mounted() {
    this.$axios.get('me/items').then(r=> {
      this.data = r.data.data
      this.listLoading = false
      this.isLoading = false
      console.log(r.data.data)
    })
  }
}
</script>