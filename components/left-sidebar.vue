<template>
  <div class="fixed top-0 bg-white h-screen pt-2 sidebar-group">
    <div
      class="flex justify-between items-center"
      :class="showNav ? '' : 'pb-8'"
    >
      <nuxt-link to="/">
        <img src="~/assets/svg/logo.svg" class="h-6" alt="" />
      </nuxt-link>
      <div class="w-1/2 flex flex-row-reverse cursor-pointer nav-toggle-mobile">
        <svg
          width="24"
          height="18"
          viewBox="0 0 24 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click.prevent="showNav = !showNav"
        >
          <rect
            width="24"
            height="4"
            transform="matrix(-1 0 0 1 24 0)"
            fill="#d2d2d2"
          />
          <rect
            width="24"
            height="4"
            transform="matrix(-1 0 0 1 24 14)"
            fill="#d2d2d2"
          />
          <rect
            width="18"
            height="4"
            transform="matrix(-1 0 0 1 24 7)"
            fill="#d2d2d2"
          />
        </svg>
      </div>
    </div>

    <div
      class="mt-8"
      :class="showNav ? 'show-sidebar-mobile' : 'hide-sidebar-mobile'"
    >
      <ul>
        <li
          v-for="(menu, i) in menu"
          :key="i"
          class=""
          v-show="menu.level.includes(userLevel)"
        >
          <div
            :class="
              $route.name === menu.route
                ? 'bg-green-food text-white'
                : 'text-gray-900'
            "
            @click.prevent="
              !menu.child.length ? $router.push(menu.link) : openMenu(i)
            "
            class="flex justify-between items-center p-3 rounded-lg mb-2"
          >
            <button>
              <client-only>
                <icon-base id="menu" :name="menu.icon" />
              </client-only>
              <span class="ml-2">{{ menu.label }}</span>
            </button>

            <div v-if="menu.child.length">
              <client-only>
                <icon-base id="menu" name="chevron-down" />
              </client-only>
            </div>
          </div>

          <div v-if="selectedMenu === i" class="my-3">
            <ul>
              <li v-for="(child, ix) in menu.child" :key="ix" class="">
                <div
                  :class="
                    $route.name === child.route
                      ? 'bg-green-food text-white'
                      : 'text-gray-900'
                  "
                  class="
                    flex
                    pl-10
                    justify-between
                    items-center
                    p-3
                    rounded-lg
                    mb-3
                  "
                >
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
    };
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
  },
};
</script>

<style>
.btn-height {
  height: 48px;
}
</style>
