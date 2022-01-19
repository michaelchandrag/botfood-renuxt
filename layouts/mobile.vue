<template>

    <div>
         <div v-if="!$device.isMobile" class="container" style="background:#fafafa">
    <div @load.prevent="$router.push('/')"></div>
  </div>

   <div v-if="$device.isMobile" style="background:#fafafa">
   <Nuxt/>
  </div>
    </div>
</template>

<script>
export default {
  middleware: 'auth-ssr',
  created() {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.$cookies.get('_tk')
  },
  mounted() {
    if(!this.$device.isMobile) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.container {
  max-width: 768px;
}
</style>
