<template>
  <div class="flex">
    <sidebar-menu class="w-2/12 px-6 pt-8 " />
    <div class="w-7/12 h-screen bg-gray-200 pl-6 pt-10">
      <div class="flex items-center gap-4 cursor-pointer" @click.prevent="$router.push('/outlet')">
        <img class="bg-white p-2 rounded-full" src="~/assets/svg/back.svg" alt="">
        <span class="text-title">
          Kembali
        </span>
      </div>
      <div class="h-8"></div>
     
     
      <div  class="flex flex-col">
        <div class="mr-6">
           <div v-if="isLoading" class="rounded-fd w-full h-48 mr-6 bg-gray-300 animate-pulse"> </div>
          <div v-if="!isLoading" class="bg p-8 rounded-fd flex gap-10 items-center">
            <div>
              <img v-if="data.channel=='GrabFood'" class="h-32" src="~/assets/svg/grabfood.svg" alt="">
              <img v-if="data.channel=='GoFood'" class="h-32" src="~/assets/svg/gofood.svg" alt="">
            </div>
            <div>
              <div>
                <span class="text-white font-bold text-xl">{{data.channel}} • </span>
                <span v-if="data.is_open" class="px-4 py-1 bg-green-food rounded-lg text-white">BUKA</span>
                <span v-if="!data.is_open" class="px-4 py-1 bg-red-600 rounded-lg text-white">TUTUP</span>
              </div>
              <div>
                <span class="text-4xl leading-loose font-bold text-white">{{data.name}}</span>

              </div>
            </div>

          </div>
        </div>
        <div class="h-6"></div>
        <!-- table start -->
        <div class="mr-6">
            <div v-if="isLoading" class="rounded-fd w-full h-64 mr-6 bg-gray-300 animate-pulse"> </div>
        </div>
      
        <div v-if="!isLoading" class="bg-white rounded-fd p-8 mr-6">

          <div class="h-2">
          </div>
          <div class="flex gap-4">
            <div class="w-3/12">
              <div @click.prevent="changeTab('outlet')"
                :class="{'border-green-500 text-green-700 bg-green-200':tab=='outlet'}"
                class="flex py-3 px-4 cursor-pointer text-gray-500 text-center border-2 border-gray-200 bg-gray-200 rounded-lg w-full focus:outline-none">
                <span class="mx-auto">Riwayat Outlet</span>
              </div>
            </div>
            <div class="w-3/12">
              <div @click.prevent="changeTab('item')"
                :class="{'border-green-500 text-green-700 bg-green-200':tab=='item'}"
                class="flex py-3 px-4 cursor-pointer text-gray-500 text-center border-2 border-gray-200 bg-gray-200 rounded-lg w-full focus:outline-none">
                <span class="mx-auto">Riwayat Item</span>
              </div>
            </div>

            <!-- tab outlet -->
            <div v-if="tab=='outlet'" class="w-6/12 cursor-pointer items-center relative">
              <div @click.prevent="channelDropdown?channelDropdown=false:channelDropdown=true"
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
                <div class="flex-auto">
                  <span>{{$moment(date).format('DD MMM YYYY')}}</span>
                </div>
                <div>
                  <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                      fill="#9E9E9E" />
                  </svg>
                </div>
              </div>
              <div v-if="channelDropdown" class="absolute w-full">
                <ul class="w-full border-gray-300">
                  <li @click.prevent="channelDropdown=false,channelStatus='Grab Food'"
                    class="bg-white px-4 py-3 w-full">Buka</li>
                  <li @click.prevent="channelDropdown=false,channelStatus='Go Food'" class="bg-white px-4 py-3 w-full">
                    Tutup</li>
                  <li @click.prevent="channelDropdown=false,channelStatus='Semua Channel'"
                    class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Status</li>
                </ul>
              </div>
            </div>
              <!-- end tab outlet -->
                  <!-- start tab item -->

            <div v-if="tab=='item'" class="w-3/12 cursor-pointer items-center relative">
              <div @click.prevent="channelDropdown?channelDropdown=false:channelDropdown=true"
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
                <div class="flex-auto">
                  <span>{{$moment(date).format('DD MMM YYYY')}}</span>
                </div>
                <div>
                  <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                      fill="#9E9E9E" />
                  </svg>
                </div>
              </div>
              <div v-if="channelDropdown" class="absolute w-full">
                <ul class="w-full border-gray-300">
                  <li @click.prevent="channelDropdown=false,channelStatus='Grab Food'"
                    class="bg-white px-4 py-3 w-full">Buka</li>
                  <li @click.prevent="channelDropdown=false,channelStatus='Go Food'" class="bg-white px-4 py-3 w-full">
                    Tutup</li>
                  <li @click.prevent="channelDropdown=false,channelStatus='Semua Channel'"
                    class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Status</li>
                </ul>
              </div>
            </div>
          

        
            <div v-if="tab=='item'" class="w-3/12 cursor-pointer items-center relative">
              <div @click.prevent="channelDropdown?channelDropdown=false:channelDropdown=true"
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
                <div class="flex-auto">
                  <span>Select Item</span>
                </div>
                <div>
                  <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                      fill="#9E9E9E" />
                  </svg>
                </div>
              </div>
              <div v-if="channelDropdown" class="absolute w-full">
                <ul class="w-full border-gray-300">
                  <li @click.prevent="channelDropdown=false,channelStatus='Grab Food'"
                    class="bg-white px-4 py-3 w-full">Buka</li>
                  <li @click.prevent="channelDropdown=false,channelStatus='Go Food'" class="bg-white px-4 py-3 w-full">
                    Tutup</li>
                  <li @click.prevent="channelDropdown=false,channelStatus='Semua Channel'"
                    class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Status</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- end tab item -->

          <!-- table outlet -->

          <div class="mt-6" v-if="tab=='outlet'">
            <table class="table-auto w-full text-text">
              <thead class="border-b">
                <tr>
                  <th class="py-4">Tanggal</th>
                  <th class="py-4">Waktu</th>
                  <th class="py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in history" :key="h.id" class="hover:bg-gray-300 border-b">
                  <td class="text-center p-4 rounded-l-fds">{{$moment(h.created_at).format('DD MMMM YYYY')}}</td>
                  <td class="text-center p-4">{{$moment(h.created_at).format('HH:mm')}}</td>
                  <td class="text-center p-4">
                    <span v-if="h.is_open" class="text-green-500">Buka</span>
                    <span v-if="!h.is_open" class="text-red-500">Tutup</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- end tabel outlet -->
          <!-- start table item -->
          
          <div class="mt-6" v-if="tab=='item'">
          <!-- {{items_idle.history_items[0].id}} -->
            <table class="table-auto w-full text-text">
              <thead class="border-b">
                <tr>
                  <th class="py-4">Tanggal</th>
                  <th class="py-4">Waktu</th>
                  <th class="py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in history" :key="h.id" class="hover:bg-gray-300">
                  <td class="text-center p-4 rounded-l-fds">{{$moment(h.created_at).format('DD MMMM YYYY')}}</td>
                  <td class="text-center p-4">{{$moment(h.created_at).format('HH:mm')}}</td>
                  <td class="text-center p-4">
                    <span v-if="h.is_open" class="text-green-500">Buka</span>
                    <span v-if="!h.is_open" class="text-red-500">Tutup</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- table item end -->


      </div>
    </div>
     <right-sidebar class="w-3/12 pl-6 pt-10" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
         
        },
        history: {},
        items_idle: {},
        isLoading: true,
        statusDropdown: false,
        channelDropdown: false,
        outletStatus: 'Semua Status',
        channelStatus: 'Semua Channel',
        date: new Date(),
        tab: 'outlet'
      }
    },
    middleware: ['auth-ssr'],
    mounted() {
        var id = this.$route.params.id
        var date = this.$moment(this.date).format('YYYY-MM-DD')
        this.$axios.get('me/branch_channel/'+id).then(r=> {
            this.data = r.data.data
            this.isLoading = false
        })
        this.$axios.get('me/branch_channel/'+id+'/history?issued_at='+date+'&data=5').then(r=> {
            this.history = r.data.data
        })
        // console.log($route)
    },
    methods: {
        changeTab(val) {
            this.tab = val
                var id = this.$route.params.id
                 var date = this.$moment(this.date).format('YYYY-MM-DD')
                 var self = this
                if(val=='item') {
                     this.$axios.get('me/history_item/'+id+'?until_created_at='+date+' 23:59:59&data=10&page=1').then(res=> {
                         self.items_idle = res.data.data
                         console.log(res.data.data)
                          this.$axios.get('me/branch_channel/'+id+'/items_idle?issued_at='+date).then(r=> {
            console.log(r)
          })
        })
                }
            }
    }
  }
</script>
<style>
.bg {
  background-image:linear-gradient(90deg,rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3)),url('~/assets/png/background.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>