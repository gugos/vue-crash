import { interpolateInferno } from "d3-scale-chromatic"

const colorRangeInfo = {
    colorStart: 0,
    colorEnd: 1,
    useEndAsStart: true,
}

function calculatePoint(i, intervalSize, colorRangeInfo) {
    const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo
    return (useEndAsStart
        ? (colorEnd - (i * intervalSize))
        : (colorStart + (i * intervalSize)))
}

export function uniqueColorList(dataLength) {
    if(dataLength <= 0) {
        return ["#000000"]
    }

    const { colorStart, colorEnd } = colorRangeInfo
    const colorRange = colorEnd - colorStart
    const intervalSize = colorRange / dataLength
    const colorArray = []

    if(dataLength === 1) {
        colorArray.push("#781c6d")
    } else {
        for(let i = 0; i < dataLength; i++) {
            const colorPoint = calculatePoint(i, intervalSize, colorRangeInfo)
            colorArray.push(interpolateInferno(colorPoint))
        }
    }

    return colorArray;
}