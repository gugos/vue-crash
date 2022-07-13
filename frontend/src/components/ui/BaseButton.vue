<template>
    <div class="button">
        <button v-if="!link" :class="[mode, color]">
            <slot></slot>
        </button>
        <router-link v-else :to="to" :class="[mode, color]">
            <slot></slot>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: "/"
        },
        color: {
            type: String,
            required: false,
            default: null
        }
    }
}
</script>

<style lang="scss">
.button {
    button,
    a {
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        font: inherit;
        background-color: #003561;
        border: 1px solid #003561;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        margin-right: 0.5rem;
        display: inline-block;

        &.success {
            background-color: #006130;
            border: 1px solid #006130;
        }

        &.warning {
            background-color: #998b08;
            border: 1px solid #998b08;
        }

        &.danger {
            background-color: #ec2c1e;
            border: 1px solid #ec2c1e;
        }
    }

    a:hover,
    a:active,
    button:hover,
    button:active {
        background-color: #000444;
        border-color: #000444;

        &.success {
            background-color: #03351c;
            border-color: #03351c;
        }

        &.warning {
            background-color: #423c05;
            border-color: #423c05;
        }

        &.danger {
            background-color: #7a0e06;
            border-color: #7a0e06;
        }
    }

    .flat {
        background-color: transparent;
        color: #003561;
        border: none;

        &.success {
            background-color: transparent;
            color: #006130;
            border: none;
        }

        &.warning {
            background-color: transparent;
            color: #998b08;
            border: none;
        }

        &.danger {
            background-color: transparent;
            color: #ec2c1e;
            border: none;
        }
    }

    .outline {
        background-color: transparent;
        border-color: #000444;
        color: #000444;

        &.success {
            background-color: transparent;
            border-color: #006130;
            color: #006130;
        }

        &.warning {
            background-color: transparent;
            border-color: #998b08;
            color: #998b08;
        }

        &.danger {
            background-color: transparent;
            border-color: #ec2c1e;
            color: #ec2c1e;
        }
    }

    .flat:hover,
    .flat:active,
    .outline:hover,
    .outline:active {
        color: white;
    }
}
</style>