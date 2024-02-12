import { setupGround, updateGround } from './ground.js'
import { setupDino, updateDino, getDinoRect, setDinoLose } from './dino.js'
import { setupCactus, updateCactus, getCactusRects } from './cactus.js'

// ratio of world
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElen = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})

setupGround()

function setPixelToWorldScale() {
    let worldToPixelScale 
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH/WORLD_HEIGHT){
      worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
      worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElen.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElen.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

let lastTime
let speedScale
let Score
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const  dinoRect = getDinoRect()
   return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return (rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top)
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  Score += delta * .01
  scoreElem.textContent = Math.floor(Score)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  Score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true})
    startScreenElem.classList.remove("hide")
  },100)
}