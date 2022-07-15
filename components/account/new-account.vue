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
              class="
                py-2
                mt-1
                px-3
                border border-gray-300
                rounded-lg
                w-full
                focus:outline-none
              "
              v-model="user.name"
              placeholder="Masukkan Nama"
            />
          </div>
          <div>
            <label class="text-sm text-gray-500" for="">Nomor Telepon</label>
            <input
              type="text"
              required
              class="
                py-2
                mt-1
                px-3
                border border-gray-300
                rounded-lg
                w-full
                focus:outline-none
              "
              v-model="user.phone_number"
              placeholder="Masukkan Nomor Telepon"
            />
          </div>

          <div>
            <label class="text-sm text-gray-500" for="">Password</label>
            <input
              type="password"
              required
              class="
                py-2
                mt-1
                px-3
                border border-gray-300
                rounded-lg
                w-full
                focus:outline-none
              "
              v-model="user.password"
              placeholder="**************"
            />
            <span v-if="passwordError" class="text-xs text-red-500">
              * Password harus digit 6 karakter, contoh: 123456
            </span>
          </div>

          <div>
            <label class="text-sm text-gray-500" for=""
              >Konfirmasi Password</label
            >
            <input
              type="password"
              required
              class="
                py-2
                mt-1
                px-3
                border border-gray-300
                rounded-lg
                w-full
                focus:outline-none
              "
              v-model="user.confirm_password"
              placeholder="**************"
            />
            <span
              v-if="
                user.confirm_password.length > 1 &&
                user.confirm_password !== user.password
              "
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
              <th class="py-4 text-text text-left cursor-pointer">
                Nama Outlet
              </th>
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
                    class="fas text-green-food fa-check"
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          :disabled="passwordError"
          class="w-full h-10 mt-4 rounded-lg text-white bg-green-food"
        >
          Simpan
        </button>
      </div>
    </form>

    <!-- {{ branchs }} -->
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
      passwordError: false,
      branchs: [],
    };
  },
  mounted() {
    this.getBranchs();
  },
  watch: {
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
    async getBranchs(id) {
      try {
        const res = await this.$axios.get("me/user_branchs");
        if (res.data.success) {
          this.branchs = res.data.data;
        }
      } catch (error) {}
    },

    async saveBranchsUser() {
      try {
        const payload = {
          user: { ...this.user, username: this.user.phone_number },
          user_branchs: this.branchs,
        };
        const res = await this.$axios.post("me/create_user", payload);

        if (res.data.success) {
          this.$toast.success("Berhasil menyimpan data", { duration: 2000 });
          this.$router.push("/account");
          // this.branchs = res.data.data.update;
        } else {
          this.$toast.error("Gagal menyimpan data", { duration: 2000 });
        }
      } catch (error) {}
    },
  },
};
</script>
