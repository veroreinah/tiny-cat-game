function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.time = 0;

  this.totalSettings = 2;
  this.setting = 1;

  this.setUp();
}

Game.prototype.setUp = function() {
  switch (this.setting) {
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
}

Game.prototype.update = function(time) {
  this.clear();

  this.time = time;
  this.background.update();
  this.player.checkPosition();
  this.objects.forEach(function(o, index) {
    if (o.checkPlayerPosition()) {
      this.objects.splice(index, 1);
    }
  }.bind(this));
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
    o.draw();
  });
  this.player.draw();
}

Game.prototype.move = function() {
  this.background.move();
  this.player.move();
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
    this.setting.cat.y
  ));

  this.objects.push(new Yarn(
    this,
    this.setting.yarn.x,
    this.setting.yarn.y
  ));

  this.objects.push(new Fishbone(
    this,
    this.setting.fishbone.x,
    this.setting.fishbone.y
  ));
}

Game.prototype.hasFinished = function() {
  if (this.objects.length === 0) {
    var playerBottomY = this.player.y + this.player.height;
    var playerRightX = this.player.x + this.player.width;
    var playerX = this.player.x;

    if (this.setting.finish.position === 'right') {
      if (playerBottomY === this.setting.finish.y
          && playerRightX > this.setting.finish.x - this.player.width) {
        this.player.limitX_right = this.setting.finish.x * 2;
      }

      if (playerBottomY === this.setting.finish.y
          && playerRightX > this.setting.finish.x) {
        this.nextSetting();
      }
    }

    if (this.setting.finish.position === 'left') {
      if (playerBottomY === this.setting.finish.y
          && playerX < this.setting.finish.x + this.player.width) {
        this.player.limitX_left = -this.canvas.width;
      }

      if (playerBottomY === this.setting.finish.y
          && playerRightX < this.setting.finish.x) {
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

  this.setting++;

  if (this.setting <= this.totalSettings) {
    this.setUp();
  } else {

  }
}