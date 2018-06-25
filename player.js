function Player(game){
  this.game = game;
  this.x = 150;
  this.y= 150;
  this.width = 50;
  this.height = 50;

  this.img = new Image();
  this.img.src = "images/harry.png";

  this.img.frames = 4;
  this.img.frameIndex = 0;
  this.gravity;
}
Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, 
  this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
  0,
  Math.floor(this.img.width / this.img.frames),
  this.height)
}

Player.prototype.animateImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 2) this.img.frameIndex = 0;
  }
};