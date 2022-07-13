<template>
    <Pie
        :chart-options="chartOptions"
        :chart-data="getChartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
</template>

<script>
import { Pie } from "vue-chartjs"
import { Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

import { uniqueColorList } from "../../utils/uniqueColorList.js"

export default {
    name: "PieChart",
    components: { Pie },
    props: {
        chartId: {
            type: String,
            default: "pie-chart"
        },
        datasetIdKey: {
            type: String,
            default: "label"
        },
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        cssClasses: {
            default: "",
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Object,
            default: () => {}
        },
        labels: {
            type: Array,
            default: () => []
        },
        datasets: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    computed: {
        getChartData: function() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        backgroundColor: uniqueColorList(this.labels.length),
                        data: this.datasets.length === 0 ? [] : this.datasets[0].data,
                    }
                ]
            }
        }
    }
}
</script>
