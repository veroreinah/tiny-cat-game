function Cat(game, x, y, hidden) {
  Objects.call(this, game, 'cat/idle', 'cat', x, hidden);

  this.ratio = 542 / 474;
  this.image.frames = 10;
  this.image.frameIndex = 0;

  this.cont = 0;

  this.height = 50;
  this.width = this.height * this.ratio;
  this.y = y - this.height;
}

Cat.prototype = Object.create(Objects.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.drawImage(
    this.image,
    this.image.frameIndex * Math.floor(this.image.width / this.image.frames),
    0,
    Math.floor(this.image.width / this.image.frames),
    this.image.height,
    this.x,
    this.y,
    this.width,
    this.height
  );

  this.animateImg();

  this.game.ctx.restore();
}

Cat.prototype.animateImg = function() {
  this.cont++;

  if (this.cont % 4 == 0) {
    if (this.image.frameIndex >= (this.image.frames - 1)) {
      this.image.frameIndex = 0;
      this.cont = 0;
    } else {
      this.image.frameIndex++;
    }
  }
}
