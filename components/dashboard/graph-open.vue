<template>
  <div>
    <div class="grid grid-cols-2 gap-2" v-if="!loading">
      <client-only>
        <div>
          <h1 class="font-bold">Grafik Open</h1>
          <div class="grid grid-cols-3">
            <div class="col-span-2">
              <ApexChart
                width="100%"
                height="500"
                type="pie"
                :options="optionOpen"
                :series="seriesOpen"
                @dataPointSelection="openSelect"
              />
            </div>

            <div v-if="data.open_state">
              <h1 class="font-bold uppercase text-lg" v-if="data.open_state">
                List
                {{
                  data.open_state[this.openIndex].open_state.replaceAll(
                    "_",
                    " "
                  )
                }}
              </h1>
              <ul>
                <li
                  v-for="(op, index) in data.open_state[this.openIndex]
                    .branch_channels"
                  :key="index"
                >
                  <!-- <img :src="op.branch_channel_channel | imgChannel" alt="" /> -->
                  {{ op.branch_channel_name }}
                </li>
                <li v-if="!data.open_state[this.openIndex].branch_channels">
                  Belum ada Data
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h1 class="font-bold">Grafik Close</h1>
          <div class="grid grid-cols-3">
            <div class="col-span-2">
              <ApexChart
                width="100%"
                height="500"
                type="pie"
                :options="optionClose"
                :series="seriesClose"
                @dataPointSelection="closeSelect"
              />
            </div>

            <div v-if="data.close_state">
              <h1 class="font-bold uppercase text-lg" v-if="data.close_state">
                List
                {{
                  data.close_state[this.closeIndex].close_state.replaceAll(
                    "_",
                    " "
                  )
                }}
              </h1>
              <ul>
                <li
                  v-for="(op, index) in data.close_state[this.closeIndex]
                    .branch_channels"
                  :key="index"
                >
                  <!-- <img :src="op.branch_channel_channel | imgChannel" alt="" /> -->
                  {{ op.branch_channel_name }}
                </li>
                <li v-if="!data.close_state[this.closeIndex].branch_channels">
                  Belum ada Data
                </li>
              </ul>
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
      optionClose: {
        chart: {
          width: 380,
          type: "pie",
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
          width: 380,
          type: "pie",
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

  filters: {
    imgChannel(v) {
      if (v === "GrabFood") {
        return "~/assets/svg/grabfood.svg";
      }

      if (v === "GoFood") {
        return "~/assets/svg/gofood.svg";
      }

      if (v === "ShopeeFood") {
        return "~/assets/svg/shopeefood.svg";
      }
      if (v === "TravelokaEats") {
        return "~/assets/svg/travelokaeats.svg";
      }
    },
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
          console.log(this.data);
          this.data.open_state.forEach((el) => {
            this.optionOpen.labels.push(el.open_state.replaceAll("_", " "));
            this.seriesOpen.push(el.total);
          });

          this.data.close_state.forEach((el) => {
            this.optionClose.labels.push(el.close_state.replaceAll("_", " "));
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
