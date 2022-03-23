<template>
  <div style="padding:24px 32px;margin-bottom:16px;" class="flex bg-white rounded-fd items-center">
    <form class="w-full max-w-m">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-full">
          <label class="block font-bold mb-1 md:mb-0 pr-4">
            Laporan Global
          </label>
          <label>
            Semua laporan outlet dan item dalam satu tampilan yang disatukan.
          </label>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-3/12">
          <div class="">
            <button v-if="isDownload"
              class="cursor-not-allowed shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm">
              <span class="animate-spin">Downloading . . .</span>
            </button>
            <button v-if="!isDownload"
              class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm"
              @click.prevent="download()">
              <span v-if="!isDownload">Download</span>
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Ubah Password
          </button>
        </div>
      </div> -->
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isDownload: false,
        statusDropdown: false,
      }
    },
    methods: {
      download() {
        this.isDownload = true
        var queryParams = {
          xlsx: true
        }
        var queryParams = new URLSearchParams(queryParams).toString()
        this.$axios({
          method: 'GET',
          url: `me/report/global?${queryParams}`,
          responseType: 'blob',
        }).then(r => {
          this.isDownload = false
          const url = window.URL.createObjectURL(new Blob([r.data], {
            'content-type': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }));
          var fileLink = document.createElement('a');
          fileLink.href = url;
          fileLink.setAttribute('download', 'laporan-global.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
      }
    }
  }

</script>

<style>
  .border-date {
    border: 1px solid black;
    padding: 3px;
  }

</style>
