<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <div>
        <client-only
          ><header-navbar class="hidden md:block"></header-navbar
        ></client-only>
      </div>
      <div>
        <span class="text-title">Integrasi</span>
      </div>
        <div class="bg-white p-4 rounded-fd mt-4 min-h-[400px] grid grid-cols-2 md:grid-cols-4 gap-3 cursor-pointer">
            <div @click.prevent="$modal.show('form')" class="bg-gray-50 relative border text-gray-700 h-56 rounded-fd  flex items-center justify-center">
                <div class="text-center">
                    <span class="text-[90px] block">+</span>
                </div>
                <div class="absolute bottom-0 text-xs left-0 h-12 bg-white rounded-b-fd w-full flex items-center justify-center">
                    Tambah Integrasi
                </div>
            </div>
            <div v-for="c in 12" :key="c" class="bg-gray-50 relative h-56 border text-gray-700 rounded-fd  flex items-center justify-center">
                <div class="text-center">
                    <img src="http://localhost:3000/_nuxt/assets/svg/grabfood.svg"/>
                </div>
                <div class="absolute bottom-0 font-bold text-sm left-0 h-12 bg-white rounded-b-fd w-full flex items-center justify-center">
                    Grab Food
                </div>
                <div class="absolute top-0 text-xs left-0 py-3 bg-green-100 text-green-600 rounded-t-fd w-full flex items-center justify-center">
                   <div class="text-green-100 bg-green-600 h-3 w-3 rounded-full flex items-center justify-center">
                       <icon-base name="check"/>
                   </div>
                    <div class="ml-1">
                        Connected
                    </div>


                </div>
            </div>
        </div>

    </div>
<!--    modal form-->
    <form-integrasi/>
<!--    end modal form-->
  </div>
</template>
<script>

import FormIntegrasi from "~/components/integrasi/form-integrasi.vue";
export default {
  components: {FormIntegrasi},
    data(){
        return {
            listChannel: []
        }
    },
  middleware: ["auth-ssr"]

};
</script>

