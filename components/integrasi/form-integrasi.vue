<template>
  <div>
    <client-only>
      <vmodal name="form" :adaptive="true" height="auto">
        <div class="p-4 w-full">
          <form class="w-full" autocomplete="off" @submit.prevent="connectAcc">
            <h1 class="font-bold text-lg mb-4 text-center">Integrasi Channel</h1>

<!--            Info requirement untuk connect-->
            <div class="p-3 bg-blue-100 text-blue-600 flex gap-2 rounded-fd mb-3">
              <div class="-mt-1">
                <icon-base name="info"/>
              </div>
              <div class="text-xs">
                Sebelum melakukan integrasi untuk Shopee Partner, persiapkan data-data akun berikut yang akan digunakan untuk integrasi: <br/>
                1. Nomor HP dan password akun Shopee Partner<br/>
                2. Role Akun Staf<br/>
                3. OTP yang akan dikirim ke Nomor HP yang bersangkutan
              </div>
            </div>
<!--            Info requirement untuk connect-->

            <div class="mb-2">
              <label class="text-sm text-gray-600">Channel</label>
              <select :disabled="loading" class="p-2 w-full rounded-md border outline-none block" v-model.trim="form.type">
                <option value="">Pilih Channel</option>
                <option value="shopee_partner_web">Shopee Food</option>
              </select>
            </div>

            <div class="mb-2">
              <label class="text-sm text-gray-600">Username</label>
              <input :disabled="loading" class="p-2 w-full rounded-md border outline-none block" type="text" placeholder="Masukkan Username" v-model.trim="form.username">
            </div>
            <div class="mb-2">
              <label class="text-sm text-gray-600">Password</label>
              <input :disabled="loading"  class="p-2 w-full rounded-md border outline-none block" type="password" placeholder="Masukkan Password" v-model.trim="form.password">
            </div>

            <!--            Info requirement untuk connect-->
            <div class="p-3 bg-green-100 text-green-600 flex gap-2 rounded-fd mb-3">
              <div class="-mt-1">
                <icon-base name="info"/>
              </div>
              <div class="text-xs">
                Fitur yang tersedia: <br/>
                1. Ubah status menu di Shopee
              </div>
            </div>
            <!--            Info requirement untuk connect-->
            <!--            Info requirement untuk connect-->
            <div class="p-3 bg-red-100 text-red-600 flex gap-2 rounded-fd mb-3">
              <div class="-mt-1">
                <icon-base name="info"/>
              </div>
              <div class="text-xs">
                WARNING!<br/>
                Integrasi ini berjalan dengan cara mengotomatiskan browser chrome untuk mengelola Shopee Partner Web, maka dari itu data yang digunakan untuk akses Shopee Partner Web akan kami simpan. Namun jangan khawatir, data tersebut tetap kami enkripsi demi keamanan.
              </div>
            </div>
            <!--            Info requirement untuk connect-->
            <div class="flex justify-end gap-3 mt-3">
              <button type="button" :disabled="loading" class="flex text-gray-500 px-4 py-2 items-center gap-1" @click.prevent="$modal.hide('form')">
                <icon-base name="x"/>
                Tutup
              </button>
              <button :disabled="loading" :class="loading?'bg-gray-400':'bg-green-600'" type="submit" class="flex px-4 py-2 items-center gap-1 text-green-50 rounded-lg">
                <icon-base name="save"/>
                {{loading?'Memproses...':'Tambah'}}

              </button>
            </div>
          </form>
        </div>
      </vmodal>


<!--      formOtp-->
      <vmodal name="formOtp" :adaptive="true" height="auto">
        <div class="p-4">
          <form class="w-full" autocomplete="off" @submit.prevent="validasiOtp">
            <h1 class="font-bold text-lg mb-4 text-center">Validasi OTP</h1>
            <input :disabled="loadingOtp" class="p-2 w-full text-center focus:border-green-600 border-b outline-none block text-2xl" type="text" placeholder="Masukkan OTP" v-model.trim="otp">
            <div class="flex justify-end gap-3 mt-4">
              <button type="button" :disabled="loadingOtp" class="flex text-gray-500 px-4 py-2 items-center gap-1" @click.prevent="$modal.hide('formOtp')">
                <icon-base name="x"/>
                Tutup
              </button>
              <button :disabled="loadingOtp" :class="loadingOtp?'bg-gray-400':'bg-green-600'" type="submit" class="flex px-4 py-2 items-center gap-1 text-green-50 rounded-lg">
                <icon-base name="save"/>
                {{loadingOtp?'Memproses...':'Lanjutkan'}}
              </button>
            </div>
          </form>
        </div>
      </vmodal>

    </client-only>
  </div>
</template>

<script>
export default  {
  data() {
    return{
      form: {
        username:"",
        password:"",
        type:""
      },
      loading: false,
      otp:'',
      resConnect: {
        integration: {
          id:""
        }
      },
      loadingOtp:false
    }
  },

  methods:{
    async connectAcc() {
      try {
        this.loading = true
        const res = await this.$axios.post("me/integrations/connect", {
          "type": this.form.type,
          "username": this.form.username,
          "password":  this.form.password
        });
        this.loading = false
        if(res.data.success) {
          const next = res.data.data
          this.resConnect = res.data.data
          if(next.next_move==='otp') {
            this.$modal.show("formOtp")
          } else {
            this.$modal.hide("form")
            this.$modal.hide("formOtp")
            this.syncAcc(this.resConnect.integration.id)
            this.$emit('reload')
          }
        }

      } catch (e) {
        this.loading = false
        const err = e.response.data.errors
        if(err) {
          try {
            err.forEach(msg=>{
              this.$toast.error(`${msg.code} : ${msg.detail}`)
            })
          } catch (e) {
            console.log(e)
          }
        }

      }


    },
    async validasiOtp() {
      try {
        this.loadingOtp = true
        const res = await this.$axios.post("me/integrations/connect_otp", {
          "integration_id": this.resConnect.integration.id||"",
          "otp": this.otp
        });
        this.loadingOtp = false
        if(res.data.success) {
          this.$modal.show("formOtp")
          this.syncAcc(this.resConnect.integration.id)
          this.$emit('reload')
        } else {

        }
      } catch (e) {
        this.loadingOtp = false
        const err = e.response.data.errors
        if(err) {

          try {
            err.forEach(msg=>{
              this.$toast.error(`${msg.code} : ${msg.detail}`)
            })
          } catch (e) {
            console.log(e)
          }
        }

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
  }
}
</script>
