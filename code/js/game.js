function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.music = new Audio("../audio/harry_potter_metal.mp3");
  this.music.volume = 0.2;
  this.music.loop = true;
  this.open = new Audio("../audio/harry_potter_theme.mp3");
  this.winner = new Audio("../audio/winner.mp3");
  this.soundmag = new Audio("../audio/magic.mp3");
  this.levelup = new Audio("../audio/levelup.mp3");
  this.gameover = new Audio("../audio/gameover.mp3");
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.framesCounter++;
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      if (this.framesCounter % 80 === 0) {
        this.newEnemy();
      }
      if (this.framesCounter % 200 === 0) {
        this.newHipogrifo();
      }

      this.draw();
      this.moveAll();
      this.collision();
      this.KillDementors();
      this.win();
      this.newLevel();
    }.bind(this),
    1000 / 80
  );
  this.music.play();
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];
  this.hipogrifos = [];
  this.framesCounter = 0;
  this.score = 0;
};

Game.prototype.newEnemy = function() {
  this.enemies.push(new Enemy(this));
};
Game.prototype.newHipogrifo = function() {
  if (this.score >= 100) {
    this.hipogrifos.push(new Hipogrifo(this));
  }
};

Game.prototype.clearEnemies = function() {
  this.enemies = this.enemies.filter(
    function(enemy) {
      return enemy.x >= 0;
    }.bind(this)
  );
  this.hipogrifos = this.hipogrifos.filter(
    function(hipogrifo) {
      return hipogrifo.x >= 0;
    }.bind(this)
  );
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.enemies.forEach(function(enemy) {
    enemy.draw();
  });
  this.hipogrifos.forEach(function(hipogrifo) {
    hipogrifo.draw();
  });
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, 148, 44);
  this.ctx.font = "25px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("Score: " + this.score, 20, 31);
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.enemies.forEach(function(enemy) {
    enemy.move();
  });
  this.hipogrifos.forEach(function(hipogrifo) {
    hipogrifo.move();
  });
};

Game.prototype.collision = function() {
  this.enemies.some(
    function(enemy) {
      if (
        this.player.x + this.player.width >= enemy.x + 25 &&
        this.player.x < enemy.x + enemy.width &&
        this.player.y + this.player.height >= enemy.y + 15 &&
        this.player.y < enemy.y + enemy.height - 10
      ) {
        clearInterval(this.interval);
        this.gameOver();
      }
    }.bind(this)
  );
  this.hipogrifos.some(
    function(hipogrifo) {
      if (
        this.player.x + this.player.width >= hipogrifo.x + 25 &&
        this.player.x < hipogrifo.x + hipogrifo.width &&
        this.player.y + this.player.height >= hipogrifo.y + 15 &&
        this.player.y < hipogrifo.y + hipogrifo.height - 10
      ) {
        clearInterval(this.interval);
        this.gameOver();
      }
    }.bind(this)
  );
};

Game.prototype.gameOver = function() {
  this.gameover.play();
  this.music.pause();
  if (confirm("GAME OVER! Click OK to play again.")) {
    this.reset();
    this.start();
  } else location.reload();
};

Game.prototype.KillDementors = function() {
  this.player.magicBalls.some(
    function(magic) {
      this.enemies.some(
        function(enemy) {
          if (
            magic.x + magic.width >= enemy.x + 20 &&
            magic.y + magic.height >= enemy.y &&
            magic.y < enemy.y + enemy.height
          ) {
            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            this.player.magicBalls.splice(
              this.player.magicBalls.indexOf(enemy),
              1
            );
            this.score += 5;
          }
        }.bind(this)
      );
    }.bind(this)
  );
  this.player.magicPatron.some(
    function(patron) {
      this.enemies.some(
        function(enemy) {
          if (
            patron.x + patron.w >= enemy.x &&
            patron.x < enemy.x + enemy.width &&
            patron.y + patron.h >= enemy.y &&
            patron.y < enemy.y + enemy.height
          ) {
            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            this.score += 5;
          }
        }.bind(this)
      );
    }.bind(this)
  );
};

Game.prototype.win = function() {
  this.img = new Image();
  this.img.src = "../images/youwin.png";
  if (this.score >= 300) {
    this.music.pause();
    this.winner.play();
    this.ctx.drawImage(this.img, 160, 70);
    clearInterval(this.interval);
  }
};

Game.prototype.newLevel = function() {
  this.ctx.font = "35px sans-serif";
  this.ctx.fillStyle = "white";
  if (this.score >= 0 && this.score < 100) {
    this.ctx.fillText("Level 1", 443, 40);
  }
  if (this.score >= 100 && this.score < 200) {
    this.ctx.fillText("Level 2", 443, 40);
  }
  if (this.score >= 200) {
    this.ctx.fillText("Level 3", 443, 40);
  }
  if (this.score == 100 || this.score == 200) {
    this.levelup.play();
  }
};
