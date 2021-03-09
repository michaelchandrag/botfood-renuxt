<template>
  <div class="sticky top-0 bg-white h-screen">
    <div>
      <nuxt-link to="/">
        <img src="~/assets/svg/logo.svg" class="h-6" alt="">
      </nuxt-link>
    </div>

    <div class="h-16"></div>
    <div>
      <ul>
      
        <!-- menu active -->
        <li v-if="$route.name=='index'" class="py-4 px-8 mb-2 bg-green-food text-white rounded-lg">
          <nuxt-link to="/">
            <img class="float-left" src="~/assets/svg/home-active.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='index'" class="py-4 px-8 mb-2 text-gray-900 rounded-lg">
          <nuxt-link to="/">
            <img class="float-left" src="~/assets/svg/home.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>


        <li v-if="$route.name=='outlet'" class="py-4 px-8 mb-2 bg-green-food text-white rounded-lg">
          <nuxt-link to="/outlet">
            <img class="float-left" src="~/assets/svg/outlet-active.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='outlet'" class="py-4 px-8 mb-2 text-gray-900 rounded-lg">
          <nuxt-link to="/outlet">
            <img class="float-left" src="~/assets/svg/outlet.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>


        <li v-if="$route.name=='item'" class="py-4 px-8 mb-2 bg-green-food text-white rounded-lg">
          <nuxt-link to="/item">
            <img class="float-left" src="~/assets/svg/item-active.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='item'" class="py-4 px-8 mb-2 text-gray-900 rounded-lg">
          <nuxt-link to="/item">
            <img class="float-left" src="~/assets/svg/item.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
        <!-- end menu active -->

            <!-- menu inactive -->
            
       
       
          <!-- end menu inactive -->
      </ul>

      <div class="absolute bottom-0 mb-12 cursor-pointer py-4 px-8 mb-2 text-gray-900 flex" @click.prevent="keluar">
          <svg class="float-left" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11C11.55 21 12 20.55 12 20C12 19.45 11.55 19 11 19H5V5Z" fill="#424242"/>
<path d="M20.65 11.65L17.86 8.86003C17.54 8.54003 17 8.76003 17 9.21003V11H10C9.45 11 9 11.45 9 12C9 12.55 9.45 13 10 13H17V14.79C17 15.24 17.54 15.46 17.85 15.14L20.64 12.35C20.84 12.16 20.84 11.84 20.65 11.65Z" fill="#424242"/>
</svg>
<span class="ml-4">
Keluar
</span>

        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    keluar() {
      // this.$cookies.remove('_tk')
      // this.$cookies.remove('hbGciOiJIUzI1NiJ9')
      this.$router.push('/login')
    }
  }
}
</script>