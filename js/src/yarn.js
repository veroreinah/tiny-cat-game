function Yarn(game, x, y) {
  Objects.call(this, game, 'yarn', 'yarn', x);

  this.ratio = 200 / 127;

  this.height = 30;
  this.width = this.height * this.ratio;
  this.y = y - this.height;
}

Yarn.prototype = Object.create(Objects.prototype);
Yarn.prototype.constructor = Yarn;