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
let snakePosY = canvas.height/2 - snakeSize/2
let snakeSpeed = 5;

let velocityX = 0;
let velocityY = 0;

/**
 * Loop game
 */
function gameLoop(){
    drawStuff()
    moveStuff()
    requestAnimationFrame(gameLoop);
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
    rectangle('white',0,0,canvas.width,canvas.height)
    rectangle('black',snakePosX,snakePosY,snakeSize,snakeSize)
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
            velocityX = 0;
            velocityY = -1;
            break;
        case 'ArrowDown':
            velocityX = 0;
            velocityY = 1;
            break;
        case 'ArrowRight':
            velocityX = 1;
            velocityY = 0;
            break;
        case 'ArrowLeft':
            velocityX = -1;
            velocityY = 0;
            break;
    }
}

gameLoop();
