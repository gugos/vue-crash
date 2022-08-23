<template>
    <div class="context-menu" :style="style" v-if="show">
        <ul v-for="item, index in data" :key="index">
            <li @click="action(item.action)">{{ item.title }}</li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from "vue"

export default {
    props: {
        data: {
            type: Object,
            required: true,
        }
    },
    setup() {
        const show = ref(false)
        const left = ref(0)
        const top = ref(0)
        const attr = ref(null)

        function action(callback) {
            left.value = 0
            top.value = 0
            show.value = false
            attr.value ? callback(attr.value) : callback()
        }

        function open(event, attrValue=null) {
            left.value = event.clientX
            top.value = event.clientY
            attr.value = attrValue
            show.value = true
        }

        function close() {
            left.value = 0
            top.value = 0
            show.value = false
        }

        const style = computed(function() {
            return {
                left: left.value + "px",
                top: top.value + "px"
            }
        })

        return {
            show,
            action,
            close,
            open,
            style
        }
    }
};
</script>

<style lang="scss">
.context-menu {
	position: fixed;
	background-color: #f2f2f2;
	font-size: 12px;
	min-width: 150px;
	border: 1px solid #ccc;
	z-index: 999;

    ul {
        list-style-type: none;
        padding: 0px;
        cursor: default;

        li {
            padding: 4px 16px;
        }

        li:hover {
            background-color: #003561;
            color: #fefefe;
        }
    }
}
</style>