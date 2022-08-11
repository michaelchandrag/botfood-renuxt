<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      </div>
      <div>
        <span class="text-title">Manajemen Akun</span>
      </div>
      <div style="height: 24px"></div>
      <div class="flex flex-col">
        <management />
      </div>
      <div class="h-8"></div>
    </div>
  </div>
</template>

<script>
import management from "~/components/account/management.vue";
export default {
  components: {
    management,
  },
  data() {
    return {};
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        // const res = await this.$axios.get("me/user_brands?q=");
        // console.log(res);
      } catch (error) {}
    },
  },
};
</script>
