document.addEventListener("DOMContentLoaded", function () {
  class Canvas {
    constructor() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);
    }
  }

  class KeyHandler {
    w = 87;
    a = 65;
    s = 83;
    d = 68;
    keysDown = {};
    constructor() {
      document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
      document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }
    keyDownHandler(e) {
      this.keysDown[e.keyCode] = true;
    }
    keyUpHandler(e) {
      delete this.keysDown[e.keyCode];
    }
  }

  class Img {
    constructor(path) {
      this.ready = false;
      this.img = new Image();
      this.img.onload = this.load.bind(this);
      this.img.src = path;
    }
    load() {
      this.ready = true;
      this.width = this.img.width;
      this.height = this.img.height;
    }
  }

  class Character extends Img {
    X = 0;
    Y = 0;
    speed = 10;
    frameX = 0;
    frameY = 0;
    constructor(path, colCount, rowCount) {
      super(path);
      this.colCount = colCount;
      this.rowCount = rowCount;
      this.img.onload = this.load.bind(this);
    }
    load() {
      super.load();
      this.spriteW = this.width / this.colCount;
      this.spriteH = this.height / this.rowCount;
    }
    setSpeed(speed) {
      this.speed = speed;
    }
    setX(x) {
      this.X = x;
    }
    setY(y) {
      this.Y = y;
    }
  }

  class Player extends Character {
    constructor(path) {
      super(path, 6, 5);
      this.animFrame = 0;
      this.isMoving = 0;
    }
    move() {
      if (kh.w in kh.keysDown) {
        this.Y -= this.speed;
        this.isMoving = 1;
      }
      if (kh.a in kh.keysDown) {
        this.X -= this.speed;
        this.isMoving = 1;
      }
      if (kh.s in kh.keysDown) {
        this.Y += this.speed;
        this.isMoving = 1;
      }
      if (kh.d in kh.keysDown) {
        this.X += this.speed;
        this.isMoving = 1;
      }
    }
    frame(row) {
      let col = this.animFrame % this.colCount;
      this.frameX = this.spriteW * col;
      this.frameY = this.spriteH * row;
    }
  }

  let draw = function () {
    if (background.ready) {
      c.ctx.drawImage(background.img, 0, 0);
      c.canvas.width = background.width;
      c.canvas.height = background.height;
    }
    if (player.ready) {
      player.move();
      player.frame(player.isMoving);
      player.isMoving = 0;
      c.ctx.drawImage(player.img,
        player.frameX, player.frameY,
        player.spriteW, player.spriteH,
        player.X, player.Y,
        player.spriteW * 2, player.spriteH * 2
      );
      player.animFrame++;
    }
  }

  let c = new Canvas();
  let kh = new KeyHandler();
  let background = new Img("assets/background.png");
  let player = new Player("assets/mystic_woods/characters/player.png");

  setInterval(draw, 50);

  // world objects

  // movement direction variables
  // movement state variables
  // player
  // enemy

  // draw function

  // key handling

  // game loop
});
