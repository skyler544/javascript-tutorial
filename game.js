// wait until the page ist loaded in order to start the game
document.addEventListener("DOMContentLoaded", function (event) {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  drawShape(ctx, circle);
  drawShape(ctx, rectangle);
});


let drawShape = function (ctx, drawFunction) {
  ctx.beginPath();
  drawFunction(ctx);
  ctx.closePath();
}

let rectangle = function (ctx) {
  ctx.rect(20, 40, 50, 50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
}

let circle = function (ctx) {
  ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
}
