function Platform(game, width, x, y) {
  this.game = game;
  this.width = width;
  this.height = 93;
  this.x = x;
  this.y = y;
  this.centralTiles = this.width / this.game.setting.platforms.sectionWidth - 2;

  // Images ratio: 128 / 93
  var images = ['left', 'center', 'right'];
  images.forEach(function(e) {
    this[e + 'Image'] = new Image();
    this[e + 'Image'].src = 'images/platforms/platform-' + e + '.png';
  }.bind(this));
}

Platform.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.drawImage(
    this.leftImage,
    this.x,
    this.y,
    this.leftImage.width,
    this.leftImage.height
  );

  for (var i = 0; i < this.centralTiles; i++) {
    this.game.ctx.drawImage(
      this.centerImage,
      this.x + this.centerImage.width * (i + 1),
      this.y,
      this.centerImage.width,
      this.centerImage.height
    );
  }
  this.game.ctx.drawImage(
    this.rightImage,
    this.x + this.rightImage.width * (i + 1),
    this.y,
    this.rightImage.width,
    this.rightImage.height
  );

  this.game.ctx.restore();
};
