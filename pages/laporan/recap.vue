<template>
   <div class="flex">
     <left-sidebar class="w-2/12 px-6 pt-8 " />

     <div class="w-10/12 bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Rekap</span>
      </div>
      <div style="height:24px"></div>
      <div class="flex flex-col ">
        <performa-outlet/>
        <order/>
        <price/>
      </div>
     </div>
   </div>
</template>

<script>
import performaOutlet from '~/components/laporan/performa-outlet.vue'
import order from '~/components/laporan/order.vue'
import price from '~/components/laporan/price.vue'
export default {
  components: {
    performaOutlet,
    order,
    price
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>