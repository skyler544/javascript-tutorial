// wait until the page ist loaded in order to start the game
document.addEventListener("DOMContentLoaded", function (event) {
  console.log(event);
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  let x = canvas.width / 2;
  let y = canvas.height - 30;
  const dx = 2;
  const dy = -2;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape(ctx, x, y, 10, 0, circle);
    x += dx;
    y += dy;
  }

  setInterval(draw, 12);
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

let circle = function (ctx, posX, posY, radius, startAngle) {
  ctx.arc(posX, posY, radius, startAngle, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
}
