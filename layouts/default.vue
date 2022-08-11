<template>
  <div>
    <div style="background: #fafafa">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth-ssr",
  created() {
    this.$axios.defaults.headers.common["Authorization"] =
      "Bearer " + this.$cookies.get("_tk");
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style>

.icon-height {
  height: 50px !important;
  width: 50px !important;
}
.wrapper-content{
  overflow-x: hidden;
  background-color: #E5E5E5 !important;
}

body::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
body::-webkit-scrollbar-track,
.scroll__::-webkit-scrollbar-track {
  background: #c8d0d4;
}
body::-webkit-scrollbar-thumb,
.scroll__::-webkit-scrollbar-thumb {
  background-color: #64767f;
  border-radius: 20px;
  border: 3px solid #64767f;
}
</style>
