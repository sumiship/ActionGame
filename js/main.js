"use strict";

{
  const canvas = document.querySelector("canvas");
  // if (typeof canvas.getContext === "undefined") {
  //   return;
  // }
  const ctx = canvas.getContext("2d");
  ctx.translate(150, 100);

  class Enemy {
    constructor(x, y, shape, color) {
      this.x = x;
      this.y = y;
      this.shape = shape;
      this.color = color;
    }
    draw() {
      switch (this.color) {
        case "red":
          ctx.fillStyle = "rgb(255,0,0)";
          break;
        case "green":
          ctx.fillStyle = "rgb(0,255,0)";
          break;
        case "blue":
          ctx.fillStyle = "rgb(0,0,255)";
      }
      switch (this.shape) {
        case "circle":
          ctx.beginPath();
          ctx.arc(
            this.x,
            this.y,
            10,
            (0 * Math.PI) / 180,
            (360 * Math.PI) / 180,
            false
          );
          break;
        case "square":
          ctx.beginPath();
          ctx.rect(this.x - 10, this.y - 10, 20, 20);
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - 10);
          ctx.lineTo(this.x - 10, this.y + 10);
          ctx.lineTo(this.x + 10, this.y + 10);
      }
      ctx.fill();
    }
  }

  let enemies = [];

  const addEnemy = () => {
    let lr;
    let height;
    let shape;
    let color;
    let random = Math.floor(Math.random() * 36);
    if (random % 2 == 0) {
      lr = -150;
      random /= 2;
    } else {
      lr = 150;
      random--;
      random /= 2;
    }
    if (random % 2 == 0) {
      height = 50;
    } else {
      height = -20;
      random--;
    }
    if (random < 5) {
      shape = "circle";
    } else if (random < 11) {
      shape = "triangle";
      random -= 6;
    } else {
      shape = "square";
      random -= 12;
    }
    if (random == 0) {
      color = "red";
    } else if (random == 2) {
      color = "blue";
    } else {
      color = "green";
    }
    enemies.push(new Enemy(lr, height, shape, color));
  };

  let attack = { shape: "circle", color: "red", us: "u" };
  document.getElementById("us-u").addEventListener("click", () => {
    attack.us = "u";
  });
  document.getElementById("us-s").addEventListener("click", () => {
    attack.us = "s";
  });
  document.getElementById("color-r").addEventListener("click", () => {
    attack.color = "red";
  });
  document.getElementById("color-g").addEventListener("click", () => {
    attack.color = "green";
  });
  document.getElementById("color-b").addEventListener("click", () => {
    attack.color = "blue";
  });
  document.getElementById("shape-c").addEventListener("click", () => {
    attack.shape = "circle";
  });
  document.getElementById("shape-t").addEventListener("click", () => {
    attack.shape = "triangle";
  });
  document.getElementById("shape-s").addEventListener("click", () => {
    attack.shape = "square";
  });

  {
    let loop = 0;
    let removeId = [];
    const game = () => {
      ctx.clearRect(-150, -100, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(251, 154, 196, 0.3)";
      ctx.fillRect(-20, -100, 40, 200);
      if (loop % 20 == 0) {
        addEnemy();
      }
      enemies.forEach(function (enemy, index) {
        enemy.draw();
        if (enemy.x < 0) {
          if (enemy.x >= -30) {
            removeId.push(0);
          } else {
            enemy.x += 2;
          }
        } else {
          if (enemy.x <= 30) {
            removeId.push(0);
          } else {
            enemy.x -= 2;
          }
        }
      });
      removeId.forEach(function (id, index) {
        enemies.splice(id, 1);
      });
      removeId = [];
      loop++;
      var id = setTimeout(game, 50);
      if (loop > 400) {
        clearTimeout(id);
      }
    };

    game();
  }
}
