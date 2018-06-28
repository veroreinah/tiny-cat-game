function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.time = 0;
  this.keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }

  this.totalSettings = 2;
  this.currentSetting = 1;

  this.setUp();
}

Game.prototype.setUp = function() {
  this.objectsFound = false;
  this.end = false;
  this.effects = [];

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
  this.draw();
  this.move();

  this.hasFinishedSetting();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.background.draw();

  var items = ['ladders', 'platforms', 'objects', 'locks'];
  items.forEach(function(item) {
    this[item].forEach(function(element) {
      if ((('hidden' in element) && !element.hidden) 
          || !('hidden' in element)) {
        element.draw();
      }
    }.bind(this));
  }.bind(this));

  this.player.draw();

  this.effects.forEach(function(e) {
    e.draw();
  });
}

Game.prototype.move = function() {
  this.background.move();
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
        createjs.Sound.play(o.className);

        this.effects.push(new Effect(
          this,
          o.x,
          o.y + o.height,
          (o.className === 'cat') ? 'hearts': 'star'
        ));

        this.objects.splice(index, 1);
      }
    }.bind(this));
  }

  this.locks.forEach(function(l, index) {
    if (l.checkPlayerPosition()) {
      this.locks.splice(index, 1);
    }
  }.bind(this));
}

Game.prototype.hasFinishedSetting = function() {
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
  this.currentSetting++;

  if (this.currentSetting <= this.totalSettings) {
    var items = document.getElementsByClassName('item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('found');
    }

    this.setUp();
  } else {
    this.end = true;
  }
}