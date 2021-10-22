<template>
    <div>
         <!-- go -->
         <div class="bg-white flex gap-4 p-6 rounded-fd">
            <div>
              <span>{{title}}</span>
              <div>
              <span class="block font-bold text-xl">{{stats.total}} Pesanan</span> <span class="text-xs">({{stats.COMPLETED}} Completed, {{stats.CANCELLED}} Cancelled) </span>
              </div>
            </div>
          </div>
          <!-- end go -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true
        }
    },
    props: {
        stats: Object,
        title: String
    },
    mounted () {
    }
}
</script>