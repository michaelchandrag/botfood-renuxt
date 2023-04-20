<template>
  <div v-if="!loading">
    <h1 class="font-bold"><u>Perkembangan Rating</u></h1>
    <client-only>
      <div>
        <line-chartjs :chart-data="chartData" :chart-options="options" />
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "OutletChannelRating",
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      loading: true,
      data: [],
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

          this.data.chart.series.forEach((el, index) => {
            const formattedSerie = {
              label: el.channel,
              backgroundColor: el.channel.includes("Go")
                ? "#ff0000"
                : el.channel.includes("Shop")
                ? "#FFA500"
                : el.channel.includes("Grab")
                ? "#0a9830"
                : "#00ff",
              data: el.values,
            };

            this.chartData.datasets.push(formattedSerie);
          });
          this.data.chart.dates.forEach((d) => {
            this.chartData.labels.push(this.$moment(d).format("DD MMM YYYY"));
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
