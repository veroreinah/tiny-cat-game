function Background(game) {
  this.game = game;
  this.clouds = [];

  this.setUp();
}

Background.prototype.setUp = function() {
  this.nextTime = 0;

  for (var i = 0; i < 4; i++) {
    this.clouds.push(new Cloud(this.game));
  }
}

Background.prototype.update = function() {
  this.checkBounds();

  if ((this.nextTime === 0 && this.game.time !== -1)
      || (this.nextTime < this.game.time)) {
    this.nextTime = this.game.time + Math.floor(Math.random() * (35 - 10) + 10);
  }

  if (this.nextTime === this.game.time) {
    this.clouds.push(new Cloud(this.game, -100));

    this.nextTime += Math.floor(Math.random() * (35 - 10) + 10);
  }
}

Background.prototype.draw = function() {
  this.clouds.forEach(function(cloud) {
    cloud.draw();
  });
}

Background.prototype.move = function() {
  this.clouds.forEach(function(cloud) {
    cloud.move();
  });
}

Background.prototype.checkBounds = function() {
  this.clouds.forEach(function(cloud, index) {
    if (cloud.x - 86 > this.game.canvas.width) {
      this.clouds.splice(index, 1);
    }
  }.bind(this));
}
