function Magic(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.moveX = 8;
  this.img = new Image();
  this.img.src = "images/MAGIC.png";

  this.width = 50;
  this.height = 60;

  this.w = 500;
  this.h = 500;
}

Magic.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, 50, 60);
};

Magic.prototype.move = function() {
  this.x += this.moveX;
};

Magic.prototype.drawPatronus = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};
