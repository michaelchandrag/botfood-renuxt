<template>
  <div>
    <table class="table-auto w-full">
      <thead class="border-b">
        <tr>
          <th class="py-4 text-text">Nama Item<i class="fas ml-2"></i></th>
          <th class="py-4 text-text">GoFood<i class="fas ml-2"></i></th>
          <th class="py-4 text-text">GrabFood<i class="fas ml-2"></i></th>
          <th class="py-4 text-text">ShopeeFood<i class="fas ml-2"></i></th>
          <th class="py-4 text-text">TravelokaEats<i class="fas ml-2"></i></th>
        </tr>
      </thead>
      <tbody v-if="listLoading">
        <tr class="h-12" v-for="n in 3" :key="n">
          <td v-for="i in 5" :key="i">
            <div class="h-4 p-4 bg-gray-300 animate-pulse w-full rounded-lg"></div>
          </td>

        </tr>
      </tbody>
      <tbody v-if="!listLoading">
        <tr v-for="(channelData, itemName) in formattedData" :key="itemName" class="hover:bg-gray-200 border-b">
          <td class="text-center text-text p-4">
            {{itemName}}
          </td>
          <td class="text-center text-text p-4">
            <div v-for="itemData in channelData.GoFood" class="item">
              <img :src="itemData.image_url">
              <span class="caption">{{$toIDR(itemData.price)}} ({{$toIDR(itemData.selling_price)}})</span>
              <span class="caption">{{itemData.branch_channel}}</span>
            </div>
          </td>
          <td class="text-center text-text p-4">
            <div v-for="itemData in channelData.GrabFood" class="item">
              <img :src="itemData.image_url">
              <span class="caption">{{$toIDR(itemData.price)}} ({{$toIDR(itemData.selling_price)}})</span>
              <span class="caption">{{itemData.branch_channel}}</span>
            </div>
          </td>
          <td class="text-center text-text p-4">
            <div v-for="itemData in channelData.ShopeeFood" class="item">
              <img :src="itemData.image_url">
              <span class="caption">{{$toIDR(itemData.price)}} ({{$toIDR(itemData.selling_price)}})</span>
              <span class="caption">{{itemData.branch_channel}}</span>
            </div>
          </td>
          <td class="text-center text-text p-4">
            <div v-for="itemData in channelData.TravelokaEats" class="item">
              <img :src="itemData.image_url">
              <span class="caption">{{$toIDR(itemData.price)}} ({{$toIDR(itemData.selling_price)}})</span>
              <span class="caption">{{itemData.branch_channel}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- {{formattedData}} -->
  </div>
</template>

<script>
  export default {
    components: {  
    },
    data() {
      return {
        data: {},
        formattedData: {},
        listLoading: true,
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData () {
        this.$axios.get(`me/report/global`)
          .then(r => {
            this.data = r.data.data
          })
      },
    },
    watch: {
      data: function () {
        this.listLoading = true
        var items = this.data.items
        for (var idx in items) {
          var item = items[idx]
          var itemDescription = {
            name: item.name,
            branch_channel: `${item.branch_channel_name} - ${item.branch_channel_channel}`,
            image_url: `${item.image_url}`,
            price: item.price,
            selling_price: item.selling_price
          }
          if (this.formattedData[item.name] == undefined) {
            this.formattedData[item.name] = {
              'GoFood': [],
              'GrabFood': [],
              'ShopeeFood': [],
              'TravelokaEats': []
            }
          }
          this.formattedData[item.name][item.branch_channel_channel].push(itemDescription)
        }
        this.listLoading = false
        console.log(this.formattedData)
      }
    }
  }

</script>

<style scoped>
  div.item {
    vertical-align: top;
    display: inline-block;
    text-align: center;
    width: 120px;
  }
  img {
      width: 100px;
      height: 100px;
      background-color: grey;
  }
  .caption {
      display: block;
  }
</style>
