// const SnakeSpace = document.getElementsByClassName('SnakeSpace')
 const SnakeSpace = document.querySelector('.SnakeSpace');

// Create a grid
var rows = 10
var columns = 20

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

// Create ball 
const ball = [{x:5, y:5}]


// Create Snake 
const snake = [{x:6, y:9}]


function generateBall(){
    const x = Math.floor(Math.random() * rows ) 
    const y = Math.floor(Math.random() * columns )  
    return {x, y};
}


//Start Game 
function start(){
    Started= true;
        gameInterval = setInterval(()=>{
            move()
            draw(SnakeSpace)
        }, 100 ) // update every 100ms
}

// to move the snake from the head of the snake not all element move
function move(){
    //console.log('Snake:', snake)

    if (snake.length === 0) {
        console.error('Snake array is empty')
        return
    }


    for( let i = snake.length - 1; i >  0; i--){
        snake[i] = { ...snake[i- 1] }
    }

    const head = snake[0]
    if(head){
       // console.log('Head before move:', head);
        head.x+= direction.x
        head.y+= direction.y
        //console.log('Head after move:', head);

    }

       lastDirection= direction;
  
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns ){
        console.log('Game Over!')
        clearInterval(gameInterval);
    }
   else {
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
    }) 


    const ballElement = document.createElement('div')
    ballElement.style.gridRowStart = ball[0].y+1
    ballElement.style.gridColumnStart = ball[0].x+1
    ballElement.classList.add('ball')
    SnakeSpace.appendChild(ballElement)
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
