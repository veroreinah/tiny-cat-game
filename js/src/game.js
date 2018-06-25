function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.time = 0;
  this.ladderWidth = 80;
  this.platformItemWidth = 128;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.addLadders();
  this.addPlatforms();
}

Game.prototype.update = function(time) {
  this.clear();

  this.time = time;
  this.background.update();
  this.player.checkPosition();

  this.draw();
  this.move();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.ladders.forEach(function(s) {
    s.draw();
  });
  this.platforms.forEach(function(s) {
    s.draw();
  });
  this.player.draw();
}

Game.prototype.move = function() {
  this.background.move();
  this.player.move();
}

Game.prototype.addLadders = function() {
  this.ladders = [
    new Ladder(
      this,
      this.ladderWidth,
      this.canvas.height / 2,
      this.canvas.width / 4,
      this.canvas.height / 2 - 90
    )
  ];
}

Game.prototype.addPlatforms = function() {
  this.platforms = [
    new Platform(
      this,
      this.platformItemWidth * 2,
      this.canvas.width / 4 + this.ladderWidth,
      this.canvas.height / 2 - 90
    ),
    new Platform(
      this,
      this.platformItemWidth * 2,
      this.canvas.width / 4 + this.ladderWidth + this.platformItemWidth * 1.5,
      this.canvas.height * 3 / 4 - 90
    )
  ];
}