<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content">
      <div>
        <span class="text-title">Live Report</span>
      </div>

      <div
        v-if="data.branch_channels && data.items"
        class="grid grid-cols-2 gap-x-4 mt-4"
      >
        <div class="rounded-fd bg-white border p-4">
          <div class="flex items-center gap-x-1">
            <div
              v-if="animateOutlet.length"
              class="
                h-5
                w-5
                flex
                items-center
                justify-center
                text-xs
                rounded-full
                text-white
                bg-[#ED2836]
              "
            >
              {{ animateOutlet.length }}
            </div>

            <h1 class="text-lg font-bold">Aktivitas Outlet</h1>
          </div>
          <ul v-if="!isLoading" class="mt-6 overflow-auto h-[70vh]">
            <li
              v-for="(outlet, index) in data.branch_channels"
              :key="index"
              :class="
                animateOutlet.includes(index)
                  ? 'animate-fade-in-up animated'
                  : ''
              "
            >
              <div
                class="flex justify-between transition ease-in-out delay-150"
                :class="isNewOutlet ? ' opacity-30' : ''"
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
                        :class="
                          outlet.is_open ? 'bg-[#029835]' : 'bg-[#ED2836]'
                        "
                        class="text-xs text-white py-1 px-2 rounded-md mr-2"
                      >
                        {{ outlet.branch_channel_channel }}
                      </span>
                      <span
                        class="text-xs text-white py-1 px-2 rounded-md"
                        :class="
                          outlet.is_open ? 'bg-[#029835]' : 'bg-[#ED2836]'
                        "
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
              </div>
            </li>
          </ul>
          <div v-else class="mt-6">
            <div
              v-for="i in 6"
              :key="i"
              class="h-24 bg-gray-300 w-full rounded-md animate-pulse mr-6 mb-2"
            ></div>
          </div>
        </div>

        <div class="rounded-fd bg-white border p-4">
          <div class="flex items-center gap-x-1">
            <div
              v-if="animateItem.length"
              class="
                h-5
                w-5
                flex
                items-center
                justify-center
                text-xs
                rounded-full
                text-white
                bg-[#ED2836]
              "
            >
              {{ animateItem.length }}
            </div>

            <h1 class="text-lg font-bold">Aktivitas Item</h1>
          </div>
          <ul v-if="!isLoading" class="mt-6 overflow-auto h-[70vh]">
            <li
              v-for="(items, index) in data.items"
              :key="index"
              :class="animateItem.includes(index) ? 'bounce animated' : ''"
            >
              <div
                class="flex justify-between transition ease-in-out delay-150"
                :class="isNewItem ? ' opacity-30' : ''"
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
                        :class="
                          items.in_stock ? 'bg-[#029835]' : 'bg-[#ED2836]'
                        "
                        class="text-xs text-white py-1 px-2 rounded-md mr-1"
                      >
                        {{ items.branch_channel_channel }}
                      </span>
                      <span
                        class="text-xs text-white py-1 px-2 rounded-md"
                        :class="
                          items.in_stock ? 'bg-[#029835]' : 'bg-[#ED2836]'
                        "
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
              </div>
            </li>
          </ul>
          <div v-else class="mt-6">
            <div
              v-for="i in 6"
              :key="i"
              class="h-24 bg-gray-300 w-full rounded-md animate-pulse mr-6 mb-2"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const isBrowser = typeof window !== "undefined";
import Pusher from "pusher-js";
export default {
  data() {
    return {
      data: {
        items: [],
        branch_channels: [],
      },
      isLoading: false,
      interval: null,
      animateOutlet: [],
      animateItem: [],
      isNewOutlet: false,
      isNewItem: false,
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  created() {
    if (isBrowser) {
      this.setPusher();
    }

    this.interval = setInterval(() => {
      // this.data = this.data;
      this.$forceUpdate();
    }, 1000);
  },

  async mounted() {
    await this.getData();
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
      } catch (error) {
        console.error(error);
      }
    },
    setPusher() {
      const session_brand = this.$cookies.get("_brandSlug");
      // Pusher.logToConsole = true;

      const pusher = new Pusher("390e658e7dedc3292cf8", {
        cluster: "ap1",
      });
      console.log(session_brand)
      const channel = pusher.subscribe(session_brand);
      console.log('a')
      const self = this;
      channel.bind("live-activity", function (data) {
        if (data.message) {
          if (data.message.branch_channels) {
            self.isNewOutlet = true;
            data.message.branch_channels.forEach((branch, index, arr) => {
              self.animateOutlet.push(index);
              self.data.branch_channels.unshift(branch);
            });
          }

          if (data.message.items) {
            self.isNewItem = true;
            data.message.items.forEach((item, index, arr) => {
              self.animateItem.push(index);
              self.data.items.unshift(item);
            });
          }

          setTimeout(() => {
            self.isNewItem = false;
            self.isNewOutlet = false;
          }, 500);

          setTimeout(() => {
            self.animateOutlet = [];
            self.animateItem = [];
          }, 20000);
        }
      });
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
