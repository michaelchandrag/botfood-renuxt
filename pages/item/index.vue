<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      </div>
      <div>
        <span class="text-title">Laporan Item</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-wrap -m-2" v-if="!isLoading">
        <item-summary
          v-for="(d, index) in data.summary"
          :key="index"
          :channel="d"
          class="w-full sm:w-6/12 p-2"
        />
      </div>
      <div class="grid grid-cols-2 gap-4" v-if="isLoading">
        <div class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
        <div class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
      </div>
      <div class="h-6"></div>
      <div
        v-if="isLoading"
        class="bg-gray-300 h-64 rounded-fd animate-pulse"
      ></div>
      <div v-if="!isLoading" class="bg-white rounded-fd p-8 text-text">
        <div class="flex flex-wrap -m-2">
          <div
            class="
              w-full
              xl:w-3/12
              lg:w-3/12
              sm:w-6/12
              p-2
              cursor-pointer
              items-center
              relative
            "
          >
            <div class="relative">
              <form @submit.prevent="getData">
                <input
                  @change.prevent="getData"
                  type="text"
                  class="
                    pl-10
                    pr-4
                    py-3
                    border border-gray-300
                    rounded-lg
                    w-full
                    focus:outline-none
                  "
                  v-model="itemName"
                  placeholder="Nama Item"
                />
              </form>
              <div class="absolute top-0 pt-3 pl-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="
              w-full
              xl:w-3/12
              lg:w-3/12
              sm:w-6/12
              p-2
              cursor-pointer
              items-center
              relative
            "
          >
            <div
              @click.prevent="
                itemStatusDropdown
                  ? (itemStatusDropdown = false)
                  : (itemStatusDropdown = true)
              "
              class="
                border
                flex
                py-3
                px-4
                border-gray-300
                rounded-lg
                w-full
                focus:outline-none
              "
            >
              <div class="flex-auto">
                <span v-if="itemStatus == true">Aktif</span>
                <span v-if="itemStatus == false">Tidak Aktif</span>
                <span v-if="itemStatus == null">Semua Status (Aktif/Tidak Aktif)</span>
              </div>
              <div>
                <svg
                  class="float-right mt-2"
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
            <div
              v-if="itemStatusDropdown"
              class="absolute w-full shadow-sm rounded-b-fds"
            >
              <ul class="w-full border-gray-300">
                <li
                  @click.prevent="
                    (itemStatusDropdown = false), (itemStatus = 1), getData()
                  "
                  class="bg-white px-4 py-3 w-full"
                >
                  Aktif
                </li>
                <li
                  @click.prevent="
                    (itemStatusDropdown = false), (itemStatus = 0), getData()
                  "
                  class="bg-white px-4 py-3 w-full"
                >
                  Tidak Aktif
                </li>
                <li
                  @click.prevent="
                    (itemStatusDropdown = false), (itemStatus = null), getData()
                  "
                  class="bg-white px-4 py-3 w-full rounded-b-lg"
                >
                  Semua Status (Aktif/Tidak Aktif)
                </li>
              </ul>
            </div>
          </div>

          <div
            class="
              w-full
              xl:w-3/12
              lg:w-3/12
              sm:w-6/12
              p-2
              cursor-pointer
              items-center
              relative
            "
          >
            <div class="relative">
              <form @submit.prevent="getData">
                <input
                  @change.prevent="getData"
                  type="text"
                  class="
                    pl-10
                    pr-4
                    py-3
                    border border-gray-300
                    rounded-lg
                    w-full
                    focus:outline-none
                  "
                  v-model="outletName"
                  placeholder="Nama Outlet"
                />
              </form>
              <div class="absolute top-0 pt-3 pl-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="
              w-full
              xl:w-3/12
              lg:w-3/12
              sm:w-6/12
              p-2
              cursor-pointer
              items-center
              relative
            "
          >
            <div
              @click.prevent="
                channelDropdown
                  ? (channelDropdown = false)
                  : (channelDropdown = true)
              "
              class="
                border
                flex
                py-3
                px-4
                border-gray-300
                rounded-lg
                w-full
                focus:outline-none
              "
            >
              <div class="flex-auto">
                <span v-if="outletChannel == 'GrabFood'">GrabFood</span>
                <span v-if="outletChannel == 'GoFood'">GoFood</span>
                <span v-if="outletChannel == 'ShopeeFood'">ShopeeFood</span>
                <span v-if="outletChannel == 'TravelokaEats'"
                  >TravelokaEats</span
                >
                <span v-if="outletChannel == null">Semua Platform</span>
              </div>
              <div>
                <svg
                  class="float-right mt-2"
                  width="8"
                  height="5"
                  viewBox="0 0 8 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
            <div
              v-if="channelDropdown"
              class="absolute w-full shadow-sm rounded-b-fds"
            >
              <ul class="w-full border-gray-300">
                <li
                  @click.prevent="
                    (channelDropdown = false),
                      (outletChannel = 'GrabFood'),
                      getData()
                  "
                  class="bg-white px-4 py-3 w-full"
                >
                  GrabFood
                </li>
                <li
                  @click.prevent="
                    (channelDropdown = false),
                      (outletChannel = 'GoFood'),
                      getData()
                  "
                  class="bg-white px-4 py-3 w-full"
                >
                  GoFood
                </li>
                <li
                  @click.prevent="
                    (channelDropdown = false),
                      (outletChannel = 'ShopeeFood'),
                      getData()
                  "
                  class="bg-white px-4 py-3 w-full"
                >
                  ShopeeFood
                </li>
                <li
                  @click.prevent="
                    (channelDropdown = false),
                      (outletChannel = 'TravelokaEats'),
                      getData()
                  "
                  class="bg-white px-4 py-3 w-full"
                >
                  TravelokaEats
                </li>
                <li
                  @click.prevent="
                    (channelDropdown = false), (outletChannel = null), getData()
                  "
                  class="bg-white px-4 py-3 w-full rounded-b-lg"
                >
                  Semua Platform
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="h-6"></div>
        <div class="table-responsive">
          <table class="table-auto w-full">
            <thead>
              <tr class="border-b">
                <th class="py-4 text-text text-center cursor-pointer">
                  Gambar Item
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'name' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'name'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Nama Item
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down'
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'in_stock' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'in_stock'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Status
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down'
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'branch_channel_name' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'branch_channel_name'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Nama Outlet
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down'
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'branch_channel_channel' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'branch_channel_channel'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Channel
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down'
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'price' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'price'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Harga
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down '
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'selling_price' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'selling_price'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Harga Jual
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down '
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
                <th
                  class="py-4 text-text text-center cursor-pointer"
                  :class="sortKey === 'last_not_active_at' ? 'filter' : ''"
                  @click.prevent="
                    (sortKey = 'last_not_active_at'),
                      sortValue === 'desc'
                        ? (sortValue = 'asc')
                        : (sortValue = 'desc'),
                      getData(true)
                  "
                >
                  Terakhir Aktif
                  <i
                    :class="
                      sortValue === 'asc'
                        ? 'fa-sort-amount-down '
                        : 'fa-sort-amount-up'
                    "
                    class="fas"
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody v-if="!listLoading">
              <tr v-if="!listLoading && data.length <= 0">
                <td colspan="5" class="p-20 text-center">
                  <span class="block mx-auto w-full">
                    <svg
                      width="20"
                      height="20"
                      class="mx-auto mb-4"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z"
                        fill="#9E9E9E"
                      />
                    </svg>
                  </span>
                  <span class="p-8 m-auto"> Data tidak tersedia </span>
                </td>
              </tr>
            </tbody>
            <tbody v-if="listLoading">
              <tr class="h-12" v-for="n in 10" :key="n">
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
                <td>
                  <div
                    class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                  ></div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="!listLoading">
              <tr
                v-for="item in data.items"
                :key="item.id"
                class="hover:bg-gray-200 border-b"
              >
                <td style="vertical-align: middle" class="text-center py-2">
                  <img
                    :src="item.image_url"
                    style="
                      width: 50px;
                      height: 50px;
                      display: block;
                      margin: auto;
                    "
                    @click="
                      imgDetail = item.image_url;
                      isShowIImage = true;
                    "
                    class="rounded-md cursor-pointer"
                  />
                </td>

                <td
                  class="text-center text-text p-4 rounded-l-fds"
                  style="max-width: 200px"
                >
                  {{ item.name }}
                </td>
                <td class="text-center text-text p-4">
                  <span v-if="item.in_stock" class="text-green-500">Aktif</span>
                  <span v-if="!item.in_stock" class="text-red-500"
                    >Tidak Aktif</span
                  >
                </td>
                <td class="text-center text-text p-4 rounded-r-fds">
                  {{ item.branch_channel_name }}
                </td>
                <td class="text-text text-center">
                  {{ item.branch_channel_channel }}
                </td>
                <td class="text-text text-center">{{ $toIDR(item.price) }}</td>
                <td class="text-text text-center">
                  {{ $toIDR(item.selling_price) }}
                </td>
                <td v-if="!item.in_stock" class="text-text text-center">
                  {{
                    $moment(item.last_not_active_at).format("D MMM YYYY,HH:mm")
                  }}
                </td>
                <td v-if="item.in_stock" class="text-text text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 flex items-center float-right">
          <div class="float-right p-2">
            <form @submit.prevent="getData(true)">
              <input
                class="
                  w-20
                  h-10
                  text-center
                  border-2
                  rounded-md
                  focus:outline-none
                "
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                v-model="page"
              />
              of {{ data.total_page }}
            </form>
          </div>

          <!-- left -->
          <div
            v-if="page == 1"
            class="cursor-not-allowed float-right mr-2 p-3 rounded-md border-2"
          >
            <svg
              class=""
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                fill="#9E9E9E"
              />
            </svg>
          </div>

          <div
            @click.prevent="changePage(-1)"
            v-if="page != 1"
            class="cursor-pointer float-right mr-2 p-3 rounded-md border-2"
          >
            <svg
              class=""
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.43508 1.06496L0.550078 4.94996C-0.0349219 5.53496 -0.0349219 6.47996 0.550078 7.06496L4.43508 10.95C5.38008 11.895 7.00008 11.22 7.00008 9.88496V2.11495C7.00008 0.779955 5.38008 0.119955 4.43508 1.06496Z"
                fill="#424242"
              />
            </svg>
          </div>

          <!-- end left -->

          <!-- right -->
          <div
            @click.prevent="changePage(1)"
            v-if="data.total_page > 1 && page < data.total_page"
            class="cursor-pointer float-right p-3 rounded-md border-2"
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                fill="#424242"
              />
            </svg>
          </div>
          <div
            v-if="page == data.total_page || data.total_page <= 1"
            class="cursor-not-allowed float-right p-3 rounded-md border-2"
          >
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.565 10.935L6.45 7.04996C7.035 6.46496 7.035 5.51996 6.45 4.93496L2.565 1.04996C1.62 0.119957 0 0.779957 0 2.11496V9.86996C0 11.22 1.62 11.88 2.565 10.935Z"
                fill="#9E9E9E"
              />
            </svg>
          </div>
          <!-- end right -->
        </div>
        <div class="h-20 bg-white"></div>
      </div>
      <div
        v-if="isShowIImage"
        class="
          fixed
          top-0
          flex
          items-center
          z-40
          left-0
          w-screen
          h-screen
          py-1
          px-2
        "
      >
        <div
          class="w-full max-w-2xl bg-white rounded-fds z-40 mx-auto max-h-full"
          style="height: auto; overflow-y: auto"
        >
          <div class="p-4">
            <div class="w-full flex justify-end">
              <button
                @click.prevent="isShowIImage = false"
                class="
                  text-white text-xs
                  sm:text-sm
                  px-3
                  py-1
                  text-red-500
                  mb-4
                  mr-4
                  bg-white
                  rounded-full rounded
                  shadow-lg
                "
              >
                <i class="fas fa-times-circle"></i> Close
              </button>
            </div>
            <img :src="imgDetail" class="w-full rounded-md" />
          </div>
        </div>
      </div>
      <div
        v-if="isShowIImage"
        class="fixed top-0 bg-black opacity-20 left-0 z-20 w-screen h-screen"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      itemName: "",
      isShowIImage: false,
      imgDetail: "",
      listLoading: true,
      isLoading: true,
      outletName: "",
      channelDropdown: false,
      outletChannel: null,
      itemStatus: null,
      itemStatusDropdown: false,
      page: 1,
      total_page: 1,
      sortValue: "asc",
      sortKey: "",
    };
  },
  mounted() {
    this.getData(true);
  },
  watch: {
    page: {
      handler(r) {
        if (r > this.total_page) {
          this.page = this.total_page;
        } else if (r <= 0) {
          this.page = 1;
        }
      },
    },
    itemName: {
      handler(r) {
        this.listLoading = true;
      },
    },
    outletName: {
      handler(r) {
        this.listLoading = true;
      },
    },
  },
  methods: {
    getData(refresh = false) {
      if (refresh) {
        this.page = 1;
      }
      this.listLoading = true;
      var item_name = "name=" + this.itemName;
      var outletName = "branch_channel_name=" + this.outletName;
      var stock =
        this.itemStatus == null ? "in_stock=" : "in_stock=" + this.itemStatus;
      var channel =
        this.outletChannel == null
          ? ""
          : "branch_channel_channel=" + this.outletChannel;
      var page = "page=" + this.page;
      this.$axios
        .get(
          `me/items?${item_name}&${outletName}&${stock}&${channel}&sort_key=${this.sortKey}&sort_value=${this.sortValue}&${page}`
        )
        .then((r) => {
          this.data = r.data.data;
          this.listLoading = false;
          this.total_page = r.data.data.total_page;
          this.isLoading = false;
        });
    },
    changePage(v) {
      this.page = this.page + parseFloat(v);
      this.getData();
    },
  },
};
</script>
