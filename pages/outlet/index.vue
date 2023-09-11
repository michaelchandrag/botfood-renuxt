<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      </div>
      <div>
        <span class="text-title">Laporan Outlet</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-col ">
        <div class="flex flex-wrap -m-2" v-if="!isLoading">
          <outlet-summary v-for="(d,index) in data.summary" :key="index" :channel="d" class="w-full sm:w-6/12 p-2" />
        </div>
        <div class="grid grid-cols-2 gap-4" v-if="isLoading">
          <div v-if="isLoading" class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
          <div v-if="isLoading" class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
        </div>
        <div class="h-6"></div>
        <div v-if="isLoading" class="bg-gray-300 h-64 rounded-fd animate-pulse"></div>
        <!-- table start -->
        <div v-if="!isLoading" class="bg-white rounded-fd p-8 text-text">

          <div class="h-2">
          </div>
          <div class="flex flex-wrap -m-2">
            <div class="w-full xl:w-4/12 lg:w-4/12 p-2">
              <div class="relative">
                <form @submit.prevent="getData">
                  <input @change.prevent="getData" type="text"
                    class="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none" v-model="search"
                    placeholder="Nama Outlet">
                </form>
                <div class="absolute top-0 pt-3 pl-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                      fill="#9E9E9E" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="w-full xl:w-3/12 lg:w-3/12  sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div @click.prevent="channelDropdown?channelDropdown=false:channelDropdown=true"
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
                <div class="flex-auto">
                  <span v-if="outletChannel=='GrabFood'">GrabFood</span>
                  <span v-if="outletChannel=='GoFood'">GoFood</span>
                  <span v-if="outletChannel=='ShopeeFood'">ShopeeFood</span>
                  <span v-if="outletChannel=='AirAsiaFood'">AirAsiaFood</span>
                  <span v-if="outletChannel==null">Semua Platform</span>
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
              <div v-if="channelDropdown" class="absolute w-full shadow-sm rounded-b-fds">
                <ul class="w-full border-gray-300">
                  <li @click.prevent="channelDropdown=false,outletChannel='GrabFood',getData()"
                    class="bg-white px-4 py-3 w-full">GrabFood</li>
                  <li @click.prevent="channelDropdown=false,outletChannel='GoFood',getData()"
                    class="bg-white px-4 py-3 w-full">GoFood</li>
                  <li @click.prevent="channelDropdown=false,outletChannel='ShopeeFood',getData()"
                    class="bg-white px-4 py-3 w-full">ShopeeFood</li>
                  <li @click.prevent="channelDropdown=false,outletChannel='AirAsiaFood',getData()"
                    class="bg-white px-4 py-3 w-full">AirAsiaFood</li>
                  <li @click.prevent="channelDropdown=false,outletChannel=null,getData()"
                    class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Platform</li>
                </ul>
              </div>
            </div>


            <div class="w-full xl:w-3/12 lg:w-3/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div @click.prevent="statusDropdown?statusDropdown=false:statusDropdown=true"
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none">
                <div class="flex-auto">
                  <span v-if="isOutletOpen">Buka</span>
                  <span v-if="isOutletOpen==false">Tutup</span>
                  <span v-if="isOutletOpen==null">Semua Status (Buka/Tutup)</span>
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
              <div v-if="statusDropdown" class="absolute w-full shadow-sm rounded-b-fds">
                <ul class="w-full border-gray-300">
                  <li @click.prevent="statusDropdown=false,isOutletOpen=1,getData()" class="bg-white px-4 py-3 w-full">
                    Buka</li>
                  <li @click.prevent="statusDropdown=false,isOutletOpen=0,getData()" class="bg-white px-4 py-3 w-full">
                    Tutup</li>
                  <li @click.prevent="statusDropdown=false,isOutletOpen=null,getData()"
                    class="bg-white px-4 py-3 w-full rounded-b-lg">Semua Status (Buka/Tutup)</li>
                </ul>
              </div>
            </div>

            <div class="w-full xl:w-2/12 cursor-pointer items-center relative">
              <div class="">
                <button v-if="isDownload"
                  class="w-full cursor-not-allowed  rounded-fd py-4 border-2 border-gray-500 bg-gray-200 text-gray-500 focus:outline-none">
                  <span class="animate-spin">Downloading . . .</span>

                </button>
                <button v-if="!isDownload"
                  class="w-full rounded-fd py-4 border-2 border-green-food bg-green-200 text-green-food focus:outline-none"
                  @click.prevent="download()">
                  <span v-if="!isDownload">Download</span>
                </button>
              </div>
          </div>

          </div>
          <div class="mt-6">
            <div class="table-responsive">
              <table class="table-auto w-full">
                <thead class="border-b">
                  <tr>
                    <th class="py-4 text-text cursor-pointer" :class="sortKey==='name'?'filter':''"
                      @click.prevent="sortKey='name', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">
                      Nama Outlet
                      <i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'" class="fas"></i>
                    </th>
                    <th class="py-4 text-text cursor-pointer" :class="sortKey==='channel'?'filter':''"
                      @click.prevent="sortKey='channel', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">
                      Channel
                      <i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'" class="fas"></i>
                    </th>
                    <th class="py-4 text-text cursor-pointer" :class="sortKey==='rating'?'filter':''"
                      @click.prevent="sortKey='rating', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">
                      Rating
                      <i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'" class="fas"></i>
                    </th>
                    <th class="py-4 text-text cursor-pointer" :class="sortKey==='is_open'?'filter':''"
                      @click.prevent="sortKey='is_open', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">
                      Status

                      <i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'" class="fas"></i>

                    </th>
                    <th class="py-4 text-text cursor-pointer" :class="sortKey==='items_percentage'?'filter':''"
                      @click.prevent="sortKey='items_percentage', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">
                      Item Tersedia

                      <i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'" class="fas"></i>

                    </th>
                    <th class="py-4 text-text">Aksi</th>
                  </tr>
                </thead>
                <tbody v-if="!listLoading">
                  <tr v-if="!listLoading&&data.branch_channels.length<=0">
                    <td colspan="4" class="p-20 text-center">
                      <span class="block mx-auto w-full">
                        <svg width="20" height="20" class="mx-auto mb-4" viewBox="0 0 20 20" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z"
                            fill="#9E9E9E" />
                        </svg>

                      </span>
                      <span class="p-8 m-auto">
                        Data tidak tersedia
                      </span>
                    </td>
                  </tr>

                </tbody>
                <tbody v-if="listLoading">
                  <tr class="h-12" v-for="n in 10" :key="n">
                    <td v-for="i in 6" :key="i">
                      <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>

                  </tr>
                </tbody>
                <tbody v-if="!listLoading">
                  <tr v-for="(channel, index) in data.branch_channels" :key="channel.id"
                    class="hover:bg-gray-200 border-b">
                    <td class="text-center text-text p-4">{{channel.name}}</td>
                    <td class="text-center text-text p-4">{{channel.channel}}
                      <span v-if="channel.gobiz_is_connected == 1"
                        class="m-1 pr-1 pl-1 focus:outline-none bg-green-200 text-black-500 text-xs rounded-full"
                        disabled><i class="fas fa-check"></i></span>
                    </td>
                    <td class="text-center text-text p-4">
                      <span>{{formatRating(channel.rating)}}</span>
                    </td>
                    <td class="text-center text-text p-4">
                      <span v-if="channel.is_open" class="text-green-500">Buka</span>
                      <span v-if="!channel.is_open">
                        <span class="text-red-500">Tutup</span>
                      </span>
                    </td>
                    <td class="text-center text-text p-4">
                      <span
                        :class="{'text-green-food': parseInt(channel.items_percentage)>=90, 'text-yellow-600': parseInt(channel.items_percentage)>=50&& parseInt(channel.items_percentage)<90 , 'text-red-600':parseInt(channel.items_percentage)<50}">
                        {{`${channel.items_active}/${channel.items_total}`}} ({{parseInt(channel.items_percentage)}}%)

                      </span>
                    </td>
                    <td class="text-center text-text p-4">
                      <div class="flex justify-center flex-wrap">
                        <button
                          class="m-1 focus:outline-none mr-2 bg-yellow-200 text-black-500 text-xs rounded-full px-2 py-1"
                          @click.prevent="showItem(channel.id, index)"><i class="fas fa-eye"></i> Menu</button>
                        <!-- <button v-if="channel.channel == 'GoFood' && channel.gobiz_is_connected == 0"
                          class="m-1 focus:outline-none mr-2 bg-blue-200 text-black-500 text-xs rounded-full px-2 py-1"
                          @click.prevent="checkSeamless(channel)"><i class="fas fa-upload"></i> Hubungkan</button> -->
                        <button v-if="channel.gobiz_is_connected == 1"
                          class="m-1 focus:outline-none mr-2 text-black-500 bg-green-300 text-xs rounded-full px-2 py-1"
                          @click.prevent="handleOpenStatus(channel, false)"><i class="fas fa-store"></i> Ubah
                          Status</button>
                        <nuxt-link :to="'/outlet/'+channel.id"
                          class="bg-gray-200 text-black-500 text-xs rounded-full px-2 py-1 m-1">Detail <i
                            class="fas fa-ellipsis-h"></i></nuxt-link>
                      </div>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 flex items-center float-right">
              <div class="float-right p-2">
                <form>
                  <input @change="getData()" class="w-20 h-10 text-center border-2 rounded-md focus:outline-none"
                    type="text" inputmode="numeric" pattern="[0-9]*" v-model="page">
                  of {{data.total_page}}
                </form>
              </div>

              <!-- left -->
              <div v-if="page==1" class="cursor-not-allowed float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#9E9E9E" />
                </svg>
              </div>

              <div @click.prevent="changePage(-1)" v-if="page!=1"
                class="cursor-pointer float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#424242" />
                </svg>
              </div>

              <!-- end left -->

              <!-- right -->
              <div @click.prevent="changePage(1)" v-if="data.total_page>1&&page<data.total_page"
                class="cursor-pointer float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#424242" />
                </svg>
              </div>
              <div v-if="page==data.total_page||data.total_page<=1"
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
        <!-- table end -->
      </div>

      <!-- modal items -->
      <div v-if="isShowItems" class="fixed top-0 flex items-center z-40 left-0 w-screen h-screen py-1 px-2">
        <div class="w-full max-w-2xl bg-white rounded-fds z-40 mx-auto max-h-full" style="height:auto;overflow-y:auto;">
          <div class="p-4">
            <div class="bg p-6 relative rounded-fd flex gap-10 items-center">
              <div class="absolute top-0 right-0">
                <button @click.prevent="isShowItems=false"
                  class="text-white text-xs sm:text-sm px-3 py-1 text-red-500 mt-4 mr-4 bg-white rounded-full rounded">
                  <i class="fas fa-times-circle"></i> Close
                </button>
              </div>
              <div>
                <div>
                  <span class="text-white font-bold text-sm">{{selectedOutlet.channel}} • </span>
                  <span v-if="selectedOutlet.is_open"
                    class="px-4 py-1 text-xs sm:text-sm bg-green-food rounded-lg text-white">BUKA</span>
                  <span v-else class="px-4 py-1 bg-red-600 text-xs sm:text-sm rounded-lg text-white">TUTUP</span>
                </div>
                <div>
                  <span class="text-xl leading-loose font-bold text-white">{{selectedOutlet.name}}</span>

                </div>
              </div>

            </div>
            <div class="table-responsive">
              <table class="table-auto w-full mt-2">
                <thead class="border-b">
                  <tr>
                    <th class="py-2 text-text">Menu</th>
                    <th class="py-2 text-text">Harga</th>
                    <th class="py-2 text-text">Harga Jual</th>
                    <th class="py-2 text-text">Status</th>
                  </tr>
                </thead>
                <tbody v-if="!listLoading">
                  <tr v-if="!listLoading&&data.branch_channels.length<=0">
                    <td colspan="4" class="p-20 text-center">
                      <span class="block mx-auto w-full">
                        <svg width="20" height="20" class="mx-auto mb-4" viewBox="0 0 20 20" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z"
                            fill="#9E9E9E" />
                        </svg>

                      </span>
                      <span class="p-8 m-auto">
                        Data tidak tersedia
                      </span>
                    </td>
                  </tr>

                </tbody>
                <tbody v-if="listLoading">
                  <tr class="h-12" v-for="n in 10" :key="n">
                    <td v-for="i in 3" :key="i">
                      <div class="h-2 p-2 bg-gray-300 animate-pulse w-full rounded-lg"></div>
                    </td>

                  </tr>
                </tbody>
                <tbody v-if="!listLoading">
                  <tr v-for="menu in items.items" :key="menu.id" class="hover:bg-gray-200 border-b">
                    <td class="text-left text-text p-2">{{menu.name}}</td>
                    <td class="text-center text-text p-2">{{$toIDR(menu.price)}}</td>
                    <td class="text-center text-text p-2">{{$toIDR(menu.selling_price)}}</td>
                    <td class="text-center text-text p-2">

                      <span v-if="menu.in_stock" class="text-green-500">Aktif</span>
                      <span v-if="!menu.in_stock" class="text-red-500">Tidak Aktif</span>

                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 flex items-center float-right">
              <div class="float-right p-2">
                <form>
                  <input @change="changePageItem()" class="w-20 h-10 text-center border-2 rounded-md focus:outline-none"
                    type="text" inputmode="numeric" pattern="[0-9]*" v-model="itemPage">
                  of {{items.total_page}}
                </form>
              </div>

              <!-- left -->
              <div v-if="itemPage==1" class="cursor-not-allowed float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#9E9E9E" />
                </svg>
              </div>

              <div @click.prevent="changeItemPage(-1)" v-if="itemPage!=1"
                class="cursor-pointer float-right mr-2 p-3 rounded-md border-2">
                <svg class="" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                    fill="#424242" />
                </svg>
              </div>

              <!-- end left -->

              <!-- right -->
              <div @click.prevent="changeItemPage(1)" v-if="items.total_page>1&&page<items.total_page"
                class="cursor-pointer float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#424242" />
                </svg>
              </div>
              <div v-if="page==items.total_page||items.total_page<=1"
                class="cursor-not-allowed float-right p-3 rounded-md border-2">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                    fill="#9E9E9E" />
                </svg>
              </div>
              <!-- end right -->

            </div>
          </div>

        </div>
      </div>
      <div v-if="isShowItems" class="fixed top-0 bg-black opacity-20 left-0 z-20 w-screen h-screen"></div>
      <!-- end modal items -->

      <!-- modal seamless -->
      <div v-if="isShowSeamless" class="fixed top-0 flex items-center z-40 left-0 w-screen h-screen py-1 px-2">
        <div class="w-full max-w-xl bg-white rounded-fds z-40 mx-auto max-h-full" style="height:auto;overflow-y:auto;">
          <div class="p-4">
            <div class="bg p-6 relative rounded-fd flex gap-10 items-center">
              <div class="absolute top-0 right-0">
                <button @click.prevent="isShowSeamless=false"
                  class="text-white text-xs sm:text-sm px-3 py-1 text-red-500 mt-4 mr-4 bg-white rounded-full rounded">
                  <i class="fas fa-times-circle"></i> Close
                </button>
              </div>
              <div>
                <div>
                  <span class="text-white font-bold text-sm">{{selectedOutlet.channel}}</span>
                </div>
                <div>
                  <span class="text-xl leading-loose font-bold text-white">{{selectedOutlet.name}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4">
            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block md:text-right mb-1 md:mb-0 pr-4" for="gobiz_phone_number">
                  Nomor HP GoBiz
                </label>
              </div>
              <div class="md:w-2/3">
                <input v-model="connectData.phoneNumber"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="gobiz_phone_number" type="text" placeholder="6282133110099"
                  @keydown="showSendOtpButton = true; showTokenOtp = false">
              </div>
            </div>
            <div v-show="showSendOtpButton" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3"><b>Dengan menekan tombol Kirim OTP, anda menyetujui bahwa BotFood tidak menyimpan
                  data OTP serta data lain yang bersifat privasi ataupun rahasia</b></div>
            </div>
            <div v-show="showSendOtpButton" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button @click="sendOTP"
                  class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button">
                  <span v-if="showSendOtpButton">Kirim OTP</span>
                  <span v-if="!showSendOtpButton">
                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      style="margin: auto; background: none; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;"
                      width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                      <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35"
                        stroke-dasharray="164.93361431346415 56.97787143782138"
                        style="animation-play-state: running; animation-delay: 0s;">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                          values="0 50 50;360 50 50" keyTimes="0;1"
                          style="animation-play-state: running; animation-delay: 0s;"></animateTransform>
                      </circle>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div v-show="showTokenOtp" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block md:text-right mb-1 md:mb-0 pr-4" for="gobiz_otp">
                  OTP
                </label>
              </div>
              <div class="md:w-2/3">
                <input v-model="connectData.otp"
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="gobiz_otp" type="text" placeholder="****">
              </div>
            </div>
            <div v-show="showTokenOtp" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3"><b>Dengan menekan tombol Submit OTP, anda menyetujui bahwa BotFood tidak menyimpan
                  data OTP serta data lain yang bersifat privasi ataupun rahasia</b></div>
            </div>
            <div v-show="showTokenOtp" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button @click="seamlessConnect"
                  class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button">
                  Submit OTP
                </button>
              </div>
            </div>
            <div v-show="errorMessageSeamless.length > 0" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>{{errorMessageSeamless}}</p>
                </div>
              </div>
            </div>
            <div v-show="successMessageSeamless.length > 0" class="md:flex md:items-center mb-6">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                  <p>{{successMessageSeamless}}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div v-if="isShowSeamless" class="fixed top-0 bg-black opacity-20 left-0 z-20 w-screen h-screen"></div>

      <!-- modal open status -->
      <div v-if="isShowOpenStatus" class="fixed top-0 flex items-center z-40 left-0 w-screen h-screen py-1 px-2">
        <div class="w-full max-w-2xl bg-white rounded-fds z-40 mx-auto max-h-full" style="height:auto;overflow-y:auto;">
          <div class="p-4">
            <div class="bg p-6 relative rounded-fd flex gap-10 items-center">
              <div class="absolute top-0 right-0">
                <button @click.prevent="isShowOpenStatus=false"
                  class="text-white text-xs sm:text-sm px-3 py-1 text-red-500 mt-4 mr-4 bg-white rounded-full rounded">
                  <i class="fas fa-times-circle"></i> Close
                </button>
              </div>
              <div>
                <div>
                  <span class="text-white font-bold text-sm">{{selectedOutlet.channel}} • </span>
                </div>
                <div>
                  <span class="text-xl leading-loose font-bold text-white">{{selectedOutlet.name}}</span>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/1">
                  <p class="block mb-1 md:mb-0 pr-4" v-html="openStatusData.text"></p>
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/1 mx-auto">
                  <button v-if="openStatusData.confirm"
                    class="cursor-not-allowed shadow bg-gray-400 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-2">
                    <span class="animate-spin">Mengubah . . .</span>

                  </button>
                  <button v-if="!openStatusData.confirm"
                    class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-6 mb-2"
                    @click.prevent="handleOpenStatus(selectedOutlet, true)">
                    <span v-if="!isDownload">Lanjutkan</span>
                  </button>
                  <button v-if="!openStatusData.confirm" @click="isShowOpenStatus = false"
                    class="shadow bg-gray-100 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded mb-2"
                    type="button">Kembali</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div v-if="isShowOpenStatus" class="fixed top-0 bg-black opacity-20 left-0 z-20 w-screen h-screen"></div>
      <!-- end modal open status -->

    </div>
  </div>
</template>
<script>
  export default {

    data() {
      return {
        isDownload: false,
        data: {},
        sorted: {},
        search: '',
        page: 1,
        isLoading: true,
        statusDropdown: false,
        channelDropdown: false,
        isOutletOpen: null,
        outletChannel: null,
        listLoading: true,
        total_page: 1,
        sortKey: 'branch_channels.updated_at',
        sortValue: '',
        isShowItems: false,
        isShowSeamless: false,
        isShowOpenStatus: false,
        showSendOtpButton: true,
        showTokenOtp: false,
        selectedOutlet: {},
        items: [],
        itemsSort: 'asc',
        itemPage: 1,
        connectData: {
          phoneNumber: "",
          otp: "",
          otpToken: ""
        },
        openStatusData: {
          confirm: false,
          text: ''
        },
        errorMessageSeamless: "",
        successMessageSeamless: "",
      }
    },
    middleware: ['auth-ssr'],
    mounted() {
      this.getData(true)
    },
    watch: {
      search: {
        handler(r) {
          this.listLoading = true
        }
      },
      page: {
        handler(r) {
          this.listLoading = true
          if (r > this.data.total_page) {
            this.page = this.data.total_page
          }
        }
      }
    },

    methods: {
      download() {
        let name_param = 'name=' + this.search
        let status_param = this.isOutletOpen == null ? '' : 'is_open=' + this.isOutletOpen
        let channel_param = this.outletChannel == null ? '' : 'channel=' + this.outletChannel
        this.isDownload = true
        this.$axios({
          method: 'GET',
          url: `me/branch_channel/export?${name_param}&${status_param}&${channel_param}`,
          responseType: 'blob',
        }).then(r => {
          this.isDownload = false
          const url = window.URL.createObjectURL(new Blob([r.data], {
            'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }));
          var fileLink = document.createElement('a');
          fileLink.href = url;
          fileLink.setAttribute('download', 'outlet.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
      },
      formatRating (rating) {
        if (rating == null) {
          return ''
        }
        return Math.floor(rating * 100)/100
      },
      getData(refresh = false) {
        if (refresh) {
          this.page = 1
        }
        this.listLoading = true
        let name_param = 'name=' + this.search
        let status_param = this.isOutletOpen == null ? '' : 'is_open=' + this.isOutletOpen
        let channel_param = this.outletChannel == null ? '' : 'channel=' + this.outletChannel
        this.$axios.get(
            `me/branch_channels?${name_param}&${status_param}&${channel_param}&sort_key=${this.sortKey}&sort_value=${this.sortValue}&page=${this.page}`
          )
          .then(r => {
            this.data = r.data.data
            this.listLoading = false
            this.isLoading = false
          })
      },
      showItem(branchId, index) {
        if (index) {
          this.selectedOutlet = this.data.branch_channels[index]
        }
        this.selectedOutlet = this.data.branch_channels[index]
        this.$axios.get(
            `me/branch_channel/${branchId}/items?sort_key=in_stock&sort_value=${this.itemsSort}&page=${this.itemPage}`)
          .then(r => {
            this.isShowItems = true
            this.items = r.data.data
          })
      },

      changePage(v) {
        this.page = parseFloat(this.page) + parseFloat(v)
        this.getData()
      },
      changeItemPage(v) {
        this.itemPage = parseFloat(this.itemPage) + parseFloat(v)
        this.getItem(this.selectedOutlet.id)
      },
      getItem(branchId) {
        this.$axios.get(
            `me/branch_channel/${branchId}/items?sort_key=in_stock&sort_value=${this.itemsSort}&page=${this.itemPage}`)
          .then(r => {
            this.isShowItems = true
            this.items = r.data.data
          })
      },
      checkSeamless(branchChannel) {
        this.connectData = {
          phoneNumber: "",
          otp: "",
          otpToken: ""
        }
        this.selectedOutlet = branchChannel
        this.isShowSeamless = true
        this.showSendOtpButton = true
        this.showTokenOtp = false
      },
      handleOpenStatus(branchChannel, confirm) {
        if (confirm) {
          this.openStatusData.confirm = true
          this.$axios.post(`me/seamless/open_status/${branchChannel.id}`, {
            confirm: this.openStatusData.confirm
          }).then(r => {
            branchChannel.is_open = r.data.data.is_open
            this.isShowOpenStatus = false
            this.$toast.success('Sukses ubah status outlet', {
              duration: 2500
            })
          }).catch(error => {
            this.isShowOpenStatus = false
            this.$toast.error('Gagal. Hubungi kami untuk informasi lebih lanjut.', {
              duration: 2500
            })
          })
        } else {
          this.openStatusData = {
            confirm: false,
            text: ''
          }
          this.selectedOutlet = branchChannel
          this.$axios.post(`me/seamless/open_status/${branchChannel.id}`, {
            confirm: this.openStatusData.confirm
          }).then(r => {
            this.openStatusData.text = r.data.data.message
            this.isShowOpenStatus = true
          }).catch(error => {
            this.isShowOpenStatus = false
            this.$toast.error('Gagal. Hubungi kami untuk informasi lebih lanjut.', {
              duration: 2500
            })
          })
        }
      },
      sendOTP() {
        this.showSendOtpButton = false
        this.$axios.post(`me/seamless/connect/check/${this.selectedOutlet.id}`, {
          phone_number: this.connectData.phoneNumber
        }).then(r => {
          var data = r.data.data
          this.connectData.otpToken = data.otp_token
          this.showSendOtpButton = false
          this.showTokenOtp = true
        }).catch(e => {
          this.showSendOtpButton = true
          var errors = e.response.data.errors
          for (var key in errors) {
            this.errorMessageSeamless = errors[key].detail
            return false
          }
        })
      },
      seamlessConnect() {
        this.showTokenOtp = false
        this.$axios.post(`me/seamless/connect/${this.selectedOutlet.id}`, {
          phone_number: this.connectData.phoneNumber,
          otp_token: this.connectData.otpToken,
          otp: this.connectData.otp
        }).then(r => {
          var data = r.data.data
          this.showTokenOtp = false
          this.successMessageSeamless =
            `Selamat outlet anda telah terhubung dengan ${data.merchant.outlet_name}. Data pesanan dalam outlet ini akan disinkronisasi setiap 6 jam. Silahkan tutup pop-up ini dengan menekan tombol Close di bagian atas kanan.`
          for (var key in this.data.branch_channels) {
            if (this.selectedOutlet.id == this.data.branch_channels[key].id) {
              this.data.branch_channels[key].gobiz_is_connected = 1
            }
          }
        }).catch(e => {
          this.showTokenOtp = true
          var errors = e.response.data.errors
          for (var key in errors) {
            this.errorMessageSeamless = errors[key].detail
            return false
          }
        })
      }
    },
  }

</script>
