<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div class="flex items-center gap-4 cursor-pointer" @click.prevent="$router.push('/outlet')">
        <img class="bg-white p-2 rounded-full" src="~/assets/svg/back.svg" alt="">
        <span class="text-title">
          Kembali
        </span>
      </div>
      <div class="h-8"></div>


      <div class="flex flex-col">
        <div class="">
          <div v-if="isLoading" class="rounded-fd w-full h-48 bg-gray-300 animate-pulse"> </div>
          <div v-if="!isLoading" class="bg p-8 rounded-fd flex gap-10 items-center">
            <div>
              <img v-if="data.channel=='GrabFood'" class="h-32" src="~/assets/svg/grabfood.svg" alt="">
              <img v-if="data.channel=='GoFood'" class="h-32" src="~/assets/svg/gofood.svg" alt="">
              <img v-if="data.channel=='ShopeeFood'" class="h-32" src="~/assets/svg/shopeefood.svg" alt="">
              <img v-if="data.channel=='AirAsiaFood'" class="h-32" src="~/assets/svg/airasiafood.svg" alt="">
              <img v-if="data.channel=='ESBOrder'" class="h-32" src="~/assets/svg/esborder.svg" alt="">
            </div>
            <div>
              <div>
                <span class="text-white font-bold text-xl">{{data.channel}} • </span>
                <span v-if="data.is_open" class="px-4 py-1 bg-green-food rounded-lg text-white">BUKA</span>
                <span v-if="!data.is_open" class="px-4 py-1 bg-red-600 rounded-lg text-white">TUTUP</span>
              </div>
              <div>
                <span class="text-3xl lg:text-4xl pt-2 leading-loose font-bold text-white">{{data.name}}</span>

              </div>
            </div>

          </div>
        </div>
        <div class="h-4"></div>
        <!-- table start -->
        <div class="">
          <div v-if="isLoading" class="rounded-fd w-full h-64  bg-gray-300 animate-pulse"> </div>
        </div>

        <div v-if="!isLoading" class="text-text bg-white rounded-fd p-8">

          <div class="h-2">
          </div>
          <div class="flex flex-wrap -m-2">
            <div class="w-full sm:w-6/12 xl:w-2/12 p-2">
              <div @click.prevent="changeTab('outlet')"
                :class="{'border-green-500 text-green-700 bg-green-200':tab=='outlet'}"
                class="flex py-3 px-4 cursor-pointer text-gray-500 text-center border-2 border-gray-200 bg-gray-200 rounded-lg w-full focus:outline-none">
                <span class="mx-auto">Riwayat Outlet</span>
              </div>
            </div>
            <div class="w-full sm:w-6/12 lg:w-2/12 xl:w-2/12 p-2">
              <div @click.prevent="changeTab('item')"
                :class="{'border-green-500 text-green-700 bg-green-200':tab=='item'}"
                class="flex py-3 px-4 cursor-pointer text-gray-500 text-center border-2 border-gray-200 bg-gray-200 rounded-lg w-full focus:outline-none">
                <span class="mx-auto">Riwayat Item</span>
              </div>
            </div>

            <!-- tab outlet -->
            <div v-if="tab=='outlet'"
              class="w-full sm:w-6/12 xl:w-3/12 p-2 cursor-pointer items-center relative">
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
              <div v-if="channelDropdown" class="absolute -ml-24 right-0 shadow-sm rounded-b-fds">
                <client-only>
                  <date-picker class="w-64 z-10" placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :inline="true"
                    v-model="date" />
                </client-only>
              </div>
            </div>
            <!-- end tab outlet -->
            <!-- start tab item -->

            <div v-if="tab=='item'"
              class="w-full sm:w-6/12 xl:w-3/12 p-2 cursor-pointer items-center relative">
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

              <div v-if="channelDropdown" class="absolute -ml-24 right-0 shadow-sm rounded-b-fds">
                <client-only>
                  <date-picker placeholder="MM/DD/YYYY" class="w-64 z-10" format="MM/dd/yyyy" :inline="true"
                    v-model="date" />
                </client-only>
              </div>
            </div>



            <div v-if="tab=='item'"
              class="w-full sm:w-6/12 xl:w-4/12  p-2 cursor-pointer items-center relative">
              <div @click.prevent="itemDropdown?itemDropdown=false:itemDropdown=true"
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
                <div class="flex-auto">
                  <span v-if="listLoading">Loading...</span>
                  <span v-if="!listLoading">{{selectedItem.slice(0,30)}}
                    <span v-if="selectedItem.length>=31">. . .</span>
                  </span>
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
              <div v-if="itemDropdown" class="absolute w-full shadow-sm rounded-b-fds">
                <ul class="w-full h-64 overflow-auto border-gray-300 h-48">
                  <li @click.prevent="getItemHistory(l.item_id, l.item_name)" v-for="(l,i) in listItems" :key="i"
                    class="bg-white px-4 py-3 w-full border-b hover:bg-gray-200">{{l.item_name}}</li>

                </ul>
              </div>
            </div>
          </div>
          <!-- end tab item -->

          <!-- table outlet -->

          <div class="mt-6" v-if="tab=='outlet'">
            <div class="table-responsive">
              <table class="table-auto w-full text-text">
                <thead class="border-b">
                  <tr>
                    <th class="py-4">Tanggal</th>
                    <th class="py-4">Waktu</th>
                    <th class="py-4">Status</th>
                  </tr>
                </thead>
                <tbody v-if="!listLoading">
                  <tr v-if="!listLoading&&history.length<=0">
                    <td colspan="4" class="p-20 text-center">
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
                <tbody v-if="listLoading&&tab=='item'">
                  <tr class="h-12" v-for="n in 5" :key="n">
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>

                  </tr>
                </tbody>
                <tbody v-if="!listLoading">
                  <tr v-for="(h,i) in sorted" :key="i" v-if='i <= outlet.end && i >=outlet.start '
                    class="hover:bg-gray-300 border-b">
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
            <div class="mt-4 flex items-center float-right">
              <div class="float-right p-2">
                <form @submit.prevent="changePageNumber()">
                  <input class="w-20 h-10 text-center border-2 rounded-md focus:outline-none" type="text"
                    inputmode="numeric" pattern="[0-9]*" v-model="page_outlet">
                  of {{total_page_outlet}}
                </form>
              </div>

              <!-- left -->
              <div v-if="page_outlet==1" class="cursor-not-allowed float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#9E9E9E" />
                </svg>
              </div>

              <div @click.prevent="changeOutletPage(-1)" v-if="page_outlet!=1"
                class="cursor-pointer float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#424242" />
                </svg>
              </div>

              <!-- end left -->

              <!-- right -->
              <div @click.prevent="changeOutletPage(1)" v-if="total_page_outlet>1&&page_outlet<total_page_outlet"
                class="cursor-pointer float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#424242" />
                </svg>
              </div>
              <div v-if="page_outlet==total_page_outlet||total_page_outlet<=1"
                class="cursor-not-allowed float-right p-3 rounded-md border-2">
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

          <!-- end tabel outlet -->
          <!-- start table item -->

          <div class="mt-6" v-if="tab=='item'">
            <!-- {{items_idle.history_items[0].id}} -->
            <div class="table-responsive">
              <table class="table-auto w-full text-text">
                <thead class="border-b">
                  <tr>
                    <th class="py-4">Tanggal</th>
                    <th class="py-4">Waktu</th>
                    <th class="py-4">Status</th>
                  </tr>
                </thead>
                <tbody v-if="!listLoading">
                  <tr v-if="!listLoading&&items_idle.history_items.length<=0">
                    <td colspan="4" class="p-20 text-center">
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
                <tbody v-if="listLoading&&tab=='item'">
                  <tr class="h-12" v-for="n in 5" :key="n">
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>

                  </tr>
                </tbody>
                <tbody v-if="listLoading">
                  <tr class="h-12" v-for="n in 5" :key="n">
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>
                    <td>
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>

                  </tr>
                </tbody>
                <tbody v-if="!listLoading">
                  <tr v-for="i in items_idle.history_items" :key="i.id" class="hover:bg-gray-300 border-b">
                    <td class="text-center p-4 rounded-l-fds">{{$moment(i.created_at).format('DD MMMM YYYY')}}</td>
                    <td class="text-center p-4">{{$moment(i.created_at).format('HH:mm')}}
                    </td>
                    <td class="text-center p-4">
                      <span v-if="i.in_stock==1" class="text-green-500">Aktif</span>
                      <span v-if="i.in_stock==0" class="text-red-500">Tidak Aktif</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 flex items-center float-right">
              <div class="float-right p-2">
                <form @submit.prevent="changePageNumberItem()">
                  <input class="w-20 h-10 text-center border-2 rounded-md focus:outline-none" type="text"
                    inputmode="numeric" pattern="[0-9]*" v-model="page_item">
                  of {{total_page_item}}
                </form>
              </div>

              <!-- left -->
              <div v-if="page_item==1" class="cursor-not-allowed float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#9E9E9E" />
                </svg>
              </div>

              <div @click.prevent="changePageItem(-1)" v-if="page_item!=1"
                class="cursor-pointer float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#424242" />
                </svg>
              </div>

              <!-- end left -->

              <!-- right -->
              <div @click.prevent="changePageItem(1)" v-if="total_page_item>1&&page_item<total_page_item"
                class="cursor-pointer float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#424242" />
                </svg>
              </div>
              <div v-if="page_item==total_page_item||total_page_item<=1"
                class="cursor-not-allowed float-right p-3 rounded-md border-2">
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
        <!-- table item end -->


      </div>
      <!-- <div class="h-8"></div> -->
      <!-- <right-sidebar /> -->
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {},
        history: {},
        items_idle: {},
        isLoading: true,
        statusDropdown: false,
        channelDropdown: false,
        itemDropdown: false,
        outletStatus: 'Semua Status',
        channelStatus: 'Semua Channel',
        date: new Date(),
        selectedItem: {},
        tab: 'outlet',
        listLoading: false,
        listItems: {},
        itemID: '',
        page_outlet: 1,
        total_page_outlet: 1,
        page_item: 1,
        total_page_item: 1,
        outlet: {
          start: 0,
          end: 9
        }
      }
    },
    middleware: ['auth-ssr'],
    computed: {
      sorted() {
        if (!this.isLoading) {
          return this.history
        }
      }
    },
    mounted() {
      var id = this.$route.params.id
      var date = this.$moment(this.date).format('YYYY-MM-DD')
      this.$axios.get('me/branch_channel/' + id).then(r => {
        this.data = r.data.data
        this.isLoading = false
      })
      this.$axios.get('me/branch_channel/' + id + '/history?issued_at=' + date + '&data=10&page=' + this.page_outlet)
        .then(r => {
          this.history = r.data.data
          this.total_page_outlet = Math.ceil(this.history.length / 10)
        })
    },
    watch: {
      date: {
        handler(r) {
          this.listLoading = true
          this.channelDropdown = false
          var id = this.$route.params.id
          var date = this.$moment(this.date).format('YYYY-MM-DD')
          if (this.tab == 'outlet') {
            this.$axios.get('me/branch_channel/' + id + '/history?issued_at=' + date + '&data=10&page=1').then(r => {
              this.history = r.data.data
              this.page_outlet = 1
              this.total_page_outlet = Math.ceil(this.history.length / 10)
              this.listLoading = false
            })
          } else {
            this.$axios.get('me/history_item/' + this.itemID + '?until_created_at=' + date + ' 23:59:59&data=10&page=1')
              .then(res => {
                this.items_idle = res.data.data
                this.listLoading = false
                this.item = r.data.data.current_page
                this.total_item = r.data.data.total_page
              })
          }

        }
      }
    },
    methods: {
      changeTab(val) {
        this.listLoading = true
        this.tab = val
        var id = this.$route.params.id
        var date = this.$moment(this.date).format('YYYY-MM-DD')

        // jika tab item
        if (val == 'item') {
          this.$axios.get('me/branch_channel/' + id + '/items_idle?issued_at=' + date).then(r => {
            this.listItems = r.data.data
            this.selectedItem = r.data.data[0].item_name
            this.itemID = r.data.data[0].item_id
            this.$axios.get('me/history_item/' + r.data.data[0].item_id + '?until_created_at=' + date + ' 23:59:59')
              .then(res => {
                this.items_idle = res.data.data
                this.listLoading = false
                this.page_item = res.data.data.current_page
                this.total_page_item = res.data.data.total_page
              })
          })

          // jika tab outlet
        } else {
          this.$axios.get('me/branch_channel/' + id + '/history?issued_at=' + date + '&data=10&page=1').then(r => {
            this.history = r.data.data
            this.listLoading = false
            this.page_outlet = 1
            this.total_page_outlet = Math.ceil(this.history.length / 10)
          })
        }
      },
      getItemHistory(id, name) {
        this.itemDropdown = false
        this.itemID = id
        var date = this.$moment(this.date).format('YYYY-MM-DD')
        this.selectedItem = name
        this.$axios.get('me/history_item/' + id + '?until_created_at=' + date + ' 23:59:59&data=10&page=1').then(
          res => {
            this.items_idle = res.data.data
            this.listLoading = false
            this.page_item = res.data.data.current_page
            this.total_page_item = res.data.data.total_page
          })
      },
      changePageItem(v) {
        this.page_item = this.page_item + parseFloat(v)
        this.changePageNumberItem()
      },
      changePageNumberItem() {
        this.listLoading = true
        var id = this.itemID
        var date = this.$moment(this.date).format('YYYY-MM-DD')
        var page = 'page=' + this.page_item
        this.$axios.get('me/history_item/' + id + '?until_created_at=' + date + ' 23:59:59&data=10&' + page).then(
          res => {
            this.items_idle = res.data.data
            this.listLoading = false
            this.page_item = res.data.data.current_page
            this.total_page_item = res.data.data.total_page
          })
      },
      changeOutletPage(v) {
        // return this.outlet_page = this.outlet_page+parseInt(v)
        this.page_outlet = this.page_outlet + parseInt(v)
        if (v === 1) {
          this.outlet.end = this.outlet.end + 9
          this.outlet.start = this.outlet.start + 9
        } else {
          this.outlet.end = this.outlet.end - 9
          this.outlet.start = this.outlet.start - 9
        }
      }

    }
  }

</script>
<style>
  .bg {
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3)), url('~/assets/png/background.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .vdp-datepicker__calendar {
    width: 100% !important;
    position: static !important;
    border-radius: 8px !important;
    padding: 2rem !important;
  }

  .vdp-datepicker__calendar .cell.selected {
    background: #029835 !important;
    color: #fff !important;
    border-radius: 4px !important;
  }

  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border: 1px solid #029835 !important;
    border-radius: 4px !important;
  }

</style>
