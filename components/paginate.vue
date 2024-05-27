<template>
  <div v-if="isPaging.ready" class="mt-2 p-3">
    <nav v-if="isPaging.links && isPaging.links.length" aria-label="Page navigation">
      <ul class="inline-flex flex-wrap -space-x-px text-sm justify-center w-full">
        <li v-if="isPaging.prev">
          <a href="#" @click.prevent="isHandle(1)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">First</a>
        </li>
        <li v-if="isPaging.prev">
          <a href="#" @click.prevent="isHandle(isPaging.prev)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</a>
        </li>
        <li v-if="isPaging.link_befs && isPaging.link_befs.length" v-for="linkPgBef in isPaging.link_befs" :key="linkPgBef">
          <a href="#" @click.prevent="isHandle(linkPgBef)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{linkPgBef}}</a>
        </li>
        <li v-if="isPaging.link_befs && isPaging.link_befs.length"><span class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</span></li>
        <li v-for="linkPg in isPaging.links" :key="linkPg" :class="[linkPg==isPaging.page ? 'text-blue-500 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-700 pointer-events-none' : 'text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700']">
          <a class="flex items-center justify-center px-3 h-8 leading-tight bg-white border dark:hover:text-white" @click.prevent="isHandle(linkPg)" href="#">{{linkPg}}</a>
        </li>
        <li v-if="isPaging.next" class="page-item"><a @click.prevent="isHandle(isPaging.next)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">Next</a></li>
        <li v-if="isPaging.next" class="page-item"><a @click.prevent="isHandle(isPaging.count_page)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#">Last</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    props :{
      isPaging: Object, isHandle: Function,
    },
}
</script>