// wait until the page ist loaded in order to start the game
document.addEventListener("DOMContentLoaded", function (event) {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  drawShape(ctx, 130, 130, 20, 0, circle);
  drawShape(ctx, 30, 40, 50, 20, outlineRectangle);
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
}
