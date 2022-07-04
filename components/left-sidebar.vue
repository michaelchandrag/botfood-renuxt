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
          :class="
            $route.name === menu.route
              ? 'bg-green-food text-white'
              : 'text-gray-900'
          "
          class="flex items-center px-4 py-3 mb-4 rounded-lg"
        >
          <nuxt-link :to="menu.link">
            <!-- <img
              class="float-left"
              :src="$route.name === menu.route ? menu.icon_active : menu.icon"
            /> -->

            <icon-base id="menu" :name="menu.icon" />
            <span class="ml-2">{{ menu.label }}</span>
          </nuxt-link>
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
    };
  },
  methods: {
    keluar() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.btn-height {
  height: 48px;
}
</style>
