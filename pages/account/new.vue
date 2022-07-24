<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content">
      <div
        @click.prevent="$router.push('/account')"
        class="flex items-center gap-x-2 cursor-pointer"
      >
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
