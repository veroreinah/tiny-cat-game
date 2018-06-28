window.onload = function() {
  var canvas = document.getElementById("canvas");
  var startBtn = document.getElementById("start-button");
  var header = document.getElementsByTagName("header")[0];
  var game;
  var requestAnimationId;

  var mobileControls = document.getElementsByClassName("mobile-controls")[0];
  var mobileBtns = document.getElementsByClassName("btn-mobile");
  var isTouchDevice = "ontouchstart" in document.documentElement;

  loadSounds();

  for (var i = 0; i < mobileBtns.length; i++) {
    var btn = mobileBtns[i];

    if (isTouchDevice) {
      btn.ontouchstart = function() {
        createEvents(this, "onmobiledown");
      };

      btn.ontouchend = function() {
        createEvents(this, "onmobileup");
      };
    } else {
      btn.onmousedown = function() {
        createEvents(this, "onmobiledown");
      };

      btn.onmouseup = function() {
        createEvents(this, "onmobileup");
      };
    }
  }

  startBtn.onclick = function() {
    startGame();

    header.classList.add("small");
    mobileControls.classList.add("active");
    canvas.classList.add("mobile-version");
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

      startBtn.innerHTML = "Play Again";
      header.classList.remove("small");
      mobileControls.classList.remove("active");
      canvas.classList.remove("mobile-version");
    }
  }

  function createEvents(btn, eventName) {
    var direction = btn.getAttribute("data-direction");
    var event = new CustomEvent(eventName, {
      detail: { direction: direction }
    });

    document.dispatchEvent(event);
  }

  function loadSounds() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
      return;
    }
    
    var assetsPath = "./audio/";
    var sounds = [
      { src: "cat-meowing.mp3", id: "cat" },
      { src: "chimes.mp3", id: "yarn" },
      { src: "chimes.mp3", id: "fishbone" }
    ];
    
    createjs.Sound.registerSounds(sounds, assetsPath);
  }
};
