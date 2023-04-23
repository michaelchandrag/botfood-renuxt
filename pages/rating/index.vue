<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      </div>
      <div>
        <span class="text-title">Rating</span>
      </div>
      <div style="height: 24px"></div>
      <div class="flex flex-col">
        <div class="grid grid-cols-1 gap-4 mb-4 bg-white p-4 rounded-md">
          <outlet-channel-rating/>
        </div>
        <div class="grid grid-cols-1 gap-4 mb-4 bg-white p-4 rounded-md">
          <trend-rating/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OutletChannelRating from "~/components/outlet/outlet-channel-rating.vue"
import TrendRating from "~/components/outlet/trend-rating.vue"
export default {
  components: {
    OutletChannelRating,
    TrendRating
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {

  },
};
</script>
