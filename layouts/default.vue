<template>
<div >
  <div v-if="$device.isMobile">
    <span class="py-48 block text-center">
      Mobile under construction
    </span>
  </div>


  <div class="bg-gray-200" v-if="!$device.isMobile">
  <Nuxt/>
  <a href="https://wa.me/6287824622895" target="new_tab" style=" position: fixed;
  bottom: 0;
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