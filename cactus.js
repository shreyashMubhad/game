import { getCostumProperty, incrementCostumProperty, setCostumProperty } from "./updateCostumProperty.js"

const SPEED = 0.1
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElen = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus(){
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove() // when we restart the game we dont want the privese game cactuses there
    })
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCostumProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCostumProperty(cactus, "--left") <= -100) { // checking if the cactus is way of the eadge the sreen
        cactus.remove()  //because it is slowing the game
    }
    
  })

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "img-dino/cactus.png"
    cactus.classList.add("cactus")
    setCostumProperty(cactus, "--left", 100) // to keep cactus on right
    worldElen.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}