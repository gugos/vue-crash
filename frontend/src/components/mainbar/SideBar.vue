<template>
    <div :class="isActive ? 'sidebar active' : 'sidebar'">
        <ul>
            <li :class="activeRoute === 'home' ? 'active' : ''">
                <router-link to="/home">
                    <font-awesome-icon class="icon" icon="house" />
                    <span>Home</span>
                </router-link>
            </li>
            <li :class="activeRoute === 'settings' ? 'active' : ''">
                <router-link to="/settings">
                    <font-awesome-icon class="icon" icon="gear" />
                    <span>Settings</span>
                </router-link>
            </li>
            <li :class="activeRoute === 'about' ? 'active' : ''">
                <router-link to="/about">
                    <font-awesome-icon class="icon" icon="circle-info" />
                    <span>About</span>
                </router-link>
            </li>
            <li>
                <div class="logout" @click="logout">
                    <font-awesome-icon class="icon" icon="person-running" />
                    <span>Logout</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"

export default {
    setup() {
        const store = useStore()
        const isActive = computed(function() {
            return store.getters["mainbar/getSidebarStatus"]
        })

        const route = useRoute()
        const activeRoute = computed(function() {
            switch(route.path) {
                case "/home": return "home"
                case "/settings": return "settings"
                case "/about": return "about"
                default: return ""
            }
        })

        function logout() {
            store.dispatch("auth/logout")
        }

        return {
            isActive,
            activeRoute,
            logout
        }
    }
}
</script>

<style lang="scss">
.sidebar {
    width: 250px;
    background-color: #333;
    color: white;
    height: 100vh;
    position: fixed;
    z-index: 999;
    top: 50px;
    left: -100%;
    transition: 500ms;

    &.active {
        left: 0;
        transition: 350ms;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            color: white;
            cursor: pointer;

            &:hover {
                background-color: dimgray;
            }

            &.active {
                background-color: dimgray;
            }
            
            .icon {
                margin-right: 10px;
            }

            a {
                display: block;
                text-decoration: none;
                padding: 10px 20px;
                color: white;
            }

            .logout {
                display: block;
                padding: 10px 20px;
            }
        }
    }
}
</style>