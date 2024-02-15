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
        <promo-competitor v-if="isPromoAllowed"/>
        <performa-outlet />
        <!-- <order /> -->
        <price />
        <global />
        <quick-summary />
        <warning-activity-outlet/>
        <performance-snapshot/>
      </div>
    </div>
  </div>
</template>

<script>
  import promoCompetitor from '~/components/laporan/promo-competitor.vue'
  import performaOutlet from '~/components/laporan/performa-outlet.vue'
  import order from '~/components/laporan/order.vue'
  import price from '~/components/laporan/price.vue'
  import global from '~/components/laporan/global.vue'
  import warningActivityOutlet from '~/components/laporan/warning-history.vue'
  import quickSummary from '~/components/laporan/quick-summary.vue'
  import performanceSnapshot from '~/components/laporan/performance-snapshot.vue'
  export default {
    components: {
      promoCompetitor,
      performaOutlet,
      order,
      price,
      global,
      warningActivityOutlet,
      quickSummary,
      performanceSnapshot,
    },
    data() {
      return {
        isPromoAllowed: false,
      }
    },
    mounted() {
      var me = this.$store.state.user.user
      if (me.id == 34 || me.id == 27) {
        this.isPromoAllowed = true
      }
    },
    methods: {}
  }

</script>
