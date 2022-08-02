//canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//snake
const snakeSize = 50;
let snakePosX = 0;
let snakePosY = canvas.height/2 - snakeSize/2
let snakeSpeed = 5;


//loop
function gameLoop(){
    context.fillStyle = 'white';
    context.fillRect(0,0, canvas.width, canvas.height);

    snakePosX += snakeSpeed;

    if (snakePosX > canvas.width){
        snakePosX = 0
    }

    if (snakePosY > canvas.height){
        snakePosY = 0
    }

    context.fillStyle = 'black';
    context.fillRect(snakePosX,snakePosY, snakeSize, snakeSize);

    requestAnimationFrame(gameLoop);
}

gameLoop();
