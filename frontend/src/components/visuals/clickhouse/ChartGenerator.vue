<template>
    <div class="chartgenerator">
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            {{ error }}
        </base-dialog>
        <section class="charts">
            <base-card class="left">
                <BarChart :labels="labels" :datasets="datasets" :height="300" />
            </base-card>
            <base-card class="right">
                <PieChart :labels="labels" :datasets="datasets" :height="300" />
            </base-card>
            <div class="spinner">
                <base-spinner v-if="isLoading"></base-spinner>
            </div>
        </section>
    </div>
</template>

<script>
import { ref, watch, toRefs } from "vue"
import BarChart from "../../charts/BarChart.vue"
import PieChart from "../../charts/PieChart.vue"
import { getChartData } from "./queryManager.js"

export default {
    components: {
        BarChart,
        PieChart
    },
    props: {
        filter: {
            type: Object,
            default: () => {}
        },
    },
    setup(props) {
        const error = ref(null)
        const isLoading = ref(false)
        const datasets = ref([])
        const { filter } = toRefs(props)

        async function getData() {
            isLoading.value = true
            try {
                const response = await getChartData(filter.value)

                datasets.value = [
                    {
                        label: "Login count per month",
                        data: response.data.data.map((item) => +item["1"])
                    }
                ]
            } catch(err) {
                error.value = err
            }

            isLoading.value = false
        }

        getData()

        function handleError() {
            error.value = null
        }

        const labels = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

        watch(filter, function() {
            getData()
        })
        
        return {
            isLoading,
            error,
            handleError,
            labels,
            datasets
        }
    }
}
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";

.chartgenerator {
    .charts {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        .left {
            flex: 1;
            min-width: 200px;
        }

        .right {
            flex: 1;
            min-width: 200px;
        }

        .spinner {
            @include absolute-center;
        }
    }

    @media (max-width: 768px) {
        .charts {
            display: block;
            padding-bottom: 1rem;

            .left {
                padding-bottom: 1rem;
            }

            .right {
                padding-bottom: 1rem;
            }
        }
    }
}
</style>