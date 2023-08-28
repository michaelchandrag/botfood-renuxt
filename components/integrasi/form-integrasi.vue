<template>
  <div>
    <client-only>
      <vmodal name="form" :adaptive="true" height="auto">
        <div class="p-4 w-full">
          <form class="w-full" autocomplete="off">
            <h1 class="font-bold text-lg mb-4 text-center">Integrasi Channel</h1>

<!--            Info requirement untuk connect-->
            <div class="p-3 bg-blue-100 text-blue-600 flex gap-2 rounded-fd mb-3">
              <div class="-mt-1">
                <icon-base name="info"/>
              </div>
              <div class="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar elit at mauris dictum volutpat. Duis faucibus, magna sed blandit lobortis, nisl augue pellentesque velit, vel auctor risus urna eget tellus. Vivamus sem odio, efficitur ac lectus ut, pulvinar sodales eros. Nulla egestas augue ex, a tincidunt dolor euismod ut.
              </div>
            </div>
<!--            Info requirement untuk connect-->
            <div class="mb-2">
              <label class="text-sm text-gray-600">Username</label>
              <input class="p-2 w-full rounded-md border outline-none block" type="text" placeholder="Masukkan Username" v-model.trim="form.username">
            </div>
            <div class="mb-2">
              <label class="text-sm text-gray-600">Password</label>
              <input class="p-2 w-full rounded-md border outline-none block" type="password" placeholder="Masukkan Password" v-model.trim="form.username">
            </div>

            <!--            Info requirement untuk connect-->
            <div class="p-3 bg-green-100 text-green-600 flex gap-2 rounded-fd mb-3">
              <div class="-mt-1">
                <icon-base name="info"/>
              </div>
              <div class="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar elit at mauris dictum volutpat. Duis faucibus, magna sed blandit lobortis, nisl augue pellentesque velit, vel auctor risus urna eget tellus. Vivamus sem odio, efficitur ac lectus ut, pulvinar sodales eros. Nulla egestas augue ex, a tincidunt dolor euismod ut.
              </div>
            </div>
            <!--            Info requirement untuk connect-->
            <!--            Info requirement untuk connect-->
            <div class="p-3 bg-red-100 text-red-600 flex gap-2 rounded-fd mb-3">
              <div class="-mt-1">
                <icon-base name="info"/>
              </div>
              <div class="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar elit at mauris dictum volutpat. Duis faucibus, magna sed blandit lobortis, nisl augue pellentesque velit, vel auctor risus urna eget tellus. Vivamus sem odio, efficitur ac lectus ut, pulvinar sodales eros. Nulla egestas augue ex, a tincidunt dolor euismod ut.
              </div>
            </div>
            <!--            Info requirement untuk connect-->
            <div class="flex justify-end gap-3 mt-3">
              <button type="button" class="flex text-gray-500 px-4 py-2 items-center gap-1" @click.prevent="$modal.hide('form')">
                <icon-base name="x"/>
                Tutup
              </button>
              <button type="submit" class="flex px-4 py-2 items-center gap-1 bg-green-600 text-green-50 rounded-lg">
                <icon-base name="save"/>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </vmodal>
    </client-only>
  </div>
</template>

<script>
export default  {
  data() {
    return{
      form: {
        username:"",
        password:""
      }
    }
  }
}
</script>
