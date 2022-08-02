//snake
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//canvas
const snakeSize = 50;
let snakePosX = 0;
let snakePosY = canvas.height/2 - snakeSize/2

context.fillStyle = 'white';
context.fillRect(0,0, canvas.width, canvas.height);

context.fillStyle = 'black';
context.fillRect(snakePosX,snakePosY, snakeSize, snakeSize);
