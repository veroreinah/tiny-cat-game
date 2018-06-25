window.onload = function() {
  var canvas = document.getElementById("canvas");
  var startBtn = document.getElementById('start-button');
  var game;

  function resizeCanvas() {
    canvas.style.width = window.innerWidth + "px";
    setTimeout(function() {
      canvas.style.height = window.innerHeight + "px";
    }, 0);
  }

  resizeCanvas();

  startBtn.onclick = function() {
    startGame();
  };

  function startGame() {
    game = new Game(canvas);
    
    updateCanvas(-1);
  }

  function updateCanvas(time) {
    var timeSec = Math.floor(time / 1000);
    game.update(timeSec);

    window.requestAnimationFrame(updateCanvas);
  }
};
