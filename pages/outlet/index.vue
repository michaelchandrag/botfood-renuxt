<template>
  <div class="flex">
    <sidebar-menu class="w-2/12 px-6 pt-8 " />
    <div class="w-7/12 h-full bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Laporan Outlet</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <div class="grid grid-cols-2 gap-4 mr-6">
          <outlet-channel v-if="!isLoading" v-for="(d,index) in data.summary" :key="index" :channel="d" />
          <div v-if="isLoading" class="bg-gray-300 h-32 rounded-fd animate-pulse"></div>
          <div v-if="isLoading" class="bg-gray-300 h-32 rounded-fd animate-pulse"></div>       
        </div>
        <div class="h-6"></div>
        <!-- table start -->
        <div class="bg-white rounded-fd p-8 mr-6">
         
          <div class="h-2">
          </div>
          <div class="flex gap-4">
            <div class="w-6/12">
            <div class="relative">
               <input type="text" class="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none" placeholder="Nama Outlet">
               <div class="absolute -mt-10 pl-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="#9E9E9E"/>
</svg>
            </div>
            </div>
           
            
            </div>

            
             
             <div class="w-3/12 cursor-pointer items-center relative">
            <div @click.prevent="channelDropdown?channelDropdown=false:channelDropdown=true"  class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
              <div class="flex-auto">
                  <span>{{channelStatus}}</span>
              </div>
              <div>
              <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z" fill="#9E9E9E"/>
</svg>
              </div>
          
            </div>
            <div v-if="channelDropdown" class="absolute w-full">
              <ul class="w-full border-gray-300">
                <li @click.prevent="channelDropdown=false,channelStatus='Grab Food'" class="bg-white px-4 py-3 w-full">Buka</li>
                <li @click.prevent="channelDropdown=false,channelStatus='Go Food'" class="bg-white px-4 py-3 w-full">Tutup</li>
                <li @click.prevent="channelDropdown=false,channelStatus='Semua Channel'" class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Status</li>
              </ul>
            </div>
            </div>


             <div class="w-3/12 cursor-pointer items-center relative">
            <div @click.prevent="statusDropdown?statusDropdown=false:statusDropdown=true"  class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
              <div class="flex-auto">
                  <span>{{outletStatus}}</span>
              </div>
              <div>
              <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z" fill="#9E9E9E"/>
</svg>
              </div>
          
            </div>
            <div v-if="statusDropdown" class="absolute w-full">
              <ul class="w-full border-gray-300">
                <li @click.prevent="statusDropdown=false,outletStatus='Buka'" class="bg-white px-4 py-3 w-full">Buka</li>
                <li @click.prevent="statusDropdown=false,outletStatus='Tutup'" class="bg-white px-4 py-3 w-full">Tutup</li>
                <li @click.prevent="statusDropdown=false,outletStatus='Semua Status'" class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Status</li>
              </ul>
            </div>
            </div>

          </div>
          <div class="mt-6">
            <table class="table-auto w-full">
              <thead>
                <tr>
                  <th class="py-4">Nama Outlet</th>
                  <th class="py-4">Channel</th>
                  <th class="py-4">Status</th>
                  <th class="py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="channel in data.branch_channels" :key="channel.id" class="hover:bg-gray-300">
                      <td class="text-center p-4 rounded-l-fds">{{channel.name}}</td>
                       <td class="text-center p-4">{{channel.channel}}</td>
                        <td class="text-center p-4">
                          <span v-if="channel.is_open" class="text-green-500">Buka</span>
                           <span v-if="!channel.is_open" class="text-red-500">Tutup</span>
                        </td>
                         <td class="text-center p-4 rounded-r-fds">
                           <nuxt-link :to="'/outlet/'+channel.id">Detail</nuxt-link>
                         </td>
                        
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
         
        },
        isLoading: true,
        statusDropdown: false,
        channelDropdown: false,
        outletStatus: 'Semua Status',
        channelStatus: 'Semua Channel'
      }
    },
    middleware: ['auth-ssr'],
    mounted() {
        this.$axios.get('me/branch_channels').then(r=> {
            this.data = r.data.data
            this.isLoading = false
        })
    }
  }
</script>