<template>
  <div v-if="readyPaging" class="mt-3">
    <nav v-if="linkPagination && linkPagination.length" aria-label="Page navigation">
      <ul class="inline-flex flex-wrap -space-x-px text-sm justify-center w-full">
        <li v-if="prevPage">
          <a @click.prevent="isHandle(1)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">First</a>
        </li>
        <li v-if="prevPage">
          <a @click.prevent="isHandle(prevPage)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</a>
        </li>
        <li v-if="linkPaginationBef && linkPaginationBef.length" v-for="linkPgBef in linkPaginationBef" :key="linkPgBef">
          <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{linkPgBef}}</a>
        </li>
        <li v-if="linkPaginationBef && linkPaginationBef.length"><span class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</span></li>
        <li v-for="linkPg in linkPagination" :key="linkPg" :class="[linkPg==isPage ? 'text-blue-500 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700' : 'text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700']">
          <a class="flex items-center justify-center px-3 h-8 leading-tight bg-white border dark:hover:text-white" @click.prevent="isHandle(linkPg)" href="javascript:void(0)">{{linkPg}}</a>
        </li>
        <li v-if="nextPage" class="page-item"><a @click.prevent="isHandle(nextPage)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="javascript:void(0)">Next</a></li>
        <li v-if="nextPage" class="page-item"><a @click.prevent="isHandle(countPage)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="javascript:void(0)">Last</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup(props){
      let dataPaging = props.isPaging, linkPagination = ref([]), linkPaginationBef = ref([]);
      let perPage = dataPaging.perPage, totalData = dataPaging.totalData, isPage = dataPaging.isPage;
      let countPage = Math.ceil(parseInt(totalData)/parseInt(perPage)), maxViewPage = 20;
      let readyPaging = (countPage>1)?true:false , prevPage = (isPage>1) ? parseInt(isPage)-1 : false, nextPage = (isPage<countPage) ? parseInt(isPage)+1 : false;

      let pg = (isPage>maxViewPage) ? isPage : 1, nPg = 0, isLinkPaging = [], isLinkPagingBef = [];
      for(var cpg = pg; cpg<=countPage; cpg++){
        isLinkPaging.push(cpg);
        if(nPg==10){ break; }
        nPg++;
      }
      linkPagination.value = isLinkPaging;

      if(pg>maxViewPage){
        let forBpg = (nPg<3) ? 10 : 5, forBpg2 = (nPg<3) ? 5 : 3;
        for(var bpg = pg-forBpg; bpg<pg-forBpg2; bpg++){ isLinkPagingBef.push(bpg); console.log(bpg) }
      }
    linkPaginationBef.value = isLinkPagingBef;
    return {readyPaging, linkPagination, linkPaginationBef, isPage, countPage, prevPage, nextPage}
  },
  props :{
    isType: String, isPaging: Object, isHandle: Function,
  },
}
</script>