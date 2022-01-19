<template>
   <div class="flex">
     <left-sidebar class="w-2/12 px-6 pt-8 " />

     <div class="w-7/12 bg-gray-200 pl-6 pt-10">
      <div>
        <span class="text-title">Pengaturan</span>
      </div>
      <div style="height:24px"></div>
      <div class="flex flex-col ">
        <change-password/>
      </div>
     </div>

     <right-sidebar-calendar class="w-3/12 cursor-pointer items-center relative pl-6 pt-10" />
   </div>
</template>

<script>
import changePassword from '~/components/setting/change-password.vue'
export default {
  components: {
    changePassword
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>