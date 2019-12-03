let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
const grid = 16;
let count = 0;
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 1  
}

let apple = {
    x: 160,
    y: 160
}

let userSpeed = 16;

function getRandomInt(min, max) {
    return Math.floor(Math.random()* (max - min)) + min;
};

function loop() {
    requestAnimationFrame(loop);

    if (++count < userSpeed) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if(snake.x < 0) {
        snake.x = canvas.width;
    }

    else if(snake.x >= canvas.width) {
        snake.x = 0;
    };
   
    if(snake.y < 0) {
        snake.y = canvas.height;
    }

    else if(snake.y >= canvas.height) {
        snake.y = 0;    
    };

    snake.cells.unshift({
        x: snake.x, 
        y: snake.y
    });

    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    } 

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y,grid, grid);
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
         context.fillRect(cell.x, cell.y, grid-1, grid-1);

    if(apple.x === snake.x && apple.y === snake.y) {
        snake.maxCells++;
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
        if (e.which === 37 ){
            snake.dx = -grid;
            snake.dy = 0;
        } else if(e.which === 38){
            snake.dx = 0;
            snake.dy = -grid;
        } else if(e.which === 39){
            snake.dx = grid;
            snake.dy = 0;
        } else if(e.which === 40){
            snake.dx = 0;
            snake.dy = grid;
        }
});



requestAnimationFrame(loop);