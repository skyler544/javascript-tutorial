document.addEventListener("DOMContentLoaded", function () {
  // game machinery
  class Canvas {
    constructor(width = 0, height = 0) {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = width;
      this.canvas.height = height;
      document.body.appendChild(this.canvas);
    }
  }

  class Img {
    constructor(path) {
      this.ready = false;
      this.img = new Image();
      this.img.onload = this.load.bind(this);
      this.img.src = path;
      console.log("constructor: ", this);
    };
    load() {
      this.ready = true;
      this.width = this.img.width;
      this.height = this.img.height;
      console.log("load: ", this);
    }
  }

  let draw = function () {
    if (background.ready) {
      c.canvas.width = background.width;
      c.canvas.height = background.height;
      c.ctx.drawImage(background.img, 0, 0);
    }
  }

  let c = new Canvas();
  background = new Img("images/background.png");

  setInterval(draw, 20);

  // game speed variables

  // world objects

  // movement direction variables
  // movement state variables
  // player
  // enemy

  // draw function

  // key handling

  // game loop
});
