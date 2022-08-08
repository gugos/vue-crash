<template>
    <base-container class="d3test">
        <h1>Decision Tree</h1>
        <div class="svg-container"></div>
    </base-container>
</template>

<script>
import { onMounted, ref } from "vue"
import { decisionTreeData } from "../../../../datasets/decisionTreeData.js"
import { getLinkCoordinates } from "../../../utils/getLinkCoordinates.js"
import * as d3 from "d3"

export default {
    setup() {
        const h = ref(null)
        const width = 1024
        let height = 0
        const textPaddingTop = 25
        const textPaddingLeft = 10

        function createSvg() {
            const svg = d3.select(".svg-container")
                .append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${width} ${height + 100}`)
                .attr("class", "svg-content-responsive")
            
            const g = svg.selectAll("g")
                .data(h.value.descendants())
                .enter()
                .append("g")
            
            g.append("text")
                .attr("id", d => `text_${d.data.name}`)
                .attr("x", d => d.x + textPaddingLeft)
                .attr("y", d => d.y + textPaddingTop)
                .attr("stroke", "black")
                .text(d => d.data.name)

            g.append("rect")
                .on("mouseover", enableHighlight)
                .on("mouseout", disableHighlight)
                .call(d3.drag().on("drag", dragged))
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("id", d => `rect_${d.data.name}`)
                .attr("width", function(d) {
                    const text = d3.select(`#text_${d.data.name}`).node().getBBox()
                    return text.width + textPaddingLeft * 2
                })
                .attr("height", function(d) {
                    const text = d3.select(`#text_${d.data.name}`).node().getBBox()
                    return text.height + textPaddingLeft * 2
                })
                .attr("rx", 5)
                .attr("ry", 5)
                .attr("stroke", "black")
                .attr("stroke-width", "2")
                .attr("fill", "white")
                // .attr("class", "node")

            svg.selectAll("path")
                .data(h.value.links())
                .enter()
                .append("path")
                .attr("d", function(d) {
                    const sourceRect = d3.select(`#rect_${d.source.data.name}`).node().getBBox()
                    const targetRect = d3.select(`#rect_${d.target.data.name}`).node().getBBox()
                    const points = getLinkCoordinates(sourceRect, targetRect).map(point => {
                        return [point.x, point.y]
                    })
                    return d3.line()(points)
                })
                .attr("id", d => `path_${d.target.data.name}`)
                .attr("class", "link")
            
            svg.selectAll("g").raise()
            svg.selectAll("text").raise()
        }

        onMounted(function() {
            const hierarchy = d3.hierarchy(decisionTreeData)
            height = hierarchy.height * 100
            const cluster = d3.cluster().size([width, height])
            h.value = cluster(hierarchy)
            createSvg()
        })

        function dragged(event, d) {
            d3.select(this)
                .raise()
                .attr("x", d.x = event.x)
                .attr("y", d.y = event.y)

            if(event.subject.data.parent) {
                const sourceRect = d3.select(`#rect_${event.subject.data.parent}`).node().getBBox()
                const targetRect = d3.select(`#rect_${event.subject.data.name}`).node().getBBox()
                targetRect.x = d.x
                targetRect.y = d.y
                d3.select(`#path_${event.subject.data.name}`)
                    .attr("d", function() {
                        const points = getLinkCoordinates(sourceRect, targetRect).map(point => {
                            return [point.x, point.y]
                        })

                        return d3.line()(points)
                    })
                    .attr("class", "link")
            }

            if(event.subject.children) {
                event.subject.children.forEach(child => {
                    const sourceRect = d3.select(`#rect_${event.subject.data.name}`).node().getBBox()
                    sourceRect.x = d.x
                    sourceRect.y = d.y
                    const targetRect = d3.select(`#rect_${child.data.name}`).node().getBBox()
                    d3.select(`#path_${child.data.name}`)
                        .attr("d", function() {
                            const points = getLinkCoordinates(sourceRect, targetRect).map(point => {
                                return [point.x, point.y]
                            })

                            return d3.line()(points)
                        })
                        .attr("class", "link")
                })
            }

            d3.select(`#text_${event.subject.data.name}`)
                .attr("x", event.x + textPaddingLeft)
                .attr("y", event.y + textPaddingTop)
                .attr("stroke", "black")
                .text(event.subject.data.name)
                .raise()
        }

        function enableHighlight(event) {
            d3.select(this)
                .attr("fill", "orange")
            
            h.value.each(node => {
                if(node.data.name === getNodeNameFromId(event.target.id) && node.data.children) {
                    node.data.children.forEach(child => 
                        d3.select(`#path_${child.name}`)
                            .style("stroke", "orange")
                    )
                }
            })
        }

        function disableHighlight(event) {
            d3.select(this)
                .attr("fill", "white")
            
            h.value.each(node => {
                if(node.data.name === getNodeNameFromId(event.target.id) && node.data.children) {
                    node.data.children.forEach(child => 
                        d3.select(`#path_${child.name}`)
                            .style("stroke", "skyblue")
                    )
                }
            })
        }

        function getNodeNameFromId(id) {
            const nodeName = id.split("_")[1]
            return nodeName
        }
    }
}
</script>

<style lang="scss">
.d3test {
    h1 {
        padding-bottom: 20px;
        text-align: center;
    }

    .svg-container {
        display: inline-block;
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        vertical-align: top;
        overflow: hidden;

        .svg-content-responsive {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
        }

        svg {
            background-color: #ccc;
            border-radius: 5px;
        }

        .text {
            fill: #333
        }

        /**
            TODO
            Disables rect events when applied
        */
        // .node {
        //     stroke: #333;
        //     stroke-width: 2px;
        //     fill: none;
        // }

        .link {
            stroke: skyblue;
            stroke-width: 2px;
            fill: none;
        }
    }
}

</style>