const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const btn = document.getElementById("btn");
const score = document.getElementById("score");
const latestScore = document.getElementById("latest");
let counter = 0;

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 0 || event.keyCode === 32) {
        jump();
    }
});

function jump () {
    if (dino.classList != "jump") {
        dino.classList.add("jump");
    }
    setTimeout(function() {
        dino.classList.remove("jump");
    }, 500);
}

let isAlive = setInterval(function() {
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
}, 10);

btn.addEventListener("click", function(event) {
    stopGame();
});

btn.addEventListener("keydown", function(event) {
    event.preventDefault();
});

function stopGame() {
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
