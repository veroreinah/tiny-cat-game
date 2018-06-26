function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.time = 0;
  this.ladderWidth = 70;
  this.platformItemWidth = 128;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);

  this.addObjects();
  this.addLadders();
  this.addPlatforms();
}

Game.prototype.update = function(time) {
  this.clear();

  this.time = time;
  this.background.update();
  this.player.checkPosition();
  this.objects.forEach(function(o, index) {
    if (o.checkPlayerPosition()) {
      this.objects.splice(index, 1);
    }
  }.bind(this));

  this.draw();
  this.move();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.ladders.forEach(function(l) {
    l.draw();
  });
  this.platforms.forEach(function(p) {
    p.draw();
  });
  this.objects.forEach(function(o) {
    o.draw();
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

Game.prototype.addObjects = function() {
  this.objects = [
    new Cat(
      this,
      this.canvas.width / 4 + this.ladderWidth + this.platformItemWidth * 1.5,
      this.canvas.height * 3 / 4 - 90
    ),
    new Yarn(
      this,
      this.canvas.width / 4 + this.ladderWidth * 2,
      this.canvas.height / 2 - 90
    ),
    new Fishbone(
      this,
      this.canvas.width / 4 + this.ladderWidth + this.platformItemWidth * 1.5,
      this.canvas.height - 85
    )
  ];
}