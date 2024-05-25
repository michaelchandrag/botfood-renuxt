<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>
    <div class="bg-gray-200 wrapper-content">
      <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      <div class="content-block">
        <div class="content-head">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 font-mono text-white text-sm text-center align-center font-bold">
            <h1 class="text-title text-left text-2xl font-extrabold tracking-wider text-gray-900">Aktifitas</h1>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input v-model="filter.outlet" type="search"class="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal" placeholder="Outlet"/>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input v-model="filter.item" type="search" class="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal" placeholder="Item"/>
            </div>
            <select v-model="filter.channel" class="p-2 w-full text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal">
              <option value="">Channel</option>
            </select>
            <div class="content-head-action flex justify-between">
              <button @click.prevent="loadList(true)" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm py-2 px-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Filter</button>
              <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm py-2 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ms-2">Edit Massal</button>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body mt-3">
        <div class="p-0 bg-white border-gray-200 rounded-lg mt-3">
          <Loader v-if="load.status"/>
          <div v-bind:class="{ hidden: load.status }">
            <div v-if="lists && lists.length">
              <div class="table-responsive">
                <table class="border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Outlet</th>
                      <th class="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Channel</th>
                      <th class="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Item</th>
                      <th class="border-b dark:border-slate-600 font-medium p-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Alasan</th>
                      <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Malcolm Lockyer</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">1961</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">1961</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">1961</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Paginate :isPaging="{isPage:pagination.page, perPage:pagination.limit, totalData:pagination.count}" :isHandle="handlePagination"/>
            </div>
            <div v-else class="p-2">
              <Alert  :typeAlert="'warning'" :textAlert="load.msg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { ref, reactive } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  //import axiosssr from "@/lib/axios-ssr"
  import { sleep } from '@/lib/helper'

  import Paginate from '@/components/paginate'
  import Loader from '@/components/loader'
  import Alert from '@/components/alert'

  export default {
    setup(){
      let load = reactive({status: true, msg:''});
      let lists = ref([]);
      let pagination = reactive({page:1, limit:0, count:0});
      let filter = reactive({outlet:'', item:'', channel:''})


      async function handleLoad(is_load = false, msg = ''){
        load.msg = msg;
        await sleep(100);
        load.status = is_load;
      }

      async function resetPagination(){
        pagination.page = 1;
        pagination.limit = 0;
        pagination.count = 0;
      }

      return {load, lists, handleLoad, filter, pagination, resetPagination}
    },
    mounted() {
      this.loadList();
    },
    methods: {
      async loadList(is_load = false, from_pagination = false) {
        if(is_load) await this.handleLoad(true, '');
        if(!from_pagination) await this.resetPagination;

        var params = `me/activities?page${this.pagination.page}&outlet=${this.filter.outlet}&item=${this.filter.item}&channel=${this.filter.channel}`;
        this.$axios.get(params).then((respone) => {
          const resData = respone.data;
          var resMsg = (!resData.success || (resData.success && (!resData.activities || !resData.activities.length))) ? 'Tidak ada data ditemukan' : 'Data loaded';
          if(resData.success && resData.activities && resData.activities.length){
            let countData = (resData.total_data) ? resData.total_data : resData.activities.length;
            let limitData = (resData.limit_data) ? resData.limit_data : 20;
            this.lists = resData.activities;
            this.pagination.count = parseInt(countData);
            this.pagination.limit = parseInt(limitData);
          }
          return this.handleLoad(false, resMsg);
        }).catch( error => {
            return this.handleLoad(false, 'Failed process data or data not found');
        });
      },
      async handlePagination(page){
        this.pagination.page = page;
        return this.loadList(true, true);
      }
    },
    components: { Paginate, Loader, Alert },
    props:{},
    name: 'aktifitas',
  };
</script>
