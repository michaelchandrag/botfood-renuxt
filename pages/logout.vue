<template>
  <div></div>
</template>

<script>
export default {
  name: "LogoutPage",
  mounted() {
    this.$store.commit("user/setUser", {});
    this.$cookies.removeAll();
    this.$router.push("/login");
  },
};
</script>
