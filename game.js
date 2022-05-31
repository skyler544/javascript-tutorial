// wait until the page ist loaded in order to start the game
document.addEventListener("DOMContentLoaded", function (event) {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  // using functions as arguments, pass which function we
  // want to use to draw with.

  let x = canvas.width / 2;
  let y = canvas.height - 30;
  const dx = 2;
  const dy = -2;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
  }

  setInterval(draw, 10);
  // setInterval(drawShape(ctx, x, y, 10, 0, circle), 10);
});


let drawShape = function (ctx, posX, posY, sizeX, sizeY, drawFunction) {
  ctx.beginPath();
  drawFunction(ctx, posX, posY, sizeX, sizeY);
  ctx.closePath();
}

let rectangle = function (ctx, posX, posY, sizeX, sizeY) {
  ctx.rect(posX, posY, sizeX, sizeY);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
}

let outlineRectangle = function (ctx, posX, posY, sizeX, sizeY) {
  ctx.rect(posX, posY, sizeX, sizeY);
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  ctx.stroke();
}

let circle = function (ctx, posX, posY, radius, startAngle) {
  ctx.arc(posX, posY, radius, startAngle, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  posX += dx;
  posY += dy;
}
