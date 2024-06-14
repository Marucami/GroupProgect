export const dino = document.getElementById("dino");
export const cactus = document.getElementById("cactus");
export const btn = document.getElementById("btn");
export const score = document.getElementById("score");
export const latestScore = document.getElementById("latest");
let counter = 0;

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 0 || event.keyCode === 32) {
        jump();
    }
})

export function jump () {
    if (dino.classList != "jump") {
        dino.classList.add("jump");
    }
    setTimeout(function() {
        dino.classList.remove("jump");
    }, 500)
}

export let isAlive = setInterval(function() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 240) {
        alert("Потрачено");
        latestScore.innerHTML = Math.floor(counter/10);
        counter = 0;
    } else if (btn.innerText == "Stop") {
        counter++;
        score.innerHTML = `Счет: ${Math.floor(counter/10)}`
    }
}, 10)

btn.addEventListener("click", function(event) {
    stopGame();
})

btn.addEventListener("keydown", function(event) {
    event.preventDefault();
})

export function stopGame() {
    if (cactus.classList == "move") {
        cactus.classList.remove("move");
        btn.innerText = "Start";
        latestScore.innerHTML = Math.floor(counter/10);
        counter = 0;
    } else {
        cactus.classList.add("move");
        btn.innerText = "Stop";
        counter++;
        score.innerHTML = `Счет: ${Math.floor(counter/10)}`
    }
}