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
            <div v-if="!loading" @click.prevent="$modal.show('form')" class="bg-gray-50 relative border text-gray-700 h-56 rounded-fd  flex items-center justify-center">
                <div class="text-center">
                    <span class="text-[90px] block">+</span>
                </div>
                <div class="absolute bottom-0 text-xs left-0 h-12 bg-white rounded-b-fd w-full flex items-center justify-center">
                    Tambah Integrasi
                </div>
            </div>
            <div v-for="(c,i) in listChannel" :key="i" v-show="!loading" @click="detailChannel=c, $modal.show('detailChannel')"  class="bg-gray-50 relative h-56 border text-gray-700 rounded-fd  flex items-center justify-center">
                <div class="text-center">
                    <img src="@/assets/svg/shopeefood.svg"/>
                </div>
                <div class="absolute bottom-0 text-center font-bold text-sm left-0 h-12 bg-white rounded-b-fd w-full flex items-center justify-center">
                  <div>
                     <span class="text-xs block">
                     {{ c.type_name }}
                  </span>
                    <span class="text-sm font-bold block">
                     {{ c.username }}
                  </span>
                  </div>
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


          <div v-for="(x) in 8" :key="x" v-show="loading"  class="bg-gray-200 relative h-56 border text-gray-700 rounded-fd animate animate-pulse">
          </div>
        </div>

    </div>
<!--    modal form-->
    <form-integrasi @reload="getList()"/>
<!--    end modal form-->

    <client-only>

        <vmodal name="detailChannel" :adaptive="true" height="auto">
          <div class="p-3">
            <h1 class="text-center font-bold">
              {{detailChannel.type_name}}
            </h1>

            <div>
              <div class="text-center my-6">
                <img src="@/assets/svg/shopeefood.svg" class="mx-auto"/>
              </div>
              <div class="text-center font-bold text-sm left-0 w-full flex items-center justify-center ">
                <div>
                  <span class="font-bold block">
                     {{ detailChannel.username }}
                  </span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 mb-3">
              <button @click.prevent="checkAcc(detailChannel.id)" :disabled="loadingCheck" class="rounded-md bg-green-500 text-white p-2">
                <icon-base name="check"/>
                Check
              </button>
              <button @click.prevent="reconnectAcc(detailChannel.id)" :disabled="loadingReconnect" class="rounded-md bg-purple-500 text-white p-2">
                <icon-base name="repeat"/>
                Reconnect
              </button>
              <button @click.prevent="syncAcc(detailChannel.id)" :disabled="loadingSync" class="rounded-md bg-blue-500 text-white p-2">
                <icon-base name="refresh-cw"/>
                Sync
              </button>
              <button @click.prevent="deleteAcc(detailChannel.id)" :disabled="loadingDelete" class="rounded-md bg-red-500 text-white p-2">
                <icon-base name="trash-2"/>
                Hapus
              </button>
            </div>



          </div>
          </vmodal>

    </client-only>
  </div>
</template>
<script>

import FormIntegrasi from "~/components/integrasi/form-integrasi.vue";
export default {
  components: {FormIntegrasi},
    data(){
        return {
          listChannel: [],
          errorMsg: "",
          loading: false,
          detailChannel: {},
          loadingDelete:false,
          loadingCheck: false,
          loadingReconnect: false,
          loadingSync: false,
        }
    },
  middleware: ["auth-ssr"],
  mounted() {
    this.getList()
    this.$modal.show('formOtp')
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        this.errorMsg = ''
        const res = await this.$axios.get("me/integrations");
        this.loading = false
        if(res.data.success) {
          this.listChannel = res.data.data.integrations
        } else {
          this.errorMsg = res.data
        }
        console.log(res)
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async deleteAcc(id) {
      try {
        this.loadingDelete = true
        const res = await this.$axios.post("me/integrations/delete/"+id);
        this.loadingDelete = false
        if(res.data.success) {
          this.$toast.success("Berhasil memutuskan koneksi")
          this.$modal.hide('detailChannel')
          this.getList()
        } else {
          this.$toast.error("Gagal memutuskan koneksi")
        }
        console.log(res)
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async checkAcc(id) {
      try {
        this.loadingCheck = true
        const res = await this.$axios.post("me/integrations/check/"+id);
        this.loadingCheck = false
        if(res.data.success) {
          if(res.data.data.integration_success&&res.data.data.is_integrated) {
            this.$toast.succes("Akun sudah terkoneksi")
          } else {
            this.$toast.error("Akun belum terkoneksi")
          }
        } else {
          this.$toast.error("Gagal check koneksi")
        }
      } catch (e) {
        this.loadingCheck = false
      }
    },
    async syncAcc(id) {
      try {
        this.loadingSync = true
        const res = await this.$axios.post("me/integrations/delete/"+id);
        this.loadingSync = false
        if(res.data.success) {
          this.$toast.success("Berhasil sync koneksi")

        } else {
          this.$toast.error("Gagal sync koneksi")
        }
        console.log(res)
      } catch (e) {
        this.loadingSync = false
        console.log(e)
      }
    },
    async reconnectAcc(id) {
      try {
        this.loadingReconnect = true
        const res = await this.$axios.post("me/integrations/reconnect/"+id);
        this.loadingReconnect = false
        if(res.data.success) {
          this.$toast.success("Berhasil reconnect koneksi")
        } else {
          this.$toast.error("Gagal reconnect koneksi")
        }
        console.log(res)
      } catch (e) {
        this.loadingReconnect = false
        console.log(e)
      }
    }
  }

};
</script>

