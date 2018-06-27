window.onload = function() {
  var game = new Game("canvas");
  var UP = 38;
  var DOWN = 40;
  var SPACE = 32;
  document.onkeydown = function(event) {
    if (event.keyCode == UP) {
      game.player.y -= 18;
      game.player.speedY -= 65;
    }
    if (event.keyCode == DOWN) {
      game.player.y += 18;
      game.player.speedY += 65;
    }
    if (event.keyCode === SPACE) {
      game.player.shoot();
    }
    if (game.score % 40 == 0 && game.score > 0) {
      if (event.keyCode == SPACE) {
        game.player.patronus();
      }
    }
};
  document.getElementById("start").onclick = function() {
    game.start();
    document.getElementById("start").disabled = true;
  };
};
  