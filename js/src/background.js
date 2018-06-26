function Background(game) {
  this.game = game;
  this.totalClouds = 4;
  this.clouds = [];

  this.ground = {};
  this.ground.image = new Image();
  this.ground.image.src = 'images/platforms/ground.png';

  this.finishSign = {};
  this.finishSign.image = new Image();
  this.finishSign.image.src = 'images/misc/sign.png';

  this.setUp();
}

Background.prototype.setUp = function() {
  this.nextTime = 0;

  for (var i = 0; i < this.totalClouds; i++) {
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
  this.drawGround();
  this.clouds.forEach(function(cloud) {
    cloud.draw();
  });
  this.drawFinishSign();
}

Background.prototype.drawGround = function() {
  this.game.ctx.save();

  var pattern = this.game.ctx.createPattern(this.ground.image, 'repeat-x');
  this.game.ctx.fillStyle = pattern;
  this.game.ctx.translate(0, this.game.canvas.height - 90);
  this.game.ctx.fillRect(0, 0, this.game.canvas.width, 90);

  this.game.ctx.restore();
}

Background.prototype.drawFinishSign = function() {
  this.game.ctx.save();

  this.game.ctx.drawImage(
    this.finishSign.image,
    this.game.setting.finish.x - this.finishSign.image.width - 20,
    this.game.setting.finish.y - this.finishSign.image.height,
    this.finishSign.image.width,
    this.finishSign.image.height
  );

  this.game.ctx.restore();
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
