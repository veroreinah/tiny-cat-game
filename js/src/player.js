function Player(game) {
  this.game = game;
  this.speedX = 0;
  this.speedY = 0;
  this.contKeyPressed = 0;
  this.gravity = 0.2;

  this.status = 'idle';
  this.canClimb = false;

  this.ratio = 275 / 380;

  this.images = {};
  var status = ['idle', 'idle-backwards', 'walk', 'walk-backwards', 'run', 'run-backwards', 'climb'];

  status.forEach(function(item) {
    this.images[item] = {};
    this.images[item].image = new Image();
    this.images[item].image.src = 'images/girl/' + item + '.png';
  }.bind(this));

  this.image = {
    frames: 10,
    frameIndex: 0
  };

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
    this.images[this.status].image,
    this.image.frameIndex * Math.floor(this.images[this.status].image.width / this.image.frames),
    0,
    Math.floor(this.images[this.status].image.width / this.image.frames),
    this.images[this.status].image.height,
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
    this.gravity = 0.2;
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
    this.eventsDown(e.keyCode);
  }.bind(this);

  document.onkeyup = function(e) {
    this.eventsUp(e.keyCode);
  }.bind(this);

  document.addEventListener('onmobiledown', function (e) {
    this.eventsDown(parseInt(e.detail.direction));
  }.bind(this), false);

  document.addEventListener('onmobileup', function (e) {
    this.eventsUp(parseInt(e.detail.direction));
  }.bind(this), false);
};

Player.prototype.eventsDown = function(direction) {
  this.contKeyPressed++;

  switch(direction) {
    case this.game.keys.left:
      this.speedX = -2;
      if (this.contKeyPressed % 30) {
        this.speedX += -(this.contKeyPressed / 10);
      }
      this.changeStatus((this.speedX <= -3) ? 'run-backwards' : 'walk-backwards');
      break;
    case this.game.keys.up:
      if (this.canClimb) {
        this.gravity = 0;
        this.speedY = -1;
        this.changeStatus('climb');
      }
      break;
    case this.game.keys.right:
      this.speedX = 2;
      if (this.contKeyPressed % 30) {
        this.speedX += (this.contKeyPressed / 10);
      }
      this.changeStatus((this.speedX >= 3) ? 'run' : 'walk');
      break;
    case this.game.keys.down:
      if (this.canClimb) {
        this.gravity = 0;
        this.speedY = 1;
        this.changeStatus('climb');
      }
      break;
  }
}

Player.prototype.eventsUp = function(direction) {
  this.contKeyPressed = 0;

  switch(direction) {
    case this.game.keys.left:
      this.speedX = 0;
      this.changeStatus('idle-backwards');
      break;
    case this.game.keys.right:
      this.speedX = 0;
      this.changeStatus('idle');
      break;
    case this.game.keys.up:
    case this.game.keys.down:
      this.speedY = 0;
      this.changeStatus('idle');
      break;
  }
}

Player.prototype.changeStatus = function(status) {
  if (this.status !== status) {
    this.status = status;
    this.cont = 0;
    this.image.frameIndex = 0;
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
    this.gravity = 0.2;
  }
}

Player.prototype.checkPositionPlatforms = function() {
  var playerY = this.y + this.height;
  var onPlatform = false;

  for (var i = 0; i < this.game.platforms.length; i++) {
    var p = this.game.platforms[i];
    if ((this.x + this.width) >= p.x 
        && this.x <= p.x + p.width 
        && playerY <= p.y) {
      this.limitY_bottom = p.y - this.height;
      onPlatform = true;
      break;
    }
  }

  if (!onPlatform) {
    this.limitY_bottom = this.game.canvas.height - this.height - 85;
  }
}
