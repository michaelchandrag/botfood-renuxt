<template>
  <div class="h-screen w-full bg-login bg-cover flex items-center">
    <div
      style="height: 566px; width: 566px"
      class="bg-white rounded-fd mx-auto shadow-xl">
      <div class="mx-auto h-full flex">
        <form class="mx-auto" @submit.prevent="userLogin">
          <div class="text-center">
            <img
              class="mx-auto"
              style="height: 25px; margin-top: 85px"
              src="~/assets/svg/logo.svg"
              alt="" />
          </div>
          <div style="margin-top: 40px">
            Brand <br />
            <input
              v-model="login.slug"
              style="height: 56px; width: 328px"
              :class="{
                'bg-red-200': isError,
                border: isError,
                'border-red-400': isError,
              }"
              class="w-full px-5 py-1 text-title text-gray-700 bg-gray-200 rounded-fds focus:border focus:border-gray-400 focus:outline-none focus:bg-gray-100"
              type="text"
              placeholder="Masukkan nama brand"
              required />
          </div>
          <div style="margin-top: 40px">
            Password <br />
            <input
              v-model="login.password"
              style="height: 56px; width: 328px"
              :class="{
                'bg-red-200': isError,
                border: isError,
                'border-red-400': isError,
              }"
              class="w-full px-5 py-1 text-title text-gray-700 bg-gray-200 rounded-fds focus:border focus:border-gray-400 focus:outline-none focus:bg-gray-100"
              type="password"
              placeholder="Masukkan password brand"
              required />
          </div>
          <div v-if="isError" class="inline-block">
            <small
              class="text-red-500 inline-block"
              style="font-size: 12px; margin-top: 8px">
              <svg class="inline-block h-3" fill="red" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              </svg>
              {{ errorMessage }}</small
            >
          </div>
          <div
            style="margin-top: 56px"
            class="items-center flex justify-between">
            <button
              style="height: 56px"
              class="bg-green-food text-white text-text py-3 rounded-lg w-full focus:outline-none focus:opacity-80">
              <span v-if="!isLoading">Masuk</span>
              <span v-if="isLoading">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  style="
                    margin: auto;
                    background: none;
                    display: block;
                    shape-rendering: auto;
                    animation-play-state: running;
                    animation-delay: 0s;
                  "
                  width="200px"
                  height="200px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid">
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#ffffff"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                    style="animation-play-state: running; animation-delay: 0s">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 50 50;360 50 50"
                      keyTimes="0;1"
                      style="
                        animation-play-state: running;
                        animation-delay: 0s;
                      "></animateTransform>
                  </circle>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'unauth',
  data() {
    return {
      login: {
        slug: '',
        password: '',
      },
      errorMessage: '',
      isError: false,
      isLoading: false,
    }
  },
  mounted() {
    this.$cookies.remove('_tk')
    this.$cookies.remove('hbGciOiJIUzI1NiJ9')
  },
  methods: {
    userLogin() {
      this.isLoading = true
      this.$axios
        .post('login_brand', {
          slug: this.login.slug,
          password: this.login.password,
        })
        .then((r) => {
          this.isLoading = false
          this.$cookies.set(
            'hbGciOiJIUzI1NiJ9',
            'RwOlwvXC9hcGkuYm90Zm9vZC54eXoiLCJkYXRhIjp7ImJyYW5kIjp7Im',
            {
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
            }
          )
          this.$cookies.set('_tk', r.data.data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          })
          this.$router.push('/')
        })
        .catch((e) => {
          this.isLoading = false
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
<style>
.bg-login {
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url('~/assets/png/background.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
