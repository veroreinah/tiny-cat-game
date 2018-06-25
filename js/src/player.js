function Player(game) {
  this.game = game;
  this.playerSize = 60;
  this.x = 20;
  this.y = this.game.canvas.height / 2 - this.playerSize / 2;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.1;
  this.userPull = 0;

  this.status = 'idle';
  this.canClimb = false;

  this.ratio = 416 / 454;
  this.image = new Image();
  this.image.src = "images/girl/idle.png";
  this.image.frames = 16;
  this.image.frameIndex = 0;

  this.cont = 0;

  this.width = this.playerSize * this.ratio;
  this.height = this.playerSize;

  this.limitX_left = 10;
  this.limitX_right = this.game.canvas.width - this.width - 10;
  this.limitY_bottom = this.game.canvas.height - this.height - 10;
  this.limitY_top = 10;

  this.events();
}

Player.prototype.draw = function() {
  this.game.ctx.save();

  this.game.ctx.drawImage(
    this.image,
    this.image.frameIndex * Math.floor(this.image.width / this.image.frames),
    0,
    Math.floor(this.image.width / this.image.frames),
    this.image.height,
    this.x,
    this.y,
    this.width,
    this.height
  );

  this.animateImg();

  this.game.ctx.restore();
};

Player.prototype.animateImg = function() {
  this.cont++;

  if (this.cont % 4 == 0) {
    if (this.image.frameIndex >= (this.image.frames - 1)) {
      this.image.frameIndex = 0;
      this.cont = 0;
    } else {
      this.image.frameIndex++;
    }
  }
};

Player.prototype.move = function() {
  if (!this.canClimb) {
    this.gravity = 0.1;
  }

  this.moveY();
  this.moveX();
};

Player.prototype.moveY = function() {
  this.speedY += (this.gravity - this.userPull);
  this.y += this.speedY;

  if (this.y > this.limitY_bottom) {
    this.y = this.limitY_bottom;
    this.speedY = 0;
  } else if (this.y < this.limitY_top) {
    this.y = this.limitY_top;
    this.speedY = 0;
  }
}

Player.prototype.moveX = function() {
  this.x += this.speedX;

  if (this.x > this.limitX_right) {
    this.x = this.limitX_right;
  } else if (this.x < this.limitX_left) {
    this.x = this.limitX_left;
  }
}

Player.prototype.events = function() {
  document.onkeydown = function(e) {
    switch(e.keyCode) {
      case 37: // Arrow left
        this.speedX = -1;
        this.changeStatus('walk-backwards');
        break;
      case 38: // Arrow up
        if (this.canClimb) {
          this.gravity = 0;
          this.speedY = -1;
        }
        break;
      case 39: // Arrow right
        this.speedX = 1;
        this.changeStatus('walk');
        break;
      case 40: // Arrow down
        if (this.canClimb) {
          this.gravity = 0;
          this.speedY = 1;
        }
        break;
    }
  }.bind(this);

  document.onkeyup = function(e) {
    switch(e.keyCode) {
      case 37: // Arrow left
        this.speedX = 0;
        this.changeStatus('idle-backwards');
        break;
      case 39: // Arrow right
        this.speedX = 0;
        this.changeStatus('idle');
        break;
      case 38: // Arrow up
      case 40: // Arrow down
        this.speedY = 0;
        break;
    }
  }.bind(this);
};

Player.prototype.changeStatus = function(status) {
  if (this.status !== status) {
    this.status = status;
    this.cont = 0;
    this.image.frameIndex = 0;
    this.image.src = 'images/girl/' + status + '.png';

    switch(status) {
      case 'idle':
      case 'idle-backwards':
        this.image.frames = 16;
        break;
      case 'walk':
      case 'walk-backwards':
        this.image.frames = 20;
        break;
    }
  }
}