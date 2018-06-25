function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
}

Game.prototype.start = function() {
  var that = this;
  this.interval = setInterval(function() {

    that.framesCounter++;
    that.moveAll();

  }, 1000 / 60);
};

Game.prototype.moveAll = function(){
  this.background.move();
}