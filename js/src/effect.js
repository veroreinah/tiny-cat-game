function Effect(game, x, y, type) {
  this.game = game;
  this.x = x;
  this.y = y - 100;
  this.width = 80;
  this.height = 100;

  this.cont = 0;

  this.image = new Image();
  this.image.src = 'images/effects/' + type + '.png';
  this.image.frameIndex = 0;
  
  switch (type) {
    case 'hearts':
      this.image.frames = 8;
      break;
    case 'star':
      this.image.frames = 10;
      break;
  }
}

Effect.prototype.draw = function() {
  if (this.image.frameIndex < this.image.frames) {
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
};

Effect.prototype.animateImg = function() {
  if (this.cont % 6 == 0 && this.image.frameIndex < this.image.frames) {
    this.image.frameIndex++;
  }
  this.cont++;
};