<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content">
      <div>
        <span class="text-title">Ringkasan Outlet</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-wrap -m-2" v-if="!isLoading"></div>
      <div class="grid grid-cols-2 gap-x-4">
        <div class="rounded-fd bg-white border p-4">
          <h1 class="text-lg font-bold">Ringkasan Outlet</h1>
          <p class="text-gray-500 text-sm">Total 25 Outlet</p>
        </div>

        <div class="rounded-fd bg-white border p-4">
          <h1 class="text-lg font-bold">Ringkasan Item</h1>
          <p class="text-gray-500 text-sm">Total 25 Item</p>
        </div>
      </div>

      <div
        v-if="data.branch_channels && data.items"
        class="grid grid-cols-2 gap-x-4 mt-4"
      >
        <div class="rounded-fd bg-white border p-4">
          <h1 class="text-lg font-bold">Aktivitas Outlet</h1>
          <ul class="mt-6">
            <li
              v-for="(outlet, index) in data.branch_channels.slice(0, 6)"
              :key="index"
              class="flex w-full justify-between mb-8"
            >
              <div class="flex items-start gap-x-3">
                <div
                  class="h-3 w-3 rounded-full"
                  :class="outlet.is_open ? 'bg-green-500' : 'bg-red-500'"
                ></div>
                <div>
                  <p class="-mt-1 font-bold text-sm">
                    {{ outlet.branch_channel_name }}
                  </p>
                  <div>
                    <span
                      :class="outlet.is_open ? 'bg-green-500' : 'bg-red-500'"
                      class="text-xs text-white px-1 rounded-md mr-1"
                    >
                      {{ outlet.branch_channel_channel }}
                    </span>
                    <span
                      class="text-xs text-white px-1 rounded-md"
                      :class="outlet.is_open ? 'bg-green-500' : 'bg-red-500'"
                      >{{ outlet.is_open ? "Buka" : "Tutup" }}</span
                    >
                  </div>
                </div>
              </div>
              <div>
                <span class="text-sm text-gray-500">
                  {{ $moment(outlet.created_at).format("HH:mm") }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div class="rounded-fd bg-white border p-4">
          <h1 class="text-lg font-bold">Aktivitas Item</h1>
          <ul class="mt-6">
            <li
              v-for="(items, index) in data.items.slice(0, 6)"
              :key="index"
              class="flex w-full justify-between mb-8"
            >
              <div class="flex items-start gap-x-3">
                <div
                  class="h-3 w-3 rounded-full"
                  :class="items.in_stock ? 'bg-green-500' : 'bg-red-500'"
                ></div>
                <div>
                  <p class="-mt-1 font-bold text-sm">
                    {{ items.item_name }}
                  </p>
                  <div>
                    <span
                      :class="items.in_stock ? 'bg-green-500' : 'bg-red-500'"
                      class="text-xs text-white px-1 rounded-md mr-1"
                    >
                      {{ items.branch_channel_channel }}
                    </span>
                    <span
                      class="text-xs text-white px-1 rounded-md"
                      :class="items.in_stock ? 'bg-green-500' : 'bg-red-500'"
                      >{{
                        items.in_stock ? "Available" : "Not Available"
                      }}</span
                    >
                  </div>
                </div>
              </div>
              <div>
                <span class="text-sm text-gray-500">
                  {{ $moment(items.created_at).format("HH:mm") }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";
export default {
  data() {
    return {
      data: "",
      isLoading: false,
    };
  },
  watch: {
    messages: {
      handler(r) {
        console.log(r);
      },
    },
  },
  mounted() {
    const session_brand = this.$cookies.get("_brandSlug");
    Pusher.logToConsole = true;

    const pusher = new Pusher("390e658e7dedc3292cf8", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe(session_brand);
    const self = this;
    channel.bind("live-activity", function (data) {
      self.messages.push(JSON.stringify(data));
    });
    this.getData();
  },

  methods: {
    async getData() {
      try {
        this.isLoading = true;
        const res = await this.$axios.get("me/histories");
        this.isLoading = false;

        if (res.data.success) {
          this.data = res.data.data;
        }
      } catch (error) {}
      // if (refresh) {
      //   this.page = 1;
      // }
      // this.listLoading = true;
      // var item_name = "name=" + this.itemName;
      // var outletName = "branch_channel_name=" + this.outletName;
      // var stock =
      //   this.itemStatus == null ? "in_stock=" : "in_stock=" + this.itemStatus;
      // var channel =
      //   this.outletChannel == null
      //     ? ""
      //     : "branch_channel_channel=" + this.outletChannel;
      // var page = "page=" + this.page;
      // this.$axios
      //   .get(
      //     `me/items?${item_name}&${outletName}&${stock}&${channel}&sort_key=${this.sortKey}&sort_value=${this.sortValue}&${page}`
      //   )
      //   .then((r) => {
      //     this.data = r.data.data;
      //     this.listLoading = false;
      //     this.total_page = r.data.data.total_page;
      //     this.isLoading = false;
      //   });
    },
    changePage(v) {
      this.page = this.page + parseFloat(v);
      this.getData();
    },
  },
};
</script>
