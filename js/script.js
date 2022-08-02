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
    // snakePosX += snakeSpeed;
    if (snakePosX > canvas.width){
        snakePosX = 0
    }

    if (snakePosY > canvas.height){
        snakePosY = 0
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
            snakePosY -= snakeSpeed;
            break;
        case 'ArrowDown':
            snakePosY += snakeSpeed;
            break;
        case 'ArrowRight':
            snakePosX += snakeSpeed;
            break;
        case 'ArrowLeft':
            snakePosX -= snakeSpeed;
            break;
    }
}

gameLoop();
