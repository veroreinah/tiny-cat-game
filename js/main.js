window.onload = function() {
  var canvas = document.getElementById("canvas");
  var startBtn = document.getElementById('start-button');
  var itemsToFindWrp = document.getElementsByClassName('objects-to-find');
  var game;

  startBtn.onclick = function() {
    startGame();

    startBtn.style.display = 'none';
    itemsToFindWrp[0].style.opacity = 1;
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
