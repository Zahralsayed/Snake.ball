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
