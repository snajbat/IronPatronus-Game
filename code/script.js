window.onload = function() {
  var game = new Game("canvas");
  document.onkeydown = function(event) {
    if (event.keyCode === 38) {
      game.player.y -= 17;
      game.player.speedY -= 65;
    }
    if (event.keyCode === 40) {
      game.player.y += 17;
      game.player.speedY += 65;
    }
    if (event.keyCode === 32) {
      game.player.shoot();
    }
    if (game.score % 40 == 0 && game.score > 0) {
      if (event.keyCode === 32) {
        game.player.patronus();
      }
    }
};
  document.getElementById("start").onclick = function() {
    game.start();
    document.getElementById("start").disabled = true;
  };
};
  