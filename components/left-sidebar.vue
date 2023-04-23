<template>
  <div class="fixed top-0 bg-white h-screen pt-2 sidebar-group">
    <div class="flex justify-between items-center" :class="showNav ? '' : 'pb-8'">
      <nuxt-link to="/">
        <img src="~/assets/svg/logo.svg" class="h-6" alt="" />
      </nuxt-link>
      <div class="w-1/2 flex md:hidden flex-row-reverse cursor-pointer nav-toggle-mobile">
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"
          @click.prevent="showNav = !showNav">
          <rect width="24" height="4" transform="matrix(-1 0 0 1 24 0)" fill="#d2d2d2" />
          <rect width="24" height="4" transform="matrix(-1 0 0 1 24 14)" fill="#d2d2d2" />
          <rect width="18" height="4" transform="matrix(-1 0 0 1 24 7)" fill="#d2d2d2" />
        </svg>
      </div>
    </div>



    <div class="mt-2" :class="showNav ? 'show-sidebar-mobile' : 'hide-sidebar-mobile'">
      <select @change="onChange($event)" v-model="valueDropdown" v-show="!this.$store.state.user.user.is_master"
        id="countries"
        class="border mb-5 mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="(a,i) in this.$store.state.user.user.user_brands" :value="a" :key="i">
          {{a.brand_name}}
        </option>
      </select>
      <ul>


        <li style="cursor:pointer;" v-for="(menu, i) in menu" :key="i" class=""
          v-show="menu.level.includes(userLevel) && menu.isShow">

          <div :class="
            $route.name === menu.route
              ? 'bg-green-food text-white'
              : 'text-gray-900'
          " @click.prevent="
            !menu.child.length ? $router.push(menu.link) : openMenu(i)
          " class="flex justify-between items-center p-3 rounded-lg mb-2">
            <button>
              <client-only>
                <icon-base id="menu" :name="menu.icon" />
              </client-only>
              <span class="ml-2">{{ menu.label }}</span>
              <span v-if="menu.isNew" class="ml-2 text-xs bg-red-500 text-white pl-1 pr-1">Baru!</span>
            </button>

            <div v-if="menu.child.length">
              <client-only>
                <icon-base id="menu" name="chevron-down" />
              </client-only>
            </div>
          </div>
          <div
            v-if="selectedMenu === i || $route.name.split('-')[0].toLowerCase() == menu.label.toLowerCase() || (menu.label.toLowerCase() == 'pengaturan' && $route.name.split('-')[0].toLowerCase() == 'setting') || (menu.label.toLowerCase() == 'pengaturan' && $route.name.split('-')[0].toLowerCase() == 'account') "
            class="my-3">
            <ul>
              <li v-for="(child, ix) in menu.child" :key="ix" class="" v-show="child.isShow">
                <div :class="
                  $route.name === child.route
                    ? 'bg-green-food text-white'
                    : 'text-gray-900'
                " class="
                    flex
                    pl-10
                    justify-between
                    items-center
                    p-3
                    rounded-lg
                    mb-3
                  ">
                  <button @click.prevent="$router.push(child.link)">
                    <span class="ml-2">{{ child.label }}</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import menu from "@/data/menu";
export default {
  data() {
    return {
      menu,
      subMenuLaporan: false,
      showNav: false,
      selectedMenu: "",
      valueDropdown: null,
      data: this.$store.state.user.user.user_brands,
    };
  },
  mounted () {
    this.handleUserBrand()
  },
  watch: {
    '$store.state.user.user.user_brands': function () {
      this.handleUserBrand()
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    userLevel() {
      return this.user.is_master ? 1 : 2;
    },
  },

  methods: {
    handleUserBrand () {
      var userBrands = this.$store.state.user.user.user_brands
      for (var idx in userBrands) {
        var userBrand = userBrands[idx]
        if (userBrand.is_thumbnail == 1) {
          this.valueDropdown = userBrand
        }
      }
    },
    keluar() {
      this.$router.push("/login");
    },
    openMenu(index) {
      this.selectedMenu === index
        ? (this.selectedMenu = "")
        : (this.selectedMenu = index);
      // this.selectedMenu = index;
      // console.log("tes");
    },
    onChange(e){
      this.$store.commit("user/setDropdown", this.valueDropdown);
      this.$axios.post("me/user_brand_thumbnail",{
        brand_id: this.valueDropdown.brand_id
      }).then(a=>{
        this.$cookies.set("_tk", a.data.data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
        window.location.reload();
      })
      
    }
  },
};
</script>

<style>

.btn-height {
  height: 48px;
}
.sidebar-group::-webkit-scrollbar {
  width: 0;
  /* Remove scrollbar space */
  background: transparent;
  /* Optional: just make scrollbar invisible */
}
</style>
