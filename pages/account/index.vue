<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content have-right-sidebar">
      <div>
        <span class="text-title">Pengaturan</span>
      </div>
      <div style="height: 24px"></div>
      <div class="flex flex-col">
        <change-password />
      </div>
      <div class="h-8"></div>
      <right-sidebar-calendar />
    </div>
  </div>
</template>

<script>
import changePassword from "~/components/setting/change-password.vue";
export default {
  components: {
    changePassword,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
