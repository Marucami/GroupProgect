import {
  placePlatforms,
  newPlatform,
  detectCollision,
  updateScore,
} from "../Doodle-jump/doodlejump.js";
import { describe, it, expect,  } from 'jest';



let platformArray = [];
let boardHeight = 576;
let score = 0;
let maxScore = 0;
let velocityY = 0;
let platformHeight = 18;

describe("placePlatforms", () => {
  it("создаёт 7 платформ", () => {
    placePlatforms();
    expect(platformArray.length).toBe(7);
  });

  it("располагает платформиы на разных координатах 'X'", () => {
    placePlatforms();
    const platformXCoordinates = platformArray.map((platform) => platform.x);
    expect(platformXCoordinates).toEqual(expect.arrayContaining([
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
    ]));
  });

  it("располагает платформиы на разных координатах 'Y'", () => {
    placePlatforms();
    const platformYCoordinates = platformArray.map((platform) => platform.y);
    expect(platformYCoordinates).toEqual(expect.arrayContaining([
      boardHeight - 50,
      boardHeight - 125,
      boardHeight - 200,
      boardHeight - 275,
      boardHeight - 350,
      boardHeight - 425,
      boardHeight - 500,
    ]));
  });
});  
  
  describe("newPlatform", () => {
    it("создаёт платформу на случайной координате 'X'", () => {
      newPlatform();
      expect(platformArray.length).toBe(1);
      expect(platformArray[0].x).toEqual(expect.any(Number));
    });
  
    it("размещает новую платформу в верху экрана", () => {
      newPlatform();
      expect(platformArray[0].y).toBe(-platformHeight);
    });
  });    
  
  describe("detectCollision", () => {
  it("возвращает true, если объекты пересекаются", () => {
  const a = { x: 0, y: 0, width: 10, height: 10 };
  const b = { x: 5, y: 5, width: 10, height: 10 };
  expect(detectCollision(a, b)).toBe(true);
  });
  
  it("возвращает false, если объекты не пересекаются", () => {
    const a = { x: 0, y: 0, width: 10, height: 10 };
    const b = { x: 15, y: 15, width: 10, height: 10 };
    expect(detectCollision(a, b)).toBe(false);
  });
  });
  
  describe("updateScore", () => {
    it("увеличивает очки, когда doodler летит вверх", () => {
      score = 0;
      maxScore = 0;
      velocityY = -5;
      updateScore();
      expect(score).toBeGreaterThan(0);
    });
  
    it("увеличивает maxScore, когда doodler летит вверх", () => {
      score = 0;
      maxScore = 0;
      velocityY = -5;
      updateScore();
      expect(maxScore).toBeGreaterThan(0);
    });
  
    it("количество очков не увеличивается, когда doodler падает", () => {
      score = 0;
      velocityY = 5;
      updateScore();
      expect(score).toBe(0);
    });
  });