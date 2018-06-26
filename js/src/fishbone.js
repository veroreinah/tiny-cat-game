function Fishbone(game, x, y) {
  Objects.call(this, game, 'fishbone', 'fishbone', x);

  this.ratio = 98 / 43;

  this.height = 25;
  this.width = this.height * this.ratio;
  this.y = y - this.height;
}

Fishbone.prototype = Object.create(Objects.prototype);
Fishbone.prototype.constructor = Fishbone;