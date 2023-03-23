<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <client-only
        ><header-navbar class="hidden md:block"></header-navbar
      ></client-only>
      <div class="flex justify-between items-center">
        <span class="text-title">Laporan Terkini</span>
        <div class="mr-6">
          <button
            v-if="isDownload"
            class="w-full cursor-not-allowed rounded-lg px-7 py-3 bg-gray-600 text-white focus:outline-none"
          >
            <span class="animate-spin">Downloading . . .</span>
          </button>
          <button
            v-if="!isDownload"
            class="w-full rounded-lg px-7 py-3 bg-green-600 text-white focus:outline-none"
            @click.prevent="download()"
          >
            <span v-if="!isDownload">Download </span>
          </button>
        </div>
      </div>
      <div style="height: 19px"></div>
      <div class="flex flex-col">
        <div
          class="grid grid-cols-1 gap-4 mb-4 bg-white p-5 rounded-md md:grid-cols-2"
        >
          <outlet-overview :data="data.GrabFood" channel="GrabFood" />
          <outlet-overview :data="data.GoFood" channel="GoFood" />
          <outlet-overview :data="data.ShopeeFood" channel="ShopeeFood" />
          <outlet-overview :data="data.TravelokaEats" channel="TravelokaEats" />
        </div>

        <!-- start graph -->
        <div class="bg-white p-5 rounded-md mb-3">
          <graph />
        </div>
        <!-- end graph -->
        <!-- table start -->
        <div>
          <div
            v-if="isLoading"
            class="bg-gray-300 animate-pulse rounded-fd h-64"
          ></div>
          <div v-if="!isLoading" class="bg-white rounded-md p-8">
            <span
              class="items-center text-orange-500 inline-block align-middle"
            >
              <svg class="inline-block h-5" fill="orange" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"
                />
              </svg>
              <span class="ml-2"
                >{{ dataItemNotUniform.total_data }} Item Tidak Seragam!</span
              >
            </span>
            <div class="h-6"></div>
            <div class="table-responsive">
              <table class="table-auto w-full">
                <thead>
                  <tr class="border-b">
                    <th class="py-4 text-text text-center">Nama Outlet</th>
                    <th class="py-4 text-text text-center">List Item</th>
                  </tr>
                </thead>
                <tbody v-if="isLoading">
                  <tr v-if="isLoading">
                    <td colspan="4" class="p-20 text-center">
                      <span class="block mx-auto w-full">
                        <svg
                          width="20"
                          height="20"
                          class="mx-auto mb-4"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z"
                            fill="#9E9E9E"
                          />
                        </svg>
                      </span>
                      <span class="p-8 m-auto text-gray-500">
                        Data tidak tersedia
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="!isLoading">
                  <tr
                    v-for="li in dataItemNotUniform.list"
                    :key="li.branch_id"
                    class="hover:bg-gray-200 text-center border-b rounded-fds hover:border-white"
                  >
                    <td class="p-4 text-text">{{ li.branch_name }}</td>
                    <td class="p-4 text-text">
                      <div class="grid grid-cols-3 -mx-3">
                        <div
                          v-for="item in li.items"
                          :key="item.item_name"
                          class="flex gap-4 p-6 rounded-fd"
                        >
                          <div>
                            <span>{{ item.item_name }}</span>
                            <div>
                              <div
                                v-for="detail in item.details"
                                :key="detail.item_id"
                                class="box my-1"
                                style="width: 20px; height: 20px"
                              >
                                <img
                                  v-if="
                                    detail.branch_channel_channel == 'GrabFood'
                                  "
                                  src="~/assets/svg/grabfood.svg"
                                  alt=""
                                />
                                <img
                                  v-if="
                                    detail.branch_channel_channel == 'GoFood'
                                  "
                                  src="~/assets/svg/gofood.svg"
                                  alt=""
                                />
                                <img
                                  v-if="
                                    detail.branch_channel_channel ==
                                    'ShopeeFood'
                                  "
                                  src="~/assets/svg/shopeefood.svg"
                                  alt=""
                                />
                                <img
                                  v-if="
                                    detail.branch_channel_channel ==
                                    'TravelokaEats'
                                  "
                                  src="~/assets/svg/travelokaeats.svg"
                                  alt=""
                                />
                                <span
                                  class="mx-2 text-green-500"
                                  v-if="detail.item_in_stock == 1"
                                  >AKTIF</span
                                >
                                <span class="mx-2 text-red-500" v-else
                                  >MATI</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- table end -->
      </div>
      <div class="h-8"></div>
    </div>
  </div>
</template>

<script>
import outletOverview from "~/components/dashboard/outlet-overview.vue";
import LeftSidebar from "~/components/left-sidebar.vue";
import HeaderNavbar from "~/components/header-navbar.vue";
import Graph from "~/components/dashboard/graph.vue";
export default {
  components: {
    outletOverview,
    LeftSidebar,
    HeaderNavbar,
    Graph,
  },
  data() {
    return {
      data: {},
      isDownload: false,
      dataItemNotUniform: {},
      GoFood: "",
      GrabFood: "",
      ShopeeFood: "",
      TravelokaEats: "",
      idle_items: {
        items: "",
      },
      isLoading: true,
      listLoading: false,
      page: 1,
      total_page: 1,
    };
  },
  middleware: ["auth-ssr"],
  mounted() {
    this.changePageNumber();
    this.getItemNotUniform();
    // this.getMe();
  },
  watch: {
    page: {
      handler(r) {
        if (r > this.total_page) {
          this.page = this.total_page;
        } else if (r <= 0) {
          this.page = 1;
        }
      },
    },
  },
  mounted() {
    this.setUserData();
    this.getItemNotUniform();
    this.changePage();
  },
  methods: {
    async setUserData() {
      try {
        const res = await this.$axios.get("/me");
        if (res.data.success) {
          this.$store.commit("user/setUser", res.data.data);
        }
      } catch (error) {}
    },
    changePage(v) {
      this.listLoading = true;
      this.page = this.page + parseFloat(v);
      this.changePageNumber();
    },
    download() {
      var me = this.$store.state.user.user;
      var time = this.$moment().format("DD MMM HH.mm");
      var filename = `${time} ${me.name} Performa Outlet`;
      this.isDownload = true;
      this.$axios({
        method: "GET",
        url:
          "me/channel_report?channel=GoFood&issued_at=" +
          this.formatDate +
          "&xlsx=true" +
          "&item_in_stock=" +
          this.itemInStock,
        responseType: "blob",
      }).then((r) => {
        this.isDownload = false;
        const url = window.URL.createObjectURL(
          new Blob([r.data], {
            "content-type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.setAttribute("download", `${filename}.xlsx`);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    async getItemNotUniform() {
      await this.$axios.get("me/item/not_uniform").then((r) => {
        this.dataItemNotUniform = r.data.data;
        // console.log(this.dataItemNotUniform);
        this.isLoading = false;
      });
    },
    async changePageNumber() {
      await this.$axios
        .get("me/dashboard?data=5&page=" + this.page)
        .then((r) => {
          this.data = r.data.data;
          this.isLoading = false;
          // this.page = r.data.data.idle_items.current_page
          // this.total_page = r.data.data.idle_items.total_page;
        });
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
}
</style>
