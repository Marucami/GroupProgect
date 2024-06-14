export {};
import assert from 'assert';
import { jump, stopGame } from "../T-Rex_game/script.js";

describe("Dino game tests", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="dino"></div>
      <div id="cactus"></div>
      <button id="btn">Start</button>
      <div id="score"></div>
      <div id="latest"></div>
    `;
  });

  it("Dino jumps", () => {
    const dino = document.getElementById("dino");
    jump();
    assert.ok(dino.classList.contains("jump"));
    setTimeout(() => {
      assert.notOk(dino.classList.contains("jump"));
    }, 500);
  });

  it("Game starts and stops", () => {
    const cactus = document.getElementById("cactus");
    const btn = document.getElementById("btn");
    stopGame();
    assert.notOk(cactus.classList.contains("move"));
    assert.equal(btn.innerText, "Stop");
    stopGame();
    assert.ok(cactus.classList.contains("move"));
    assert.equal(btn.innerText, "Start");
  });

  it("Score increments when game is running", () => {
    const score = document.getElementById("score");
    stopGame();
    assert.equal(score.innerHTML, "Счет: 0");
    stopGame();
    assert.equal(score.innerHTML, "Счет: 1");
  });

  it("Game over when dino collides with cactus", () => {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const latestScore = document.getElementById("latest");
    dino.style.top = "241px";
    cactus.style.left = "49px";
    const spy = jest.spyOn(window, "alert");
    stopGame();
    assert.equal(spy.mock.calls.length, 1);
    assert.equal(spy.mock.calls[0][0], "Потрачено");
    assert.equal(latestScore.innerHTML, "0");
  });
});