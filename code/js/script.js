window.onload = function() {
  var game = new Game("canvas");
  var UP = 38;
  var DOWN = 40;
  var SPACE = 32;
  var ENTER = 13;
  document.onkeydown = function(event) {
    if (event.keyCode == UP) {
      if (game.player.y > 0) {
        game.player.y -= 18;
        game.player.speedY -= 65;
      } else game.player.speedY = 0;
    }
    if (event.keyCode == DOWN) {
      if (game.player.y + game.player.height < game.canvas.height) {
        game.player.y += 18;
        game.player.speedY += 65;
      } else game.player.speedY = 0;
    }
    if (event.keyCode === SPACE) {
      game.soundmag.play();
      game.player.shoot();
    }
    if (event.keyCode === ENTER && document.getElementById("start").disabled) {
      game.music.pause();
      if (!confirm("Pause. Continue??")) {
        location.reload();
      } else game.music.play();
    }
    if (game.score % 40 == 0 && game.score > 0) {
      if (event.keyCode == SPACE) {
        game.player.patronus();
      }
    }
  };
  var img = document.getElementById("sound");
  img.onclick = function() {
    if (img.getAttribute("src") == "../images/nosound.png") {
      game.open.play();
      img.setAttribute("src", "../images/sound.png");
    } else {
      game.open.pause();
      img.setAttribute("src", "../images/nosound.png");
    }
  };
  document.getElementById("start").onclick = function() {
    game.start();
    game.open.pause();
    img.parentNode.removeChild(img);
    document.getElementById("start").disabled = true;
  };
};
