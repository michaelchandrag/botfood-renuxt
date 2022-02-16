<template>
  <div class="fixed top-0 bg-white h-screen pt-2 sidebar-group">
    <div class="flex justify-between items-center" :class="showNav ? '' : 'pb-8'">
      <nuxt-link to="/">
        <img src="~/assets/svg/logo.svg" class="h-6" alt="">
      </nuxt-link>
      <div  class="w-1/2 flex flex-row-reverse cursor-pointer nav-toggle-mobile">
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" @click.prevent="showNav = !showNav">
          <rect width="24" height="4" transform="matrix(-1 0 0 1 24 0)" fill="#d2d2d2" />
          <rect width="24" height="4" transform="matrix(-1 0 0 1 24 14)" fill="#d2d2d2" />
          <rect width="18" height="4" transform="matrix(-1 0 0 1 24 7)" fill="#d2d2d2" />
        </svg>
      </div>
    </div>
    <div class="mt-8" :class="showNav ? 'show-sidebar-mobile' : 'hide-sidebar-mobile'">
      <ul>
        <!-- menu active -->
        <li v-if="$route.name=='index'"
          class="btn-height flex items-center px-4 mb-4 bg-green-food text-white rounded-lg">
          <nuxt-link to="/">
            <img class="float-left" src="~/assets/svg/home-active.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='index'" class="btn-height flex items-center px-4 mb-4 text-gray-900 rounded-lg">
          <nuxt-link to="/">
            <img class="float-left" src="~/assets/svg/home.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>


        <li class="flex text-gray-900 rounded-lg">
          <div class="flex w-full flex-col">
            <div class="cursor-pointer px-4 btn-height" @click.prevent="subMenuLaporan = !subMenuLaporan">
              <div class="flex justify-between">
                <div>
                  <img class="float-left" src="~/assets/svg/report.svg">
                  <span class="ml-4">Laporan</span>
                </div>
                <div>
                  <svg class="float-right mt-2" width="8" height="5" viewBox="0 0 8 5" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z"
                      fill="#9E9E9E" />
                  </svg>
                </div>
              </div>


            </div>

            <div v-show="subMenuLaporan||$route.name==='laporan'||$route.name==='laporan-recap'">
              <ul class="ml-14">
                <li :class="$route.name==='laporan'?'bg-green-food text-white pl-4':''"
                  class="btn-height flex items-center w-full rounded-lg">
                  <nuxt-link class="block" to="/laporan">Performa Outlet
                  </nuxt-link>
                </li>
                <li :class="$route.name==='laporan-recap'?'bg-green-food text-white pl-4':''"
                  class="btn-height flex items-center w-full rounded-lg">
                  <nuxt-link class="block" to="/laporan/recap">Rekap
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>


        </li>

        <li v-if="$route.name=='order'"
          class="btn-height flex items-center px-4 mb-4 bg-green-food text-white rounded-lg">
          <nuxt-link to="/order">
            <i class="fas fa-shopping-basket"></i>
            <span class="ml-4">Pesanan</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='order'" class="btn-height flex items-center px-4 mb-4 text-gray-900 rounded-lg">
          <nuxt-link to="/order">
            <i class="fas fa-shopping-basket"></i>
            <span class="ml-4">Pesanan</span>
          </nuxt-link>
        </li>


        <li v-if="$route.name=='outlet'"
          class="btn-height flex items-center px-4 mb-4 bg-green-food text-white rounded-lg">
          <nuxt-link to="/outlet">
            <img class="float-left" src="~/assets/svg/outlet-active.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='outlet'" class="btn-height flex items-center px-4 mb-4 text-gray-900 rounded-lg">
          <nuxt-link to="/outlet">
            <img class="float-left" src="~/assets/svg/outlet.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>


        <li v-if="$route.name=='item'"
          class="btn-height flex items-center px-4 mb-2 bg-green-food text-white rounded-lg">
          <nuxt-link to="/item">
            <img class="float-left" src="~/assets/svg/item-active.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='item'" class="btn-height flex items-center px-4 mb-2 text-gray-900 rounded-lg">
          <nuxt-link to="/item">
            <img class="float-left" src="~/assets/svg/item.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>

        <li v-if="$route.name=='setting'"
          class="btn-height flex items-center px-4 mb-2 bg-green-food text-white rounded-lg">
          <nuxt-link to="/setting">
            <img class="float-left" src="~/assets/svg/setting-active.svg">
            <span class="ml-4">Pengaturan</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='setting'" class="btn-height flex items-center px-4 mb-2 text-gray-900 rounded-lg">
          <img class="float-left" src="~/assets/svg/setting.svg">
          <nuxt-link to="/setting">
            <span class="ml-4">Pengaturan</span>
          </nuxt-link>
        </li>
        <!-- end menu active -->

        <!-- menu inactive -->



        <!-- end menu inactive -->
      </ul>

      <div class="cursor-pointer btn-height flex items-center px-4 mb-2 text-gray-900 flex" @click.prevent="keluar">
        <svg class="float-left" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11C11.55 21 12 20.55 12 20C12 19.45 11.55 19 11 19H5V5Z"
            fill="#424242" />
          <path
            d="M20.65 11.65L17.86 8.86003C17.54 8.54003 17 8.76003 17 9.21003V11H10C9.45 11 9 11.45 9 12C9 12.55 9.45 13 10 13H17V14.79C17 15.24 17.54 15.46 17.85 15.14L20.64 12.35C20.84 12.16 20.84 11.84 20.65 11.65Z"
            fill="#424242" />
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
    data() {
      return {
        subMenuLaporan: false,
        showNav: false,
      }
    },
    methods: {
      keluar() {
        this.$router.push('/login')
      }
    }
  }

</script>

<style>
  .btn-height {
    height: 48px;
  }

</style>
