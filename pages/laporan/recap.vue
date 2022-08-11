<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      </div>
      <div>
        <span class="text-title">Rekap</span>
      </div>
      <div style="height:24px"></div>
      <div class="flex flex-col ">
        <performa-outlet />
        <!-- <order /> -->
        <price />
        <global />
      </div>
    </div>
  </div>
</template>

<script>
  import performaOutlet from '~/components/laporan/performa-outlet.vue'
  import order from '~/components/laporan/order.vue'
  import price from '~/components/laporan/price.vue'
  import global from '~/components/laporan/global.vue'
  export default {
    components: {
      performaOutlet,
      order,
      price,
      global
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }

</script>
