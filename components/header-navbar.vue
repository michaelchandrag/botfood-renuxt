<template>
    <div class="bg-white -mx-10 px-7 -mt-10 py-6 mb-7">
        <div class="flex justify-end">
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="relative inline-block text-left">

                <div>
                    <button @click.prevent="btn = !btn" type="button"
                        class="inline-flex justify-center w-full rounded-md px-4 bg-white text-sm font-medium text-gray-700"
                        id="menu-button" aria-expanded="true" aria-haspopup="true">

                        <div v-if="this.$store.state.user.user.is_master == true">{{ this.$store.state.user.user.name }}
                        </div>
                        <div v-if="this.$store.state.user.user.is_master == false">
                            {{this.$store.state.user.user.user.name}}</div>
                        <!-- Heroicon name: solid/chevron-down -->
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div v-show="btn"
                    class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a href="/logout" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            id="menu-item-0">Sign Out</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            btn: false
        }
    },
    mounted(){
        console.log(this.$store.state.user.user)
    }

}
</script>