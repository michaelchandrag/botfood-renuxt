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
                  <svg class="h-5 mx-auto animate-spin" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 0c3.667.305 6.863 2.26 8.851 5.129l-1.746 1.013c-1.634-2.273-4.182-3.84-7.105-4.133v-2.009zm-11 12c0-1.47.324-2.863.891-4.122l-1.737-1.007c-.733 1.558-1.154 3.292-1.154 5.129 0 1.837.421 3.571 1.153 5.129l1.738-1.008c-.567-1.259-.891-2.651-.891-4.121zm20 0c0 1.47-.324 2.863-.891 4.122l1.738 1.007c.732-1.558 1.153-3.292 1.153-5.129s-.421-3.571-1.153-5.129l-1.738 1.007c.567 1.259.891 2.652.891 4.122zm-1.895 5.858c-1.634 2.273-4.182 3.84-7.105 4.133v2.009c3.667-.305 6.863-2.26 8.851-5.129l-1.746-1.013zm-16.21-11.717c1.634-2.272 4.183-3.839 7.105-4.132v-2.009c-3.667.305-6.862 2.259-8.851 5.128l1.746 1.013zm7.105 15.85c-2.923-.293-5.471-1.86-7.105-4.133l-1.746 1.013c1.988 2.87 5.184 4.824 8.851 5.129v-2.009z"/></svg>
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
         this.isLoading = false
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