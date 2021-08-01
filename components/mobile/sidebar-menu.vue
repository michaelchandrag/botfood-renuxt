<template>
<div>
     <div class="p-4 flex bg-white z-50 inset-x-0 fixed top-0 w-full shadow items-center">
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



<div v-if="showNav" class="h-full w-full fixed top-0 z-40 bg-white">
  <div class="h-16"></div>
  <div class="pt-2">
<ul>
     
        <!-- menu active -->
        <li v-if="$route.name=='m'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 bg-green-food text-white">
          <nuxt-link to="/m">
            <img class="float-left" src="~/assets/svg/home-active.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>
        <li v-if="$route.name!='m'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 text-gray-900">
          <nuxt-link to="/m">
            <img class="float-left" src="~/assets/svg/home.svg">
            <span class="ml-4">Beranda</span>
          </nuxt-link>
        </li>
        

        <li v-if="$route.name=='m-outlet'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 bg-green-food text-white">
          <nuxt-link to="/m/outlet">
            <img class="float-left" src="~/assets/svg/outlet-active.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='m-outlet'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 text-gray-900">
          <nuxt-link to="/m/outlet">
            <img class="float-left" src="~/assets/svg/outlet.svg">
            <span class="ml-4">Outlet</span>
          </nuxt-link>
        </li>

        <li v-if="$route.name=='m-item'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 bg-green-food text-white">
          <nuxt-link to="/m/item">
            <img class="float-left" src="~/assets/svg/item-active.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='m-item'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 text-gray-900">
          <nuxt-link to="/m/item">
            <img class="float-left" src="~/assets/svg/item.svg">
            <span class="ml-4">Item</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name=='m-setting'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 bg-green-food text-white">
          <nuxt-link to="/m/setting">
            <img class="float-left" src="~/assets/svg/setting-active.svg">
            <span class="ml-4">Pengaturan</span>
          </nuxt-link>
        </li>
         <li v-if="$route.name!='m-setting'" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 text-gray-900">
            <img class="float-left" src="~/assets/svg/setting.svg">
          <nuxt-link to="/m/setting">
            <span class="ml-4">Pengaturan</span>
          </nuxt-link>
        </li>
          <li  @click.prevent="keluar" class="h-12 flex mx-4 rounded-fds items-center px-8 mb-1 text-gray-900">
               <svg class="float-left" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11C11.55 21 12 20.55 12 20C12 19.45 11.55 19 11 19H5V5Z" fill="#424242"/>
<path d="M20.65 11.65L17.86 8.86003C17.54 8.54003 17 8.76003 17 9.21003V11H10C9.45 11 9 11.45 9 12C9 12.55 9.45 13 10 13H17V14.79C17 15.24 17.54 15.46 17.85 15.14L20.64 12.35C20.84 12.16 20.84 11.84 20.65 11.65Z" fill="#424242"/>
</svg>
          
            <span class="ml-4">Keluar</span>
        
        </li>
        <!-- end menu active -->

            <!-- menu inactive -->
          <!-- end menu inactive -->
      </ul>
            
        </div>
        <div class="px-4 mt-6">
           <div class="mt-2 mb-2">
      <button v-if="isDownload"
        class="w-full cursor-not-allowed  rounded-fds py-2 border-2 border-gray-500 bg-gray-200 text-gray-500 focus:outline-none">
        <span class="animate-spin">Downloading . . .</span>

      </button>
      <button v-if="!isDownload"
        class="w-full rounded-fds py-2 border-2 border-green-food bg-green-200 text-green-food focus:outline-none"
        @click.prevent="download()">
        <span v-if="!isDownload">Download Laporan All in One</span>
      </button>
    </div>
             
        </div>
       
</div>
    </div>
</template>

<style>
.vdp-datepicker__calendar {
    width: 100% !important;
    position: static !important;
    border-radius: 16px !important;
    padding: 1rem !important;
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
      showNav: false,
       isDownload: false,
       date: new Date(),
       disabledDates: {
        to: new Date(Date.now() - 8640000),
        from: new Date()
      }
    }
  },
  methods: {
    download() {
      this.isDownload = true
      this.$axios({
        method: 'GET',
        url: 'me/channel_report?channel=GoFood&issued_at=' + this.formatDate + '&xlsx=true',
        responseType: 'blob',
      }).then(r => {
        this.isDownload = false
        const url = window.URL.createObjectURL(new Blob([r.data], {
          'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }));
        var fileLink = document.createElement('a');
        fileLink.href = url;
        fileLink.setAttribute('download', 'laporan-all-in-one.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();
      })
    },
    keluar() {
      this.$router.push('/login')
    }
  }
}
</script>