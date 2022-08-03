//listeners
document.addEventListener("keydown",function (){
    keyPush(event)
})

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


const tileCountX = canvas.height/snakeSize
const tileCountY = canvas.width/snakeSize

/**
 * Loop game
 */
function gameLoop(){
    drawStuff()
    moveStuff()
    setTimeout(gameLoop,1000/15)
    // requestAnimationFrame(gameLoop);
}


/**
 * Move snake
 */
function moveStuff(){
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    if (snakePosX > canvas.width){
        snakePosX = 0;
    }

    if (snakePosX < -snakeSize){
        snakePosX = canvas.width;
    }

    if (snakePosY > canvas.height){
        snakePosY = 0;
    }

    if (snakePosY < -snakeSize){
        snakePosY = canvas.height;
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

gameLoop();
