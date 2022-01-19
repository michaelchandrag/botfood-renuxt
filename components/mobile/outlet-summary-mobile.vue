<template>
  <div class="mb-4">
    <!-- go -->
    <div class="bg-white flex gap-4 p-6 rounded-fd">
      <div>
        <img
          v-if="channel.channel == 'GoFood'"
          style="height: 72px"
          src="~/assets/svg/gofood.svg"
          alt="" />
        <img
          v-if="channel.channel == 'GrabFood'"
          style="height: 72px"
          src="~/assets/svg/grabfood.svg"
          alt="" />
      </div>
      <div>
        <span>{{ channel.total }} Total Outlet</span>
        <span class="block font-bold text-3xl">{{ channel.channel }}</span>
      </div>
    </div>
    <!-- end go -->
  </div>
</template>

<script>
export default {
  props: {
    channel: Object,
  },
  data() {
    return {
      isLoading: true,
    }
  },
}
</script>
