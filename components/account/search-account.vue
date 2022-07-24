<template>
  <div>
    <input
      v-model="keyword"
      type="text"
      placeholder="Cari user ..."
      class="
        w-full
        px-3
        h-12
        border
        rounded-lg
        focus:outline-none focus:border-green-food
      "
      name=""
      id=""
    />

    <div class="absolute bottom-0">
      <ul>
        <li v-for="(us, index) in users" :key="index">
          <p class="font-bold">
            {{ us.name }}
          </p>
          <p class="text-sm text-gray-600">
            <i class="fas fa-phone"></i>
            {{ us.phone_number }}
          </p>
        </li>
      </ul>
    </div>
    <!-- {{ users }} -->
  </div>
</template>

<script>
export default {
  name: "SearchAccount",
  data() {
    return {
      keyword: "",
      users: [],
    };
  },

  watch: {
    keyword: {
      handler(r) {
        this.searchUser(r);
      },
    },
  },
  methods: {
    async searchUser(keyword) {
      try {
        const res = await this.$axios.get("me/user_brands?q=" + keyword);

        if (res.data.success) {
          this.users = res.data.data.user_brands;
        }
      } catch (error) {}
    },
  },
};
</script>
