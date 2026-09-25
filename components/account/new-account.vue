<template>
  <div
    style="padding: 32px; margin-bottom: 16px"
    class="bg-white rounded-fd items-center"
  >
    <form @submit.prevent="saveBranchsUser()">
      <div class="w-full gap-x-4">
        <div class="grid mt-4 grid-cols-2 w-full gap-4">
          <div>
            <label class="text-sm text-gray-500" for="">Nama</label>
            <input
              type="text"
              required
              class="py-2 mt-1 px-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              v-model="user.name"
              placeholder="Masukkan Nama"
            />
          </div>
          <div>
            <label class="text-sm text-gray-500" for="">Nomor Telepon</label>
            <input
              type="text"
              required
              class="py-2 mt-1 px-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              v-model="user.phone_number"
              placeholder="Masukkan Nomor Telepon (cth: 628781111111)"
            />
          </div>

          <div>
            <label class="text-sm text-gray-500" for="">Password</label>
            <input
              type="password"
              required
              class="py-2 mt-1 px-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              v-model="user.password"
              placeholder="****** (6 digit karakter)"
            />
            <span v-if="passwordError" class="text-xs text-red-500">
              * Password harus 6 digit karakter, contoh: 123456
            </span>
          </div>

          <div>
            <label class="text-sm text-gray-500" for="">Konfirmasi Password</label>
            <input
              type="password"
              required
              class="py-2 mt-1 px-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              v-model="user.confirm_password"
              placeholder="******"
            />
            <span
              v-if="user.confirm_password.length > 1 && user.confirm_password !== user.password"
              class="text-xs text-red-500"
            >
              * Konfirmasi Password tidak sama
            </span>
          </div>
        </div>
      </div>

      <div class="mt-4">
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
                    placeholder="Cari Outlet . . . "
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

          <tbody v-if="!isLoadingBranch">
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
        <client-only>
          <button
            type="submit"
            :disabled="passwordError"
            class="w-full h-10 mt-4 rounded-lg text-white bg-green-food"
          >
            Simpan
          </button>
        </client-only>
      </div>
    </form>
    <loader-full v-if="isLoading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        name: "",
        password: "",
        confirm_password: "",
      },
      isLoadingBranch: false,
      isLoading: false,
      passwordError: false,
      branchs: [],
      filtered: [],
      selectAll: false,
      search: "",
    };
  },
  mounted() {
    this.getBranchs();
  },
  watch: {
    search: {
      handler(r) {
        this.filteredBranchs(r);
      },
    },
    user: {
      handler(r) {
        const numbers = /^[0-9]+$/;
        if (r.password.length > 1) {
          if (r.password.match(numbers)) {
            this.passwordError = false;
          } else {
            this.passwordError = true;
          }
        }
      },
      deep: true,
    },
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
    async getBranchs(id) {
      try {
        const res = await this.$axios.get("me/user_branchs");
        if (res.data.success) {
          this.branchs = res.data.data;
          this.filtered = this.branchs;
        }
      } catch (error) {}
    },

    async saveBranchsUser() {
      try {
        const payload = {
          user: { ...this.user, username: this.user.phone_number },
          user_branchs: this.branchs,
        };
        this.isLoading = true;
        const res = await this.$axios.post("me/create_user", payload);
        this.isLoading = false;
        if (res.data.success) {
          this.$toast.success("Berhasil menyimpan data", { duration: 2000 });
          this.$router.push("/account");
        } else {
          this.$toast.error("Gagal menyimpan data", { duration: 2000 });
        }
      } catch (error) {
        this.isLoading = false;
        if (error.response) {
          error.response.data.errors.forEach((err) => {
            this.$toast.error(err.code + " " + err.detail, { duration: 2000 });
          });
        }
      }
    },
  },
};
</script>