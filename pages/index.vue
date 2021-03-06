<template>
    <div>
        {{data}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: ''
        }
    },
    middleware: ['auth-ssr'],
    mounted() {
        this.$axios.get('/api/me').then(r=> {
            this.data = r.data.data
        })
    }
}
</script>