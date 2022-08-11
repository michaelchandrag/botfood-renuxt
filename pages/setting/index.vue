<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content">
      <div>
        <header-navbar class="hidden md:block"></header-navbar>
      </div>
      <div>
        <span class="text-title">Pengaturan</span>
      </div>
      <div style="height:24px"></div>
      <div class="flex flex-col ">
        <change-password />
      </div>
      <div class="h-8"></div>
    </div>
  </div>
</template>

<script>
  import changePassword from '~/components/setting/change-password.vue'
  export default {
    components: {
      changePassword
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }

</script>
