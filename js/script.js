//listeners
document.addEventListener("keydown",function (){
    keyPush(event)
})

//score
const title = document.getElementById("score");

//canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//snake
const snakeSize = 50;
let snakePosX = 0;
let snakePosY = canvas.height/2;
let snakeSpeed = 50;

let velocityX = 0;
let velocityY = 0;

//food
let foodPosX = 400;
let foodPosY = 100;

//game
const tileCountX = canvas.height/snakeSize
const tileCountY = canvas.width/snakeSize

//score
let score = 0;

//fps
const fps = 1000/10


/**
 * Loop game
 */
function gameLoop(){
    drawStuff()
    moveStuff()
    setTimeout(gameLoop,fps)
    // requestAnimationFrame(gameLoop);
}


/**
 * Move snake
 */
function moveStuff(){
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    //wall collision
    if (snakePosX > (canvas.width - snakeSize)){
        snakePosX = 0;
    }

    if (snakePosX < 0){
        snakePosX = canvas.width;
    }

    if (snakePosY > (canvas.height - snakeSize)){
        snakePosY = 0;
    }

    if (snakePosY < 0){
        snakePosY = canvas.height;
    }

    //food collision
    if(snakePosX === foodPosX && snakePosY === foodPosY){
        title.textContent = ++score;
        resetFood();
    }
}

/**
 * Draw Snake
 */
function drawStuff(){
    //background
    rectangle('#ffbf00',0,0,canvas.width,canvas.height)
    //grid
    drawGrid()
    //snake
    rectangle('black',snakePosX,snakePosY,snakeSize,snakeSize)

    rectangle('#00bfff',foodPosX,foodPosY,snakeSize,snakeSize)
}


/**
 * Draw Grid
 */
function drawGrid(){
    for (let i = 0;i<tileCountX;i++){
        for (let j = 0; j<tileCountY;j++){
            rectangle('#fff',snakeSize*i,snakeSize*j,snakeSize-1,snakeSize-1)
        }
    }
}


/**
 * Draw rectangle
 */
function rectangle(color,x,y,width,height){
    context.fillStyle = color;
    context.fillRect(x,y, width, height);
}


/**
 * Movement
 */
function keyPush(event){
    switch(event.key){
        case 'ArrowUp':
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if (velocityY !== -1){
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowRight':
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        case 'ArrowLeft':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
    }
}


/**
 * Randomize food pos
 */
function resetFood(){
    foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize;
}

resetFood();
gameLoop();
