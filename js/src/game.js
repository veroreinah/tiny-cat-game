function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.totalStairs = 1;
  this.time = 0;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.stairs = [];

  this.addStairs();
}

Game.prototype.update = function(time) {
  this.clear();

  this.time = time;
  this.background.update();

  this.draw();
  this.move();
  this.checkUserPosition();
} 

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.stairs.forEach(function(s) {
    s.draw();
  });
  this.player.draw();
}

Game.prototype.move = function() {
  this.background.move();
  this.player.move();
}

Game.prototype.addStairs = function() {
  for (var i = 0; i < this.totalStairs; i++) {
    this.stairs.push(new Stairs(this));
  }
}

Game.prototype.checkUserPosition = function() {
  var playerX = this.player.x + (this.player.width / 2);
  this.stairs.forEach(function(s) {
    if (playerX >= s.x && playerX <= s.x + s.width) {
      this.player.canClimb = true;
      this.player.limitY_top = s.y - this.player.height;
    } else {
      this.player.canClimb = false;
    }
  }.bind(this));
}