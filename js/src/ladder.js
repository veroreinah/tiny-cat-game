function Ladder(game, width, height, x, y) {
  this.game = game;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;

  // Image ratio: 70 / 57
  this.image = new Image();
  this.image.src = 'images/ladder.png';
}

Ladder.prototype.draw = function() {
  this.game.ctx.save();

  var pattern = this.game.ctx.createPattern(this.image, 'repeat-y');
  this.game.ctx.fillStyle = pattern;
  this.game.ctx.translate(this.x, this.y);
  this.game.ctx.fillRect(0, 0, this.width, this.height);

  this.game.ctx.restore();
}