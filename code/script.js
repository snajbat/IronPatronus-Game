window.onload = function(){
  var game = new Game("canvas");
  document.getElementById("start").onclick = function(){
    game.start();
  }
  
}