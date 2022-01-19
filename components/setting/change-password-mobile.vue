<template>
  <div class="px-4">
    <form action="">
      <div class="mt-4 w-full">
        <label for="">Password Lama</label>
        <input
          v-model="changePasswordData.oldPassword"
          class="block focus:outline-none w-full mt-1 px-4 py-2 rounded-md border"
          type="password"
          placeholder="**************" />
      </div>
      <div class="mt-4 w-full">
        <label for="">Password Baru</label>
        <input
          v-model="changePasswordData.newPassword"
          class="block focus:outline-none w-full mt-1 px-4 py-2 rounded-md border"
          type="password"
          placeholder="**************" />
      </div>
      <div class="mt-4 w-full">
        <label for="">Konfirmasi Password Baru</label>
        <input
          v-model="changePasswordData.confirmNewPassword"
          class="block focus:outline-none w-full mt-1 px-4 py-2 rounded-md border"
          type="password"
          placeholder="**************" />
      </div>
      <div
        v-if="isSuccess"
        class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert">
        <div class="flex">
          <div class="py-1">
            <svg
              class="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p class="font-bold">Password berhasil diubah</p>
          </div>
        </div>
      </div>
      <div v-if="isError" role="alert">
        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          Kesalahan
        </div>
        <div
          class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
      <div class="mt-4">
        <button
          class="w-full rounded-fds py-2 border-2 border-green-food bg-green-200 text-green-food focus:outline-none"
          @click.prevent="changePassword()">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changePasswordData: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      isError: false,
      isSuccess: false,
    }
  },
  methods: {
    changePassword() {
      this.$axios
        .post('me/change_password', {
          old_password: this.changePasswordData.oldPassword,
          new_password: this.changePasswordData.newPassword,
          confirm_new_password: this.changePasswordData.confirmNewPassword,
        })
        .then((r) => {
          this.isSuccess = true
          this.isError = false
        })
        .catch((e) => {
          this.isSuccess = false
          this.isError = true
          const errors = e.response.data.errors
          for (const key in errors) {
            this.errorMessage = errors[key].detail
            return false
          }
        })
    },
  },
}
</script>
