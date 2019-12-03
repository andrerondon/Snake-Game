// canvas variable is searching html document 
// for id elements with value 'game'
let canvas = document.getElementById('game');
// allows for x and y axis manipulation within canvas element
let context = canvas.getContext('2d');
// divides canvas pixels dimensions into value(16) x value(16) grid squares
const grid = 16;
// timer variable for userSpeed to be compared against
//  for requestAnimationFrame method
let count = 0;
// object that contains the values and parameters of the snake
let snake = {
    // represents initial x and y positions of snake
    x: 160,
    y: 160,
    // represents movement speed per frame on x and y axis
    dx: grid,
    dy: 0,
    // hold the values the represent the snakes body as it grows
    cells: [],
    // determines initial value of snake length. 
    // essentially represents current cells
    maxCells: 1  
}
// object that contains value of apple
let apple = {
    x: 160,
    y: 160
}
// the rate at which the frame will be refreshed
// based on comparison against count variable
let userSpeed = 6;
// function tthat returns a random integer between two given values
function getRandomInt(min, max) {
    return Math.floor(Math.random()* (max - min)) + min;
};
// function that will hold all actions performed each frame refresh
function loop() {
    // canvas operator that takes a callback as a parameter
    // works like setTimeout() in that it will refresh 
    // without requiring user action
    requestAnimationFrame(loop);
//default value of 60fps 
    // condition that determines how often to refresh the frame
    if (++count < userSpeed) {
        return;
    }
    count = 0;
    // will clear canvas before each frame is painted
    // or else canvas will show full history of frames
    context.clearRect(0, 0, canvas.width, canvas.height);
    // will determine how fast and in which direction
    // snake advances per frame
    snake.x += snake.dx;
    snake.y += snake.dy;
//Steps 18 and 19 were completed at once in github commits
    // if snake is far left, moving left
    if(snake.x < 0) {
        // wrap to right side of canvas on same x axis
        snake.x = canvas.width;
    }
    // if snake is far right, moving right
    else if(snake.x >= canvas.width) {
        // wrap to left side of canvas on same x axis
        snake.x = 0;
    };
    // if snake is at top of board, moving up
    if(snake.y < 0) {
        // wrap to bottom of canvas, on same y axis
        snake.y = canvas.height;
    }
    // snake is at bottom, moving down
    else if(snake.y >= canvas.height) {
        // wrap to top of board, on same y axis
        snake.y = 0;    
    };
// place new value at start of array, 
// or adding a new head
    snake.cells.unshift({
        x: snake.x, 
        y: snake.y
    });
// remove cells as we move away from them, 
// or pulling off the tail
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    } 


// will give color and dimension parameters for apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y,grid, grid);
// will give color for snake
    context.fillStyle = 'green';
// will allow each cell containing snake body to 
// take parameters given to snake
    snake.cells.forEach(function(cell, index) {
// will give dimension parameters for color
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
// if apple cell and snake cell occupy same space
    if(apple.x === snake.x && apple.y === snake.y) {
// increase snake body length variable by 1
        snake.maxCells++;
// place a new apple randomly on the grid
        apple.x = getRandomInt(0, (canvas.width/16))* grid;
        apple.y = getRandomInt(0, (canvas.width/16))* grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {      
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 1;
            snake.dx = grid;
            snake.dy = 0;
            apple.x = 176;
            apple.y = 176;
        }
    }
    });
}

document.addEventListener('keydown', function(e){
    if (e.which === 37 && snake.dx === 0 || e.which === 65 && snake.dx === 0 ){
        snake.dx = -grid;
        snake.dy = 0;
    } else if(e.which === 38 && snake.dy === 0 || e.which === 87 && snake.dx === 0 ){
        snake.dx = 0;
        snake.dy = -grid;
    } else if (e.which === 39 && snake.dx === 0 || e.which === 68 && snake.dx === 0 ){
        snake.dx = grid;
        snake.dy = 0;
    } else if(e.which === 40 && snake.dy === 0 || e.which === 83 && snake.dx === 0 ){
        snake.dx = 0;
        snake.dy = grid;
    }
});
// recursively calling this function will allow
//  it to refresh constantly without user action
requestAnimationFrame(loop);