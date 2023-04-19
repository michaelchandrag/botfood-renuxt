<template>
  <div v-if="!loading">
    <h1 class="font-bold"><u>Perkembangan Rating</u></h1>
    <client-only>
      <ApexChart
        width="100%"
        height="350px"
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
        xaxis: {
          categories: [],
        },
        stroke: {
          curve: "smooth",
        },
        colors: ["#ff0000", "#0a9830", "#FFA500"],
        stacked: true,
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 4,
          max: 5,
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
            const formattedSerie = {
              name: el.channel,
              data: el.values,
            };
            this.series.push(formattedSerie);
          });
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
