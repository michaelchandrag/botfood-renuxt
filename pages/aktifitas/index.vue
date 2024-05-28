<template>
  <div>
    <client-only><left-sidebar class="px-6 pt-8" /></client-only>
    <div class="bg-gray-200 wrapper-content">
      <client-only><header-navbar class="hidden md:block"></header-navbar></client-only>
      <div class="content-head">
        <div class="content-head-title mb-2">
          <h1 class="text-title text-left text-2xl font-extrabold tracking-wider text-gray-900">Aktifitas</h1>
        </div>
        <div class="content-head-action">
          <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 font-mono text-white text-sm text-center align-center font-bold">
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
                  <li v-for="channel in channels">
                    <a href="#" @click.prevent="handleSelectFilter('channel', channel.key)" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-normal">{{channel.text}}</a>
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
              <button type="button" @click.prevent="handleOpenMassal" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm py-2 px-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ms-2">Edit Massal</button>
            </div>
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
                      <th class="border-b dark:border-slate-600 font-medium p-3 pl-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Outlet</th>
                      <th class="border-b dark:border-slate-600 font-medium p-3 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Channel</th>
                      <th class="border-b dark:border-slate-600 font-medium p-3 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Item</th>
                      <th class="border-b dark:border-slate-600 font-medium p-3 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Alasan</th>
                      <th class="border-b dark:border-slate-600 font-medium p-3 pr-4 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(activity, idx) in activities">
                      <td class="border-b border-slate-100 dark:border-slate-700 p-2 pl-4 text-slate-500 dark:text-slate-400">{{activity.branch_channel_name}}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">{{activity.branch_channel_channel}}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">{{activity.item_name}}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <div class="relative">
                          <select v-model="activities[idx].reason" :id="`activity-reason-${idx}`" class="p-2 pr-10 text-xs text-gray-900 rounded-lg bg-white focus:bg-yellow-50 focus:outline-none font-normal border border-1 px-2 w-full">
                            <option value="">Pilih Alasan</option>
                            <option v-if="activity.choices && activity.choices.length" v-for="choice in activity.choices" :value="choice.key">{{choice.text}}</option>
                            <option value="none">Tanpa Alasan</option>
                          </select>
                          <a href="#" @click.prevent="handleUpdateItem('reason', idx)" :class="[(activity.process_reason === 1) ? 'bg-yellow-200 cursor-not-allowed' : ( (activity.process_reason === 2) ? 'bg-red-500 hover:bg-red-800 text-white' : 'bg-gray-200 hover:bg-green-800 hover:text-white' )]" class="absolute right-0 inset-y-0 flex items-center pr-2 pl-2">
                            <svg v-if="activity.process_reason === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <svg v-else-if="activity.process_reason === 2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-2 pr-4 text-slate-500 dark:text-slate-400 w-2/6">
                        <div class="relative">
                          <a href="#" @click.prevent="handleUpdateItem('remarks', idx, false)" :class="[(activity.process_remarks === 1) ? 'bg-yellow-200 cursor-not-allowed' : ( (activity.process_remarks === 2) ? 'bg-red-500 hover:bg-red-800 text-white' : 'bg-gray-200 hover:bg-green-800 hover:text-white' )]" class="absolute right-0 inset-y-0 flex items-center pr-2 pl-2">
                            <svg v-if="activity.process_remarks === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <svg v-else-if="activity.process_remarks === 2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </a>
                          <input type="text" v-model="activities[idx].remarks" :id="`activity-remarks-${idx}`" class="p-2 pr-10 text-xs text-gray-900 rounded-lg bg-white focus:bg-yellow-50 focus:outline-none font-normal border border-1 px-2 w-full" placeholder="Remark..">
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
    <div class="modal-overlay" v-if="openMassal">
      <div class="modal-dialog" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-bold">Edit Massal</h5>
            <a href="#" @click.prevent="openMassal = false" class="modal-close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </a>
          </div>
          <div v-if="massal.load_check">
            <Loader/>
          </div>
          <div v-else-if="massal.is_check">
            <div class="modal-body bg-white">
               <div v-for="check in massal.check" class="grid md:grid-cols-2 md:gap-6 pb-2 border-b mb-2">
                  <div :style="{ color: check.text_color}" class="font-medium text-slate-500 text-left text-sm">{{check.text}}</div>
                  <div :style="{ color: check.subtext_color}" class="text-sm text-gray-900 text-right" :class="[(check.bold) ? 'font-bold' : 'font-medium', (check.italic) ? 'font-italic' : '']">{{check.subtext}}</div>
               </div>
            </div>
            <div class="modal-footer bg-light">
              <div class="flex justify-between w-full">
                <button @click.prevent="openMassal = false" type="button" class="focus:outline-none text-gray bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm py-2 px-4">Batal</button>
                <button type="button" @click.prevent="updateMassal()" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm py-2 px-4">Proses</button>
              </div>
            </div>
          </div>
          <form v-else @submit.prevent="updateMassal(true)" class="w-full">
            <div class="modal-body bg-white">
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" v-model="massal.outlet" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Outlet (opsional)</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" v-model="massal.item" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" />
                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item (opsional)</label>
              </div>
              <div class="relative z-0 w-full mb-5">
                <select v-model="massal.channel" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                  <option value="">Pilih Channel (opsional)</option>
                  <option v-for="channel in channels" :value="channel.key">{{channel.text}}</option>
                </select>
              </div>
              <div class="relative z-0 w-full mb-5">
                <select required @change.prevent="checkMassalReason" v-model="massal.reason_index" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                  <option value="">Pilih Alasan</option>
                  <option v-for="(reason, ridx) in reasons" :value="ridx">{{reason.text}}</option>
                </select>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <textarea v-model="massal.remarks" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" :required="massal.reason_need_remarks"></textarea>
                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Masukkan Catatan</label>
              </div>
            </div>
            <div class="modal-footer bg-light">
              <div class="flex justify-between w-full">
                <button @click.prevent="openMassal = false" type="button" class="focus:outline-none text-gray bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm py-2 px-4">Batal</button>
                <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm py-2 px-4">Lanjutkan</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { sleep, handleDropdownCustom, handlePaginateCustom, handleAlertCustom } from '@/lib/helper'

  import Paginate from '@/components/paginate'
  import Loader from '@/components/loader'
  import Alert from '@/components/alert'

  export default {
    data(){
      return{
        load: {status: true, msg:''},
        activities : [],
        pagination : {
          default_limit : 20,
          limit:20,
          count:0,
          max_page: 20,
          count_page : 0,
          ready: false,
          links: [],
          link_befs : [],
          prev: null,
          next:null,
        },
        filter : {outlet:'', item:'', channel:'', date:'', reason:''},
        label_filter : {channel:'', reason:''},
        filter_date: this.$moment().format('YYYY-MM-DD'),
        channels:[
          {key: 'GrabFood', text: 'GrabFood'},
          {key: 'GoFood', text: 'GoFood'},
          {key: 'ShopeeFood', text: 'ShopeeFood'},
          {key: 'AirAsiaFood', text: 'AirAsiaFood'},
          ],
        reasons: [],
        openMassal: false,
        massal:{
          outlet:'',
          item:'',
          channel:'',
          reason:'',
          reason_index:'',
          reason_need_remarks: false,
          remarks:'',
          is_check : false,
          load_check: false,
          check:[],
        }
      };
    },
    mounted() {
      this.filter.date = this.filter_date;
      this.loadList();
    },
    methods: {
      sleep, handleDropdownCustom, handlePaginateCustom, handleAlertCustom,

      async loadList(is_load = false, from_pagination = false) {
        if(is_load) await this.handleLoad(true, '');
        if(!from_pagination) await this.initPagination(true);

        var this_endpoint = `me/activity/warning_item_list?page=${this.pagination.page}&data=${this.pagination.limit}`;
        this_endpoint = `${this_endpoint}&date=${this.filter.date}&branch_channel_name=${this.filter.outlet}&item_name=${this.filter.item}&branch_channel_channel=${this.filter.channel}&n_reason=${this.filter.reason}`;

        await this.sleep(100);
        this.$axios.get(this_endpoint).then( async (respone) => {
          var resData = respone.data;
          var resMsg = this.handleAlertCustom(resData, true, true, 'recap_warning_activities');
          if(resData.success && resData.data){
            resData = resData.data;
            if(resData.recap_warning_activities && resData.recap_warning_activities.length){
              let countData = (resData.total_data) ? resData.total_data : resData.recap_warning_activities.length;
              let limitData = (resData.limit_data) ? resData.limit_data : this.pagination.default_limit;
              resData.recap_warning_activities.forEach((act, idx) =>{
                if(!act.reason){
                  resData.recap_warning_activities[idx].reason = '';
                }
                resData.recap_warning_activities[idx].reason_before = resData.recap_warning_activities[idx].reason;
                resData.recap_warning_activities[idx].remarks_before = resData.recap_warning_activities[idx].remarks;

                resData.recap_warning_activities[idx].process_reason = 0;
                resData.recap_warning_activities[idx].process_remarks = 0;
              })
              this.activities = resData.recap_warning_activities;
              this.pagination.count = parseInt(countData);
              this.pagination.limit = parseInt(limitData);
              await this.initPagination();
            }
            await this.loadReason();
          }
          return this.handleLoad(false, resMsg);
        }).catch( error => {
          return this.handleLoad(false, this.handleAlertCustom(error, false, true, 'error'));
        });
      },
      async loadReason() {
        this.$axios.get(`me/activity/reasons`).then( async (respone) => {
          var resData = respone.data;
          if(resData.success && resData.data &&  resData.data.length){
            this.reasons = resData.data;
          }
        }).catch( error => {});
      },
      async handlePagination(page){
        this.pagination.page = page;
        return this.loadList(true, true);
      },
      async handleLoad(is_load = false, msg = ''){
        this.load.msg = msg;
        await this.sleep(100);
        this.load.status = is_load;
      },
      async initPagination(is_reset = false){
        if(is_reset){
          this.pagination.page = 1;
          this.pagination.limit = 20;
          this.pagination.count = 0;
        }else{
          var parse_pagination = await handlePaginateCustom(this.pagination);
          this.pagination.links = parse_pagination.links;
          this.pagination.link_befs = parse_pagination.link_befs;
          this.pagination.prev =  parse_pagination.prev;
          this.pagination.next = parse_pagination.next;
          this.pagination.ready = parse_pagination.ready;
        }
      },
      async handleSelectFilter(source, value = '', label = null){
        if(!label) label = value;
        this.filter[source] = value;
        this.label_filter[source] = label;
        await this.handleDropdownCustom(`${source}-option`);
      },
      async handleUpdateItem(source, index, is_required = true){
        var this_data = this.activities[index];
        var currentAction = this_data[`process_${source}`];
        if(currentAction === 1) return false;
        if((is_required && !this_data[source]) || this_data[source] === this_data[`${source}_before`]){
          document.getElementById(`activity-${source}-${index}`).focus();
          return false;
        }

        this.activities[index][`process_${source}`] = 1;
        var for_send_action = (this_data[source] == 'none') ? '' : this_data[source];
        var send_action = {[source] : for_send_action};

        await this.sleep(100);
        this.$axios.post(`me/activity/update_warning_item/${this_data.id}`, send_action, { headers: { "Content-Type": "application/json" } }).then( async (respone) => {
          var resData = respone.data;
          if(resData.success && resData.data){
            this.activities[index][`process_${source}`] = 0;
            this.activities[index][`${source}_before`] = this.activities[index][source];
          }else{
            this.activities[index][`process_${source}`] = 2;
            return this.handleAlertCustom(resData, false, false);
          }
        }).catch( error => {
          this.activities[index][`process_${source}`] = 2;
          return this.handleAlertCustom(error, false, false, 'error');
        });
      },
      async updateMassal(is_check = false){
        var send_massal = {q_branch_channel_name:this.massal.outlet, q_item_name: this.massal.item, branch_channel_channel: this.massal.channel, reason: this.massal.reason, remarks: this.massal.remarks};

        this.massal.load_check = true;
        var massal_endpoint = (is_check) ? '/check' : '';
        await this.sleep(100);
        this.$axios.post(`me/activity/batch_update_warning_item${massal_endpoint}`, send_massal, { headers: { "Content-Type": "application/json" } }).then( async (respone) => {
          var resData = respone.data;
          if(resData.success && resData.data){
            if(is_check){
              this.massal.check = resData.data.info;
              this.massal.is_check = true;
            }else{
              this.openMassal = false;
              this.loadList(true);
            }
          }else{
            this.handleAlertCustom(error, false, false, 'error');
          }
          this.massal.load_check = false;
        }).catch( error => {
          return this.handleAlertCustom(error, false, false, 'error');
        });
      },
      async checkMassalReason(){
        var need_remarks = false;
        if(`${this.massal.reason_index}` in this.reasons){
          need_remarks = (this.reasons[this.massal.reason_index].need_remarks) ? true : false;
          this.massal.reason = this.reasons[this.massal.reason_index].key;
        }
        this.massal.reason_need_remarks = need_remarks;
      },
      async handleOpenMassal(){
        this.massal.is_check = false;
        this.massal.check = [];
        this.openMassal = true;
      }
    },
    watch: {
      filter_date: {
        handler(r) {
          this.filter.date = this.$moment(r).format('YYYY-MM-DD')
          return this.handleDropdownCustom('date-option');
        }
      },
    },
    components: { Paginate, Loader, Alert },
    props:{},
    name: 'aktifitas',
  };
</script>
