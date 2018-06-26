function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  
  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(function() {

    this.framesCounter++;
    if (this.framesCounter > 1000) {
      this.framesCounter = 0;
    }

    if (this.framesCounter % 60 === 0) {
      this.newEnemy();
    }
    
    this.draw();
    this.moveAll();
    this.collision();
    this.KillDementors();
    this.win();

  }.bind(this), 1000 / 80);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];
  this.framesCounter = 0;
  this.score = 0;
};

Game.prototype.newEnemy = function() {
  this.enemies.push(new Enemy(this));
}

Game.prototype.clearEnemies = function(){
  this.enemies = this.enemies.filter(function(enemy){
    return enemy.x >=0;
  }.bind(this));
}

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.enemies.forEach(function(enemy){
    enemy.draw();
  });
  this.ctx.fillStyle = "gray";
  this.ctx.fillRect(0, 0, 120, 40);
  this.ctx.font = "20px sans-serif";
  this.ctx.fillStyle = "black";
  this.ctx.fillText("Score: "+this.score, 25, 25);
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.enemies.forEach(function(enemy) { enemy.move(); });
}

Game.prototype.collision = function(){
  this.enemies.some(function(enemy) {
  if(((this.player.x + this.player.width) >= enemy.x+25) &&
  (this.player.x < (enemy.x + enemy.width)) &&
  ((this.player.y + this.player.height) >= enemy.y +15) &&
  (this.player.y < (enemy.y + enemy.height-10))){
    clearInterval(this.interval);
    this.gameOver();
  }
  }.bind(this));
}

Game.prototype.gameOver = function(){
  if(confirm("GAME OVER! Click OK to play again.")){
    this.reset();
    this.start();
  } else location.reload();
}

Game.prototype.KillDementors = function(){
  this.player.magicBalls.some(function(magic){
    this.enemies.some(function(enemy){
      if((magic.x + magic.width >= enemy.x+20) && 
      (magic.y + magic.height >= enemy.y) &&
      (magic.y < enemy.y + enemy.height)){
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        this.player.magicBalls.splice(this.player.magicBalls.indexOf(enemy), 1);
        this.score += 5
      }
    }.bind(this));
  }.bind(this));
}

Game.prototype.win = function(){
  this.img = new Image();
  this.img.src = "../images/win.png";
  if(this.score == 1000){
    this.ctx.drawImage(this.img, 294, 175.5)
    clearInterval(this.interval);
  }
}