<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>

    <div class="bg-gray-200 wrapper-content">
      <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      <div v-if="showInfo"
        class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-3" role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg></div>
          <div class="break-all overflow-hidden max-w-full">
            <p class="font-bold">Fitur Baru!</p>
            <p class="text-sm">Yuk join grup Whatsapp Botfood untuk mendapatkan notifikasi segera jika outlet tutup saat
              jam operasional! <a :href="wablasGroupUrl" class="text-blue-500" target="_blank">{{wablasGroupUrl}}</a>
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <span class="text-title">Laporan Terkini</span>
        <div class="mr-6">
          <button v-if="isDownload"
            class="w-full cursor-not-allowed rounded-lg px-7 py-3 bg-gray-600 text-white focus:outline-none">
            <span class="animate-spin">Downloading . . .</span>
          </button>
          <button v-if="!isDownload" class="w-full rounded-lg px-7 py-3 bg-green-600 text-white focus:outline-none"
            @click.prevent="downloadV2()">
            <span v-if="!isDownload">Download Status Outlet & Item (Excel)</span>
          </button>
        </div>
      </div>
      <div style="height: 19px"></div>
      <div class="flex flex-col">
        <div class="flex flex-wrap">
          <div class="grid grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-md md:grid-cols-2 sm:w-6/12">
            <outlet-overview :data="data.GrabFood" channel="GrabFood" />
            <outlet-overview :data="data.GoFood" channel="GoFood" />
            <outlet-overview :data="data.ShopeeFood" channel="ShopeeFood" />
            <outlet-overview v-if="brandSlug == 'grainsly'" :data="data.ESBOrder" channel="ESBOrder" />
            <outlet-overview v-if="brandSlug != 'grainsly'" :data="data.AirAsiaFood" channel="AirAsiaFood" />
          </div>
          <div class="grid gap-4 mb-4 bg-white p-5 rounded-md sm:w-6/12">
            <outlet-channel-rating />
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <span class="text-title">Laporan Outlet</span>
        <div class="mr-6">
          <button v-if="isDownloadATP"
            class="w-full cursor-not-allowed rounded-lg px-7 py-3 bg-gray-600 text-white focus:outline-none">
            <span class="animate-spin">Downloading . . .</span>
          </button>
          <button v-if="!isDownloadATP" class="w-full rounded-lg px-7 py-3 bg-green-600 text-white focus:outline-none"
            @click.prevent="downloadATP()">
            <span v-if="!isDownloadATP">Download Laporan Outlet (PDF)</span>
          </button>
        </div>
      </div>
      <div style="height: 19px"></div>
      <!-- start graph -->
      <graph />
      <div style="height: 19px"></div>
      <div class="flex justify-between items-center mb-6">
        <span class="text-title">Laporan Item</span>
      </div>
      <!-- end graph -->
      <!-- table start -->
      <div>
        <div v-if="isLoading" class="bg-gray-300 animate-pulse rounded-fd h-64"></div>
        <div v-if="!isLoading" class="bg-white rounded-md p-8">
          <span class="items-center text-orange-500 inline-block align-middle">
            <svg class="inline-block h-5" fill="orange" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.351 6.493c-.08-.801.55-1.493 1.351-1.493s1.431.692 1.351 1.493l-.801 8.01c-.029.282-.266.497-.55.497s-.521-.215-.55-.498l-.801-8.009zm1.351 12.757c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
            </svg>
            <span class="ml-2">{{ dataItemNotUniform.total_data }} Item Tidak Seragam!</span>
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
                      <svg width="20" height="20" class="mx-auto mb-4" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 11C9.45 11 9 10.55 9 10V6C9 5.45 9.45 5 10 5C10.55 5 11 5.45 11 6V10C11 10.55 10.55 11 10 11ZM10 15C9.45 15 9 14.55 9 14C9 13.45 9.45 13 10 13C10.55 13 11 13.45 11 14C11 14.55 10.55 15 10 15Z"
                          fill="#9E9E9E" />
                      </svg>
                    </span>
                    <span class="p-8 m-auto text-gray-500">
                      Data tidak tersedia
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="!isLoading">
                <tr v-for="li in dataItemNotUniform.list" :key="li.branch_id"
                  class="hover:bg-gray-200 text-center border-b rounded-fds hover:border-white">
                  <td class="p-4 text-text">{{ li.branch_name }}</td>
                  <td class="p-4 text-text">
                    <div class="grid grid-cols-3 -mx-3">
                      <div v-for="item in li.items" :key="item.item_name" class="flex gap-4 p-6 rounded-fd">
                        <div>
                          <span>{{ item.item_name }}</span>
                          <div>
                            <div v-for="detail in item.details" :key="detail.item_id" class="box my-1"
                              style="width: 20px; height: 20px">
                              <img v-if="
                                    detail.branch_channel_channel == 'GrabFood'
                                  " src="~/assets/svg/grabfood.svg" alt="" />
                              <img v-if="
                                    detail.branch_channel_channel == 'GoFood'
                                  " src="~/assets/svg/gofood.svg" alt="" />
                              <img v-if="
                                    detail.branch_channel_channel ==
                                    'ShopeeFood'
                                  " src="~/assets/svg/shopeefood.svg" alt="" />
                              <img v-if="
                                    detail.branch_channel_channel ==
                                    'TravelokaEats'
                                  " src="~/assets/svg/travelokaeats.svg" alt="" />
                              <img v-if="
                                    detail.branch_channel_channel ==
                                    'ESBOrder'
                                  " src="~/assets/svg/esborder.svg" alt="" />
                              <span class="mx-2 text-green-500" v-if="detail.item_in_stock == 1">AKTIF</span>
                              <span class="mx-2 text-red-500" v-else>MATI</span>
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
      <div style="height: 19px"></div>
    </div>
    <!-- <div class="h-8"></div> -->
  </div>
</template>

<script>
import outletOverview from "~/components/dashboard/outlet-overview.vue";
import LeftSidebar from "~/components/left-sidebar.vue";
import HeaderNavbar from "~/components/header-navbar.vue";
import Graph from "~/components/dashboard/graph.vue";
import OutletChannelRating from "~/components/outlet/outlet-channel-rating.vue"
export default {
  components: {
    outletOverview,
    LeftSidebar,
    HeaderNavbar,
    Graph,
    OutletChannelRating,
  },
  data() {
    return {
      data: {},
      isDownload: false,
      isDownloadATP: false,
      dataItemNotUniform: {},
      GoFood: "",
      GrabFood: "",
      ShopeeFood: "",
      TravelokaEats: "",
      idle_items: {
        items: "",
      },
      showInfo: false,
      wablasGroupUrl: null,
      isLoading: true,
      listLoading: false,
      page: 1,
      total_page: 1,
      brandSlug: null,
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
          var data = res.data.data
          this.brandSlug = data.slug
          if (data.wablas_group_url !== undefined && data.wablas_group_url != null) {
            this.wablasGroupUrl = data.wablas_group_url
            this.showInfo = true
          }
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
    downloadV2() {
      var me = this.$store.state.user.user;
      var time = this.$moment().format("DD MMM HH.mm");
      var filename = `${time} ${me.name} Performa Outlet`;
      this.isDownload = true;
      this.$api({
        method: "GET",
        url:
          "report/channel_report?channel=GoFood&issued_at=" +
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
    downloadATP() {
      var me = this.$store.state.user.user;
      var time = this.$moment().subtract(1, "days").format("DD MMM HH.mm");
      var filename = `${time} ${me.name} Laporan Outlet`;
      this.isDownloadATP = true;
      this.$axios({
        method: "GET",
        url:
          "me/report/atp_export_pdf",
        responseType: "blob",
      }).then((r) => {
        this.isDownloadATP = false;
        const url = window.URL.createObjectURL(
          new Blob([r.data], {
            "content-type":
              "application/pdf",
          })
        );
        var fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.setAttribute("download", `${filename}.pdf`);
        document.body.appendChild(fileLink);
        fileLink.click();
      }).catch((e) => {
        this.isDownloadATP = false
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
