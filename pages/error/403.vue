<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl">403</h1>
      <h1 class="text-lg font-bold">Unauthorized</h1>
      <p>Anda tidak memiliki akses pada halaman ini</p>
      <div class="mt-6">
        <nuxt-link to="/" class="px-4 py-2 text-white rounded-fds bg-green-food"
          >Kembali ke Home</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Unauth",
  layout: "no-auth",
};
</script>
