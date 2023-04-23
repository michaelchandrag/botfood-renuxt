<template>
  <div v-if="!loading">
    <h1><u>Perkembangan Rating</u></h1>
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
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        title: {
          align: 'left'
        },
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        colors: ["#ED2836", "#029835", "#FFD580"],
        grid: {
          borderColor: '#e7e7e7',
          row: {
          },
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Tanggal'
          },
          type: 'datetime',
        },
        yaxis: {
          title: {
            text: 'Rating'
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      series: [],
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      try {
        this.loading = true;
        this.$axios.get("/me/report/rating_statistics")
          .then(res => {
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
          })
      } catch (error) {
        this.$toast.error(error);
        console.log(error);
      }
    },
  },
};
</script>
