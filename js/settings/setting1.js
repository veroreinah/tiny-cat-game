function Setting1(game) {
  this.game = game;

  // Exit position

  this.finish = {
    position: 'right',
    x: this.game.canvas.width,
    y: this.game.canvas.height - 85
  };

  // Ladders options

  this.ladders = {
    count: 1,
    width: 70,
    items: [{
      height: this.game.canvas.height / 2,
      x: this.game.canvas.width / 4,
      y: this.game.canvas.height / 2 - 90
    }]
  };

  // Platforms options

  this.platforms = {
    count: 2,
    sectionWidth: 128
  };

  this.platforms.items = [
    {
      width: this.platforms.sectionWidth * 2,
      x: this.game.canvas.width / 4 + this.ladders.width,
      y: this.game.canvas.height / 2 - 90
    },
    {
      width: this.platforms.sectionWidth * 2,
      x: this.game.canvas.width / 4 + this.ladders.width + this.platforms.sectionWidth * 1.5,
      y: this.game.canvas.height * 3 / 4 - 90
    }
  ];

  // Player options

  this.player = {
    x: 20,
    y: this.game.canvas.height * 2 / 3
  };

  // Cat

  this.cat = {
    x: this.game.canvas.width / 4 + this.ladders.width + this.platforms.sectionWidth * 1.5,
    y: this.game.canvas.height * 3 / 4 - 90
  };

  // Yarn

  this.yarn = {
    x: this.game.canvas.width / 4 + this.ladders.width * 2,
    y: this.game.canvas.height / 2 - 90
  };

  // Fishbone

  this.fishbone = {
    x: this.game.canvas.width / 4 + this.ladders.width + this.platforms.sectionWidth * 1.5,
    y: this.game.canvas.height - 85
  };

  // Lock

  this.locks = [];
}