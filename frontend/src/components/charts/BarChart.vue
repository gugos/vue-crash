<template>
    <Bar
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
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

import { uniqueColorList } from "../../utils/uniqueColorList.js"

export default {
    name: "BarChart",
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: "bar-chart"
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
                datasets: this.datasets.map((item) => {
                    return { backgroundColor: uniqueColorList(this.datasets.length), data: item.data, label: item.label }
                })
                
            }
        }
    }
}
</script>
