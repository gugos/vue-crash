/**
    TODO
    Refactor
 */
export function getLinkCoordinates(parentNode, childNode, padding = 20) {
    const linkDirection = getLinkDirection(parentNode, childNode)
    
    let coordinates = []

    switch(linkDirection) {
        case Direction.TOP_TO_RIGHT_BOTTOM:
            if(isClose(parentNode, childNode, padding) || 
            childNode.y - (parentNode.y + parentNode.height) < padding * 3) {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                if(parentNode.y + parentNode.height > childNode.y + childNode.height) {
                    coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                } else {
                    coordinates.push({ x: parentNode.x, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                }
            } else {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                coordinates.push({ x: childNode.x, y: parentNode.y + padding })
                coordinates.push({ x: childNode.x, y: childNode.y })
            }
        break
        case Direction.BOTTOM_TO_RIGHT_TOP:
        case Direction.LEFT_TO_RIGHT:
            if(isClose(parentNode, childNode, padding)) {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                if(parentNode.y + parentNode.height > childNode.y + childNode.height) {
                    coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                } else {
                    coordinates.push({ x: parentNode.x, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x + childNode.width / 2 + padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                }
            } else {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                coordinates.push({ x: parentNode.x + parentNode.width / 2 + padding, y: parentNode.y + padding })
                coordinates.push({ x: parentNode.x + parentNode.width / 2 + padding, y: childNode.y - padding })
                coordinates.push({ x: childNode.x, y: childNode.y - padding })
                coordinates.push({ x: childNode.x, y: childNode.y })
            }
        break
        case Direction.BOTTOM_TO_LEFT_TOP:
        case Direction.RIGHT_TO_LEFT:
            if(isClose(parentNode, childNode, padding)) {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                if(parentNode.y + parentNode.height > childNode.y + childNode.height) {
                    coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                } else {
                    coordinates.push({ x: parentNode.x, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                }
            } else {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                coordinates.push({ x: parentNode.x - parentNode.width / 2 - padding, y: parentNode.y + padding })
                coordinates.push({ x: parentNode.x - parentNode.width / 2 - padding, y: childNode.y - padding })
                coordinates.push({ x: childNode.x, y: childNode.y - padding })
                coordinates.push({ x: childNode.x, y: childNode.y })
            }
        break
        case Direction.TOP_TO_LEFT_BOTTOM:
            if(isClose(parentNode, childNode, padding) || 
            childNode.y - (parentNode.y + parentNode.height) < padding * 3) {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                if(parentNode.y + parentNode.height > childNode.y + childNode.height) {
                    coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: parentNode.y + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                } else {
                    coordinates.push({ x: parentNode.x, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: childNode.y + childNode.height + padding })
                    coordinates.push({ x: childNode.x - childNode.width / 2 - padding, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y - padding })
                    coordinates.push({ x: childNode.x, y: childNode.y })
                }
            } else {
                shiftCoordinates(parentNode, childNode)
                coordinates.push({ x: parentNode.x, y: parentNode.y })
                coordinates.push({ x: parentNode.x, y: parentNode.y + padding })
                coordinates.push({ x: childNode.x, y: parentNode.y + padding })
                coordinates.push({ x: childNode.x, y: childNode.y })
            }
        break
        case Direction.TOP_TO_BOTTOM:
        case Direction.BOTTOM_TO_TOP:
            shiftCoordinates(parentNode, childNode)
            coordinates.push({ x: parentNode.x, y: parentNode.y })
            coordinates.push({ x: childNode.x, y: childNode.y })
        break
    }

    return coordinates
}

const Direction = {
    TOP_TO_RIGHT_BOTTOM: 0,
    BOTTOM_TO_RIGHT_TOP: 1,
    BOTTOM_TO_LEFT_TOP: 2,
    TOP_TO_LEFT_BOTTOM: 3,
    TOP_TO_BOTTOM: 4,
    BOTTOM_TO_TOP: 5,
    LEFT_TO_RIGHT: 6,
    RIGHT_TO_LEFT: 7,
    SAME_POS: 8
}

function getLinkDirection(parentNode, childNode) {
    let linkDirection = Direction.SAME_POS
    if(nodeXCenter(parentNode) < nodeXCenter(childNode) && parentNode.y < childNode.y) {
        linkDirection = Direction.TOP_TO_RIGHT_BOTTOM
    } else
    if(nodeXCenter(parentNode) < nodeXCenter(childNode) && parentNode.y > childNode.y) {
        linkDirection = Direction.BOTTOM_TO_RIGHT_TOP
    } else
    if(nodeXCenter(parentNode) > nodeXCenter(childNode) && parentNode.y > childNode.y) {
        linkDirection = Direction.BOTTOM_TO_LEFT_TOP
    } else
    if(nodeXCenter(parentNode) > nodeXCenter(childNode) && parentNode.y < childNode.y) {
        linkDirection = Direction.TOP_TO_LEFT_BOTTOM
    } else
    if(nodeXCenter(parentNode) === nodeXCenter(childNode) && parentNode.y < childNode.y) {
        linkDirection = Direction.TOP_TO_BOTTOM
    } else
    if(nodeXCenter(parentNode) === nodeXCenter(childNode) && parentNode.y > childNode.y) {
        linkDirection = Direction.BOTTOM_TO_TOP
    } else
    if(nodeXCenter(parentNode) < nodeXCenter(childNode) && parentNode.y === childNode.y) {
        linkDirection = Direction.LEFT_TO_RIGHT
    } else
    if(nodeXCenter(parentNode) > nodeXCenter(childNode) && parentNode.y === childNode.y) {
        linkDirection = Direction.RIGHT_TO_LEFT
    }

    return linkDirection
}

function nodeXCenter(node) {
    return node.x + node.width / 2
}

function shiftCoordinates(parentNode, childNode) {
    parentNode.y += parentNode.height
    parentNode.x += parentNode.width / 2
    childNode.x += childNode.width / 2
}

function isClose(parentNode, childNode, padding) {
    const parentX = parentNode.x - padding
    const parentY = parentNode.y - padding
    const childX = childNode.x - padding
    const childY = childNode.y - padding
	const parentLeft = parentX
	const parentRight = parentX + parentNode.width + padding
	const parentTop = parentY
	const parentBottom = parentY + parentNode.height + padding

    const childLeft = childX
	const childRight = childX + childNode.width + padding
	const childTop = childY
	const childBottom = childY + childNode.height + padding
    
    const horizontalDistance = parentLeft < childRight && parentRight > childLeft
    const verticalDistance = parentTop < childBottom && parentBottom > childTop
    
    return horizontalDistance && verticalDistance
}