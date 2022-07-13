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
          class="w-full h-9 rounded-lg text-white bg-green-food"
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

        <tbody>
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
                  border-2 border-gray-500
                "
                @click.prevent="
                  branchs[index].user_branch_is_active
                    ? (branchs[index].user_branch_is_active = 0)
                    : (branchs[index].user_branch_is_active = 1)
                "
              >
                <i
                  v-if="branch.user_branch_is_active"
                  class="fas text-green-food fa-check"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        @click.prevent="saveBranchsUser(selectedUser.user_id)"
        class="w-full h-10 mt-4 rounded-lg text-white bg-green-food"
      >
        Simpan
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
        const res = await this.$axios.get("me/user_branchs?user_id=" + id);
        if (res.data.success) {
          this.branchs = res.data.data;
        }
      } catch (error) {}
    },

    async saveBranchsUser(id) {
      try {
        const payload = this.branchs;
        const res = await this.$axios.post("me/user_branchs/" + id, payload);

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
