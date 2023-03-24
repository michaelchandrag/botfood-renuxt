<template>
  <div>
    <div class="bg-white p-5 rounded-md mb-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="!loading">
        <client-only>
          <div class="border-b md:border-0">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div>
                <h1 class="font-bold">Laporan Outlet Opening</h1>
                <h1 class="text-sm text-gray-500">{{ issuedDate }}</h1>
                <ApexChart
                  width="100%"
                  height="300"
                  type="pie"
                  :options="optionOpen"
                  :series="seriesOpen"
                  @dataPointSelection="openSelect"
                />
              </div>

              <div v-if="data.open_state">
                <h1
                  class="font-bold text-sm uppercase mb-3"
                  v-if="data.open_state"
                >
                  Daftar Outlet
                  {{
                    dictionaryOpenState[
                      data.open_state[this.openIndex].open_state
                    ].text
                  }}
                </h1>
                <div class="h-56 relative">
                  <div
                    class="bg-gradient-to-t from-white -mt-6 absolute z-40 w-full h-20 bottom-0"
                  ></div>
                  <div class="h-56 relative overflow-y-auto text-gray-600">
                    <div
                      v-for="(op, index) in data.open_state[this.openIndex]
                        .branch_channels"
                      :key="index"
                      @click.prevent="
                        $router.push(`/outlet/${op.branch_channel_id}`)
                      "
                      class="flex gap-2 py-2 text-sm border-b cursor-pointer"
                    >
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'GrabFood'"
                        src="~/assets/svg/grabfood.svg"
                        alt=""
                      />
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'GoFood'"
                        src="~/assets/svg/gofood.svg"
                        alt=""
                      />
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'ShopeeFood'"
                        src="~/assets/svg/shopeefood.svg"
                        alt=""
                      />
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'TravelokaEats'"
                        src="~/assets/svg/travelokaeats.svg"
                        alt=""
                      />
                      <span>
                        {{ op.branch_channel_name }}
                      </span>
                    </div>
                    <div v-if="!data.open_state[this.openIndex].branch_channels">
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="">
                <h1 class="font-bold">Laporan Outlet Closing</h1>
                <h1 class="text-sm text-gray-500">{{ issuedDate }}</h1>
                <ApexChart
                  width="100%"
                  height="300"
                  type="pie"
                  :options="optionClose"
                  :series="seriesClose"
                  @dataPointSelection="closeSelect"
                />
              </div>

              <div v-if="data.close_state">
                <h1
                  class="font-bold text-sm uppercase mb-3"
                  v-if="data.close_state"
                >
                  Daftar Outlet
                  {{
                    dictionaryCloseState[
                      data.close_state[this.closeIndex].close_state
                    ].text
                  }}
                </h1>
                <div class="h-56 relative">
                  <div
                    class="bg-gradient-to-t from-white -mt-6 absolute z-40 w-full h-20 bottom-0"
                  ></div>
                  <div class="h-56 overflow-y-auto text-gray-600">
                    <div
                      v-for="(op, index) in data.close_state[this.closeIndex]
                        .branch_channels"
                      class="flex gap-2 py-2 text-sm border-b cursor-pointer"
                      :key="index"
                      @click.prevent="
                        $router.push(`/outlet/${op.branch_channel_id}`)
                      "
                    >
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'GrabFood'"
                        src="~/assets/svg/grabfood.svg"
                        alt=""
                      />
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'GoFood'"
                        src="~/assets/svg/gofood.svg"
                        alt=""
                      />
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'ShopeeFood'"
                        src="~/assets/svg/shopeefood.svg"
                        alt=""
                      />
                      <img
                        class="h-6"
                        v-if="op.branch_channel_channel == 'TravelokaEats'"
                        src="~/assets/svg/travelokaeats.svg"
                        alt=""
                      />
                      <span>
                        {{ op.branch_channel_name }}
                      </span>
                    </div>
                    <div
                      v-if="!data.close_state[this.closeIndex].branch_channels"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </client-only>
      </div>
    </div>
    <!-- Start outlet terbaik -->
    <div class="flex flex-col w-full mb-4">
      <div
        v-if="loading"
        class="bg-gray-300 animate-pulse rounded-fd h-64"
      ></div>
      <div v-if="!loading" class="bg-white rounded-md p-4">
        <span class="items-center text-orange-500 inline-block align-middle">
          <svg class="inline-block h-5" fill="green" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 104.19" style="enable-background:new 0 0 122.88 104.19" xml:space="preserve"><g><path d="M62.63,6.25c0.56-2.85,2.03-4.68,4.04-5.61c1.63-0.76,3.54-0.83,5.52-0.31c1.72,0.45,3.53,1.37,5.26,2.69 c4.69,3.57,9.08,10.3,9.64,18.71c0.17,2.59,0.12,5.35-0.12,8.29c-0.16,1.94-0.41,3.98-0.75,6.1h19.95l0.09,0.01 c3.24,0.13,6.38,0.92,9.03,2.3c2.29,1.2,4.22,2.84,5.56,4.88c1.38,2.1,2.13,4.6,2.02,7.46c-0.08,2.12-0.65,4.42-1.81,6.87 c0.66,2.76,0.97,5.72,0.54,8.32c-0.36,2.21-1.22,4.17-2.76,5.63c0.08,3.65-0.41,6.71-1.39,9.36c-1.01,2.72-2.52,4.98-4.46,6.98 c-0.17,1.75-0.45,3.42-0.89,4.98c-0.55,1.96-1.36,3.76-2.49,5.35l0,0c-3.4,4.8-6.12,4.69-10.43,4.51c-0.6-0.02-1.24-0.05-2.24-0.05 l-39.03,0c-3.51,0-6.27-0.51-8.79-1.77c-2.49-1.25-4.62-3.17-6.89-6.01l-0.58-1.66V47.78l1.98-0.53 c5.03-1.36,8.99-5.66,12.07-10.81c3.16-5.3,5.38-11.5,6.9-16.51V6.76L62.63,6.25L62.63,6.25L62.63,6.25z M4,43.02h29.08 c2.2,0,4,1.8,4,4v53.17c0,2.2-1.8,4-4,4l-29.08,0c-2.2,0-4-1.8-4-4V47.02C0,44.82,1.8,43.02,4,43.02L4,43.02L4,43.02z M68.9,5.48 c-0.43,0.2-0.78,0.7-0.99,1.56V20.3l-0.12,0.76c-1.61,5.37-4.01,12.17-7.55,18.1c-3.33,5.57-7.65,10.36-13.27,12.57v40.61 c1.54,1.83,2.96,3.07,4.52,3.85c1.72,0.86,3.74,1.2,6.42,1.2l39.03,0c0.7,0,1.6,0.04,2.45,0.07c2.56,0.1,4.17,0.17,5.9-2.27v-0.01 c0.75-1.06,1.3-2.31,1.69-3.71c0.42-1.49,0.67-3.15,0.79-4.92l0.82-1.75c1.72-1.63,3.03-3.46,3.87-5.71 c0.86-2.32,1.23-5.11,1.02-8.61l-0.09-1.58l1.34-0.83c0.92-0.57,1.42-1.65,1.63-2.97c0.34-2.1-0.02-4.67-0.67-7.06l0.21-1.93 c1.08-2.07,1.6-3.92,1.67-5.54c0.06-1.68-0.37-3.14-1.17-4.35c-0.84-1.27-2.07-2.31-3.56-3.09c-1.92-1.01-4.24-1.59-6.66-1.69v0.01 l-26.32,0l0.59-3.15c0.57-3.05,0.98-5.96,1.22-8.72c0.23-2.7,0.27-5.21,0.12-7.49c-0.45-6.72-3.89-12.04-7.56-14.83 c-1.17-0.89-2.33-1.5-3.38-1.77C70.04,5.27,69.38,5.26,68.9,5.48L68.9,5.48L68.9,5.48z"/></g></svg>
          <span class="ml-2 text-green-500">Outlet Terbaik by Performa Item</span>
        </span>
        <h1 class="text-sm text-gray-500 mt-2">{{ issuedDate }}</h1>
        <div class="h-6"></div>
        <div class="grid grid-cols-1 bg-white rounded-md md:grid-cols-3 w-full gap-4">
          <div class="rounded-fd bg-white text-sm border w-full p-2">
            <h1 class="font-bold text-s w-full text-center">
              GoFood
            </h1>

            <ul class="mt-3">
              <li v-for="branchChannel in gofood_top_ranks" class="flex justify-between px-2  text-s border-b py-2 relative">
                <div class="flex gap-x-1 items-center">
                  <div>
                    <img class="h-5" src="~/assets/svg/gofood.svg" alt="" />
                  </div>
                </div>
                <div class="flex gap-x-1">
                  <span>{{branchChannel.branch_channel_name}}</span>
                </div>
                <div class="flex gap-x-2">
                  <span> {{round(branchChannel.items_availability_percentage)}}% </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="rounded-fd bg-white text-sm border w-full p-2">
            <h1 class="font-bold text-s w-full text-center">
              GrabFood
            </h1>

            <ul class="mt-3">
              <li v-for="branchChannel in grabfood_top_ranks" class="flex justify-between px-2  text-s border-b py-2 relative">
                <div class="flex gap-x-1 items-center">
                  <div>
                    <img class="h-5" src="~/assets/svg/grabfood.svg" alt="" />
                  </div>
                </div>
                <div class="flex gap-x-1">
                  <span>{{branchChannel.branch_channel_name}}</span>
                </div>
                <div class="flex gap-x-2">
                  <span> {{round(branchChannel.items_availability_percentage)}}% </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="rounded-fd bg-white text-sm border w-full p-2">
            <h1 class="font-bold text-s w-full text-center">
              ShopeeFood
            </h1>

            <ul class="mt-3">
              <li v-for="branchChannel in shopeefood_top_ranks" class="flex justify-between px-2  text-s border-b py-2 relative">
                <div class="flex gap-x-1 items-center">
                  <div>
                    <img class="h-5" src="~/assets/svg/shopeefood.svg" alt="" />
                  </div>
                </div>
                <div class="flex gap-x-1">
                  <span>{{branchChannel.branch_channel_name}}</span>
                </div>
                <div class="flex gap-x-2">
                  <span> {{round(branchChannel.items_availability_percentage)}}% </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- end of outlet terbaik-->
    <!-- Start of outlet terjelek -->
    <div
        v-if="loading"
        class="bg-gray-300 animate-pulse rounded-fd h-64"
      ></div>
      <div v-if="!loading" class="bg-white rounded-md p-4">
        <span class="items-center text-orange-500 inline-block align-middle">
          <svg class="inline-block h-5" fill="orange" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
          <span class="ml-2 text-orange-500">Outlet Terendah by Performa Item</span>
        </span>
        <h1 class="text-sm text-gray-500 mt-2">{{ issuedDate }}</h1>
        <div class="h-6"></div>
        <div class="grid grid-cols-1 bg-white rounded-md md:grid-cols-3 w-full gap-4">
          <div class="rounded-fd bg-white text-sm border w-full p-2">
            <h1 class="font-bold text-s w-full text-center">
              GoFood
            </h1>

            <ul class="mt-3">
              <li v-for="branchChannel in gofood_low_ranks" class="flex justify-between px-2  text-s border-b py-2 relative">
                <div class="flex gap-x-1 items-center">
                  <div>
                    <img class="h-5" src="~/assets/svg/gofood.svg" alt="" />
                  </div>
                </div>
                <div class="flex gap-x-1">
                  <span>{{branchChannel.branch_channel_name}}</span>
                </div>
                <div class="flex gap-x-2">
                  <span> {{round(branchChannel.items_availability_percentage)}}% </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="rounded-fd bg-white text-sm border w-full p-2">
            <h1 class="font-bold text-s w-full text-center">
              GrabFood
            </h1>

            <ul class="mt-3">
              <li v-for="branchChannel in grabfood_low_ranks" class="flex justify-between px-2  text-s border-b py-2 relative">
                <div class="flex gap-x-1 items-center">
                  <div>
                    <img class="h-5" src="~/assets/svg/grabfood.svg" alt="" />
                  </div>
                </div>
                <div class="flex gap-x-1">
                  <span>{{branchChannel.branch_channel_name}}</span>
                </div>
                <div class="flex gap-x-2">
                  <span> {{round(branchChannel.items_availability_percentage)}}% </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="rounded-fd bg-white text-sm border w-full p-2">
            <h1 class="font-bold text-s w-full text-center">
              ShopeeFood
            </h1>

            <ul class="mt-3">
              <li v-for="branchChannel in shopeefood_low_ranks" class="flex justify-between px-2  text-s border-b py-2 relative">
                <div class="flex gap-x-1 items-center">
                  <div>
                    <img class="h-5" src="~/assets/svg/shopeefood.svg" alt="" />
                  </div>
                </div>
                <div class="flex gap-x-1">
                  <span>{{branchChannel.branch_channel_name}}</span>
                </div>
                <div class="flex gap-x-2">
                  <span> {{round(branchChannel.items_availability_percentage)}}% </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <!-- End of outlet terjelek -->
  </div>
</template>

<script>
export default {
  name: "GraphOpen",
  data() {
    return {
      loading: false,
      seriesClose: [],
      seriesOpen: [],
      issuedDate: this.$moment()
        .subtract(1, "days")
        .format("dddd, DD MMMM YYYY"),
      dictionaryOpenState: {
        on_time: {
          text: "ONTIME",
        },
        on_time_botfood: {
          text: "ONTIME*",
        },
        early: {
          text: "LEBIH AWAL",
        },
        late: {
          text: "TERLAMBAT",
        },
        not_open: {
          text: "OFF",
        },
      },
      dictionaryCloseState: {
        on_time: {
          text: "ONTIME",
        },
        on_time_botfood: {
          text: "ONTIME*",
        },
        early: {
          text: "LEBIH AWAL",
        },
        late: {
          text: "LEBIH LAMA",
        },
        not_open: {
          text: "OFF",
        },
      },
      optionClose: {
        chart: {
          type: "pie",
          horizontalAlign: "left",
        },
        legend: {
          horizontalAlign: "left",
          position: "bottom",
        },

        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      optionOpen: {
        labels: [],
        chart: {
          type: "pie",
          horizontalAlign: "left",
        },

        legend: {
          horizontalAlign: "left",
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      data: [],
      openIndex: 1,
      closeIndex: 1,
      gofood_top_ranks: [],
      gofood_low_ranks: [],
      grabfood_top_ranks: [],
      grabfood_low_ranks: [],
      shopeefood_top_ranks: [],
      shopeefood_low_ranks: [],
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    round (number) {
      return Math.round(number)
    },
    openSelect(event, chartContext, config) {
      this.openIndex = config.dataPointIndex;
    },
    closeSelect(event, chartContext, config) {
      this.closeIndex = config.dataPointIndex;
    },
    async getData() {
      try {
        this.loading = true;
        const res = await this.$axios.get("/me/report/daily_outlet_statistics");
        this.loading = false;

        if (res.data.success) {
          this.data = res.data.data;

          this.data.open_state.forEach((el, index) => {
            var dict = el.open_state;
            if (this.dictionaryOpenState[el.open_state] !== undefined) {
              dict = this.dictionaryOpenState[el.open_state].text;
              // this.openIndex = ctr
            }

            if (el.branch_channels) {
              this.openIndex = index;
            }
            this.optionOpen.labels.push(dict);
            this.seriesOpen.push(el.total);
          });

          this.data.close_state.forEach((el, index) => {
            var dict = el.close_state;
            if (this.dictionaryCloseState[el.close_state] !== undefined) {
              dict = this.dictionaryCloseState[el.close_state].text;
            }
            if (el.branch_channels) {
              this.closeIndex = index;
            }
            this.optionClose.labels.push(dict);
            this.seriesClose.push(el.total);
          });
          this.gofood_top_ranks = this.data.gofood_ranks.top_ranks
          this.gofood_low_ranks = this.data.gofood_ranks.low_ranks
          this.grabfood_top_ranks = this.data.grabfood_ranks.top_ranks
          this.grabfood_low_ranks = this.data.grabfood_ranks.low_ranks
          this.shopeefood_top_ranks = this.data.shopeefood_ranks.top_ranks
          this.shopeefood_low_ranks = this.data.shopeefood_ranks.low_ranks
        } else {
          this.$toast.error(res.data.message);
        }
      } catch (error) {
        this.$toast.error(error);
        console.log(error);
      }
    },
  },
};
</script>
