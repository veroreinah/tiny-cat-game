window.onload = function() {
  var canvas = document.getElementById("canvas");
  var startBtn = document.getElementById('start-button');
  var header = document.getElementsByTagName('header')[0];
  var game;

  startBtn.onclick = function() {
    startGame();

    startBtn.style.display = 'none';
    header.classList.add('small');
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
