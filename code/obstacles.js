function Enemy(game){
  var random = Math.floor(Math.random()*21);
  this.game = game;
  this.x = this.game.canvas.width;
  this.y = 350 + random
  this.img = new Image();
  this.img.src = "../images/dementor.png"
  this.width = 40;
  this.height = 60;
  this.moveX = 10;
}

Enemy.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Enemy.prototype.move = function() {
  this.x -= this.moveX;
};
