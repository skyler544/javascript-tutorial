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

  let brickRowCount = 3;
  let brickColumnCount = 5;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;
  let bricks = [];
  let score = 0;

  let draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (score == brickRowCount * brickColumnCount) {
      alert("you win!");
      document.location.reload();
      clearInterval(interval);
    }
    drawBricks();
    drawShape(ctx, x, y, ballRadius, 0, circle);
    drawShape(ctx, paddleX, canvas.height - paddleHeight,
      paddleWidth, paddleHeight, rectangle);
    displayScore();
    wallCollision();
    brickCollision();
    paddleMovement();
    x += dx;
    y += dy;
  }

  let displayScore = function () {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }

  let initBricks = function () {
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
          x: (c * (brickWidth + brickPadding)) + brickOffsetLeft,
          y: (r * (brickHeight + brickPadding)) + brickOffsetTop,
          broken: false
        };
      }
    }
  }

  let drawBricks = function () {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let currBrick = bricks[c][r];
        if (!currBrick.broken) {
          drawShape(ctx, currBrick.x, currBrick.y,
            brickWidth, brickHeight, rectangle);
        }
      }
    }
  }

  let brickCollision = function () {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && !b.broken) {
          dy = -dy;
          b.broken = !b.broken;
          score++;
          console.log(score);
        }
      }
    }
  }

  let wallCollision = function () {
    let leftSide = x + dx < ballRadius;
    let rightSide = x + dx > canvas.width - ballRadius;
    let topSide = y + dy > canvas.height - ballRadius;
    let paddleCollide = x > paddleX && x < paddleX + paddleWidth;

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (leftSide || rightSide) {
      dx = -dx;
    } else if (topSide) {
      if (paddleCollide) {
        dy = -dy;
      } else {
        alert("Game over!");
        document.location.reload();
        clearInterval(interval);
      }
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

  // let mouseMoveHandler = function (e) {
  //   let relativeX = e.clientX - canvas.offsetLeft;
  //   if (relativeX > 0 && relativeX < canvas.width) {
  //     paddleX = relativeX - paddleWidth / 2;
  //   }
  // }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  // document.addEventListener("mousemove", mouseMoveHandler, false);
  initBricks();
  let interval = setInterval(draw, 10);
  // draw();
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
