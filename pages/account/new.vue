<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      </div>
      <div @click.prevent="$router.push('/account')" class="flex items-center gap-x-2 cursor-pointer">
        <i class="fas fa-chevron-left"></i>
        <span class="text-title">Buat Akun Baru</span>
      </div>
      <div style="height: 24px"></div>
      <div class="flex flex-col">
        <new-account />
      </div>
      <div class="h-8"></div>
    </div>
  </div>
</template>

<script>
import NewAccount from "~/components/account/new-account.vue";
export default {
  components: {
    NewAccount,
  },
  data() {
    return {};
  },
};
</script>
