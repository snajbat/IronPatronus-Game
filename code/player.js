function Player(game){
  this.game = game;
  this.x = 150;
  this.y0 = this.game.canvas.height * 0.70;
  this.y= this.y0;
  this.width = 50;
  this.height = 60;

  this.img = new Image();
  this.img.src = "../images/harry.png";

  this.speedY = 1;
  this.img.frames = 4;
  this.img.frameIndex = 0;

  this.keyEvents();
}
Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, 
  this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
  this.y,
  Math.floor(this.img.width / this.img.frames),
  this.height);
  this.animateImg();
}

Player.prototype.keyEvents = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === 38 && this.y == this.y0) {
      this.y -= 5;
      this.speedY -= 10;
    } 
  }.bind(this);
};

Player.prototype.animateImg = function() {
  if (this.game.framesCounter % 6 === 0) {
    this.img.frameIndex += 1;

    if (this.img.frameIndex > 3) this.img.frameIndex = 0;
  }
};

Player.prototype.move = function() {
  var gravity = 0.3;


  if (this.y >= this.y0) {
    this.speedY = 1;
    this.y = this.y0;
  } else {
    this.speedY += gravity;
    this.y += this.speedY;
  }
};