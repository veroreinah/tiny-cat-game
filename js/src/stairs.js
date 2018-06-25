function Stairs(game) {
  this.game = game;
  this.width = 100;
  this.height = this.game.canvas.height / 2;
  this.x = this.game.canvas.width / 4 - this.width / 2;
  this.y = this.game.canvas.height - this.height - 10;
}

Stairs.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.fillRect(this.x, this.y, this.width, this.height);

  this.game.ctx.restore();
}