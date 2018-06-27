function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.time = 0;

  this.totalSettings = 2;
  this.currentSetting = 2;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.objectsFound = false;

  switch (this.currentSetting) {
    case 1:
      this.setting = new Setting1(this);
      break;
    case 2:
      this.setting = new Setting2(this);
      break;
  }

  this.background = new Background(this);
  this.player = new Player(this);

  this.addObjects();
  this.addLadders();
  this.addPlatforms();
  this.addLocks();
}

Game.prototype.update = function(time) {
  this.clear();

  this.time = time;
  this.background.update();
  this.checkCollisions();
  this.hasFinished();

  this.draw();
  this.move();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();
  this.ladders.forEach(function(l) {
    l.draw();
  });
  this.platforms.forEach(function(p) {
    p.draw();
  });
  this.objects.forEach(function(o) {
    if (!o.hidden) {
      o.draw();
    }
  });
  this.locks.forEach(function(l) {
    l.draw();
  });
  this.player.draw();
}

Game.prototype.move = function() {
  this.background.move();
  // this.objects.forEach(function(o) {
  //   if (o.className === 'cat' && o.found) {
  //     o.move();
  //   }
  // });
  this.player.move();
  this.locks.forEach(function(l) {
    l.move();
  });
}

Game.prototype.addLadders = function() {
  this.ladders = [];

  for (var i = 0; i < this.setting.ladders.count; i++) {
    this.ladders.push(new Ladder(
      this,
      this.setting.ladders.width,
      this.setting.ladders.items[i].height,
      this.setting.ladders.items[i].x,
      this.setting.ladders.items[i].y
    ));
  }
}

Game.prototype.addPlatforms = function() {
  this.platforms = [];

  for (var i = 0; i < this.setting.platforms.count; i++) {
    this.platforms.push(new Platform(
      this,
      this.setting.platforms.items[i].width,
      this.setting.platforms.items[i].x,
      this.setting.platforms.items[i].y
    ));
  }
}

Game.prototype.addObjects = function() {
  this.objects = [];

  this.objects.push(new Cat(
    this,
    this.setting.cat.x,
    this.setting.cat.y,
    this.setting.cat.hidden
  ));

  this.objects.push(new Yarn(
    this,
    this.setting.yarn.x,
    this.setting.yarn.y,
    this.setting.yarn.hidden
  ));

  this.objects.push(new Fishbone(
    this,
    this.setting.fishbone.x,
    this.setting.fishbone.y,
    this.setting.fishbone.hidden
  ));
}

Game.prototype.addLocks = function() {
  this.locks = [];

  this.setting.locks.forEach(function(lock) {
    this.locks.push(new Lock(
      this,
      lock.box.x,
      lock.box.y,
      lock.key.x,
      lock.key.y,
      lock.objectHidden
    ));
  }.bind(this));
}

Game.prototype.checkCollisions = function() {
  this.player.checkPosition();

  if (!this.objectsFound) {
    this.objects.forEach(function(o, index) {
      if (o.checkPlayerPosition()) {
        // if (o.className !== 'cat') {
          this.objects.splice(index, 1);
        // } else {
          // this.player.record = true;
        // }
      }
    }.bind(this));
  }

  this.locks.forEach(function(l, index) {
    if (l.checkPlayerPosition()) {
      this.locks.splice(index, 1);
    }
  }.bind(this));
}

Game.prototype.hasFinished = function() {
  // if (this.objects.length === 1 && this.objects[0].found) {
  if (this.objects.length === 0) {
    this.objectsFound = true;

    var playerBottomY = this.player.y + this.player.height;
    var playerRightX = this.player.x + this.player.width;
    var playerX = this.player.x;

    if (this.setting.finish.position === 'right') {
      if (playerBottomY === this.setting.finish.y
          && playerRightX > this.setting.finish.x - this.player.width) {
        this.player.limitX_right = this.setting.finish.x * 2;
      }

      if (playerBottomY === this.setting.finish.y
          && playerRightX > this.setting.finish.x + this.player.width) {
        this.nextSetting();
      }
    }

    if (this.setting.finish.position === 'left') {
      if (playerBottomY === this.setting.finish.y
          && playerX < this.setting.finish.x + this.player.width) {
        this.player.limitX_left = -this.canvas.width;
      }

      if (playerBottomY === this.setting.finish.y
          && playerRightX < this.setting.finish.x - this.player.width) {
        this.nextSetting();
      }
    }
  }
}

Game.prototype.nextSetting = function() {
  var items = document.getElementsByClassName('item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('found');
  }

  this.currentSetting++;

  if (this.currentSetting <= this.totalSettings) {
    this.setUp();
  } else {

  }
}