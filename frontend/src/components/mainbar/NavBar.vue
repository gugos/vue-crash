<template>
    <div class="navbar">
        <div class="logo">GGDEV</div>
        <div class="icon" @click="toggleActive">
            <font-awesome-icon v-if="isActive" icon="angle-left" />
            <font-awesome-icon v-else icon="angle-right" />
        </div>
    </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"

export default {
    setup() {
        const store = useStore()
        const isActive = computed(function() {
            return store.getters["mainbar/getSidebarStatus"]
        })

        function toggleActive() {
            store.dispatch("mainbar/toggleSidebar")
        }

        return {
            isActive,
            toggleActive
        }
    }
}
</script>

<style lang="scss">
.navbar {
    display: flex;
    height: 50px;
    background-color: #333;
    color: white;
    align-items: center;
    // padding-left: 10px;
    position: fixed;
    top: 0px;
    z-index: 999;
    width: 100%;

    .logo {
        font-weight: bold;
        margin-right: 10px;
        margin-left: 10px;
    }

    .icon {
        cursor: pointer;
    }
}
</style>