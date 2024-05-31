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
          <div class="flex flex-wrap -m-2">
            <div class="w-full xl:w-2/12 lg:w-2/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div class="relative">
                <input v-model="filter.outlet" v-on:keyup.enter="loadList(true)" type="search" placeholder="Outlet" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none text-sm">
                <div class="absolute top-0 pt-2 pl-2">
                  <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="#9E9E9E"></path></svg>
                </div>
              </div>
            </div>

            <div class="w-full xl:w-2/12 lg:w-2/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div class="relative">
                <input v-model="filter.item" v-on:keyup.enter="loadList(true)" type="search" placeholder="Item" class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none text-sm">
                <div class="absolute top-0 pt-2 pl-2">
                  <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="#9E9E9E"></path></svg>
                </div>
              </div>
            </div>
            <div class="w-full xl:w-2/12 lg:w-2/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div id="channel-option" @click.prevent="handleDropdownCustom('channel-option')" class="border flex py-2 px-4 border-gray-300 rounded-lg w-full focus:outline-none bg-white">
                <div class="flex-auto text-sm">
                  <span>{{ (!label_filter.channel) ? 'Semua Channel' : label_filter.channel }}</span>
                </div>
                <div><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                </svg></div>
              </div>
              <div data-parent="channel-option" class="is-dropdown z-50 absolute w-full shadow-lg rounded-lg border border-2 border-gray-200 hidden bg-white">
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
            <div class="w-full xl:w-2/12 lg:w-2/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div id="reason-option" @click.prevent="handleDropdownCustom('reason-option')"  class="border flex py-2 px-4 border-gray-300 rounded-lg w-full focus:outline-none bg-white">
                <div class="flex-auto text-sm">
                  <span>{{ (!label_filter.reason) ? 'Semua Status' : label_filter.reason }}</span>
                </div>
                <div><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                </svg></div>
              </div>
              <div data-parent="reason-option" class="is-dropdown z-50 absolute w-full shadow-lg rounded-lg border border-2 border-gray-200 hidden bg-white">
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
            <div class="w-full xl:w-2/12 lg:w-2/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div id="date-option" @click.prevent="handleDropdownCustom('date-option')" class="border flex py-2 px-4 border-gray-300 rounded-lg w-full focus:outline-none bg-white">
                <div class="flex-auto text-sm">
                  <span>{{filter.date}}</span>
                </div>
                <div><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                </svg></div>
              </div>
              <div data-parent="date-option" class="is-dropdown z-50 absolute w-full hidden">
                <client-only>
                  <date-picker class="text-sm" format="YYYY-MM-DD" :inline="true"
                  :maxDate="new Date()" v-model="filter_date" autoclose="true" :disabledDates="{from: new Date()}" />
                </client-only>
              </div>
            </div>
            <div class="w-full xl:w-2/12 lg:w-2/12 sm:w-6/12 p-2 cursor-pointer items-center relative">
              <div class="content-head-action flex justify-between gap-2">
                <button @click.prevent="loadList(true)" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm py-2 w-full">Filter</button>
                <button type="button" @click.prevent="handleOpenMassal" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm py-2 w-full">Edit Massal</button>
              </div>
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
                      <th class="border-b p-3 pl-4 pt-3 pb-3 text-left font-bold">Outlet</th>
                      <th class="border-b p-3 pt-3 pb-3 text-left font-bold">Channel</th>
                      <th class="border-b p-3 pt-3 pb-3 text-left font-bold">Item</th>
                      <th class="border-b p-3 pt-3 pb-3 text-left font-bold">Alasan</th>
                      <th class="border-b p-3 pr-4 pt-3 pb-3 text-left font-bold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="hover:bg-gray-200 border-b" v-for="(activity, idx) in activities">
                      <td class="p-2 pl-4 text-slate-500">{{activity.branch_channel_name}}</td>
                      <td class="p-2 text-slate-500 dark:text-slate-400">{{activity.branch_channel_channel}}</td>
                      <td class="p-2 text-slate-500 dark:text-slate-400">{{activity.item_name}}</td>
                      <td class="p-2 text-slate-500 dark:text-slate-400">
                        <div class="inline-block relative w-full">
                          <select v-model="activities[idx].reason" :id="`activity-reason-${idx}`" @change.prevent="handleUpdateItem('reason', idx)" :class="[(activity.process_reason === 1) ? 'bg-yellow-50' : ( (activity.process_reason === 2) ? 'bg-red-50' : 'bg-white' )]" class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 text-sm">
                            <option value="">Pilih Alasan</option>
                            <option v-if="activity.choices && activity.choices.length" v-for="choice in activity.choices" :value="choice.key">{{choice.text}}</option>
                            <option value="none">Tanpa Alasan</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </td>
                      <td class="p-2 pr-4 text-slate-500 dark:text-slate-400 w-2/6">
                        <input type="text" @keyup.prevent="handleUpdateItem('remarks', idx)" v-model="activities[idx].remarks" :id="`activity-remarks-${idx}`" :class="[(activity.process_remarks === 1) ? 'bg-yellow-50' : ( (activity.process_remarks === 2) ? 'bg-red-50' : 'bg-white' )]" class="appearance-none block w-full text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 text-sm" placeholder="Remark..">
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
              <button @click.prevent="openMassal = false" type="button" class="focus:outline-none text-gray bg-gray-200 hover:bg-gray-300 rounded-lg text-sm py-2 px-4">Batal</button>
              <button type="button" @click.prevent="updateMassal()" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm py-2 px-4">Proses</button>
            </div>
          </div>
        </div>
        <form v-else @submit.prevent="updateMassal(true)" class="w-full">
          <div class="modal-body bg-white">
            <div class="w-full mb-3">
              <label class="block tracking-wide text-gray-900 text-xs font-bold mb-1">Outlet</label>
              <input v-model="massal.outlet" type="text" placeholder="Outlet (Opsional)" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            </div>
            <div class="w-full mb-3">
              <label class="block tracking-wide text-gray-900 text-xs font-bold mb-1">Item</label>
              <input v-model="massal.item" type="text" placeholder="Item (Opsional)" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
            </div>
            <div class="w-full mb-3">
              <label class="block tracking-wide text-gray-900 text-xs font-bold mb-1">Channel</label>
              <div class="inline-block relative w-full">
                <select v-model="massal.channel" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option value="">Pilih Channel (opsional)</option>
                  <option v-for="channel in channels" :value="channel.key">{{channel.text}}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div class="w-full mb-3">
              <label class="block tracking-wide text-gray-900 text-xs font-bold mb-1">Alasan</label>
              <div class="inline-block relative w-full">
                <select required @change.prevent="checkMassalReason" v-model="massal.reason_index" class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option value="">Pilih Alasan</option>
                  <option v-for="(reason, ridx) in reasons" :value="ridx">{{reason.text}}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div class="w-full mb-3">
              <label class="block tracking-wide text-gray-900 text-xs font-bold mb-1">Keterangan</label>
              <textarea v-model="massal.remarks" placeholder="Masukkan Catatan" :required="massal.reason_need_remarks" class="min-h-150 appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"></textarea>
            </div>
          </div>
          <div class="modal-footer bg-light">
            <div class="flex justify-between w-full">
              <button @click.prevent="openMassal = false" type="button" class="focus:outline-none text-gray bg-gray-200 hover:bg-gray-300 rounded-lg text-sm py-2 px-4">Batal</button>
              <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm py-2 px-4">Lanjutkan</button>
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
      async handleUpdateItem(source, index, is_required = false){
        var this_data = this.activities[index];
        var currentAction = this_data[`process_${source}`];
        //if(currentAction === 1) return false;
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
            this.handleAlertCustom(resData, false, false);
            return this.callbackFailUpdateItem(source, index);
          }
        }).catch( error => {
          this.handleAlertCustom(error, false, false, 'error');
          return this.callbackFailUpdateItem(source, index);
        });
      },
      async callbackFailUpdateItem(source, index){
        this.activities[index][`process_${source}`] = 2;
        this.activities[index][source] = this.activities[index][`${source}_before`];
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
