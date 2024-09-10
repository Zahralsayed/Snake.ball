// const SnakeSpace = document.getElementsByClassName('SnakeSpace')
 const SnakeSpace = document.querySelector('.SnakeSpace');

// Create a grid
var rows = 10     // y = rows
var columns = 20  // x = columns

let lastDirection = {x:0 , y: 0}
let direction = {x:0, y:0}
let Started = true
let gameInterval


document.addEventListener("DOMContentLoaded", function() {
    // Get the body element
    var body = document.body;

    // Loop to create grid items and append them to the body
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");

            if ( ( i == 2 ) && ( j >= 8 && j <= 12)){
                gridItem.classList.add('barrier')
            }

            // Set the position of each grid item
            gridItem.style.left = j * 100 + "px";
            gridItem.style.top = i * 100 + "px";

            // Append the grid item to the body
            SnakeSpace.appendChild(gridItem);
        }
    }
})

// Create Snake 
const snake = [{x:6, y:9}]

// Create ball 
function generateBall(){
    const x = Math.floor( Math.random() * columns ) 
    const y = Math.floor( Math.random() * rows ) 
   console.log("ball generated") 
   return {x,y}
}

let ball = generateBall()
console.log(ball)

function positionBall(){
     ball.x = Math.floor( Math.random() * columns ) 
     ball.y = Math.floor( Math.random() * rows ) 
    console.log("ball position updated") 
}

//Start Game 
const Start = document.getElementById('start')
function start(){
    Started= true;
    //Start.addEventListener('click', function(){
        gameInterval = setInterval(()=>{
            move()
            draw(SnakeSpace)
        }, 170 ) // speed of snake 

        console.log("game started")
   // })
        
}

// {x:newSnake.x, y: newSnake.y}

function snakeIncrease(){
    const newSnake = { ...snake[snake.length - 1] }
        snake.push(newSnake)
        console.log("added")
        console.log(snake.length)
        let length = document.querySelector('#printLenght').innerText = snake.length -1
        let Score = document.querySelector('#printScore').innerText = (snake.length - 1) * 10
    }

// to move the snake from the head of the snake not all element move
function move(){
    //console.log('Snake:', snake)

    if (snake.length === 0) {
        console.error('Snake array is empty')
        return
    }
    const head = snake[0]

    if(head){
       // console.log('Head before move:', head);
        head.x+= direction.x
        head.y+= direction.y
        //console.log('Head after move:', head);

    }

       lastDirection= direction;
  
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows ){
        console.log('Game Over!')
        clearInterval(gameInterval);
        redirect()
    }
    else if (head.x == ball.x && head.y == ball.y){ // to check if the snake catch the ball
        snakeIncrease()
        positionBall()
        //draw(snakeEelement)
        console.log("catch the ball")
        console.log(ball);

    }
   else {
   // snake.unshift(head);
        console.log('Head of the snake is undefined')
}
}


// to add more element to snack whenever the snake catch the ball
function draw(SnakeSpace){
    // clear the previous 
    SnakeSpace.innerHTML='';

        snake.forEach(segment => {
        const snakeEelement = document.createElement('div')
        snakeEelement.style.gridRowStart = segment.y +1
        snakeEelement.style.gridColumnStart = segment.x+1
        snakeEelement.classList.add('snake')
        SnakeSpace.appendChild(snakeEelement)

       /* if (snakeIncrease()){
            add()
        }*/
    }) 


    const ballElement = document.createElement('div')
    ballElement.style.gridRowStart = ball.y+1
    ballElement.style.gridColumnStart = ball.x+1
    ballElement.classList.add('ball')
    SnakeSpace.appendChild(ballElement)
}

/*const Start = document.getElementById('start')
Start.addEventListener('click', function(){
    startGame()
})

function startGame(){
    start()
}*/


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
    /*

let Start = document.querySelector("#start")
Start.addEventListener('click', handleClick)

function handleClick(){

}
*/


// KeyPress event listener
document.addEventListener('keydown', handleKeyPress)


//onload start event listener
document.addEventListener('DOMContentLoaded', () => {
    start()
})

function getLastDirection(){
    lastDirection = direction
    return direction
}

function snakeScore(){
    let score = snake.length * 10
    return score
}

// to save the hightest score
function hightScore(){

}

function redirect(){
    window.location.href="score.html"
}






// create ball
    // grid-row and grid-column will help to position the the ball (css) , in js can added by set position
       // using math rondom

        // grid-row: 1 / 3  will start at 1 and end at 3rd row


// Move snake
   // for moving i have to do -- and ++ for i and j 

// Increase length 
// Increase Score */