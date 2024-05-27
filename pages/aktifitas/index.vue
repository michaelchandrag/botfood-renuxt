<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>
    <div class="bg-gray-200 wrapper-content">
      <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      <div class="content-head">
        <div class="grid grid-cols-1 lg:grid-cols-7 gap-4 font-mono text-white text-sm text-center align-center font-bold">
          <h1 class="text-title text-left text-2xl font-extrabold tracking-wider text-gray-900">Aktifitas</h1>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input v-model="filter.outlet" v-on:keyup.enter="loadList(true)" type="search"class="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal" placeholder="Outlet"/>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input v-model="filter.item" v-on:keyup.enter="loadList(true)" type="search" class="block w-full p-2 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal" placeholder="Item"/>
          </div>
          <div class="relative">
            <span id="channel-option" @click.prevent="handleDropdownCustom('channel-option')" class="block w-full p-2 pe-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal cursor-pointer text-left ps-3">
              {{ (!label_filter.channel) ? 'Semua Channel' : label_filter.channel }}
            </span>
            <div class="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
              <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div data-parent="channel-option" class="is-dropdown z-50 absolute shadow-sm rounded-b-fds bg-white rounded-lg mt-1 border-solid border-1 border-gray-200 hidden">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 text-left">
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('channel', 'GrabFood')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">GrabFood</a>
                </li>
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('channel', 'GoFood')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">GoFood</a>
                </li>
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('channel', 'ShopeeFood')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">ShopeeFood</a>
                </li>
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('channel', 'AirAsiaFood')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">AirAsiaFood</a>
                </li>
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('channel')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">Semua Channel</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <span id="reason-option" @click.prevent="handleDropdownCustom('reason-option')" class="block w-full p-2 pe-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal cursor-pointer text-left ps-3">
              {{ (!label_filter.reason) ? 'Semua Status' : label_filter.reason }}
            </span>
            <div class="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
              <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div data-parent="reason-option" class="z-50 is-dropdown absolute shadow-sm rounded-b-fds bg-white rounded-lg mt-1 hidden">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 text-left">
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('reason', 0, 'Dengan Alasan')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">Dengan Alasan</a>
                </li>
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('reason', 1, 'Tanpa Alasan')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">Tanpa Alasan</a>
                </li>
                <li>
                  <a href="#" @click.prevent="handleSelectFilter('reason')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">Semua Status</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <span id="date-option" @click.prevent="handleDropdownCustom('date-option')" class="block w-full p-2 pe-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:outline-none font-normal cursor-pointer text-left ps-3">
              {{filter.date}}
            </span>
            <div class="absolute inset-y-0 right-0 flex items-center pe-3 pointer-events-none">
              <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div data-parent="date-option" class="z-50 is-dropdown absolute rounded-lg mt-1 text-black font-normal hidden">
              <client-only>
                <date-picker class="w-64" style="z-index:2;" format="YYYY-MM-DD" :inline="true"
                :maxDate="new Date()" v-model="filter_date" autoclose="true" :disabledDates="{from: new Date()}" />
              </client-only>
            </div>
          </div>
          <div class="content-head-action flex justify-between">
            <button @click.prevent="loadList(true)" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm py-2 px-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Filter</button>
            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm py-2 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ms-2">Edit Massal</button>
          </div>
        </div>
      </div>
      <div class="content-body mt-3">
        <div class="p-0 bg-white border-gray-200 rounded-lg mt-3">
          <Loader v-if="load.status"/>
          <div v-bind:class="{ hidden: load.status }">
            <div v-if="activities && activities.length">
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
                    <tr v-for="(activity, idx) in activities">
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{activity.branch_channel_name}}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{{activity.branch_channel_channel}}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{{activity.item_name}}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                        <select v-model="activities[idx].reason" class="p-2 text-xs text-gray-900 rounded-lg bg-white focus:outline-none font-normal border border-1 px-2 w-full">
                          <option value="">Pilih Alasan</option>
                          <option v-if="activity.choices && activity.choices.length" v-for="choice in activity.choices" :value="choice.key">{{choice.text}}</option>
                        </select>
                      </td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        <div class="relative">
                          <a href="#" class="absolute right-0 inset-y-0 flex items-center pe-3">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                            </svg>
                          </a>
                          <input type="text" v-model="activities[idx].remarks" class="p-2 pr-10 text-xs text-gray-900 rounded-lg bg-white focus:outline-none font-normal border border-1 px-2 w-full" placeholder="Remark..">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Paginate :isPaging="pagination" :isHandle="handlePagination"/>
            </div>
            <div v-else class="p-2">
              <Alert :typeAlert="'warning'" :textAlert="load.msg"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  import { sleep, handleDropdownCustom } from '@/lib/helper'

  import Paginate from '@/components/paginate'
  import Loader from '@/components/loader'
  import Alert from '@/components/alert'

  export default {
    setup(){
      let load = reactive({status: true, msg:''});
      let activities = ref([]);
      let pagination = reactive({
        limit:10,
        count:0,
        max_page: 10,
        count_page : 0,
        ready: false,
        links: [],
        link_befs : [],
        prev: null,
        next:null,
      });
      let filter = reactive({outlet:'', item:'', channel:'', date:'', reason:''})
      let label_filter = reactive({channel:'', reason:''})

      onMounted(() => { })

      async function handleLoad(is_load = false, msg = ''){
        load.msg = msg;
        await sleep(100);
        load.status = is_load;
      }

      async function initPagination(is_reset = false){
        if(is_reset){
          pagination.page = 1;
          pagination.limit = 10;
          pagination.count = 0;
        }else{
          pagination.count_page = Math.ceil(parseInt(pagination.count)/parseInt(pagination.limit))
          var pg = (pagination.page>pagination.max_page) ? pagination.page : 1, nPg = 0;
          var is_links = [], is_link_befs = [];
          for(var cpg = pg; cpg<=pagination.count_page; cpg++){
            is_links.push(cpg);
            if(nPg==10){ break; }
            nPg++;
          }

          if(pg>pagination.max_page){
            let forBpg = (nPg<3) ? 10 : 5, forBpg2 = (nPg<3) ? 5 : 3;
            for(var bpg = pg-forBpg; bpg<pg-forBpg2; bpg++){
             is_link_befs.push(bpg);
           }
         }

         pagination.links = is_links;
         pagination.link_befs = is_link_befs;
         pagination.prev =  (pagination.page>1) ? parseInt(pagination.page)-1 : false
         pagination.next = (pagination.page<pagination.count_page) ? parseInt(pagination.page)+1 : false;
         pagination.ready = (pagination.count_page > 1) ? true : false;
       }
     }

     async function handleSelectFilter(source, value = '', label = null){
      if(!label) label = value;
      filter[source] = value;
      label_filter[source] = label;
      await handleDropdownCustom(`${source}-option`);
    }

    return {load, activities, handleLoad, filter, label_filter, pagination, initPagination, handleDropdownCustom, handleSelectFilter}
  },
  data() {
    return{
      filter_date: this.$moment().subtract(1, "days").format('YYYY-MM-DD'),
    }
  },
  mounted() {
    this.filter.date = this.filter_date;
    this.loadList();
  },
  methods: {
    async loadList(is_load = false, from_pagination = false) {
      if(is_load) await this.handleLoad(true, '');
      if(!from_pagination) await this.initPagination(true);

      var params = `me/activity/warning_item_list?page=${this.pagination.page}&data=`;
      params = `${params}&date=${this.filter.date}&branch_channel_name=${this.filter.outlet}&item_name=${this.filter.item}&branch_channel_channel=${this.filter.channel}&n_reason=${this.filter.reason}`;
      this.$axios.get(params).then( async (respone) => {
        var resData = respone.data;
        var resMsg = (!resData.success || (resData.success && (!resData.data || !resData.data.recap_warning_activities || !resData.data.recap_warning_activities.length))) ? 'Tidak ada data ditemukan' : 'Data loaded';
        if(resData.success && resData.data){
          resData = resData.data;
          if(resData.recap_warning_activities && resData.recap_warning_activities.length){
            let countData = (resData.total_data) ? resData.total_data : resData.recap_warning_activities.length;
            let limitData = (resData.limit_data) ? resData.limit_data : 20;
            resData.recap_warning_activities.forEach((act, idx) =>{
                if(!act.reason){
                  resData.recap_warning_activities[idx].reason = '';
                }
            })
            this.activities = resData.recap_warning_activities;
            this.pagination.count = parseInt(countData);
            this.pagination.limit = parseInt(limitData);
            await this.initPagination();
          }
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
  watch: {
    filter_date: {
      handler(r) {
        this.filter.date = this.$moment(r).format('YYYY-MM-DD')
        return this.handleDropdownCustom('date-option');
      }
    }
  },
  components: { Paginate, Loader, Alert },
  props:{},
  name: 'aktifitas',
};
</script>
