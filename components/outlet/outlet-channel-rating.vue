<template>
  <div v-if="!loading">
    <client-only>
      <ApexChart
        width="100%"
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
          id: "outlet-channel-rating-graph-line",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
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
        this.series = []

        if (res.data.success) {
          this.data = res.data.data
          this.chartOptions.xaxis.categories = this.data.chart.dates
          this.data.chart.series.forEach((el, index) => {
            var formattedSerie = {
              name: el.channel,
              data: el.values
            }
            this.series.push(formattedSerie)
          })
          this.loading = false;
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
