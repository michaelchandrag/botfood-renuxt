<template>
  <div
    style="padding: 32px; margin-bottom: 16px"
    class="bg-white rounded-fd items-center"
  >
    <div class="flex w-full gap-x-4">
      <div class="w-8/12">
        <client-only>
          <v-select
            :options="users"
            style="width: 100%"
            v-model="selectedUser"
            placeholder="Cari User "
            @search="searchSome"
            :getOptionLabel="(user) => user.name"
          >
            <template #option="{ name, phone_number }">
              <h3 style="margin: 0">{{ name }}</h3>
              <span class="text-sm">
                <i class="fas fa-phone mr-1"></i>
                {{ phone_number }}
              </span>
            </template>
          </v-select>
        </client-only>
      </div>

      <div class="w-4/12">
        <client-only>
          <button
            @click.prevent="$router.push('/account/new')"
            class="w-full h-9 rounded-lg text-white bg-blue-500"
          >
            Buat Akun
          </button>
        </client-only>
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
        <tbody>
          <tr class="border-b">
            <td class="text-left text-text px-4 py-2 rounded-l-fds">
              <div class="w-1/2">
                <input
                  type="text"
                  class="py-2 mt-1 px-3 text-sm border border-gray-300 rounded-lg w-full focus:outline-none"
                  v-model="search"
                  placeholder="Cari . . . "
                />
              </div>
            </td>
            <td class="text-left text-text px-4 rounded-r-fds">
              <div class="flex items-center gap-x-3">
                <div
                  @click.prevent="selectAllAction()"
                  class="cursor-pointer h-6 w-6 flex items-center justify-center rounded-md border-2"
                  :class="selectAll ? 'border-green-food bg-green-200' : 'border-gray-500'"
                >
                  <svg v-if="selectAll" class="h-4 w-4 text-green-food" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span> Pilih Semua </span>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-if="!isLoadingBranch && branchs.length > 0">
          <tr
            v-for="branch in filtered"
            :key="branch.branch_id"
            class="hover:bg-gray-200 border-b"
          >
            <td class="text-left text-text p-4 rounded-l-fds">
              {{ branch.branch_name }}
            </td>
            <td class="text-left text-text p-4 rounded-r-fds">
              <div
                class="cursor-pointer h-6 w-6 flex items-center justify-center rounded-md border-2"
                :class="branch.user_branch_is_active ? 'border-green-food bg-green-200' : 'border-gray-500'"
                @click.prevent="branch.user_branch_is_active = branch.user_branch_is_active ? 0 : 1"
              >
                <svg v-if="branch.user_branch_is_active" class="h-4 w-4 text-green-food" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-if="isLoadingBranch">
          <tr v-for="i in 10" :key="i" class="mb-3">
            <td colspan="8" class="py-1">
              <div class="bg-gray-300 rounded-lg w-full h-8 animate animate-pulse"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-if="!isLoadingBranch && !filtered.length">
          <tr class="mb-3">
            <td colspan="8" class="py-3 text-center">Data tidak ditemukan</td>
          </tr>
        </tbody>
      </table>

      <button
        @click.prevent="saveBranchsUser(selectedUser.user_id)"
        class="mt-2 text-white text-text py-3 rounded-lg w-full focus:outline-none"
        :class="isLoading ? 'bg-gray-400' : 'bg-green-food'"
      >
        <span v-if="!isLoading">Simpan</span>
        <span v-if="isLoading">
          <svg
            class="h-5"
            xmlns="http://www.w3.org/2000/svg"
            style="margin: auto; background: none; display: block; shape-rendering: auto;"
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
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        </span>
      </button>
    </div>

    <loader-full v-if="isLoading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      searchUser: "",
      selectedUser: {},
      branchs: [],
      filtered: [],
      isLoading: false,
      isLoadingBranch: false,
      selectAll: false,
      search: "",
    };
  },
  computed: {},
  watch: {
    search: {
      handler(r) {
        this.filteredBranchs(r);
      },
    },
    selectedUser: {
      handler(r) {
        if (r === null) {
          this.selectedUser = {};
        } else {
          this.getUserBranchs(r.user_id);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    filteredBranchs(keyword) {
      const filtered = [];
      this.branchs.forEach((data) => {
        if (data.branch_name) {
          if (data.branch_name.toLowerCase().includes(keyword.toLowerCase())) {
            filtered.push(data);
          }
        }
      });
      return (this.filtered = filtered);
    },
    selectAllAction() {
      this.selectAll = !this.selectAll;
      const value = this.selectAll ? 1 : 0;
      this.filtered.forEach((b) => {
        b.user_branch_is_active = value;
      });
    },
    async getUser(keyword) {
      if (keyword == undefined || keyword == null) keyword = "";
      const queryParams = new URLSearchParams({ q: keyword, data: 20 }).toString();
      try {
        const res = await this.$axios.get("me/user_brands?" + queryParams);
        if (res.data.success) {
          this.users = res.data.data.user_brands;
        }
      } catch (error) {}
    },
    async getUserBranchs(id) {
      if (id == undefined || id == null) id = "";
      try {
        this.isLoadingBranch = true;
        const res = await this.$axios.get("me/user_branchs?user_id=" + id);
        this.isLoadingBranch = false;

        if (res.data.success) {
          this.branchs = res.data.data;
          this.filtered = this.branchs;
          this.search = "";
          this.selectAll = false;
        }
      } catch (error) {
        this.isLoadingBranch = false;
      }
    },

    async saveBranchsUser(id) {
      try {
        this.isLoading = true;
        const payload = this.branchs;
        const res = await this.$axios.post("me/user_branchs/" + id, payload);
        this.isLoading = false;
        if (res.data.success) {
          this.$toast.success("Berhasil menyimpan data", { duration: 2000 });
        } else {
          this.$toast.error("Gagal menyimpan data", { duration: 2000 });
        }
      } catch (error) {
        this.isLoading = false;
      }
    },

    searchSome(v) {
      this.getUser(v);
    },
  },
};
</script>