function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.time = 0;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.background = new Background(this);
  this.player = new Player(this);
}

Game.prototype.update = function(time) {
  this.clear();

  this.time = time;
  this.background.update();

  this.draw();
  this.move();
} 

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
}

Game.prototype.move = function() {
  this.background.move();
  this.player.move();
}
