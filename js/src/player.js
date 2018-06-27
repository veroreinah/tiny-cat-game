function Player(game) {
  this.game = game;
  this.speedX = 0;
  this.speedY = 0;
  this.contKeyPressed = 0;
  this.gravity = 0.1;

  this.status = 'idle';
  this.canClimb = false;

  this.ratio = 275 / 380;
  this.image = new Image();
  this.image.src = "images/girl/idle.png";
  this.image.frames = 10;
  this.image.frameIndex = 0;

  this.cont = 0;

  this.height = 60;
  this.width = this.height * this.ratio;
  this.x = this.game.setting.player.x;
  this.y = this.game.setting.player.y;

  this.limitX_left = 10;
  this.limitX_right = this.game.canvas.width - this.width - 10;
  this.limitY_bottom = this.game.canvas.height - this.height - 85;
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
  this.speedY += this.gravity;
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
    this.contKeyPressed++;

    console.log(this.speedX);
    switch(e.keyCode) {
      case 37: // Arrow left
        this.speedX = -2;
        if (this.contKeyPressed % 30) {
          this.speedX += -(this.contKeyPressed / 10);
        }
        this.changeStatus((this.speedX <= -3) ? 'run-backwards' : 'walk-backwards');
        break;
      case 38: // Arrow up
        if (this.canClimb) {
          this.gravity = 0;
          this.speedY = -1;
          this.changeStatus('climb');
        }
        break;
      case 39: // Arrow right
        this.speedX = 2;
        if (this.contKeyPressed % 30) {
          this.speedX += (this.contKeyPressed / 10);
        }
        this.changeStatus((this.speedX >= 3) ? 'run' : 'walk');
        break;
      case 40: // Arrow down
        if (this.canClimb) {
          this.gravity = 0;
          this.speedY = 1;
          this.changeStatus('climb');
        }
        break;
    }
  }.bind(this);

  document.onkeyup = function(e) {
    this.contKeyPressed = 0;
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
        this.changeStatus('idle');
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
  }
}

Player.prototype.checkPosition = function() {
  this.checkPositionLadders();
  this.checkPositionPlatforms();
}

Player.prototype.checkPositionLadders = function() {
  var playerX = this.x + (this.width / 2);
  var onLadder = false;

  for (var i = 0; i < this.game.ladders.length; i++) {
    var l = this.game.ladders[i];
    if (playerX >= l.x && playerX <= l.x + l.width) {
      this.canClimb = true;
      this.gravity = 0;
      this.limitY_top = l.y - this.height;
      this.limitY_bottom = this.game.canvas.height - this.height - 85;
      onLadder = true;
      break;
    }
  }

  if (!onLadder) {
    this.canClimb = false;
    this.gravity = 0.1;
  }
}

Player.prototype.checkPositionPlatforms = function() {
  var playerX = this.x + (this.width / 2);
  var playerY = this.y + this.height;
  var onPlatform = false;

  for (var i = 0; i < this.game.platforms.length; i++) {
    var p = this.game.platforms[i];
    if (playerX >= p.x && playerX <= p.x + p.width && playerY <= p.y) {
      this.limitY_bottom = p.y - this.height;
      onPlatform = true;
      break;
    }
  }

  if (!onPlatform) {
    this.limitY_bottom = this.game.canvas.height - this.height - 85;
  }
}
