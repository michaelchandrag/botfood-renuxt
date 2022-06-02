<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content">
      <div>
        <span class="text-title">Live Report</span>
      </div>
      <div class="h-8"></div>
      <div class="flex flex-wrap -m-2" v-if="!isLoading"></div>

      <div
        v-if="data.branch_channels && data.items"
        class="grid grid-cols-2 gap-x-4 mt-4"
      >
        <div class="rounded-fd bg-white border p-4">
          <h1 class="text-lg font-bold">Aktivitas Outlet</h1>
          <ul class="mt-6 overflow-auto h-[70vh]">
            <li
              v-for="(outlet, index) in data.branch_channels"
              :key="index"
              :id="index === '0' ? 'first' : ''"
              class="flex w-full justify-between"
            >
              <div class="flex items-start gap-x-3">
                <div class="relative">
                  <div
                    class="h-3 w-3 rounded-full relative"
                    :class="outlet.is_open ? 'bg-[#029835]' : 'bg-[#ED2836]'"
                  />
                  <div class="bg-gray-200 w-[2px] my-2 h-14 mx-auto"></div>
                </div>

                <div>
                  <p class="-mt-1 font-bold text-sm">
                    {{ outlet.branch_channel_name }}
                  </p>
                  <div>
                    <span
                      :class="outlet.is_open ? 'bg-[#029835]' : 'bg-[#ED2836]'"
                      class="text-xs text-white py-1 px-2 rounded-md mr-2"
                    >
                      {{ outlet.branch_channel_channel }}
                    </span>
                    <span
                      class="text-xs text-white py-1 px-2 rounded-md"
                      :class="outlet.is_open ? 'bg-[#029835]' : 'bg-[#ED2836]'"
                      >{{ outlet.is_open ? "Buka" : "Tutup" }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="pr-4">
                <span class="text-xs text-gray-500">
                  {{ $moment(outlet.created_at).fromNow() }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div class="rounded-fd bg-white border p-4">
          <h1 class="text-lg font-bold">Aktivitas Item</h1>
          <ul class="mt-6 overflow-auto h-[70vh]">
            <li
              v-for="(items, index) in data.items"
              :key="index"
              class="flex w-full justify-between"
            >
              <div class="flex items-start gap-x-3">
                <div class="relative">
                  <div
                    class="h-3 w-3 rounded-full relative"
                    :class="items.in_stock ? 'bg-[#029835]' : 'bg-[#ED2836]'"
                  />
                  <div class="bg-gray-200 w-[2px] my-2 h-20 mx-auto"></div>
                </div>
                <div>
                  <p class="-mt-1 font-bold text-sm">
                    {{ items.item_name }}
                  </p>
                  <span class="text-xs -mt-2 text-gray-500">{{
                    items.branch_channel_name
                  }}</span>
                  <div class="mt-2">
                    <span
                      :class="items.in_stock ? 'bg-[#029835]' : 'bg-[#ED2836]'"
                      class="text-xs text-white py-1 px-2 rounded-md mr-1"
                    >
                      {{ items.branch_channel_channel }}
                    </span>
                    <span
                      class="text-xs text-white py-1 px-2 rounded-md"
                      :class="items.in_stock ? 'bg-[#029835]' : 'bg-[#ED2836]'"
                      >{{ items.in_stock ? "Aktif" : "Mati" }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="pr-4">
                <span class="text-xs text-gray-500">
                  {{ $moment(items.created_at).fromNow() }}
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
      data: {
        items: [],
        branch_channels: [],
      },
      isLoading: false,
    };
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
      console.log("ini data", data);
      if (data.message) {
        if (data.message.branch_channels) {
          data.message.branch_channels.forEach((branch) => {
            self.data.branch_channels.unshift(branch);
          });
        }

        if (data.message.items) {
          data.message.items.forEach((branch) => {
            self.data.items.unshift(branch);
          });
        }
      }
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
    },
  },
};
</script>

<style>
ul::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
ul::-webkit-scrollbar-track,
.scroll__::-webkit-scrollbar-track {
  background: #c8d0d4;
}
ul::-webkit-scrollbar-thumb,
.scroll__::-webkit-scrollbar-thumb {
  background-color: #64767f;
  border-radius: 20px;
  border: 3px solid #64767f;
}
</style>
