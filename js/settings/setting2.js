function Setting2(game) {
  this.game = game;

  // Exit position

  this.finish = {
    position: 'right',
    x: this.game.canvas.width,
    y: this.game.canvas.height / 2 - 90
  };

  // Ladders options

  this.ladders = {
    count: 2,
    width: 70
  };

  // Platforms options

  this.platforms = {
    count: 4,
    sectionWidth: 128
  };
  
  // Ladders

  this.ladders.items = [
    {
      height: this.game.canvas.height / 4,
      x: this.game.canvas.width / 2 - this.ladders.width,
      y: this.game.canvas.height * 3 / 4 - 90
    },
    {
      height: this.game.canvas.height / 4,
      x: this.game.canvas.width - this.ladders.width - this.platforms.sectionWidth * 2,
      y: this.game.canvas.height / 2 - 90
    }
  ];

  // Platforms

  this.platforms.items = [
    {
      width: this.platforms.sectionWidth * 2,
      x: -this.platforms.sectionWidth,
      y: 150
    },
    {
      width: this.platforms.sectionWidth * 2,
      x: this.game.canvas.width - this.platforms.sectionWidth * 2,
      y: this.game.canvas.height / 2 - 90
    },
    {
      width: this.platforms.sectionWidth * 2,
      x: this.platforms.sectionWidth / 2,
      y: this.game.canvas.height * 3 / 4 - 90
    },
    {
      width: this.platforms.sectionWidth * 3,
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height * 3 / 4 - 90
    }
  ];

  // Player options

  this.player = {
    x: 20,
    y: 0
  };

  // Cat

  this.cat = {
    x: this.game.canvas.width - 85,
    y: this.game.canvas.height - 85
  };

  // Yarn

  this.yarn = {
    hidden: true,
    x: this.game.canvas.width / 2 + this.ladders.width,
    y: this.game.canvas.height * 3 / 4 - 90
  };

  // Fishbone

  this.fishbone = {
    x: this.platforms.sectionWidth / 2,
    y: this.game.canvas.height * 3 / 4 - 90
  };

  // Lock

  this.locks = [
    {
      objectHidden: 'yarn',
      key: {
        x: this.game.canvas.width - this.platforms.sectionWidth * 2 + 20,
        y: this.game.canvas.height / 2 - 90
      }
    }
  ];

  this.locks.forEach(function(lock) {
    lock.box = {
      x: this[lock.objectHidden].x,
      y: this[lock.objectHidden].y
    };
  }.bind(this));
}