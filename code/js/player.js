function Player(game) {
  this.game = game;
  this.x = 150;
  this.y = 350;
  this.width = 80;
  this.height = 60;

  this.img = new Image();
  this.img.src = "../images/harry.png";

  this.speedY = 1;
  this.speedX = 1;
  this.img.frames = 4;
  this.img.frameIndex = 0;
  this.magicBalls = [];
  this.magicPatron = [];

  //this.keyEvents();
}
Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  this.magicBalls.forEach(function(magic) {
    magic.draw();
    magic.move();
  });

  this.magicPatron.forEach(function(magic) {
    magic.drawPatronus();
    magic.move();
  });

  this.magicBalls = this.magicBalls.filter(
    function(magic) {
      return magic.x <= this.game.canvas.width;
    }.bind(this)
  );
  this.magicPatron = this.magicPatron.filter(
    function(patron) {
      return patron.x <= this.game.canvas.width;
    }.bind(this)
  );
};

Player.prototype.shoot = function() {
  var magic = new Magic(
    this.game,
    this.x + this.width - 20,
    this.y + this.height / 4
  );
  this.magicBalls.push(magic);
};

Player.prototype.patronus = function() {
  var patron = new Magic(this.game, this.x + this.width - 170, this.y / 6);
  this.magicPatron.push(patron);
};