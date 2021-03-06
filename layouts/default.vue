<template>
<div>
  <Nuxt/>
  <a href="https://wa.me/6287824622895" target="new_tab" class="absolute bottom-0 right-0 bg-green-food rounded-full mr-8 mb-8 p-5">
    <img class="h-8" src="~/assets/png/whatsapp.png" alt="">
  </a>
</div>
</template>

<script>
export default {
  middleware: 'auth-ssr'
}
</script>