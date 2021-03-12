<template>
<div>
  <sidebar-menu/>
</div>
</template>
<script>
import sidebarMenu from '~/components/mobile/sidebar-menu.vue'

export default {
  components: { sidebarMenu },
    layout: 'mobile',
    data() {
      return {
        data: {},
        history: {},
        items_idle: {},
        isLoading: true,
        statusDropdown: false,
        channelDropdown: false,
        itemDropdown: false,
        outletStatus: 'Semua Status',
        channelStatus: 'Semua Channel',
        date: new Date(),
        selectedItem: {},
        tab: 'outlet',
        listLoading: false,
        listItems: {},
        itemID: '',
        page_outlet: 1,
        total_page_outlet: 1,
        page_item: 1,
        total_page_item: 1,
        outlet: {
          start: 0,
          end: 9
        }
      }
    },
    middleware: ['auth-ssr'],
    computed: {
      sorted() {
        if(!this.isLoading) {
          return this.history
        }
      }
    },
    mounted() {
      var id = this.$route.params.id
      var date = this.$moment(this.date).format('YYYY-MM-DD')
      this.$axios.get('me/branch_channel/' + id).then(r => {
        this.data = r.data.data
        this.isLoading = false
      })
      this.$axios.get('me/branch_channel/' + id + '/history?issued_at=' + date + '&data=10&page='+this.page_outlet).then(r => {
        this.history = r.data.data
        this.total_page_outlet = Math.ceil(this.history.length/10)
      })
    },
    watch: {
      date: {
        handler(r) {
          this.listLoading = true
          this.channelDropdown = false
          var id = this.$route.params.id
          var date = this.$moment(this.date).format('YYYY-MM-DD')
          if (this.tab == 'outlet') {
            this.$axios.get('me/branch_channel/' + id + '/history?issued_at=' + date + '&data=10&page=1').then(r => {
              this.history = r.data.data
              this.page_outlet = 1
              this.total_page_outlet = Math.ceil(this.history.length/10)
              this.listLoading = false
            })
          } else {
            this.$axios.get('me/history_item/' + this.itemID + '?until_created_at=' + date + ' 23:59:59&data=10&page=1').then(res => {
              this.items_idle = res.data.data
              this.listLoading = false
              this.item = r.data.data.current_page
              this.total_item = r.data.data.total_page
            })
          }

        }
      }
    },
    methods: {
      changeTab(val) {
        this.listLoading = true
        this.tab = val
        var id = this.$route.params.id
        var date = this.$moment(this.date).format('YYYY-MM-DD')

        // jika tab item
        if (val == 'item') {
          this.$axios.get('me/branch_channel/' + id + '/items_idle?issued_at=' + date).then(r => {
            this.listItems = r.data.data
            this.selectedItem = r.data.data[0].item_name
            this.itemID = r.data.data[0].item_id
            this.$axios.get('me/history_item/' + r.data.data[0].item_id + '?until_created_at=' + date + ' 23:59:59').then(res => {
              this.items_idle = res.data.data
              this.listLoading = false
              this.page_item = res.data.data.current_page
              this.total_page_item = res.data.data.total_page
            })
          })

          // jika tab outlet
        } else {
          this.$axios.get('me/branch_channel/' + id + '/history?issued_at=' + date + '&data=10&page=1').then(r => {
            this.history = r.data.data
            this.listLoading = false
            this.page_outlet = 1
              this.total_page_outlet = Math.ceil(this.history.length/10)
          })
        }
      },
      getItemHistory(id, name) {
        this.itemDropdown = false
        this.itemID = id
        var date = this.$moment(this.date).format('YYYY-MM-DD')
        this.selectedItem = name
        this.$axios.get('me/history_item/' + id + '?until_created_at=' + date + ' 23:59:59&data=10&page=1').then(res => {
          this.items_idle = res.data.data
          this.listLoading = false
          this.page_item = res.data.data.current_page
          this.total_page_item = res.data.data.total_page
        })
      },
      changePageItem(v) {
      this.page_item = this.page_item+parseFloat(v)
      this.changePageNumberItem()
    },
    changePageNumberItem(){
        this.listLoading = true
        var id = this.itemID
        var date = this.$moment(this.date).format('YYYY-MM-DD')
        var page = 'page='+this.page_item
        this.$axios.get('me/history_item/' + id + '?until_created_at=' + date + ' 23:59:59&data=10&'+page).then(res => {
          this.items_idle = res.data.data
          this.listLoading = false
          this.page_item = res.data.data.current_page
          this.total_page_item = res.data.data.total_page
        })
    },
    changeOutletPage(v) {
      // return this.outlet_page = this.outlet_page+parseInt(v)
      this.page_outlet = this.page_outlet + parseInt(v)
      if(v===1) {
        this.outlet.end = this.outlet.end + 9
        this.outlet.start = this.outlet.start + 9
      } else {
         this.outlet.end = this.outlet.end - 9
        this.outlet.start = this.outlet.start - 9
      }
    }

    }
  }
</script>
<style>
.bg {
  background-image:linear-gradient(90deg,rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.3)),url('~/assets/png/background.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.vdp-datepicker__calendar {
    width: 100% !important;
    position: static !important;
    border-radius: 8px !important;
    padding: 2rem !important;
}
.vdp-datepicker__calendar .cell.selected {
    background: #029835 !important;
    color: #fff !important;
    border-radius: 4px !important;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border: 1px solid #029835 !important;
    border-radius: 4px !important;
}
</style>