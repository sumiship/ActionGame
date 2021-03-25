"use strict";

{
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");

  const ctx = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  ctx.translate(150, 100);

  const moto = () => {
    let life = 12;
    let score = 0;
    let aod = 0;

    let amount = document.getElementById("amount").value;
    let speed = document.getElementById("speed").value;

    let Amount = 120 - 30 * amount;
    let Speed = 0.3 + 0.3 * speed;

    document.getElementById("score").innerHTML = score;
    for (let t = 1; t <= 12; t++) {
      document.getElementById("life" + String(t)).style.backgroundColor =
        "rgb(228, 5, 61)";
    }

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

    const weapon = (attack) => {
      let i = 0;
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      if (attack.us == "s") {
        i = 50;
      }
      switch (attack.color) {
        case "red":
          ctx2.fillStyle = "rgb(255,0,0)";
          break;
        case "green":
          ctx2.fillStyle = "rgb(0,255,0)";
          break;
        case "blue":
          ctx2.fillStyle = "rgb(0,0,255)";
      }
      switch (attack.shape) {
        case "circle":
          ctx2.beginPath();
          ctx2.arc(
            50,
            25 + i,
            20,
            (0 * Math.PI) / 180,
            (360 * Math.PI) / 180,
            false
          );
          break;
        case "square":
          ctx2.beginPath();
          ctx2.rect(30, 5 + i, 40, 40);
          break;
        case "triangle":
          ctx2.beginPath();
          ctx2.moveTo(50, 5 + i);
          ctx2.lineTo(30, 45 + i);
          ctx2.lineTo(70, 45 + i);
      }
      ctx2.fill();
      if (attack.us == "s") {
        ctx2.restore();
      }
    };

    {
      const shot = (attack, lr) => {
        if (aod == 1) {
          return;
        }
        let enemy_us;
        let enemy_lr;
        enemies.some(function (enemy, index) {
          enemy_us = "u";
          enemy_lr = 1;
          if (enemy.y === 50) {
            enemy_us = "s";
          }
          if (enemy.x < 0) {
            enemy_lr = -1;
          }
          if (
            enemy_lr == lr &&
            enemy_us == attack.us &&
            enemy.shape == attack.shape &&
            enemy.color == attack.color
          ) {
            score++;
            removeId.push(index);
            return true;
          }
        });
      };

      let loop = 0;
      let removeId = [];
      document.getElementById("attack-r").addEventListener("click", () => {
        shot(attack, 1);
        document.getElementById("score").innerHTML = score;
      });
      document.getElementById("attack-l").addEventListener("click", () => {
        shot(attack, -1);
        document.getElementById("score").innerHTML = score;
      });

      const game = () => {
        weapon(attack);
        ctx.clearRect(-150, -100, canvas1.width, canvas1.height);
        ctx.fillStyle = "rgba(251, 154, 196, 0.3)";
        ctx.fillRect(-20, -100, 40, 200);
        if (loop % Amount == 0) {
          addEnemy();
        }
        enemies.forEach(function (enemy, index) {
          enemy.draw();
          if (enemy.x < 0) {
            if (enemy.x >= -30) {
              removeId.push(0);
              life--;
              document.getElementById(
                "life" + String(life + 1)
              ).style.backgroundColor = "rgb(67, 64, 62)";
            } else {
              enemy.x += Speed;
            }
          } else {
            if (enemy.x <= 30) {
              removeId.push(0);
              life--;
              document.getElementById(
                "life" + String(life + 1)
              ).style.backgroundColor = "rgb(67, 64, 62)";
            } else {
              enemy.x -= Speed;
            }
          }
        });
        removeId.forEach(function (id, index) {
          enemies.splice(id, 1);
        });
        removeId = [];
        loop++;
        var id = setTimeout(game, 20);
        if (loop > 10000 || life == 0) {
          clearTimeout(id);
          document.getElementById("start").innerHTML = "Restart";
          document.getElementById("start").disabled = false;
          document.getElementById("start").style.opacity = "1";
          aod = 1;
          ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
          ctx.fillRect(-150, -100, 300, 200);
          ctx.font = "serif 30px";
          ctx.fillStyle = "#f00";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          if (life == 0) {
            ctx.fillText("GameOver", 0, 0);
          } else {
            ctx.fillText("すごい！生き残り！", 0, 0);
          }
        }
      };

      game();
    }
  };

  document.getElementById("start").addEventListener("click", () => {
    document.getElementById("start").disabled = true;
    document.getElementById("start").style.opacity = "0.4";
    moto();
  });
}
