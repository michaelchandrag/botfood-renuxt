<template>
  <div>
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
    </div>
  </div>
</template>