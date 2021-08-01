<template>
   <div class="flex">
     <sidebar-menu/>
     <!-- <div class="h-16"></div> -->
     <div class="w-full min-h-screen bg-gray-100 pt-10 px-4">
      
      <div class="bg-white rounded-fds mt-14 px-2 py-4">
           <div class="px-4">
        <span class="font-bold">Pengaturan / Ubah Password</span>
      </div>
      <div class="h-2"></div>
      <div class="flex flex-col ">
        <change-password-mobile/>
      </div>
      </div>
     
     </div>

    
   </div>
</template>

<script>
import SidebarMenu from '~/components/mobile/sidebar-menu.vue'
import ChangePasswordMobile from '~/components/setting/change-password-mobile.vue'


export default {
  components: {
    SidebarMenu,
    ChangePasswordMobile
  },
   layout: 'mobile',
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