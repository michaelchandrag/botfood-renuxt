<template>
  <div>
    <div style="background: #fafafa">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth-ssr',
  created() {
    this.$axios.defaults.headers.common.Authorization =
      'Bearer ' + this.$cookies.get('_tk')
  },
}
</script>

<style>
.icon-height {
  height: 56px;
  width: auto;
}
</style>
