function Cat(game, x, y, hidden) {
  Objects.call(this, game, 'cat/idle', 'cat', x, hidden);

  this.ratio = 542 / 474;
  this.image.frames = 10;
  this.image.frameIndex = 0;

  // this.status = 'idle';

  this.cont = 0;
  // this.historyCont = 0;

  this.height = 50;
  this.width = this.height * this.ratio;
  this.y = y - this.height;
}

Cat.prototype = Object.create(Objects.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.draw = function() {
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
}

Cat.prototype.animateImg = function() {
  this.cont++;

  if (this.cont % 4 == 0) {
    if (this.image.frameIndex >= (this.image.frames - 1)) {
      this.image.frameIndex = 0;
      this.cont = 0;
    } else {
      this.image.frameIndex++;
    }
  }
}

// Cat.prototype.move = function() {
//   if (this.game.player.history.length > 0) {
//     this.historyCont++;

//     if (this.historyCont > 60) {
//       var playerPrevStatus = this.game.player.history.shift();

//       this.x = playerPrevStatus.x;
//       this.y = playerPrevStatus.y + this.game.player.height - this.height;
      
//       if (this.status !== playerPrevStatus.status) {
//         this.status = (playerPrevStatus.status !== 'climb') ? playerPrevStatus.status : 'walk';
//         this.cont = 0;
//         this.image.frameIndex = 0;
//         this.image.src = 'images/objects/cat/' + this.status + '.png';
//       }

//       this.historyCont = 120;
//     }
//   }
// }