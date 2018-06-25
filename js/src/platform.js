function Platform(game, width, x, y) {
  this.game = game;
  this.width = width;
  this.height = 93;
  this.x = x;
  this.y = y;
  this.centralTiles = this.width / 128 - 2;

  this.ratio = 128 / 93;
  this.leftImage = new Image();
  this.leftImage.src = "images/platforms/platform-left.png";
  this.centerImage = new Image();
  this.centerImage.src = "images/platforms/platform-center.png";
  this.rightImage = new Image();
  this.rightImage.src = "images/platforms/platform-right.png";
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
