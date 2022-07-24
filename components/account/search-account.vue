<template>
  <div>
    <input v-model="keyword" type="text" name="" id="" />
  </div>
</template>

<script>
export default {
  name: "SearchAccount",
  data() {
    return {
      keyword: "",
    };
  },

  watch: {
    keyword: {
      handler(r) {
        this.searchUser();
      },
    },
  },
  methods: {
    async searchUser(keyword) {
      try {
        console.log(keyword);
      } catch (error) {}
    },
  },
};
</script>
