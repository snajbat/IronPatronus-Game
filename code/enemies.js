function Enemy(game){
  this.game = game;
  var random = Math.floor(Math.random()*300);
  this.x = this.game.canvas.width;
  this.y = 50 +random;
  
  this.img = new Image();
  this.img.src = "../images/TRAJE_DEMENTOR.png";

  this.width = 70;
  this.height = 80;
  this.moveX = 5;
}

Enemy.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Enemy.prototype.move = function() {
  this.x -= this.moveX;
};