function Cloud(game, x) {
  this.game = game;
  this.x = (x === undefined) ? Math.floor(Math.random() * this.game.canvas.width) : x;
  this.y = Math.floor(Math.random() * (this.game.canvas.height / 3));
  this.size = 30;
  this.scale = Math.random() * (1 - 0.6) + 0.6;
  this.opacity = Math.random() * (0.9 - 0.4) + 0.4;
  this.speedX = 0.2;
}

Cloud.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.fillStyle = "#fff";
  this.game.ctx.scale = this.scale;
  this.game.ctx.globalAlpha = this.opacity;

  this.game.ctx.beginPath();
  this.game.ctx.moveTo(this.x - 26 + this.size * 1.2, this.y - 36);
  this.game.ctx.arc(this.x - 26, this.y - 36, this.size * 1.2, 0, Math.PI * 2);

  this.game.ctx.moveTo(this.x + 56 + this.size, this.y + 6);
  this.game.ctx.arc(this.x + 56, this.y + 6, this.size, 0, Math.PI * 2);

  this.game.ctx.moveTo(this.x - 56 + this.size, this.y + 6);
  this.game.ctx.arc(this.x - 56, this.y + 6, this.size, 0, Math.PI * 2);

  this.game.ctx.moveTo(this.x + this.size, this.y + 6);
  this.game.ctx.arc(this.x, this.y + 6, this.size * 1.1, 0, Math.PI * 2);

  this.game.ctx.moveTo(this.x + 26 + this.size, this.y - 31);
  this.game.ctx.arc(this.x + 26, this.y - 31, this.size, 0, Math.PI * 2);
  this.game.ctx.closePath();

  this.game.ctx.fill();

  this.game.ctx.restore();
};

Cloud.prototype.move = function() {
  this.x += this.speedX;
};
