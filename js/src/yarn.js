function Yarn(game, x, y, hidden) {
  Objects.call(this, game, 'yarn', 'yarn', x, hidden);

  this.ratio = 200 / 127;

  this.height = 30;
  this.width = this.height * this.ratio;
  this.y = y - this.height;
}

Yarn.prototype = Object.create(Objects.prototype);
Yarn.prototype.constructor = Yarn;