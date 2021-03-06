<template>
    <div class="h-screen w-full bg-login bg-cover">
      
      <div class="container mx-auto h-full flex flex-1 justify-center items-center">
    <div class="w-full max-w-lg">
      <div class="leading-loose">
        <form class="max-w-sm p-10 bg-white rounded-fd shadow-xl" @submit.prevent="userLogin">
              <div class="text-center py-12">
             <img class="h-8 mx-auto" src="~/assets/svg/logo.svg" alt="">
              </div>
              <div class="">
                <input v-model="login.slug" :class="{'bg-red-200': isError, 'border' : isError, 'border-red-400' : isError}" class="w-full h-12 px-5 py-1 text-gray-700 bg-gray-200 rounded focus:border focus:border-gray-400 focus:outline-none focus:bg-gray-100" type="text" placeholder="Masukkan nama brand" required>
              </div>
              <div v-if="isError" class="inline-block">
                <small class="text-red-500 inline-block">
                  <svg class="inline-block h-3" fill="red" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>
                  nama brand tidak terdaftar</small>
              </div>
              <div class="mt-4 items-center flex justify-between">
              <button class="bg-green-food text-white py-3 rounded-lg w-full focus:outline-none focus:opacity-80">
                <span v-if="!isLoading">Masuk</span>
                <span v-if="isLoading">
                  <svg fill="#ffffff" class="h-5 animate-spin mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"/></svg>
                </span>
                </button>               
              </div>
        </form>
      </div>
    </div>
 
  </div>
 
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        slug: ''
      },
      isError: false,
      isLoading: false
    }
  },
  methods: {
    userLogin() {
      this.isLoading = true
      this.$auth.loginWith('local', { data: this.login }).then(r=>{
        this.isLoading = false
        this.$cookies.set('hbGciOiJIUzI1NiJ9', true)
        this.$router.push('/')
      }).catch(e=> {
        this.isError = true
      })
    }
  }
}
</script>
<style>
.bg-login {
  background-image:linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),url('~/assets/png/background.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>