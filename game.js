// wait until the page ist loaded in order to start the game
document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("gameWorld");
  let ctx = canvas.getContext("2d");

  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;
  let ballRadius = 10;

  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;

  let rightPressed = false;
  let leftPressed = false;

  let draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape(ctx, x, y, ballRadius, 0, circle);
    drawShape(ctx, paddleX, canvas.height - paddleHeight,
      paddleWidth, paddleHeight, rectangle);
    wallCollision();
    paddleMovement();
    x += dx;
    y += dy;
  }

  let wallCollision = function () {
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
      dy = -dy;
    } else if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
      dx = -dx;
    }
  }

  let paddleMovement = function () {
    if (rightPressed) {
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    } else if (leftPressed) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }
  }

  let keyDownHandler = function (e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  let keyUpHandler = function (e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  setInterval(draw, 10);
});

let drawShape = function (ctx, posX, posY, sizeX, sizeY, drawFunction) {
  ctx.beginPath();
  drawFunction(ctx, posX, posY, sizeX, sizeY);
  ctx.closePath();
}

let rectangle = function (ctx, posX, posY, sizeX, sizeY) {
  ctx.rect(posX, posY, sizeX, sizeY);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
}

let circle = function (ctx, posX, posY, radius, startAngle) {
  ctx.arc(posX, posY, radius, startAngle, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
}
