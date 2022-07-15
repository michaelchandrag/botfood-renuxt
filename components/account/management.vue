<template>
  <div
    style="padding: 32px; margin-bottom: 16px"
    class="bg-white rounded-fd items-center"
  >
    <div class="flex w-full gap-x-4">
      <div class="w-8/12">
        <v-select
          v-model="selectedUser"
          :get-option-label="(us) => us.name"
          :options="users"
          style="width: 100%"
          placeholder="Select User"
        ></v-select>
      </div>

      <div class="w-4/12">
        <button
          @click.prevent="$router.push('/account/new')"
          class="w-full h-9 rounded-lg text-white bg-blue-500"
        >
          Buat Akun
        </button>
      </div>
    </div>

    <div class="mt-4" v-if="selectedUser.name">
      <table class="table-auto w-full">
        <thead>
          <tr class="border-b">
            <th class="py-4 text-text text-left cursor-pointer">Nama Outlet</th>
            <th class="py-4 text-text text-left cursor-pointer">Status</th>
          </tr>
        </thead>

        <tbody v-if="!isLoadingBranch && branchs.length > 1">
          <tr
            v-for="(branch, index) in branchs"
            :key="branch.branch_id"
            class="hover:bg-gray-200 border-b"
          >
            <td class="text-left text-text p-4 rounded-l-fds">
              {{ branch.branch_name }}
            </td>
            <td class="text-left text-text p-4 rounded-r-fds">
              <div
                class="
                  cursor-pointer
                  h-6
                  w-6
                  flex
                  items-center
                  justify-center
                  rounded-md
                  border-2
                "
                :class="
                  branch.user_branch_is_active
                    ? 'border-green-food bg-green-200'
                    : 'border-gray-500'
                "
                @click.prevent="
                  branchs[index].user_branch_is_active
                    ? (branchs[index].user_branch_is_active = 0)
                    : (branchs[index].user_branch_is_active = 1)
                "
              >
                <i
                  v-if="branch.user_branch_is_active"
                  class="fas text-green-food fa-check text-xs"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-if="isLoadingBranch">
          <tr v-for="i in 10" :key="i" class="mb-3">
            <td colspan="8" class="py-1">
              <div
                class="bg-gray-300 rounded-lg w-full h-8 animate animate-pulse"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        @click.prevent="saveBranchsUser(selectedUser.user_id)"
        class="
          mt-2
          text-white text-text
          py-3
          rounded-lg
          w-full
          focus:outline-none
        "
        :class="isLoading ? 'bg-gray-400' : 'bg-green-food'"
      >
        <span v-if="!isLoading">Simpan</span>
        <span v-if="isLoading">
          <svg
            class="h-5"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="
              margin: auto;
              background: none;
              display: block;
              shape-rendering: auto;
              animation-play-state: running;
              animation-delay: 0s;
            "
            width="200px"
            height="200px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#ffffff"
              stroke-width="10"
              r="35"
              stroke-dasharray="164.93361431346415 56.97787143782138"
              style="animation-play-state: running; animation-delay: 0s"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                style="animation-play-state: running; animation-delay: 0s"
              ></animateTransform>
            </circle>
          </svg>
        </span>
      </button>
    </div>

    <!-- {{ branchs }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUser: {},
      branchs: [],
      isLoading: false,
      isLoadingBranch: false,
    };
  },
  watch: {
    selectedUser: {
      handler(r) {
        this.getUserBranchs(r.user_id);
      },
      deep: true,
    },
    branchs: {
      handler(r) {
        this.$forceUpdate();
      },
      deep: true,
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const res = await this.$axios.get("me/user_brands?q=");

        if (res.data.success) {
          this.users = res.data.data.user_brands;
        }
      } catch (error) {}
    },
    async getUserBranchs(id) {
      try {
        this.isLoadingBranch = true;
        const res = await this.$axios.get("me/user_branchs?user_id=" + id);
        this.isLoadingBranch = false;

        if (res.data.success) {
          this.branchs = res.data.data;
        }
      } catch (error) {}
    },

    async saveBranchsUser(id) {
      try {
        this.isLoading = true;
        const payload = this.branchs;
        const res = await this.$axios.post("me/user_branchs/" + id, payload);
        this.isLoading = false;
        if (res.data.success) {
          this.$toast.success("Berhasil menyimpan data", { duration: 2000 });
          this.branchs = res.data.data.update;
        } else {
          this.$toast.error("Gagal menyimpan data", { duration: 2000 });
        }
      } catch (error) {}
    },
  },
};
</script>
