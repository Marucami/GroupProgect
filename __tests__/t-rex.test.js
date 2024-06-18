import assert from 'assert';
import { jest } from '@jest/globals';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

let window;
let document;
let btn;


const htmlPath = path.resolve(new URL('../T-Rex_game/index.html', import.meta.url).pathname);
const jsPath = path.resolve(new URL('../T-Rex_game/script.js', import.meta.url).pathname);
const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

beforeEach(() => {
  const { window: virtualWindow } = new JSDOM(html, { runScripts: 'dangerously' });
  window = virtualWindow;
  document = window.document;
  const script = document.createElement('script');
  script.textContent = js;
  document.body.appendChild(script);
  btn = document.getElementById('btn');
});

describe("Dino game tests", () => {
  it("Dino jumps", (done) => {
    const dino = document.getElementById("dino");
    window.jump();
    assert.ok(dino.classList.contains("jump"));
    setTimeout(() => {
      assert.ok(!dino.classList.contains("jump"));
      done();
    }, 600); 
  });

  it("Game starts and stops", () => {
    const cactus = document.getElementById("cactus");
    window.stopGame();
    assert.ok(!cactus.classList.contains("move"));
    assert.equal(btn.innerText, "Start");
    window.stopGame();
    assert.ok(cactus.classList.contains("move"));
    assert.equal(btn.innerText, "Stop");
  });

  it("Score increments when game is running", (done) => {
    const score = document.getElementById("score");
    window.stopGame(); 
    setTimeout(() => {
      assert.equal(score.innerHTML, "Счет: 0");
      done();
    }, 1100); 
  });

  it("Game over when dino collides with cactus", () => {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");
    const latestScore = document.getElementById("latest");
    dino.style.top = "241px";
    cactus.style.left = "49px";
    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    let isAlive = setInterval(() => {
      clearInterval(isAlive);
      window.stopGame();
      assert.equal(spy.mock.calls.length, 1);
      assert.equal(spy.mock.calls[0][0], "Потрачено");
      assert.equal(latestScore.innerHTML, "0");
      spy.mockRestore();
    }, 10);
  });
});
