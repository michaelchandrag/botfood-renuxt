<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only
          ><header-navbar class="hidden md:block"></header-navbar
        ></client-only>
      </div>
      <div>
        <span class="text-title">Ulasan</span>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-wrap -m-3" v-if="isLoadingRecap">
          <div
            class="w-full xl:w-3/12 lg:w-6/12 md:w-6/12 sm:w-6/12 p-3"
            v-for="a in 4"
            :key="a"
          >
            <div class="bg-gray-300 h-48 rounded-fd animate-pulse"></div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3" v-else>
          <div class="w-full sm:w-6/12 p-2">
            <!-- go -->
            <div class="bg-white gap-4 px-5 rounded-fd mb-5">
              <div class="text-lg font-bold pt-3 pb-2">Bulan Lalu</div>
              <div
                class="flex justify-between w-full items-center py-2"
                v-for="(context, index) in last_month"
                :key="index"
              >
                <div>
                  <img
                    v-for="n in 5"
                    :key="n"
                    :src="
                      n <= context.rating
                        ? require(`~/assets/png/star.png`)
                        : require(`~/assets/png/star_empty.png`)
                    "
                    style="
                      width: 15px;
                      height: 15px;
                      display: unset;
                      margin-left: 1px;
                      margin-right: 1px;
                    "
                  />
                  <span class="ml-3 text-xs"
                    >({{ context.most_branch_channel_name }} -
                    {{ context.most_count }})</span
                  >
                </div>
                <div class="text-md font-bold text-green-600">
                  {{ context.total_rating }}
                </div>
              </div>
            </div>
            <!-- end go -->
          </div>
          <div class="w-full sm:w-6/12 p-2">
            <!-- go -->
            <div class="bg-white gap-4 px-5 rounded-fd mb-5">
              <div class="text-lg font-bold pt-3 pb-2">Bulan Ini</div>
              <div
                class="flex justify-between w-full items-center py-2"
                v-for="(context, index) in current_month"
                :key="index"
              >
                <div>
                  <img
                    v-for="n in 5"
                    :key="n"
                    :src="
                      n <= context.rating
                        ? require(`~/assets/png/star.png`)
                        : require(`~/assets/png/star_empty.png`)
                    "
                    style="
                      width: 15px;
                      height: 15px;
                      display: unset;
                      margin-left: 1px;
                      margin-right: 1px;
                    "
                  />
                  <span class="ml-3 text-xs"
                    >({{ context.most_branch_channel_name }} -
                    {{ context.most_count }})</span
                  >
                </div>
                <div class="text-md font-bold text-green-600">
                  {{ context.total_rating }}
                </div>
              </div>
            </div>
            <!-- end go -->
          </div>
        </div>

        <div class="h-6"></div>
        <div
          v-if="isLoading"
          class="bg-gray-300 h-64 rounded-fd animate-pulse"
          style="margin-top: 0 !important"
        ></div>
        <!-- table start -->
        <div v-if="!isLoading" class="bg-white rounded-fd p-8 text-text">
          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-12/12 lg:w-6/12 p-3">
              <div class="relative">
                <form @submit.prevent="getData">
                  <input
                    @change.prevent="getData"
                    type="text"
                    class="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none"
                    v-model="filters.q"
                    placeholder="Nama Outlet, Channel, Kode Pesanan, Status"
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
              class="w-full md:w-6/12 lg:w-3/12 cursor-pointer items-center relative p-3"
            >
              <vue-datepicker-2
                v-model="daterange"
                placeholder="Periode Ulasan"
                style="width: 100%; height: 50px"
                :type="'date'"
                @input="changePeriod()"
                :range="true"
                :format="'DD/MM/YYYY'"
                :value-type="'YYYY-MM-DD'"
              >
                <template #icon-calendar
                  ><img
                    src="~/assets/png/icon-calendar.png"
                    width="20px"
                    height="20px"
                /></template>
              </vue-datepicker-2>
            </div>
            <div
              class="w-full xl:w-3/12 cursor-pointer items-center relative p-2"
            >
              <div class="">
                <button
                  v-if="isDownload"
                  class="w-full cursor-not-allowed rounded-fd py-4 border-2 border-gray-500 bg-gray-200 text-gray-500 focus:outline-none"
                >
                  <span class="animate-spin">Downloading . . .</span>
                </button>
                <button
                  v-if="!isDownload"
                  class="w-full rounded-fd py-4 border-2 border-green-food bg-green-200 text-green-food focus:outline-none"
                  @click.prevent="download()"
                >
                  <span v-if="!isDownload">Download</span>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3">
            <div
              class="w-full xl:w-6/12 lg:w-6/12 sm:w-12/12 p-2 cursor-pointer items-center flex flex-row gap-3"
            >
              <div
                @click.prevent="
                  filters.n_comment === 0
                    ? (filters.n_comment = '')
                    : (filters.n_comment = 0,filters.n_images='');
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none flex justify-center"
                :style="
                  filters.n_comment === 0
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                Dengan Komentar
                <i
                  class="fa fa-check ml-2 pt-1"
                  v-if="filters.n_comment === 0"
                ></i>
              </div>
              <div
                @click.prevent="
                  filters.n_images === 0
                    ? (filters.n_images = '')
                    : (filters.n_images = 0 , filters.n_comment='');
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none flex justify-center"
                :style="
                  filters.n_images === 0
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                Dengan Gambar
                <i
                  class="fa fa-check ml-2 pt-1"
                  v-if="filters.n_images === 0"
                ></i>
              </div>
              <div
                @click.prevent="
                  filters.n_merchant_reply === ''
                    ? (filters.n_merchant_reply = 0)
                    : (filters.n_merchant_reply = '');
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg w-full focus:outline-none flex justify-center"
                :style="
                  filters.n_merchant_reply === 0
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                Dengan Balasan Merchant
                <i
                  class="fa fa-check ml-2 pt-1"
                  v-if="filters.n_merchant_reply === 0"
                ></i>
              </div>
            </div>
            <div
              class="w-full xl:w-6/12 lg:w-8/12 sm:w-12/12 flex items-center relative flex-wrap"
            >
              <div
                @click.prevent="
                  filters.rating = 5;
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg focus:outline-none flex justify-center m-1"
                :style="
                  filters.rating == 5
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="
                    n <= 5
                      ? require(`~/assets/png/star.png`)
                      : require(`~/assets/png/star_empty.png`)
                  "
                  style="
                    width: 12px;
                    height: 12px;
                    display: unset;
                    margin-left: 1px;
                    margin-right: 1px;
                  "
                />
              </div>
              <div
                @click.prevent="
                  filters.rating = 4;
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg focus:outline-none flex justify-center m-1"
                :style="
                  filters.rating == 4
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="
                    n <= 4
                      ? require(`~/assets/png/star.png`)
                      : require(`~/assets/png/star_empty.png`)
                  "
                  style="
                    width: 12px;
                    height: 12px;
                    display: unset;
                    margin-left: 1px;
                    margin-right: 1px;
                  "
                />
              </div>
              <div
                @click.prevent="
                  filters.rating = 3;
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg focus:outline-none flex justify-center m-1"
                :style="
                  filters.rating == 3
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="
                    n <= 3
                      ? require(`~/assets/png/star.png`)
                      : require(`~/assets/png/star_empty.png`)
                  "
                  style="
                    width: 12px;
                    height: 12px;
                    display: unset;
                    margin-left: 1px;
                    margin-right: 1px;
                  "
                />
              </div>
              <div
                @click.prevent="
                  filters.rating = 2;
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg focus:outline-none flex justify-center m-1"
                :style="
                  filters.rating == 2
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="
                    n <= 2
                      ? require(`~/assets/png/star.png`)
                      : require(`~/assets/png/star_empty.png`)
                  "
                  style="
                    width: 12px;
                    height: 12px;
                    display: unset;
                    margin-left: 1px;
                    margin-right: 1px;
                  "
                />
              </div>
              <div
                @click.prevent="
                  filters.rating = 1;
                  getData();
                "
                class="border flex py-3 px-4 border-gray-300 rounded-lg focus:outline-none flex justify-center m-1"
                :style="
                  filters.rating == 1
                    ? 'color:#029835 !important;border:1px #029835 solid;'
                    : ''
                "
              >
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="
                    n <= 1
                      ? require(`~/assets/png/star.png`)
                      : require(`~/assets/png/star_empty.png`)
                  "
                  style="
                    width: 12px;
                    height: 12px;
                    display: unset;
                    margin-left: 1px;
                    margin-right: 1px;
                  "
                />
              </div>
            </div>
          </div>
          <div class="mt-6">
            <div class="table-responsive">
              <table class="table-auto w-full">
                <thead class="border-b">
                  <tr>
                    <th
                      class="py-4 text-text cursor-pointer"
                      width="20%"
                      :class="
                        filters.sort_key === 'branch_channel_name'
                          ? 'filter'
                          : ''
                      "
                      @click.prevent="sortPage('branch_channel_name')"
                    >
                      Nama Outlet<i
                        :class="
                          filters.sort_value === 'asc'
                            ? 'fa-sort-amount-down'
                            : 'fa-sort-amount-up'
                        "
                        class="fas ml-2"
                      ></i>
                    </th>
                    <th
                      class="py-4 text-text cursor-pointer"
                      width="10%"
                      :class="
                        filters.sort_key === 'created_at'
                          ? 'filter'
                          : ''
                      "
                      @click.prevent="sortPage('created_at')"
                    >
                      Tanggal diulas<i
                        :class="
                          filters.sort_value === 'asc'
                            ? 'fa-sort-amount-down'
                            : 'fa-sort-amount-up'
                        "
                        class="fas ml-2"
                      ></i>
                    </th>
                    <th
                      class="py-4 text-text cursor-pointer"
                      width="10%"
                      :class="
                        filters.sort_key === 'ordered_at'
                          ? 'filter'
                          : ''
                      "
                      @click.prevent="sortPage('ordered_at')"
                    >
                      Tanggal pesanan<i
                        :class="
                          filters.sort_value === 'asc'
                            ? 'fa-sort-amount-down'
                            : 'fa-sort-amount-up'
                        "
                        class="fas ml-2"
                      ></i>
                    </th>
                    <th
                      class="py-4 text-text cursor-pointer"
                      width="13%"
                      :class="
                        filters.sort_key === 'reviews.rating' ? 'filter' : ''
                      "
                      @click.prevent="sortPage('reviews.rating')"
                    >
                      Rating<i
                        :class="
                          filters.sort_value === 'asc'
                            ? 'fa-sort-amount-down'
                            : 'fa-sort-amount-up'
                        "
                        class="fas ml-2"
                      ></i>
                    </th>
                    <th class="py-4 text-text" width="20%">Nama Item</th>
                    <th class="py-4 text-text">
                      Komentar<i class="fas ml-2"></i>
                    </th>
                    <th class="py-4 text-text">
                      Balasan Merchant<i class="fas ml-2"></i>
                    </th>
                    <th class="py-4 text-text">
                      Gambar<i class="fas ml-2"></i>
                    </th>
                    <th class="py-4 text-text">
                      Review<i class="fas ml-2"></i>
                    </th>
                    <!-- <th class="py-4 text-text cursor-pointer" :class="filters.sort_key==='state'?'filter':''" @click.prevent="sortKey='state', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">Kondisi<i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'"  class="fas"></i></th> -->
                    <!-- <th class="py-4 text-text">Aksi</th><th class="py-4 text-text cursor-pointer" :class="filters.sort_key==='net_price'?'filter':''" @click.prevent="sortKey='net_price', sortValue==='desc' ? sortValue='asc': sortValue='desc',getData(true)">Diskon<i :class="sortValue==='asc'? 'fa-sort-amount-down': 'fa-sort-amount-up'"  class="fas"></i></th> -->
                  </tr>
                </thead>
                <tbody v-if="!listLoading">
                  <tr v-if="!listLoading && data.reviews.length <= 0">
                    <td colspan="9" class="p-20 text-center">
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
                    <td v-for="i in 9" :key="i">
                      <div
                        class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"
                      ></div>
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="!listLoading">
                  <tr
                    v-for="(review, index) in data.reviews"
                    :key="index"
                    class="hover:bg-gray-200 border-b"
                  >
                    <td class="text-center text-text p-4">
                      {{ review.branch_channel_name }} -
                      {{ review.branch_channel_channel }}
                    </td>
                    <td class="text-center text-text p-4">
                      {{ $moment(review.created_at).format("DD-MMM-YYYY H:s") }}
                    </td>
                    <td v-if="review.ordered_at === null" class="text-center text-text p-4">
                      -
                    </td>
                    <td v-else class="text-center text-text p-4">
                      {{ $moment(review.ordered_at).format("DD-MMM-YYYY H:s") }}
                    </td>
                    <td class="text-center p-4">
                      <div class="w-full">
                        <img
                          v-for="n in 5"
                          :key="n"
                          :src="
                            n <= review.rating
                              ? require(`~/assets/png/star.png`)
                              : require(`~/assets/png/star_empty.png`)
                          "
                          style="
                            width: 12px;
                            height: 12px;
                            display: unset;
                            margin-left: 1px;
                            margin-right: 1px;
                          "
                        />
                      </div>
                    </td>
                    <td class="text-center text-left p-4">
                      {{ review.item_name ? review.item_name : "-" }}
                    </td>
                    <td class="text-center text-left p-4">
                      {{ review.comment ? review.comment : "-" }}
                    </td>
                    <td class="text-center text-left p-4">
                      {{ review.merchant_reply ? review.merchant_reply : "-" }}
                    </td>
                    <td class="text-center text-left p-4">
                      <div v-if="review.images" style="display: flex; flex-direction: column;justify-content: space-between;gap: 10px;align-items: center;align-content: center;">
                        <div
                          v-for="foto in review.images"
                        >
                          <img
                            style="width: 100%"
                            :src="foto"
                            alt=""
                            @click="ShowModal(foto)"
                          />
                        </div>
                      </div>
                      <div v-else>
                        -
                      </div>
                      <div class="dialog" v-if="dialog" @click="toggleDialog()">
                        <div class="dialog-content" >
                          <img :src="imagePopUp"  />
                        </div>
                      </div>
                    </td>
                    <td class="text-center text-left p-4">
                      <div class="cursor-pointer h-6 w-6 flex items-center justify-center rounded-md border-2" :class="
                          review.is_reviewed == 1
                            ? 'border-green-food bg-green-200'
                            : 'border-gray-500'
                        "
                        @click.prevent="submitReviewed(review)
                        ">
                        <i
                          v-if="review.is_reviewed == 1"
                          class="fas text-green-food fa-check text-xs"
                        ></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 flex items-center float-right">
              <div class="float-right p-2">
                <form>
                  <input
                    @change="getData()"
                    class="w-20 h-10 text-center border-2 rounded-md focus:outline-none"
                    type="text"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    v-model="filters.page"
                  />
                  of {{ data.total_page }}
                </form>
              </div>

              <!-- left -->
              <div
                v-if="filters.page == 1"
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
                v-if="filters.page != 1"
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
                v-if="data.total_page > 1 && filters.page < data.total_page"
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
                v-if="filters.page == data.total_page || data.total_page <= 1"
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
        </div>
        <!-- table end -->
      </div>

      <!-- end modal items -->
    </div>
  </div>
</template>
<script>
import "vue2-datepicker/index.css";
import VueDatePicker2 from "vue2-datepicker";
export default {
  components: {
    "vue-datepicker-2": VueDatePicker2,
  },
  data() {
    return {
      isLoadingRecap: true,
      last_month: [],
      current_month: [],
      isDownload: false,
      daterange: [],
      data: {},
      sorted: {},
      stat: {},
      search: "",
      withCommentar: false,
      selectedStar: "",
      filters: {
        q: "",
        sort_key: "reviews.created_at",
        sort_value: "desc",
        page: 1,
        from_created_at: "",
        until_created_at: "",
        n_comment: "",
        rating: "",
        n_images: "",
        n_merchant_reply: "",
        is_reviewed: "",
      },
      isLoading: true,
      statusDropdown: false,
      channelDropdown: false,
      isOutletOpen: null,
      outletChannel: null,
      listLoading: true,
      total_page: 1,
      sortKey: "",
      sortValue: "",
      selectedOutlet: {},
      dialog: false,
      imagePopUp: "",
    };
  },
  middleware: ["auth-ssr"],
  mounted() {
    this.getData(true);
    this.getDataRecap();
  },
  watch: {
    search: {
      handler(r) {
        this.listLoading = true;
      },
    },
    filters: {
      handler(r) {
        this.listLoading = true;
        if (r > this.data.total_page) {
          this.filters.page = this.data.total_page;
        }
      },
    },
  },

  methods: {
    submitReviewed (review) {
      if (review.is_reviewed == 0) {
        review.is_reviewed = 1
      } else {
        review.is_reviewed = 0
      }
    },
    download() {
      // console.log(this.filters)
      this.isDownload = true;
      var queryParams = {
        n_comment: "",
        from_created_at: this.filters.from_created_at,
        until_created_at: this.filters.until_created_at,
        rating: "",
      };
      var queryParams = new URLSearchParams(queryParams).toString();
      this.$axios({
        method: "GET",
        url: `me/reviews/export?${queryParams}`,
        responseType: "blob",
      }).then((r) => {
        this.isDownload = false;
        const url = window.URL.createObjectURL(
          new Blob([r.data], {
            "content-type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.setAttribute("download", "laporan-ulasan.xlsx");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    getDataRecap() {
      this.$axios.get(`me/review/stats`).then((r) => {
        this.isLoadingRecap = false;
        this.last_month = r.data.data.last_month;
        this.current_month = r.data.data.this_month;
      });
    },

    getData(refresh = false) {
      if (refresh) {
        this.filters.page = 1;
      }
      var queryParams = new URLSearchParams(this.filters).toString();
      //console.log(queryParams);
      this.listLoading = true;
      this.$axios.get(`me/reviews?${queryParams}`).then((r) => {
        this.data = r.data.data;
        this.listLoading = false;
        this.isLoading = false;
      });
    },
    sortPage(key) {
      this.filters.sort_key = key;
      this.filters.sort_value =
        this.filters.sort_value == "asc" ? "desc" : "asc";
      this.getData(true);
    },
    changePage(v) {
      this.filters.page = parseFloat(this.filters.page) + parseFloat(v);
      this.getData();
    },
    changePeriod() {
      if (this.daterange.length > 0) {
        this.filters.from_created_at = this.daterange[0]
          ? this.$moment(this.daterange[0]).format("YYYY-MM-DD 00:00:00")
          : "";
        this.filters.until_created_at = this.daterange[1]
          ? this.$moment(this.daterange[1]).format("YYYY-MM-DD 23:59:59")
          : "";
      } else {
        this.filters.from_created_at = "";
        this.filters.until_created_at = "";
      }
      this.getData(true);
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    ShowModal(f) {
      this.imagePopUp = f;
      this.dialog = true;
    },
  },
};
</script>
<style>
.dialog {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  backdrop-filter: blur(9px);
  border: 1px solid #999;
}
.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 400px;
  height: 100vh;
  margin: 0 auto;
  padding: 10px;
}
.dialog-content img {
  width: 100%;
  height: auto;
}
.close-icon {
  float: right;
}
</style>
