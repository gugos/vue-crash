<template>
    <base-container class="d3test">
        <h1>Decision Tree</h1>
        <base-dialog :show="show" title="Rename node" @close="handleClose">
            <template #default>
                <label for="node-name">Node name</label>
                <input type="text" id="node-name" v-model.trim.lazy="currentNodeText">
            </template>
            <template #actions>
                <base-button @click="handleClose">Cancel</base-button>
                <base-button @click="updateNodeName">Save</base-button>
            </template>
        </base-dialog>
        <base-context-menu class="context-menu" ref="menu" :data="menuData"></base-context-menu>
        <div class="svg-container"></div>
        <base-card>
            <p>Explore: {{ exploreNode }}</p>
            <section v-if="!!exploreNode">
                Here goes {{ exploreNode }} some info...
            </section>
        </base-card>
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

        const menu = ref(null)
        const show = ref(false)
        const currentNodeText = ref("")
        const currentNode = ref("")

        const exploreNode = ref("")

        const menuData = [
            {
                title: "Explore",
                action: function(d) {
                    exploreNode.value = d3.select(`#text_${d.data.name}`).text()
                }
            },
            {
                title: "Rename",
                action: function(d) {
                    show.value = true
                    currentNode.value = d.data.name
                    currentNodeText.value = d3.select(`#text_${currentNode.value}`).text()
                }
            }
        ]

        function createSvg() {
            const svg = d3.select(".svg-container")
                .append("svg")
                .on("click", function() {
                    menu.value.close()
                })
                .attr("width", width)
                .attr("height", height)
                // .attr("viewBox", [0, 0, width, height])
            
            const g = svg.selectAll("g")
                .data(h.value.descendants())
                .enter()
                .append("g")
                .on("mouseover", enableHighlight)
                .on("mouseout", disableHighlight)
                .on("contextmenu", showContextMenu)
                .call(d3.drag().on("drag", dragged))
                .attr("id", d => `group_${d.data.name}`)
            
            g.append("text")
                .attr("id", d => `text_${d.data.name}`)
                .attr("x", d => d.x + textPaddingLeft)
                .attr("y", d => d.y + textPaddingTop)
                .text(d => d.data.name)

            g.append("rect")
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
            
            svg.selectAll("text").raise()

            svg.call(d3.zoom()
                .extent([[0, 0], [width, height]])
                .scaleExtent([1, 8])
                .on("zoom", zoomed))
        }

        onMounted(function() {
            const hierarchy = d3.hierarchy(decisionTreeData)
            height = hierarchy.height * 100
            const cluster = d3.cluster().size([width, height])
            height += 50
            h.value = cluster(hierarchy)
            createSvg()
        })

        function dragged(event, d) {
            const currentRect = d3.select(`#rect_${event.subject.data.name}`)
            currentRect
                .attr("x", d.x = event.x)
                .attr("y", d.y = event.y)

            if(event.subject.data.parent) {
                const sourceRect = d3.select(`#rect_${event.subject.data.parent}`).node().getBBox()
                const targetRect = currentRect.node().getBBox()
                targetRect.x = d.x
                targetRect.y = d.y
                d3.select(`#path_${event.subject.data.name}`)
                    .attr("d", function() {
                        const points = getLinkCoordinates(sourceRect, targetRect).map(point => {
                            return [point.x, point.y]
                        })

                        return d3.line()(points)
                    })
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
                })
            }

            d3.select(this).raise()
            const currentText = d3.select(`#text_${event.subject.data.name}`).text()

            d3.select(`#text_${event.subject.data.name}`)
                .attr("x", event.x + textPaddingLeft)
                .attr("y", event.y + textPaddingTop)
                .text(currentText)
                .raise()
        }

        function enableHighlight(event) {
            const nodeName = getNodeNameFromId(event.target.id)
            d3.select(`#rect_${nodeName}`).style("fill", "orange")
            d3.select(`#path_${nodeName}`).raise()
            
            h.value.each(node => {
                if(node.data.name === nodeName) {
                    if(node.data.children) {
                        node.data.children.forEach(child => {
                            d3.select(`#path_${child.name}`)
                                .style("stroke", "orange")
                                .raise()
                        })
                    }

                    d3.select(`#group_${nodeName}`).raise()
                }
            })
        }

        function disableHighlight(event) {
            const nodeName = getNodeNameFromId(event.target.id)
            d3.select(`#rect_${nodeName}`)
                .style("fill", "white")
            
            h.value.each(node => {
                if(node.data.name === nodeName && node.data.children) {
                    node.data.children.forEach(child => 
                        d3.select(`#path_${child.name}`)
                            .style("stroke", "mediumseagreen")
                    )
                }
            })
        }

        function getNodeNameFromId(id) {
            const nodeName = id.split("_")[1]
            return nodeName
        }

        function zoomed({transform}) {
            d3.select(this).attr("transform", transform)
        }

        function showContextMenu(event, d) {
            event.preventDefault()
            menu.value.open(event, d)
        }

        function handleClose() {
            show.value = false
        }

        function updateNodeName() {
            if(currentNodeText.value.length === 0) {
                return
            }

            const text = d3.select(`#text_${currentNode.value}`)
                .text(currentNodeText.value)
            const textBox = text.node().getBBox()

            const rect = d3.select(`#rect_${currentNode.value}`)
            rect.attr("width", textBox.width + textPaddingLeft * 2)
                .attr("height", textBox.height + textPaddingLeft * 2)

            h.value.each(node => {
                if(node.data.name === currentNode.value) {
                    if(node.data.children) {
                        node.data.children.forEach(child => {
                            const sourceRect = rect.node().getBBox()
                            const targetRect = d3.select(`#rect_${child.name}`).node().getBBox()
                            d3.select(`#path_${child.name}`)
                                .attr("d", function() {
                                    const points = getLinkCoordinates(sourceRect, targetRect).map(point => {
                                        return [point.x, point.y]
                                    })

                                    return d3.line()(points)
                                })
                        })
                    }

                    if(node.data.parent) {
                        const sourceRect = d3.select(`#rect_${node.data.parent}`).node().getBBox()
                        const targetRect = rect.node().getBBox()
                        d3.select(`#path_${currentNode.value}`)
                            .attr("d", function() {
                                const points = getLinkCoordinates(sourceRect, targetRect).map(point => {
                                    return [point.x, point.y]
                                })

                                return d3.line()(points)
                            })
                    }
                }
            })
            
            currentNodeText.value = ""
            currentNode.value = ""
            show.value = false
        }

        return {
            menu,
            menuData,
            show,
            handleClose,
            currentNodeText,
            updateNodeName,
            exploreNode
        }
    }
}
</script>

<style lang="scss">
section {
    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }

    input {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
    }

    input:focus {
        border-color: #333;
        background-color: #faf6ff;
        outline: none;
    }
}

.d3test {
    h1 {
        padding-bottom: 20px;
        text-align: center;
    }

    .svg-container {
        width: 100%;
        overflow: scroll;
        text-align: center;
        position: relative;

        .context-menu {
            position: absolute;
        }

        svg {
            padding: 10px;
            background: #ccc;
            background-image: radial-gradient(black 1px, transparent 0);
            background-size: 5px 5px;
            background-position: -19px -19px;
        }

        text {
            stroke: #333;
            cursor: default;
        }

        rect {
            stroke: #333;
            stroke-width: 2px;
            fill: white;
        }

        path {
            stroke: mediumseagreen;
            stroke-width: 2px;
            fill: none;
        }
    }
}
</style>