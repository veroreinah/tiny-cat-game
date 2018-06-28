function Objects(game, img, className, x, hidden) {
  this.game = game;
  this.found = false;
  this.className = className;
  this.hidden = hidden;

  this.x = x;

  this.image = new Image();
  this.image.src = "images/objects/" + img + ".png";
}

Objects.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.drawImage(
    this.image,
    this.x,
    this.y,
    this.width,
    this.height
  );

  this.game.ctx.restore();
}

Objects.prototype.checkPlayerPosition = function() {
  if (!this.found && !this.hidden) {
    var player = this.game.player;

    if (player.x >= this.x 
        && player.x <= this.x + this.width
        && player.y + player.height === this.y + this.height) {
      this.found = true;
      document.getElementsByClassName('item ' + this.className)[0].classList.add('found');
    }
  }

  return this.found;
}
