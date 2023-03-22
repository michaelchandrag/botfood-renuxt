<template>
  <div class="grid grid-cols-2 gap-2">
    <client-only>
      <div>
        <ApexChart
          width="100%"
          height="500"
          type="pie"
          :options="optionOpen"
          :series="seriesOpen"
        />
        <div></div>
      </div>
      <div>
        <ApexChart
          width="100%"
          height="300"
          type="pie"
          :options="optionClose"
          :series="seriesClose"
        />
      </div>
    </client-only>
    <input type="text" id="openIndex" @input="openIndex" />
  </div>
</template>

<script>
export default {
  name: "GraphOpen",
  data() {
    return {
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
          events: {
            dataPointSelection: function (event, chartContext, config) {
              const el = document.getElementById("openIndex");
              el.value = config.dataPointIndex;
            },
          },
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
    };
  },
  watch: {
    '$el.querySelector('#openIndex')': {
      handler(r) {
        console.log(r);
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    openIndex(v) {
      console.log(v);
    },
    async getData() {
      try {
        const res = await this.$axios.get("/me/report/daily_outlet_statistics");
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
