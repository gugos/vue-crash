<template>
    <div class="chartgenerator">
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            {{ error }}
        </base-dialog>
        <base-card>
            <BarChart :labels="labels" :datasets="datasets" :height="300" />
        </base-card>
        <base-card>
            <PieChart :labels="labels" :datasets="datasets" :height="300" />
        </base-card>
        <div class="spinner">
            <base-spinner v-if="isLoading"></base-spinner>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import { ref } from "vue"
import BarChart from "../../../components/charts/BarChart.vue"
import PieChart from "../../../components/charts/PieChart.vue"

export default {
    components: {
        BarChart,
        PieChart
    },
    setup() {
        const base_url = "https://play.clickhouse.com"
        const default_params = {
            add_http_cors_header: 1,
            user: "play",
            password: "",
            default_format: "JSONCompact",
            max_result_rows: 1000,
            max_result_bytes: 10000000,
            result_overflow_mode: "break"
        }

        const error = ref(null)
        const isLoading = ref(false)
        const datasets = ref([])

        async function getData() {
            isLoading.value = true
            try {
                const response = await axios.get(base_url, {
                    params: {
                        ...default_params,
                        query: 
                        `select m, sum(cnt) from (
                            select toMonth(file_time) as m, count(toMonth(file_time)) as cnt
                            from default.github_events
                            where file_time between toDateTime('2021-01-01 00:00:00') and toDateTime('2021-12-31 00:00:00') group by file_time
                        ) as t group by m order by m`
                    }
                })

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
    position: relative;

    .spinner {
        @include absolute-center;
    }
}
</style>