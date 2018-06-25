function Ladder(game, width, height, x, y) {
  this.game = game;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
}

Ladder.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);

  this.game.ctx.restore();
}