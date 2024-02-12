export function getCostumProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

export function setCostumProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
}

export function incrementCostumProperty(elem, prop, inc) {
    setCostumProperty(elem, prop, getCostumProperty(elem, prop) + inc)
}