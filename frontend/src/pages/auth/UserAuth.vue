<template>
    <div class="auth">
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="login">Login</label>
                    <input type="text" id="login" v-model.trim.lazy="login">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim.lazy="password">
                </div>
                <p v-if="!!error">{{ error }}</p>
                <base-button type="submit">Login</base-button>
                <base-spinner class="spinner" v-if="isLoading"></base-spinner>
            </form>
        </base-card>
    </div>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
    setup() {
        const login = ref("")
        const password = ref("")
        const error = ref(null)
        const isLoading = ref(false)
        const store = useStore()
        const router = useRouter()

        async function submitForm() {
            error.value = null
            if(login.value === "" || password.value === "") {
                error.value = "Please enter valid login and password"
                return
            }

            isLoading.value = true

            try {
                await store.dispatch("auth/login", {
                    login: login.value,
                    password: password.value
                })

                router.replace("/home")
            } catch(err) {
                error.value = err.message
            }

            isLoading.value = false
        }

        return {
            login,
            password,
            error,
            isLoading,
            submitForm
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.auth {
    margin: 1rem;

    form {
        margin: 1rem;
        padding: 1rem;
        position: relative;

        .spinner {
            @include absolute-center;
            z-index: 10;
        }
    }

    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
    }

    input:focus,
    textarea:focus {
        border-color: #333;
        background-color: #faf6ff;
        outline: none;
    }

    p {
        color: red;
        padding: 10px 0px;
    }
}
</style>