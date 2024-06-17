/* eslint-env node, es6 */
"use strict";
import {
    placePlatforms,
    newPlatform,
    detectCollision,
    updateScore,
  } from "../Doodle-jump/doodlejump.js";
  import assert from 'assert';
  
  
describe("placePlatforms", () => {
    it("создает 7 платформ", () => {
    placePlatforms();
    assert.equal(platformArray.length, 7);
    });
    
    it("платформы размещаются на разных высотах", () => {
    placePlatforms();
    const platformsY = platformArray.map((platform) => platform.y);
    assert.deepEqual(platformsY, [
    boardHeight - 50,
    boardHeight - 125,
    boardHeight - 200,
    boardHeight - 275,
    boardHeight - 350,
    boardHeight - 425,
    boardHeight - 500,
    ]
    );
    });
    
    it("newPlatform() создает новую платформу", () => {
    newPlatform();
    assert.equal(platformArray.length, platformArray.length + 1);
    });
    
    it("новая платформа создается с начальной координатой y, равной -platformHeight", () => {
    newPlatform();
    const lastPlatform = platformArray[platformArray.length - 1];
    assert.equal(lastPlatform.y, -platformHeight);
    });
    
    it("Новая платформа имеет случайную координату x", () => {
    newPlatform();
    const lastPlatform = platformArray[platformArray.length - 1];
    assert.ok(lastPlatform.x >= 0 && lastPlatform.x <= boardWidth * 3 / 4);
    });
    
    describe("detectCollision", () => {
    it("возвращает true, если объекты пересекаются", () => {
    const a = { x: 0, y: 0, width: 10, height: 10 };
    const b = { x: 5, y: 5, width: 10, height: 10 };
    assert.ok(detectCollision(a, b));
    });
    
    it("возвращает false, если объекты не пересекаются", () => {
      const a = { x: 0, y: 0, width: 10, height: 10 };
      const b = { x: 15, y: 15, width: 10, height: 10 };
      assert.notOk(detectCollision(a, b));
    });
    });
    
    describe("updateScore", () => {
    it("увеличивает maxScore и score, когда velocityY < 0", () => {
    updateScore();
    assert.ok(score > 0);
    assert.ok(maxScore > 0);
    });
    
    it("уменьшает maxScore, когда velocityY >= 0", () => {
      velocityY = 5;
      updateScore();
      assert.ok(maxScore < 50);
    });
    });
    });