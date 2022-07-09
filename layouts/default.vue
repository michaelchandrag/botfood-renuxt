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
  mounted() {
    if (!this.user.is_master) {
      this.setUserData();
    }
  },
  methods: {
    async setUserData() {
      try {
        const res = await this.$axios.get("/me");
        if (res.data.success) {
          this.$store.commit("user/setUser", res.data.data);
        }
      } catch (error) {}
    },
  },
};
</script>

<style>
.icon-height {
  height: 50px;
  width: 50px;
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
