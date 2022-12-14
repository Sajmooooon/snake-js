//listeners
document.addEventListener("keydown",function (){
    keyPush(event)
})

//score
const title = document.getElementById("score");

//canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//game
let gameIsRunning = true;

//snake
const tileSize = 50;
let snakePosX = 0;
let snakePosY = canvas.height/2;
let snakeSpeed = tileSize;

let velocityX = 1;
let velocityY = 0;

//tail
let tail = [];
let snakeLength = 1;

//food
let foodPosX = 400;
let foodPosY = 100;

//game
const tileCountX = canvas.height/tileSize
const tileCountY = canvas.width/tileSize

//score
let score = 0;

//fps
const fps = 10


/**
 * Loop game
 */
function gameLoop(){
    if (gameIsRunning){
        drawStuff()
        moveStuff()
        setTimeout(gameLoop,1000/fps)
    }

    // requestAnimationFrame(gameLoop);
}


/**
 * Wall collision
 */
function wallCollision(){
    if (snakePosX > (canvas.width - tileSize)){
        snakePosX = 0;
    }

    if (snakePosX < 0){
        snakePosX = canvas.width;
    }

    if (snakePosY > (canvas.height - tileSize)){
        snakePosY = 0;
    }

    if (snakePosY < 0){
        snakePosY = canvas.height;
    }
}


/**
 * Wall collision Game Over
 */
function wallCollisionOver(){
    if ((snakePosX > (canvas.width - tileSize)) || (snakePosX < 0) ||
        (snakePosY > (canvas.height - tileSize)) || ((snakePosY < 0))){
        gameOver();
    }
}


/**
 * Move snake
 */
function moveStuff(){
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    //wall collision
    // wallCollision()
    wallCollisionOver();

    //Game Over
    if (checkTail(snakePosX, snakePosY)){
        gameOver();
    }

    //tail
    tail.push({x: snakePosX, y:snakePosY})

    //remove old parts
    tail = tail.slice(-1 * snakeLength);

    //food collision
    if(foodPosX === snakePosX && foodPosY === snakePosY){
        snakeLength++
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

    //tail
    tail.forEach(snakePart =>{
        circle('#555',snakePart.x,snakePart.y,tileSize,tileSize)
        // rectangle('#555',snakePart.x,snakePart.y,tileSize,tileSize)
    })

    //snake
    circle('black',snakePosX,snakePosY,tileSize,tileSize)
    // rectangle('black',snakePosX,snakePosY,tileSize,tileSize)

    //food
    rectangle('#00bfff',foodPosX,foodPosY,tileSize,tileSize)
}


/**
 * Draw Grid
 */
function drawGrid(){
    for (let i = 0;i<tileCountX;i++){
        for (let j = 0; j<tileCountY;j++){
            rectangle('#fff',tileSize*i,tileSize*j,tileSize-1,tileSize-1)
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
 * Draw circle
 */
function circle(color,x,y,width,height){
    context.beginPath();
    context.arc(x+(tileSize/2),y+(tileSize/2), width/2, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.stroke();
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
        default:
            //restart game
            if(!gameIsRunning){
                location.reload();
            }
            break;
    }
}


/**
 * Randomize food pos
 */
function resetFood(){
    if(snakeLength === tileCountX * tileCountY){
        gameOver();
    }
    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

    checkFood();

}


/**
 * Check Food position
 */
function checkFood(){
    if(foodPosX === snakePosX && foodPosY === snakePosY){
        resetFood();
    }
    if (tail.some((snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY)){
        resetFood();
    }
}


/**
 * GameOver
 */
function gameOver(){
    title.innerHTML = `GAME OVER <br><strong>${score}</strong>`
    gameIsRunning = false;
}


/**
 * Check Tail
 */
function checkTail(posx,posy){
    let touch = false;
    tail.forEach((snakePart) =>{
        if(posx === snakePart.x && posy === snakePart.y){
            touch = true;
        }
    })
    return touch;
}


resetFood();
gameLoop();
