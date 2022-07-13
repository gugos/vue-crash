<template>
    <div>
        <main-bar v-if="isAuthenticated"></main-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import { useStore } from "vuex"
import { computed, watch } from "vue"
import { useRouter } from "vue-router"

export default {
    setup() {
        const store = useStore()
        store.dispatch("auth/tryLogin")

        const isAuthenticated = computed(function() {
            return store.getters["auth/isAuthenticated"]
        })

        const router = useRouter()

        watch(isAuthenticated, function() {
            if(!isAuthenticated.value) {
                router.replace("/auth")
            }
        })

        return {
            isAuthenticated
        }
    }
}
</script>

<style>
* {
    margin: 0;
    font-family: sans-serif;
}
</style>