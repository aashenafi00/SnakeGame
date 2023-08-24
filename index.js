const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("#resetbtn");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "white";
const snakecolor = "lightgreen";
const snakeborder = "black";
const foodcolor = "red";
const unitsize = 25;
let running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
  {x:unitsize * 4, y:0},
  {x:unitsize * 3, y:0},
  {x:unitsize * 2, y:0},
  {x:unitsize, y:0},
  {x:0, y:0}];
  window,addEventListener("keydown", changeDirection);
  resetbtn.addEventListener("click", resetGame);

  gamestart();
 

  function gamestart(){
    running = true;
    scoretext.textContent = score;
    createFood();
    drawFood();
    nextTick();
  };
  function nextTick(){
    if(running){
      setTimeout(() =>{
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
      }, 75);
    }
    else{
      displayGameOver();
    }
  };
  function clearBoard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight);
  };
  function createFood(){
    function randomFood(min, max){
      const randNum = Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize
      return randNum;
    }
    foodx = randomFood(0, gamewidth - unitsize);
    foody = randomFood(0, gamewidth - unitsize);
    console.log(foodx);
  };
  function drawFood(){
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodx, foody, unitsize, unitsize);
  };
  function moveSnake(){
    const head = {x: snake[0].x + xvelocity,
                  y: snake[0].y + yvelocity};

    snake.unshift(head);
    if(snake[0].x == foodx && snake[0].y == foody){
          score+=1;
          scoretext.textContent = score;
          createFood();
    }
    else{
      snake.pop();
    }
  };
  function drawSnake(){
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakePart => {
      ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
      ctx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize);
    })
  };
  function changeDirection(event){
   const keypressed = event.keyCode;
   const left = 37;
   const up = 38;
   const right = 39;
   const down = 40;
   const goingup = (yvelocity == -unitsize);
   const goingdown = (yvelocity == unitsize);
   const goingright = (xvelocity == unitsize);
   const goingleft = (xvelocity == -unitsize);

   switch(true){
    case(keypressed == left && !goingright):
         xvelocity = -unitsize;
        yvelocity = 0;
        break;
    case(keypressed == up && !goingdown):
         xvelocity = 0;
        yvelocity = -unitsize;
        break;
    case(keypressed == right && !goingleft):
         xvelocity = unitsize;
        yvelocity = 0;
        break;
    case(keypressed == down && !goingup):
         xvelocity = 0;
        yvelocity = unitsize;
        break;
   }
  };
  function checkGameOver(){
    switch(true){
      case(snake[0].x < 0):
        running = false;
         break;
      case(snake[0].x >= gamewidth):
        running = false;
        break;
      case(snake[0].y < 0):
        running = false;
        break;
      case(snake[0].y >= gameheight):
        running = false;
        break;
    }
   for(let i = 1; i < snake.length; i+=1){
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
      running = false;
    }
   }


  };
  function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!!", gamewidth / 2, gameheight/ 2);
    running = false;
  };
  function resetGame(){
    score = 0;
    xvelocity = unitsize;
    yvelocity = 0;
     snake = [
      {x:unitsize * 4, y:0},
      {x:unitsize * 3, y:0},
      {x:unitsize * 2, y:0},
      {x:unitsize, y:0},
      {x:0, y:0}];
      gamestart();
  };
