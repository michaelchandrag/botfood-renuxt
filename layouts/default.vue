<template>
<div >
  <!-- <div v-if="$device.isMobile">
    <span class="py-48 block text-center">
      Mobile under construction
    </span>
  </div> -->


  <div style="background:#fafafa">
  <Nuxt/>
  <a href="https://wa.me/6287824622895" target="new_tab" style=" position: fixed;
  bottom: 0;
  z-index: 99;
  right: 0;" class="bg-green-food rounded-full mr-8 mb-8 p-5">
    <img class="h-8" src="~/assets/png/whatsapp.png" alt="">
  </a>
</div>
</div>

</template>

<script>
export default {
  middleware: 'auth-ssr',
  created() {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.$cookies.get('_tk')
  }
}
</script>

<style>
.icon-height {
  height: 56px;
  width: auto;
}
</style>