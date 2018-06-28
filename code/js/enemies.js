function Enemy(game) {
  this.game = game;
  var random = Math.floor(Math.random() * 360);
  this.x = this.game.canvas.width;
  this.y = 50 + random;

  this.img = new Image();
  this.img.src = "images/TRAJE_DEMENTOR.png";

  this.width = 60;
  this.height = 70;
  this.moveX = 5;

  if (this.game.score >= 200 && this.game.score < 300) {
    this.moveX = 7;
  }
}

Enemy.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Enemy.prototype.move = function() {
  this.x -= this.moveX;
};
