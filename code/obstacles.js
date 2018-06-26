function Enemy(game){
  this.game = game;
  var random = Math.floor(Math.random()*50);
  this.x = this.game.canvas.width;
  this.y = 320 + random;
  
  this.img = new Image();
  this.img.src = "../images/dementor.png";

  this.width = 80;
  this.height = 80;
  this.moveX = 5;
}

Enemy.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Enemy.prototype.move = function() {
  this.x -= this.moveX;
};
