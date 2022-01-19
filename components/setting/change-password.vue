<template>
  <div
    style="padding: 24px 32px; margin-bottom: 16px"
    class="flex mr-6 bg-white rounded-fd items-center">
    <form class="w-full max-w-m">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-full">
          <label class="block font-bold mb-1 md:mb-0 pr-4">
            Ubah Password
          </label>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-4"
            for="inline-old-password">
            Password Lama
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-old-password"
            v-model="changePasswordData.oldPassword"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            placeholder="******************" />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-4"
            for="inline-new-password">
            Password Baru
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-new-password"
            v-model="changePasswordData.newPassword"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            placeholder="******************" />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-4"
            for="inline-confirm-new-password">
            Konfirmasi Password Baru
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-confirm-new-password"
            v-model="changePasswordData.confirmNewPassword"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            placeholder="******************" />
        </div>
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
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="changePassword">
            Ubah Password
          </button>
        </div>
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
