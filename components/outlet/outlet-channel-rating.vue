<template>
  <div v-if="!loading">
    <h1 class="font-bold"><u>Perkembangan Rating</u></h1>
    <client-only>
      <ApexChart
        width="100%"
        height="320px"
        type="line"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: "OutletChannelRating",
  data() {
    return {
      loading: true,
      data: [],
      options: {},
      chartOptions: {
        chart: {
          id: "outline-channel-rating",
        },
        colors: ["#ff0000", "#0a9830", "#FFA500"],
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              const v = value / 10;
              return v.toFixed(2);
            },
          },
        },
      },
      series: [],
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const res = await this.$axios.get("/me/report/rating_statistics");
        this.series = [];

        if (res.data.success) {
          this.data = res.data.data;
          this.data.chart.dates.forEach((d) => {
            this.chartOptions.xaxis.categories.push(
              this.$moment(d).format("DD MMM YYYY")
            );
          });
          this.data.chart.series.forEach((el, index) => {
            const p = [];
            el.values.forEach((x) => {
              p.push(x * 10);
            });
            const formattedSerie = {
              name: el.channel,
              data: p,
            };

            this.series.push(formattedSerie);
          });
          this.loading = false;
        } else {
          this.$toast.error(res.data.message);
        }
      } catch (error) {
        this.$toast.error(error);
        // console.log(error);
      }
    },
  },
};
</script>
