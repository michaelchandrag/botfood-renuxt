<template>
<div>
     <div class="p-4 flex bg-white z-10 fixed top-0 w-full shadow items-center">
    <div class="w-1/2">
    <nuxt-link to="/">
      <img class="h-6" src="~/assets/svg/logo.svg" alt="">
      </nuxt-link>
    </div>
    <div @click.prevent="showNav ? showNav=false:showNav=true" class="w-1/2 flex flex-row-reverse">
      <svg  width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="4" transform="matrix(-1 0 0 1 24 0)" fill="#d2d2d2" />
        <rect width="24" height="4" transform="matrix(-1 0 0 1 24 14)" fill="#d2d2d2" />
        <rect width="18" height="4" transform="matrix(-1 0 0 1 24 7)" fill="#d2d2d2" />
      </svg>
    </div>
  </div>



<div v-if="showNav">
  <div class="h-16"></div>
  <div>
<ul>
     
        <!-- menu active -->
        <li v-if="$route.name=='m'" class="h-16 flex mx-4 rounded-fd items-center px-8 mb-2 bg-green-food text-white">
          <nuxt-link to="/m">
            <img class="float-left" src="~/assets/svg/home-active.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='m'" class="h-16 flex mx-4 rounded-fd items-center px-8 mb-2 text-gray-900">
          <nuxt-link to="/m">
            <img class="float-left" src="~/assets/svg/home.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>

        <li v-if="$route.name=='m-outlet'" class="h-16 flex mx-4 rounded-fd items-center px-8 mb-2 bg-green-food text-white">
          <nuxt-link to="/m/outlet">
            <img class="float-left" src="~/assets/svg/outlet-active.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='m-outlet'" class="h-16 flex mx-4 rounded-fd items-center px-8 mb-2 text-gray-900">
          <nuxt-link to="/m/outlet">
            <img class="float-left" src="~/assets/svg/outlet.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>

        <li v-if="$route.name=='m-item'" class="h-16 flex mx-4 rounded-fd items-center px-8 mb-2 bg-green-food text-white">
          <nuxt-link to="/m/item">
            <img class="float-left" src="~/assets/svg/item-active.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='m-item'" class="h-16 flex mx-4 rounded-fd items-center px-8 mb-2 text-gray-900">
          <nuxt-link to="/m/item">
            <img class="float-left" src="~/assets/svg/item.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
        <!-- end menu active -->

            <!-- menu inactive -->
          <!-- end menu inactive -->
      </ul>
            
        </div>
        <div class="px-4 mt-6">
              <client-only>
        <date-picker placeholder="MM/DD/YYYY" format="MM/dd/yyyy" :inline="true" :value="date" :disabledDates="disabledDates"/>
      </client-only>
        </div>
</div>
    </div>
</template>

<style>
.vdp-datepicker__calendar {
    width: 100% !important;
    position: static !important;
    border-radius: 16px !important;
    padding: 2rem !important;
}
.vdp-datepicker__calendar .cell.selected {
    background: #029835 !important;
    color: #fff !important;
    border-radius: 8px !important;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover, .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border: 1px solid #029835 !important;
    border-radius: 8px !important;
}
</style>

<script>
export default {
  data() {
    return {
      showNav: false
    }
  },
}
</script>