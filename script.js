const snakeSpace = document.querySelector('.snakeSpace');

// Create a grid
let rows = 10     // y = rows
let columns = 20  // x = columns

let lastDirection = {x:0 , y: 0}
let direction = {x:0, y:0}
let Started = true
let gameInterval
let catchEffect = new Audio('catch.mp3')
let gameOver = new Audio('gameOver.mp3')


document.addEventListener("DOMContentLoaded", function() {
// Get the body element
    let body = document.body;

// Loop to create grid items and append them to the body
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("gridItem");

            // Set the position of each grid item
            gridItem.style.left = j * 100 + "px";
            gridItem.style.top = i * 100 + "px";

            // Append the grid item to the body
            snakeSpace.appendChild(gridItem);
        }
    }
})

// Create Snake 
const snake = [{x:6, y:6}]

// create barrier
const barrier = [{x:8, y:2 }, {x:8, y:3}, {x:8, y:4}, {x:12, y:7}, {x:13, y:7}]

// Create ball 
function generateBall(columns, rows, barrier){ 

    // function to check whether the generated position is a barrier or not  
    function isBarrier(x,y){
        return barrier.some(barr => barr.x === x && barr.y === y)
    }
    let x, y;

    // generate a rondom position, and check if it's barrier it will generate a new position  
    do {
    x = Math.floor( Math.random() * columns ) 
    y = Math.floor( Math.random() * rows ) 
    } while (isBarrier(x,y))
   return {x,y}
}

let ball = generateBall(columns, rows, barrier)

function positionBall(){
     ball.x = Math.floor( Math.random() * columns ) 
     ball.y = Math.floor( Math.random() * rows ) 
}

//Start Game 
function start(){
    Started= true;
        gameInterval = setInterval(()=>{
            move()
            draw(snakeSpace)
        }, 150 ) // like speed of snake  
}

function snakeIncrease(){
    const newSnake = { ...snake[snake.length - 1] }
        snake.push(newSnake)
        let length = document.querySelector('#printLenght').innerText = snake.length -1
        let Score = document.querySelector('#printScore').innerText = (snake.length - 1) * 10
        localStorage.setItem('score', Score) // saving score to localstorage
    }
 

// to move the snake from the head of the snake not all element move
function move(){
    if (snake.length === 0) {
        console.error('Snake array is empty')
        return
    }

    const head = { ...snake[0] }

    if(head){
        head.x+= direction.x
        head.y+= direction.y
    }
    lastDirection= direction;
    
// check collision with walls
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows ){
        clearInterval(gameInterval); // will make the game over
        gameOver.play()
        // add an event listener to ensure that the redirect is after the sound finished
        gameOver.addEventListener('ended', function(){
            redirect()
        })
    }
    
// check collision with itself
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)){
        clearInterval(gameInterval);
        gameOver.play()
        // add an event listener to ensure that the redirect is after the sound finished
        gameOver.addEventListener('ended', function(){
            redirect()
        })
        return
    }

// check collision with the barrier
    for(let i=0; i<barrier.length; i++){
        let barr = barrier[i]
            if (head.x == barr.x && head.y == barr.y){ // to check if the snake touch the barrier
                clearInterval(gameInterval)
                gameOver.play()
            // add an event listener to ensure that the redirect is after the sound finished
                gameOver.addEventListener('ended', function(){
                            redirect()
                        })
    }
    }
    
// check if snake catch ball  
    if (head.x == ball.x && head.y == ball.y){ // to check if the snake catch the ball
        snakeIncrease()
        catchEffect.play()
        positionBall()
    }
   else {
    snake.pop()
    snake.unshift(head)   // Add the new head to the snake
    draw(snakeSpace)
}
}


// to add more element to snack whenever the snake catch the ball
function draw(snakeSpace){
// clear the previous 
    snakeSpace.innerHTML='';

// draw snake
    snake.forEach(segment => {
        const snakeEelement = document.createElement('div')
        snakeEelement.style.gridRowStart = segment.y +1
        snakeEelement.style.gridColumnStart = segment.x+1
        snakeEelement.classList.add('snake')
        snakeSpace.appendChild(snakeEelement)
    })

// draw ball
    const ballElement = document.createElement('div')
    ballElement.style.gridRowStart = ball.y+1
    ballElement.style.gridColumnStart = ball.x+1
    ballElement.classList.add('ball')
    snakeSpace.appendChild(ballElement)

// draw barrier
barrier.forEach(barriers => {
    const barrierElement = document.createElement('div')
    barrierElement.style.gridRowStart = barriers.y+1
    barrierElement.style.gridColumnStart = barriers.x+1
    barrierElement.classList.add('barrier')
    snakeSpace.appendChild(barrierElement)
})    
}


// function keyPress
function handleKeyPress(event){ 
   if (Started){
            switch(event.key){
                case 'ArrowUp':
                    if (lastDirection.y !== 0) break // to move up but can not move down as it is
                    direction = { x: 0 , y: -1}
                    break
                case 'ArrowDown':
                    if (lastDirection.y !== 0) break
                    direction = { x: 0 , y: 1}
                    break
                case 'ArrowRight':
                    if (lastDirection.x !== 0) break
                    direction = { x: 1 , y: 0}
                    break
                case 'ArrowLeft':
                    if (lastDirection.x !== 0) break
                    direction = { x: -1 , y: 0}
                    break
            
            }
        }

    }

// KeyPress event listener
document.addEventListener('keydown', handleKeyPress)
// start game enent listener
document.addEventListener('DOMContentLoaded', start)

function getLastDirection(){
    lastDirection = direction
    return direction
}

function snakeScore(){
    let score = snake.length * 10
    return score
}


function redirect(){
    window.location.href="score.html"
}