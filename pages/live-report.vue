<template>
  <div>
    <left-sidebar class="px-6 pt-8" />

    <div class="bg-gray-200 wrapper-content">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-title">Live Report</span>
        </div>
        <div>
          <button
            class="text-sm alert px-4 focus:outline-none"
            @click.prevent="isMuted ? (isMuted = false) : (isMuted = true)"
          >
            <i class="fas fa-volume-up" v-if="!isMuted"></i>
            <i v-else class="fas fa-volume-mute"></i>
          </button>
          <audio controls id="sound" :muted="isMuted" class="hidden">
            <source src="/sound.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>

      <div
        class="
          mt-4
          flex
          overflow-x-auto
          space-x-2
          w-screen
          relative
          slider
          overflow-hidden
          pb-4
        "
      >
        <section
          v-for="(data, indexOutlet) in liveOutletNew"
          :key="indexOutlet"
          class="flex-shrink-0 rounded-fd bg-white text-sm border p-6 w-72"
        >
          <h1 class="font-bold text-xs w-full text-center">
            {{ data.branch_name }}
          </h1>

          <ul class="mt-3">
            <li
              v-for="(channel, indexChannel) in data.branch_channels"
              :key="indexChannel"
              class="flex justify-between text-xs border-b py-2"
            >
              <div>{{ channel.channel }}</div>
              <div class="flex gap-x-2">
                <span> {{ parseInt(channel.items_percentage) }}% </span>
                <div
                  v-if="
                    parseInt(
                      liveOutlet[indexOutlet].branch_channels[indexChannel]
                        .items_percentage
                    ) !== parseInt(channel.items_percentage)
                  "
                >
                  <span
                    v-if="
                      parseInt(
                        liveOutlet[indexOutlet].branch_channels[indexChannel]
                          .items_percentage
                      ) < parseInt(channel.items_percentage)
                    "
                  >
                    <i class="fas fa-chevron-up text-[#029835]"></i>
                  </span>
                  <span v-else>
                    <i class="fas fa-chevron-down text-[#ED2836]"></i>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <div class="text-text">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full md:w-12/12 lg:w-6/12 p-3">
            <div class="relative">
              <input
                type="text"
                class="
                  pl-10
                  pr-4
                  py-3
                  border border-gray-300
                  rounded-lg
                  w-full
                  focus:outline-none
                "
                v-model="filters.query_branch_channel"
                placeholder="Nama Outlet, Channel"
              />
              <div class="absolute top-0 pt-3 pl-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-12/12 lg:w-6/12 p-3">
            <div class="relative">
              <input
                type="text"
                class="
                  pl-10
                  pr-4
                  py-3
                  border border-gray-300
                  rounded-lg
                  w-full
                  focus:outline-none
                "
                v-model="filters.query_item"
                placeholder="Nama Outlet, Nama Item, Channel"
              />
              <div class="absolute top-0 pt-3 pl-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="data.branch_channels && data.items"
        class="grid grid-cols-2 gap-x-4 mt-2"
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
              v-show="filterBranchChannel(outlet)"
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
                <div class="pr-4 text-right">
                  <span class="text-xs text-gray-500">
                    {{ $moment(outlet.created_at).fromNow() }}
                  </span>
                  <span class="text-xs block text-gray-400">
                    {{ $moment(outlet.created_at).format("HH:mm") }}
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
              v-show="filterItem(items)"
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
                <div class="pr-4 text-right">
                  <span class="text-xs text-gray-500">
                    {{ $moment(items.created_at).fromNow() }}
                  </span>
                  <span class="text-xs block text-gray-400">
                    {{ $moment(items.created_at).format("HH:mm") }}
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
      filters: {
        query_branch_channel: null,
        query_item: null,
      },
      isLoading: false,
      interval: null,
      animateOutlet: [],
      animateItem: [],
      isNewOutlet: false,
      isNewItem: false,
      isMuted: true,
      liveOutlet: [],
      liveOutletNew: [],
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

  mounted() {
    this.$cookies.set("isMuted", this.isMuted, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    this.getData();
    this.getLiveBranch(true);

    // console.log(publisher);
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
    async getLiveBranch(mounted) {
      try {
        this.isLoading = true;
        const res = await this.$axios.get("me/live/branchs");
        this.isLoading = false;
        if (res.data.success) {
          if (mounted) {
            this.liveOutlet = res.data.data;
            this.liveOutletNew = res.data.data;
          } else {
            this.liveOutlet = this.liveOutletNew;
            this.liveOutletNew = res.data.data;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    setPusher() {
      // const session_brand = this.$cookies.get("_brandSlug");
      // Pusher.logToConsole = true;

      const pusher = new Pusher("390e658e7dedc3292cf8", {
        cluster: "ap1",
      });
      var brandSlug = this.$cookies.get("_brandSlug");
      const channel = pusher.subscribe(brandSlug.toLowerCase());
      const self = this;
      const audio = document.getElementById("sound");

      channel.bind("live-activity", function (data) {
        if (data.message) {
          if (data.message.branch_channels) {
            audio.play();
            const outletText =
              data.message.branch_channels.length > 0
                ? data.message.branch_channels.length + " update outlet "
                : "";
            self.$toast.success(outletText, {
              position: "top-center",
              duration: 2000,
              fitToScreen: true,
              fullWidth: true,
            });
            self.isNewOutlet = true;
            data.message.branch_channels.forEach((branch, index, arr) => {
              self.animateOutlet.push(index);
              self.data.branch_channels.unshift(branch);
            });
            setTimeout(() => {
              self.isNewOutlet = false;
            }, 1000);
          }

          if (data.message.items) {
            audio.play();
            self.isNewItem = true;
            data.message.items.forEach((item, index, arr) => {
              self.animateItem.push(index);
              self.data.items.unshift(item);
            });
            const itemText =
              data.message.items.length > 0
                ? data.message.items.length + " update item "
                : "";
            self.$toast.success(itemText, {
              position: "top-center",
              duration: 2000,
              fitToScreen: true,
              fullWidth: true,
            });
            setTimeout(() => {
              self.isNewItem = false;
            }, 1000);
          }

          setTimeout(() => {
            self.animateOutlet = [];
            self.animateItem = [];
          }, 20000);
        }
        self.getLiveBranch(false);
      });
    },
    muteAct() {
      return this.isMuted
        ? this.$cookies.set("isMuted", false, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          })
        : this.$cookies.set("isMuted", true, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
    },
    filterBranchChannel(branchChannel) {
      if (
        this.filters.query_branch_channel !== null &&
        this.filters.query_branch_channel.length > 0
      ) {
        var query = this.filters.query_branch_channel.toLowerCase();
        var branchChannelName = branchChannel.branch_channel_name.toLowerCase();
        var branchChannelChannel =
          branchChannel.branch_channel_channel.toLowerCase();
        if (
          branchChannelName.indexOf(query) >= 0 ||
          branchChannelChannel.indexOf(query) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    filterItem(item) {
      if (
        this.filters.query_item !== null &&
        this.filters.query_item.length > 0
      ) {
        var query = this.filters.query_item.toLowerCase();
        var branchChannelName = item.branch_channel_name.toLowerCase();
        var branchChannelChannel = item.branch_channel_channel.toLowerCase();
        var itemName = item.item_name.toLowerCase();
        if (
          itemName.indexOf(query) >= 0 ||
          branchChannelName.indexOf(query) >= 0 ||
          branchChannelChannel.indexOf(query) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style>
ul::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 3px;
  height: 3px;
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

.slider::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.slider::-webkit-scrollbar-track,
.scroll__::-webkit-scrollbar-track {
  background: #c8d0d4;
}
.slider::-webkit-scrollbar-thumb,
.scroll__::-webkit-scrollbar-thumb {
  background-color: #64767f;
  border-radius: 20px;
  border: 3px solid #64767f;
}
</style>
