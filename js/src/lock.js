function Lock(game, x, y, keyX, keyY, objectHidden) {
  this.game = game;
  this.objectHidden = objectHidden;
  this.visible = true;
  this.keyFound = false;

  this.image = new Image();
  this.image.src = 'images/misc/lock_yellow.png';
  this.width = 60;
  this.height = 60;

  this.imageKey = new Image();
  this.imageKey.src = 'images/misc/key_yellow.png';
  this.keyWidth = 32;
  this.keyHeight = 20;

  this.x = x;
  this.y = y - this.height;
  this.keyX = keyX;
  this.keyY = keyY - this.keyHeight;
}

Lock.prototype.draw = function() {
  if (this.visible) {
    this.game.ctx.save();
  
    this.game.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.ctx.drawImage(
      this.imageKey,
      this.keyX,
      this.keyY,
      this.keyWidth,
      this.keyHeight
    );
  
    this.game.ctx.restore();
  }
}

Lock.prototype.move = function() {
  if (this.visible && this.keyFound) {
    this.keyX = this.game.player.x + (this.game.player.width / 2) - (this.keyWidth / 2);
    this.keyY = this.game.player.y - this.keyHeight - 10;
  }
}

Lock.prototype.checkPlayerPosition = function() {
  if (this.visible) {
    var player = this.game.player;
    var playerX = player.x + player.width / 2;

    if (!this.keyFound
        && playerX >= this.keyX 
        && playerX <= this.keyX + this.keyWidth
        && player.y + player.height === this.keyY + this.keyHeight) {
      this.keyFound = true;
    }

    if (this.keyFound
        && playerX >= this.x 
        && playerX <= this.x + this.width
        && player.y + player.height === this.y + this.height) {
      this.visible = false;

      this.game.objects.forEach(function(item) {
        if (this.objectHidden === item.className) {
          item.hidden = false;
        }
      }.bind(this));
    }
  }

  return !this.visible;
}