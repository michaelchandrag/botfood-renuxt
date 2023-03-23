<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="!loading">
      <client-only>
        <div class="border-b md:border-0">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h1 class="font-bold">Laporan Outlet Opening</h1>
              <h1 class="text-sm text-gray-500">{{ issuedDate }}</h1>
              <ApexChart
                width="100%"
                height="250"
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
                height="250"
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
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
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
