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
        <div class="bg-white p-4 rounded-fd mt-4 min-h-[400px] grid grid-cols-2 md:grid-cols-4 gap-3 ">
            <div v-if="!loading" @click.prevent="$modal.show('form')" class="cursor-pointer bg-gray-50 relative border text-gray-700 h-56 rounded-fd  flex items-center justify-center">
                <div class="text-center">
                    <span class="text-[90px] block">+</span>
                </div>
                <div class="absolute bottom-0 text-xs left-0 h-12 bg-white rounded-b-fd w-full flex items-center justify-center">
                    Tambah Integrasi
                </div>
            </div>
            <div v-for="(c,i) in listChannel" :key="i" v-show="!loading" @click="detailAcc(c.id)"  class="bg-gray-50 cursor-pointer relative h-56 border text-gray-700 rounded-fd  flex items-center justify-center">
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
                        Terhubung
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
            <div class="flex gap-2 items-center">
              <div class="">
                <img src="@/assets/svg/shopeefood.svg" class="h-10"/>
              </div>
              <div>
                <h1 class=" font-bold text-xs">
                  {{detailChannel.type_name}}
                </h1>
                <span class="font-bold text-sm block">
                     {{ detailChannel.username }}
                  </span>
              </div>
            </div>
            <div class="mt-3">
              <h2 class="text-sm font-bold">Channels</h2>
              <div class="grid grid-cols-3 gap-2 mt-2 max-h-[320px] overflow-y-scroll">
                  <div v-for="(ch,i) in detailChannel.branch_channels" :key="i" class="bg-gray-100 gap-2 flex items-center rounded-md text-xs p-2">
                    <div>
                      <img class="h-8" v-if="ch.channel == 'GoFood'" src="~/assets/svg/gofood.svg" alt="" />
                      <img class="h-8" v-if="ch.channel == 'GrabFood'" src="~/assets/svg/grabfood.svg" alt="" />
                      <img class="h-8" v-if="ch.channel == 'ShopeeFood'" src="~/assets/svg/shopeefood.svg"
                           alt="" />
                      <img class="h-8" v-if="ch.channel == 'TravelokaEats'" src="~/assets/svg/travelokaeats.svg"
                           alt="" />
                      <img class="h-8" v-if="ch.channel == 'AirAsiaFood'" src="~/assets/svg/airasiafood.svg" alt="" />
                    </div>
                    {{ch.branch_name}}
                  </div>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 mb-3 text-xs">
              <button @click.prevent="checkAcc(detailChannel.id)" :disabled="loadingCheck" class="rounded-md  text-white p-2" :class="loadingCheck?'bg-gray-300':'bg-green-500'" >
                <div v-if="!loadingCheck">
                  <icon-base name="check"/>
                  Cek Integrasi
                </div>
                <div v-else>
                  <loader-mini/>
                </div>
              </button>
              <button @click.prevent="reconnectAcc(detailChannel.id)" :disabled="loadingReconnect" class="rounded-md text-white p-2" :class="loadingReconnect?'bg-gray-300':'bg-purple-500'">
                <div v-if="!loadingReconnect">
                  <icon-base name="repeat"/>
                  Reconnect
                </div>
                <div v-else>
                  <loader-mini/>
                </div>
              </button>
              <button @click.prevent="syncAcc(detailChannel.id)" :disabled="loadingSync" class="rounded-md bg-blue-500 text-white p-2" :class="loadingSync?'bg-gray-300':'bg-blue-500'">
                <div v-if="!loadingSync">
                  <icon-base name="refresh-cw"/>
                  Sinkron ulang outlet
                </div>
                <div v-else>
                  <loader-mini/>
                </div>

              </button>
              <button @click.prevent="deleteAcc(detailChannel.id)" :disabled="loadingDelete" class="rounded-md bg-red-500 text-white p-2" :class="loadingDelete?'bg-gray-300':'bg-red-500'">
                <div v-if="!loadingDelete">
                  <icon-base name="trash-2"/>
                  Hapus Integrasi
                </div>
                <div v-else>
                  <loader-mini/>
                </div>
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
    // 'https://api.botfood.id/api/v1/me/integrations/detail/14' \
    async detailAcc(id) {
      try {
        this.loadingDelete = true
        const res = await this.$axios.get("me/integrations/detail/"+id);
        this.loadingDelete = false
        if(res.data.success) {
          this.detailChannel = res.data.data
          this.$modal.show('detailChannel')
        } else {

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
          this.$toast.success("Berhasil memutuskan koneksi", {duration: 2000})
          this.$modal.hide('detailChannel')
          this.getList()
        } else {
          this.$toast.error("Gagal memutuskan koneksi", {duration: 2000})
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
            this.$toast.success("Integrasi terhubung", {duration: 2000})
          } else {
            this.$toast.error("Integrasi gagal, lakukan Reconnect atau Hapus integrasi ini", {duration: 2000})
          }
        } else {
          this.$toast.error("Integrasi gagal, lakukan Reconnect atau Hapus integrasi ini", {duration: 2000})
        }
      } catch (e) {
        this.loadingCheck = false
      }
    },
    async syncAcc(id) {
      try {
        this.loadingSync = true
        const res = await this.$axios.post("me/integrations/sync/"+id);
        this.loadingSync = false
        if(res.data.success) {
          this.$toast.success("Berhasil sinkronisasi outlet", {duration: 2000})

        } else {
          this.$toast.error("Gagal sinkronisasi outlet", {duration: 2000})
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
          this.$toast.success("Berhasil reconnect integrasi", {duration: 2000})
        } else {
          this.$toast.error("Gagal reconnect integrasi, silahkan Hapus integrasi ini dan ulang proses integrasi dari awal", {duration: 2000})
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

