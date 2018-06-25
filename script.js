window.onload = function(){
  var game = new Game("canvas");
  var background = new Background(game);
  background.draw();
  var player = new Player(game);
  player.draw();
  document.getElementById("start").onclick = function(){
    game.start();
  }
  
}
