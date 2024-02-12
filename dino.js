import { getCostumProperty, incrementCostumProperty, setCostumProperty } from "./updateCostumProperty.js"

const dinoElem = document.querySelector("[data-dino")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAM_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCostumProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "img-dino/dino-lose.png"
}

function handleRun(delta, speedScale) {
    if (isJumping){
        dinoElem.src = `img-dino/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAM_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = `img-dino/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAM_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return 

    incrementCostumProperty(dinoElem, "--bottom", yVelocity * delta)

    if (getCostumProperty(dinoElem, "--bottom") <= 0){
        setCostumProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}