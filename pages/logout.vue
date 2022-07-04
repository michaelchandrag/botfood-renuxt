<template>
  <div></div>
</template>

<script>
export default {
  name: "LogoutPage",
  mounted() {
    this.$cookies.removeAll();
    this.$router.push("/login");
  },
};
</script>
