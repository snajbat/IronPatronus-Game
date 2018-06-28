function Hipogrifo(game) {
  this.game = game;
  var random = Math.floor(Math.random() * 300);
  this.x = this.game.canvas.width;
  this.y = 50 + random;

  this.img = new Image();
  this.img.src = "images/Hipogrifo.png";

  this.width = 80;
  this.height = 90;
  this.moveX = 4;
  if (this.game.score >= 200 && this.game.score < 300) {
    this.moveX = 6;
  }
}

Hipogrifo.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Hipogrifo.prototype.move = function() {
  this.x -= this.moveX;
};
