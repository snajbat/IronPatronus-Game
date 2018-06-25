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

    if (this.framesCounter % 50 === 0) {
      this.newEnemy();
    }
    
    this.draw();
    this.moveAll();

  }.bind(this), 1000 / 80);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.enemies = [];

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