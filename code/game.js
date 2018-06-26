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

    if (this.framesCounter % 100 === 0) {
      this.newEnemy();
    }
    
    this.draw();
    this.moveAll();
    this.collision();

  }.bind(this), 1000 / 80);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];
  this.framesCounter = 0;
};

Game.prototype.newEnemy = function() {
  this.enemies.push(new Enemy(this));
}

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.enemies.forEach(function(enemy){
    enemy.draw();
  });
};

Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  this.enemies.forEach(function(enemy) { enemy.move(); });
}

Game.prototype.collision = function(){
  this.enemies.some(function(enemy) {
  if(((this.player.x + this.player.width) >= enemy.x) &&
  (this.player.x < (enemy.x + enemy.width)) &&
  ((this.player.y + this.player.height) >= enemy.y) &&
  (this.player.y < (enemy.y + enemy.height))){
    clearInterval(this.interval);
    this.gameOver();
  }
  }.bind(this));
}

Game.prototype.gameOver = function(){
  if(confirm("GAME OVER! Click OK to play again.")){
    this.reset();
    this.start();
  }
}