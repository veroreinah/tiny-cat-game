window.onload = function() {
  var canvas = document.getElementById("canvas");
  var startBtn = document.getElementById("start-button");
  var header = document.getElementsByTagName('header')[0];
  var mobileControls = document.getElementsByClassName('mobile-controls')[0];
  var game;
  var requestAnimationId;

  startBtn.onclick = function() {
    startGame();

    header.classList.add('small');
    mobileControls.classList.add('active');
    canvas.classList.add('mobile-version');
  };

  function startGame() {
    game = new Game(canvas);
    
    updateCanvas(-1);
  }

  function updateCanvas(time) {
    var timeSec = Math.floor(time / 1000);
    game.update(timeSec);

    if (!game.end) {
      requestAnimationId = window.requestAnimationFrame(updateCanvas);
    } else {
      window.cancelAnimationFrame(requestAnimationId);

      startBtn.innerHTML = 'Play Again';
      header.classList.remove('small');
      mobileControls.classList.remove('active');
      canvas.classList.remove('mobile-version');
    }
  }
};
